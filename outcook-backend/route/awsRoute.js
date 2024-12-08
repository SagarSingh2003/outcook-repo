import express from "express";
import awsController from "../controller/awsController.js"
import authMiddleware from "../middleware/auth.js";

const router = express.Router();

router.get("/get_presigned_url/:key", authMiddleware , awsController.getPreSignedUrl);

export default router;
