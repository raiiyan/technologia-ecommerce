import ConnectDB from "@/config/db";
import Address from "@/models/address";

import Order from "@/models/Order";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";



export async function GET(request) {

    try {
        const {userId} =  getAuth(request)
        await ConnectDB()

        Address.length
        Product.length

        const orders = await Order.find({userId}).populate('address').populate('items.product')
        return NextResponse.json({
            success: true,
            orders
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: error.message
        })

    }

}