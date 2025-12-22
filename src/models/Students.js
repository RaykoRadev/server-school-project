import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

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
    },
    { timestamp: true }
);

studentSchema.pre("save", async function () {
    this.code = await bcrypt.hash(this.code, 10);
});

const Student = model("Student", studentSchema);

export default Student;
