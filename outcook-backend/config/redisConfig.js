import Redis from "ioredis"


class redisClient{
    constructor(){
        this.redis = new Redis({
            host: '3.108.55.67',
            port: 6379,
        });  
    }
}
export default redisClient;