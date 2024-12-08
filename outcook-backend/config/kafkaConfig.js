import {Kafka , Partitioners} from "kafkajs";
import dotenv from "dotenv"

dotenv.config()

class KafkaStore {
    constructor(){
        this.kafka = new Kafka({
            clientId: 'outcook-client',
            brokers: [`${process.env.broker}`],
        })
          
        
        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        })

        this.consumer = this.kafka.consumer({ groupId: 'email-share-group' })
    }
}

export default new KafkaStore();