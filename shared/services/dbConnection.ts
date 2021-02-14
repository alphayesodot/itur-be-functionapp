import * as mongoose from 'mongoose';

const initializeMongo = async () => {
    console.log('Connecting to Mongo...');
    await mongoose
        .connect(
            `mongodb://${process.env.COSMOSDB_HOST}:${process.env.COSMOSDB_PORT}/${process.env.COSMOSDB_DBNAME}?ssl=true&replicaSet=globaldb&retryWrites=false`,
            {
                user: process.env.COSMOSDB_USER,
                pass: process.env.COSMOSDB_PASSWORD,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        )
        .then(() => console.log('Mongo connection established'))
        .catch((err) => console.log(err));
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
