import { Schema, Types, model } from "mongoose";
import bcrypt from "bcrypt";

const linksSchema = new Schema(
    {
        text: { type: String, required: true },
        link: { type: String, required: true },
    },
    { _id: false }
);

const subjectShema = new Schema({
    name: { type: String, required: true },
    links: [linksSchema],
    visualizationName: {type: String,required: true}
});

const classesSchema = new Schema({
    classId: { type: Types.ObjectId, default: () => new Types.ObjectId() },
    name: { type: String, required: true },
    subjects: [subjectShema],
});

const teacherSchema = new Schema(
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
            default: "teacher",
        },
        classes: {
            type: [classesSchema],
            validate: [(v) => v.length === 4],
        },
    },
    { timestamp: true }
);

teacherSchema.pre("save", async function () {
    this.code = await bcrypt.hash(this.code, 10);
});

const Teacher = model("Teacher", teacherSchema);

export default Teacher;
