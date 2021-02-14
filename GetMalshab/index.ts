import * as mongoose from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import MalshabModel from '../shared/malshab.model';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
  context.log('GET-MALSHAB: HTTP trigger function processed a request.');
  await mongoose.connect("mongodb://"+ process.env.COSMOSDB_HOST+":"+process.env.COSMOSDB_PORT+"/"+process.env.COSMOSDB_DBNAME+"?ssl=true&replicaSet=globaldb&retryWrites=false", {
    user: process.env.COSMOSDB_USER,
    pass: process.env.COSMOSDB_PASSWORD,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => context.log('Connected!'))
  .catch((err) => context.log(err));
  const taz = (req.query.taz || (req.body && req.body.taz));
  if (taz) {
    const malshab = await MalshabModel.find({ taz: taz });
    context.res = {
      // status: 200, /* Defaults to 200 */
      body: malshab[0],
    };
  }
  else {
    context.res = {
      status: 400, //check
      body: 'no id was spesfied',
    };
  }
};

export default httpTrigger;
