import Redis from "ioredis"


class redisClient{
    constructor(){
        this.redis = new Redis({
            host: '127.0.0.1',
            port: 6379,
        });  
    }
}
export default redisClient;