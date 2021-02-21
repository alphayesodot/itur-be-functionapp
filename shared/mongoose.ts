/* eslint-disable no-console */
import * as mongoose from 'mongoose';
import config from '../config';

let dbInstance: mongoose.Connection;

const connectToMongo = async () => {
    try {
        await mongoose.connect(config.mongo.uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        dbInstance = mongoose.connection;
    } catch {
        console.log('failed to connect to MongoDB...');
    }
};

dbInstance.on('connecting', () => {
    console.log('connecting to MongoDB...');
});
dbInstance.on('error', (error) => {
    console.error(`Error in MongoDb connection: ${error}`);
    mongoose.disconnect();
});
dbInstance.on('connected', () => {
    console.log('MongoDB connected!');
});
dbInstance.once('open', () => {
    console.log('MongoDB connection opened!');
});
dbInstance.on('reconnected', () => {
    console.log('MongoDB reconnected!');
});
dbInstance.on('disconnected', () => {
    console.log('MongoDB disconnected!');
    connectToMongo();
});

const getConnection = async () => {
    if (!dbInstance) {
        await connectToMongo();
    }
    return dbInstance;
};

export default getConnection;
