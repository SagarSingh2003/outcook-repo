import {Kafka , Partitioners} from "kafkajs";
import dotenv from "dotenv"

dotenv.config()

class KafkaStore {
    constructor(){
        this.kafka = new Kafka({
            clientId: 'outcook-client',
            ssl: true,  
            sasl: {
              mechanism: process.env.AWS_MSK_IAM, 
              accessKeyId: process.env.accessKeyId,
              secretAccessKey: process.env.secretAccessKey
            },
            brokers: [`${process.env.broker}`],
        })
          
        
        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        })

        this.consumer = this.kafka.consumer({ groupId: 'email-share-group' })
    }
}

export default new KafkaStore();