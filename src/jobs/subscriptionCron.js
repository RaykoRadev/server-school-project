import cron from "node-cron";
import Teacher from "../models/Teacher.js";

cron.schedule("40 20 * * *", async () => {
    console.log("CRON IS WORKING:", new Date());
    await Teacher.updateMany(
        {
            subscriptionExpiresAt: { $lt: new Date() },
            subscriptionStatus: "active",
        },
        { $set: { subscriptionStatus: "expired" } },
    );
    console.log("Updated expired subscriptions.");
});
