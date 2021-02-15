import * as mongoose from 'mongoose';

const initializeMongo = async () => {
    await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    });
    return mongoose.connection;
};

let dbInstance: mongoose.Connection;
const getConnection = async () => {
    if (!dbInstance) {
        dbInstance = await initializeMongo();
    }
    return dbInstance;
};

export default getConnection;
