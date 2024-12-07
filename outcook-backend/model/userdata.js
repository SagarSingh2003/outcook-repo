import mongoose from "mongoose";
import Message from "./MessageSchema.js";


const userDataSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  sentMessages : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Message',
    required : false,
    default : []
  }],
  recievedMessages : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'Message',
    required : false,
    default : []
  }]
});


const UserData = mongoose.model("UserData", userDataSchema);
export default UserData;
