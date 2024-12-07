import mime from "mime-types"
import {s3} from "../config/awsConfig.js"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const getUploadURL = async function(key) {
    
    const Key = `${key}`
    const URL_EXPIRATION_SECONDS = 300

    
    const contentType = mime.lookup(key) || 'application/octet-stream';

    try{
        const command = new PutObjectCommand({
            Bucket: 'outcook',
            Key : key,
            ContentType: contentType
        })
        
        const uploadURL = await getSignedUrl(s3 , command , {expiresIn : URL_EXPIRATION_SECONDS}) ;


        return JSON.stringify({
            uploadURL: uploadURL,
            Key
        })

    }catch(err){

        console.log(err);
        return JSON.stringify({
            err : err
        })

    }
  }