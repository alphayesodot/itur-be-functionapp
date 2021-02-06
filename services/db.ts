import * as mongoose from 'mongoose';

let dbInstance: mongoose.Connection;
const getConnection = async () => {
    if (!dbInstance) {
        dbInstance = await initializeMongo();
    }
    return dbInstance;
};

const initializeMongo = async () => {
    console.log('Connecting to Mongo...');
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });
    console.log('Mongo connection established');
    return mongoose.connection;
};

export default getConnection;
