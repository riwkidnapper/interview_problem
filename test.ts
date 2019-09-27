import * as redis from 'redis';

const num = 0;
const str = 'localhost';

const options: redis.ClientOpts = {
    host: 'localhost',
    port: 6379,
};

let client: redis.RedisClient = redis.createClient(num, str, options);

client.on('error', console.error);

client.on('ready', () => {
    console.log('redis is ready.');
});
