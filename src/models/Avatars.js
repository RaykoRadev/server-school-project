import { model, Schema } from "mongoose";

const avatarsSchema = new Schema({
    imgUrl: "string",
    // imagePreview: "string",
});

const Avatar = model("Avatar", avatarsSchema);

export default Avatar;
