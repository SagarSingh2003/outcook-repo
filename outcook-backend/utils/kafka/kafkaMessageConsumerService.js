import kafka from "../../config/kafkaConfig.js"
import dbService from "../dbService.js"
import Message from "../../model/MessageSchema.js"
import UserData from "../../model/userdata.js"
import redisClient from "../../config/redisConfig.js"

const consumer = kafka.consumer
await consumer.connect()

export default async function runConsumer(){

    await consumer.subscribe({ topic: 'email-share', fromBeginning: true })

    console.log("consumer is running");

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log("========================message receieved=========================")
            console.log(`message : ${message} , topic : ${topic} , partition : ${partition}`)

            try{
                const result = await dbService.create(Message , JSON.parse(message.value))

                if(result){
                    
                    const updateSentMessageRecord = await dbService.findOneAndUpdate(UserData , {email : result.from.email} , {$push : {sentMessages : result._id}})
                    const updateRecievedMessageRecord = await dbService.findOneAndUpdate(UserData , {email : result.to.email} , {$push : {recievedMessages : result._id}})
                    
                    if(updateRecievedMessageRecord && updateSentMessageRecord){
                        console.log("========================db updated=========================")
                    }
                }

                const redis = new redisClient()

                redis.redis.on('connect' , () => {
                    console.log('connected redis client')
                })
                
                await redis.redis.publish(result?.to?.email , JSON.stringify(result))

                return false;
            }catch(err){
                console.log(err)
            }
        },
    })

}