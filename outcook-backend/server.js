import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoute from "./route/auth.js";
import DatabaseService from "./utils/dbService.js";
import ApiResponse from "./utils/ApiReponses.js";
import cookieParser from "cookie-parser";
import userRoute from "./route/userRoute.js";
import awsRoute from "./route/awsRoute.js";
import runConsumer from "./utils/kafka/kafkaMessageConsumerService.js";
import redisClient from "./config/redisConfig.js";
import { WebSocketServer } from "ws";
import url from "url";
import { KeepKafkaAlive } from "./utils/kafka/kafkaKeepAlive.js";
import fs from "fs";
import https from "https";

dotenv.config();

function onSocketPreError(err){
    console.log("socket pre err :", err);
}

function onSocketPostError(err){
  console.log("socket pre err :", err);
}

const db_uri = process.env.MONGODB_URI;

const PORT = process.env.PORT || 3000;

const app = express();

const certPath = '/etc/letsencrypt/live/mailapi.airedify.in/fullchain.pem';
const keyPath = '/etc/letsencrypt/live/mailapi.airedify.in/privkey.pem';

const serverOptions = {
  cert: fs.readFileSync(certPath),
  key: fs.readFileSync(keyPath),
};

const server = https.createServer(serverOptions, app);

runConsumer()

const wss = new WebSocketServer({noServer : true})

export let dbconn;

(async () => {
  dbconn = await DatabaseService.connect(db_uri.toString());
})()

app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173", "https://outcook-repo.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "access-control-allow-origin",
      "set-cookie",
    ],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  return new ApiResponse(res).successful();
});

app.use("/auth", authRoute);

app.use("/user", userRoute);

app.use("/aws", awsRoute);




server.on('upgrade' , (req , socket , head) => {
    socket.on('error' , onSocketPreError);


    //can implement authentication here
    wss.handleUpgrade(req , socket , head , (ws) => {
        socket.removeListener('error' , onSocketPreError);
        wss.emit('connection' , ws , req)
    })
})


wss.on('connection' , (ws , req) => {


    ws.on('error' , onSocketPostError );

    const pathname = url.parse(req.url).pathname;

    const email = pathname.split('/')[1];

      const redisClientInstance = new redisClient()

        console.log('got here *************', email);
      redisClientInstance.redis.subscribe(email , (err, count) => {
        if (err) {
          console.error("Failed to subscribe: %s", err.message);
        } else {
          console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
          );
        }
      });

      redisClientInstance.redis.on("message" , (channel, message) => {
        console.log("got message")
        console.log("message" , message);
        console.log(typeof message);
        ws.send(JSON.stringify(message));
      })



  ws.on('close' , () => {
      redisClientInstance.redis.disconnect()
      console.log('Connection Closed!')
  })

 })



server.listen(PORT, () => {
  console.log("app listening on port", PORT);
});

export default app;
                          