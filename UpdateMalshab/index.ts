import { AzureFunction, Context } from "@azure/functions";
import { MongoClient } from 'mongodb';
import { Malshab } from '../shared/malshab/malshab.interface';

const mongoUrl = `mongodb:// ${process.env.COSMOSDB_HOST}:${process.env.COSMOSDB_PORT}/${process.env.COSMOSDB_DBNAME}?ssl=true&replicaSet=globaldb`;
// Create a single static mongo client that every function invocation can use.
const mongo = new MongoClient(mongoUrl);

const updateMalshab: AzureFunction = async function (context: Context, malshabUpdateMessage: string): Promise<void> {
    try {
        await mongo.connect();

        // parse queue message
        context.log('Queue trigger function processed work item', malshabUpdateMessage);
        const malshab = JSON.parse(malshabUpdateMessage) as Partial<Malshab>;

        if(!malshab.identityNumber) {
            throw new Error('The malshab object must have an "identityNumber" field.');
        }

        // connect to mongo
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
                    'grades': { $each: malshab.grades },
                },
            },
            {
                upsert: true,
            },
        );

    } catch (err) {
        context.log.error(err + context.invocationId);
        // currently all errors will result in a retry
        throw new Error(`Error in ${context.executionContext.functionName} function: ${JSON.stringify(err)}`);
    }
};

export default updateMalshab;
