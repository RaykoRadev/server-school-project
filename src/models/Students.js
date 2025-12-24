import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

// const codeSchema = new Schema({
//     type: String,
//     createdAt: Date,default: Date.now
// })

const studentSchema = new Schema(
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
            createdAt: Date,
            default: Date.now,
        },
        role: {
            type: String,
            default: "student",
        },
        teacherId: {
            type: Types.ObjectId,
            ref: "Teacher",
            required: true,
        },

        classId: {
            type: Types.ObjectId,
            // ref: "Teacher",
            required: true,
        },
        // 1. Move expireAt to its own top-level field
        expireAt: {
            type: Date,
            default: () => new Date(Date.now() + 60 * 24 * 60 * 60 * 1000), // 60 days from now
            index: { expires: 0 }, // delete when this date is reached
        },
    },
    { timestamps: true }
);

//* fFor the moment the vcode is not going to be hashed in the DB, if it is need in the feature, dont forget the needed changes in the login function in student service

// studentSchema.pre("save", async function (next) {
//     if (!this.isModified("code")) return next();

//     this.code = await bcrypt.hash(this.code, 10);
//     next();
// });

const Student = model("Student", studentSchema);

export default Student;
