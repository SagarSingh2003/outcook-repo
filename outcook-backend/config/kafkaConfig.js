import {Kafka , Partitioners} from "kafkajs";


class KafkaStore {
    constructor(){
        this.kafka = new Kafka({
            clientId: 'outcook-client',
            brokers: ['localhost:9092'],
        })
          
        
        this.producer = this.kafka.producer({
            createPartitioner: Partitioners.LegacyPartitioner
        })

        this.consumer = this.kafka.consumer({ groupId: 'email-share-group' })
    }
}

export default new KafkaStore();