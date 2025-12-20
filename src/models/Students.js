import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

//todo check the fields that i will need for reg and login

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
            // enum: ["teacher", "student"],
            default: "student",
        },
        admin: [
            {
                type: Types.ObjectId,
                ref: "Admiin",
            },
        ],
    },
    { timestamp: true } //todo in the others models
);

studentSchema.pre("save", async function () {
    this.code = await bcrypt.hash(this.code, 10);
});

const Student = model("Student", studentSchema);

export default Student;
