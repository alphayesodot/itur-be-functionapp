import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import getConnection from "../shared/utils/db";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    await getConnection();
    context.log('HTTP trigger function processed a request.');
    const name = (req.query.name || (req.body && req.body.name)) || 'may';
    const responseMessage = name
        ? "Hello, " + name + ". This HTTP triggered function executed successfully."
        : "This HTTP triggered function executed successfully. Pass a name in the query string or in the request body for a personalized response.";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;