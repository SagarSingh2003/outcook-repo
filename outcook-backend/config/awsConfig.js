import dotenv from 'dotenv';
import { S3Client} from "@aws-sdk/client-s3";
dotenv.config()


export const s3 = new S3Client({ 
  credentials:{ 
    accessKeyId: process.env.accessKeyId ,
    secretAccessKey: process.env.secretAccessKey
  },
  region: "ap-south-1" 
});
