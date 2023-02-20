import 'dotenv/config';

const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;
const MONGO_CLUSTER = process.env.MONGO_CLUSTER;
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT;

const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: PORT
    }
};

export default config;
