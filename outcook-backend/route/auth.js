import express from "express";
import authController from "../controller/authController.js";

const router = express.Router();

router.post("/signup", authController.signUp);

router.post("/signin", authController.signIn);

router.post("/signout", authController.signOut);

export default router;
