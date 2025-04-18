import ConnectDB from "@/config/db";
import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";


cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})


export async function POST(request) {

    try {
        
        const {userId} = getAuth(request)

        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "You are not a seller" })
        }

        const formData = await request.formData()

        const name = formData.get("name");
        const description = formData.get("description");
        const category = formData.get("category");
        const price = formData.get("price");
        const offerPrice = formData.get("offerPrice");

        const file = formData.getAll('images');

        if (!file || file.length === 0) {
            return NextResponse.json({ success: false, message: "Please upload images" })
        }

        const result = await Promise.all(
            file.map(async(file) => {
                const arrayBuffer = await file.arrayBuffer()
                const buffer = Buffer.from(arrayBuffer);

                return new Promise((resolve,reject)=>{
                    const stream = cloudinary.uploader.upload_stream(
                        {resource_type: 'auto'},
                        (error,result) => {
                            if (error) {
                                reject(error)
                            } else {
                                resolve(result)
                            }
                        }
                    )
                    stream.end(buffer)
                })
            })
        )

        const image = result.map(result => result.secure_url)

        await ConnectDB();

        const newProduct = await Product.create({ 
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            image,
            date: Date.now()
        })

        return NextResponse.json({ success: true, message: "Product added successfully", newProduct })
        
    } catch (error) {
        console.error("Add Product Error:", error); // for debugging
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
    

}