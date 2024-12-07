import kafka from "../../config/kafkaConfig.js";


const producer = kafka.producer



export default async function sendMessageToKafkaQueue(data){

        await producer.connect()

        await producer.send({
            topic: 'email-share',
            messages: [
              { value:  JSON.stringify(data)},
            ],
          })

        await producer.disconnect()  
        return true

}