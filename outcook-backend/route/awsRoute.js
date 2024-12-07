import express from "express";
import awsController from "../controller/awsController.js"

const router = express.Router();

router.get("/get_presigned_url/:key", awsController.getPreSignedUrl);

export default router;
