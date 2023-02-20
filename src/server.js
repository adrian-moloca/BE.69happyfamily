import express from 'express';
import config from './config/config.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import mainRoutes from './routes/mainRoutes.js';

mongoose
    .connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB.');
    })
    .catch((err) => {
        console.log('Connection failed. ' + err)
    })

//Variable for app using express functionalities
const router = express();

router.use(express.json());

//Express functionality for cors (safe) connection and authentification
router.use(cors({ origin: true, credentials: true }));

//Express functionality for increase the json data parsed via body request
router.use(bodyParser.json({ limit: '500mb' }));

//Express functionality for increase the json data parsed via urlencoded request
router.use(bodyParser.urlencoded({ limit: '500mb', extended: true }));

//Express functionality for parsing data as a json format
router.use(bodyParser.json());

router.use("/teaching-be/api", mainRoutes);

//Express functionality for port used on listening for requests
router.listen(process.env.PORT || config.server.port, () => {
    console.log(`Server is listening on port ${config.server.port}`);
});

