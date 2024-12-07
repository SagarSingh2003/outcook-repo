import express from "express";
import userController from "../controller/userController.js";
import authMiddleware from "../middleware/auth.js";
const router = express.Router();

router.post("/send_message"  , authMiddleware, userController.sendMessage);

router.get("/get_all_sent_messages",  authMiddleware, userController.getSentMessages);

router.get("/get_all_recieved_messages" , authMiddleware , userController.getRecievedMessages);

export default router;
