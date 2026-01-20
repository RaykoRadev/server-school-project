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
            required: [true, "usernameIsReq"],
            minLength: [4, "usernameHasTobelonger"],
        },
        code: {
            type: String,
            required: [true, "codeIsReq"],
            minLength: [3, "codeHasTobelonger"],
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

        avatar: {
            type: String,
            default:
                "https://i.ibb.co/SwRsS4mn/adorable-baby-penguin-illustration-1308-181506.avif",
        },
        // 1. Move expireAt to its own top-level field
        expireAt: {
            type: Date,
            default: () => new Date(Date.now() + 420 * 24 * 60 * 60 * 1000), // 7 months from now
            index: { expires: 0 }, // delete when this date is reached
        },
        sessions: [
            {
                loginAt: { type: Date, default: Date.now },
                // durationSeconds: { type: Number, default: 0 },
            },
        ],
        subjectUsage: {
            type: Map,
            of: Number, // Stores key-value pairs like { "Quiz": 5, "Chat": 12 }
            default: {},
        },
    },
    { timestamps: true },
);

//* fFor the moment the vcode is not going to be hashed in the DB, if it is need in the feature, dont forget the needed changes in the login function in student service

// studentSchema.pre("save", async function (next) {
//     if (!this.isModified("code")) return next();

//     this.code = await bcrypt.hash(this.code, 10);
//     next();
// });

const Student = model("Student", studentSchema);

export default Student;
