import { AzureFunction, Context } from "@azure/functions";
import { MongoClient } from 'mongodb';
import { Malshab } from '../shared/malshab/malshab.interface';

const mongoUrl = `mongodb://${process.env.COSMOSDB_USER}:${process.env.COSMOSDB_PASSWORD}@${process.env.COSMOSDB_HOST}:${process.env.COSMOSDB_PORT}/${process.env.COSMOSDB_DBNAME}?ssl=true&replicaSet=globaldb`;
// Create a single static mongo client that every function invocation can use.
// TODO: make this static mongo client accesible to all of the function app.
const mongo = new MongoClient(mongoUrl, { useUnifiedTopology: true });
mongo.connect();

const updateMalshab: AzureFunction = async function (context: Context, malshabUpdateMessage: any): Promise<void> {
    try {
        context.log('Queue trigger function processed work item', malshabUpdateMessage);
        if(typeof(malshabUpdateMessage) === 'string' ) {
            throw new Error('The malshabUpdate message arrived as string instead of a JSON object, the object is probably invalid.');
        }
        const malshab = malshabUpdateMessage as Partial<Malshab>;

        if(!malshab.identityNumber) {
            throw new Error('The malshab object must have an "identityNumber" field.');
        }

        const db = mongo.db('radar');
        const collection = db.collection('malshab');

        const { grades, ...malshabWitoutGrades } = malshab

        await collection.updateOne(
            { 
                identityNumber: malshab.identityNumber
            },
            {
                $set: malshabWitoutGrades,
                $addToSet: { 
                    'grades': { $each: malshab.grades || [] },
                },
            },
            {
                upsert: true,
            },
        );

    } catch (err) {
        context.log.error(err + context.invocationId);
        // currently all errors will result in a retry, after 5 retries the message is transfered to a poison-queue.
        throw new Error(`Error in ${context.executionContext.functionName} function: ${JSON.stringify(err)}`);
    }
};

export default updateMalshab;
