import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { validate } from 'fast-xml-parser'
import HttpFunctionAppError from './utils/error'
import * as config from './config'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {

    try {

        if (!req.body) throw new HttpFunctionAppError(400, 'Missing request body');
        if (validate(req.body) !== true) throw new HttpFunctionAppError(400, 'XML structure incorrect');
        
        const xmlData: string = req.body;

        const blobUploadByFileType = (blobName: string, uniqueString: string) => {
            if (xmlData.includes(uniqueString)) {
                context.bindings[blobName] = xmlData;
                context.res = { status: 200, body: 'success' };
                return context.done();
            }
        }

        config.blobsFilterConf.forEach(blobFilter => blobUploadByFileType(blobFilter.blobName, blobFilter.uniqueString));

        throw new HttpFunctionAppError(400, 'Unknown XML structure');

    } catch (error) {
        context.res = {
            status: error.code || config.error.serverErrorCode,
            body: error.message
        }
        return context.done();
    }

};

export default httpTrigger;