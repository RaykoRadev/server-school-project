import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, "Username is required!"],
            minLength: [4, "Username must be at least 4 characters long!"],
        },
        code: {
            type: String,
            required: [true, "Code is required!"],
            minLength: [3, "Ccode must be at least 3 characters long!"],
        },
        role: {
            type: String,
            // enum: ["admin", "student"],W
            default: "admin",
        },
        // students: [
        //     {
        //         type: Types.ObjectId,
        //         ref: "Student",
        //     },
        // ],
    },
    { timestamp: true }
);

adminSchema.pre("save", async function () {
    this.code = await bcrypt.hash(this.code, 10);
});

const Admin = model("Admin", adminSchema);

export default Admin;
