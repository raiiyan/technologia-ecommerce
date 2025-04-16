import { Inngest } from "inngest";
import ConnectDB from "./db";
import User from "@/models/User";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "quickcart-next" });

// Ingest Function to save user data to a database
export const syncUserCreation = inngest.createFunction(
    {
        id:'sync-user-from-clerk'
    },
    {
        event:'clerk/user.created',
    },

    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: image_url,
        }

        await ConnectDB()

        await User.create(userData)

    }
)


// Ingest Function to update user data to a database
export const syncUserUpdate = inngest.createFunction(
    {
        id:'update-user-from-clerk'
    },
    {
        event:'clerk/user.updated',
    },

    async ({ event }) => {
        const { id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id:id,
            email: email_addresses[0].email_address,
            name: first_name + " " + last_name,
            imageUrl: image_url,
        }

        await ConnectDB()

        await User.findByIdAndUpdate(id, userData)

    }
)

// Ingest Function to delete user data from a database
export const syncUserDeletion = inngest.createFunction(
    {
        id:'delete-user-from-clerk'
    },
    {
        event:'clerk/user.deleted',
    },

    async ({ event }) => {
        const { id } = event.data;

        await ConnectDB()

        await User.findByIdAndDelete(id)

    }
)