import { Inngest } from "inngest";
import ConnectDB from "./db";
import User from "@/models/User";
import Order from "@/models/Order";

export const inngest = new Inngest({ id: "quickcart-next" });

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" }, // ✅ correct event name
  async ({ event, step }) => {
    try {
      console.log("📥 Received clerk/user.created event");

      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      };

      await ConnectDB();

      const created = await User.create(userData);
      console.log("✅ User created:", created);

    } catch (err) {
      console.error("❌ Error in syncUserCreation:", err);
    }
  }
);

export const syncUserUpdate = inngest.createFunction(
  { id: "update-user-from-clerk" },
  { event: "clerk/user.updated" }, // ✅ correct event name
  async ({ event }) => {
    try {
      console.log("📥 Received clerk/user.updated event");

      const { id, first_name, last_name, email_addresses, image_url } = event.data;
      const userData = {
        _id: id,
        email: email_addresses[0].email_address,
        name: `${first_name} ${last_name}`,
        imageUrl: image_url,
      };

      await ConnectDB();

      const updated = await User.findByIdAndUpdate(id, userData, { new: true });
      console.log("✅ User updated:", updated);

    } catch (err) {
      console.error("❌ Error in syncUserUpdate:", err);
    }
  }
);

export const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  { event: "clerk/user.deleted" }, // ✅ correct event name
  async ({ event }) => {
    try {
      console.log("📥 Received clerk/user.deleted event");

      const { id } = event.data;

      await ConnectDB();

      const deleted = await User.findByIdAndDelete(id);
      console.log("🗑️ User deleted:", deleted);

    } catch (err) {
      console.error("❌ Error in syncUserDeletion:", err);
    }
  }
);

//Inngest function to create user's order in database
export const createUserOrder = inngest.createFunction(
  {
    id: 'create-user-order',
    batchEvents: {
      maxSize: 5,
      timeout: '5s'
    }
  },
  {event: 'order/created'}, // ✅ correct event name
  async ({events}) => {
    const orders = events.map((event) => {
      return {
        userId: event.data.userId,
        items: event.data.items,
        amount: event.data.amount,
        address: event.data.address,
        date: event.data.date,
      }
    })
    await ConnectDB();
    await Order.insertMany(orders);

    return {
      success: true, processed: orders.length
    };
  }
)