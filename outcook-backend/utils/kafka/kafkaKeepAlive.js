const keepAlive = async () => {
    try {
        // Send a simple heartbeat message
        await kafkaProducer.send({
            topic: 'heartbeat-topic',
            messages: [{ value: 'heartbeat' }],
        });
        console.log('Heartbeat sent');
    } catch (error) {
        console.error('Error sending heartbeat:', error);
    }
};


export const KeepKafkaAlive = () => {
    setInterval(keepAlive, 60000); 
}