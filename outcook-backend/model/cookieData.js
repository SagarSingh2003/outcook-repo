import mongoose from "mongoose";

const cookieDataSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  access_token: {
    type: String,
    required: true,
  },
});

const CookieData = mongoose.model("CookieData", cookieDataSchema);
export default CookieData;
