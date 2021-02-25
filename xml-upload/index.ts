// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as multipart from 'parse-multipart';
import { validate } from 'fast-xml-parser';
import HttpFunctionAppError from './utils/error';
import * as config from './config';
import { bufferToString } from '../shared/utils/index';

const XmlUpload: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        if (!req.body) throw new HttpFunctionAppError(400, 'Missing request body');
        if (!req.query?.filename) throw new HttpFunctionAppError(400, 'Filename is not defined');
        if (!req.query?.filename.endsWith('.xml')) throw new HttpFunctionAppError(400, 'This API Endpoint only supports .xml file type upload');

        const parts = multipart.Parse(Buffer.from(req.body), multipart.getBoundary(req.headers['content-type']));

        const xmlData: string = bufferToString(parts[0].data);
        if (validate(xmlData) !== true) throw new HttpFunctionAppError(400, 'XML structure incorrect');

        const blobUploadByFileType = (blobName: string, uniqueString: string) => {
            if (xmlData.includes(uniqueString)) {
                context.bindings[blobName] = parts[0].data;
                context.res = { status: 200, body: 'success' };
                context.done();
            }
            return false;
        };

        config.blobsFilterConf.forEach((blobFilter) => blobUploadByFileType(blobFilter.blobName, blobFilter.uniqueString));

        throw new HttpFunctionAppError(400, 'Unknown XML structure');
    } catch (error) {
        context.res = {
            status: error.code || config.error.serverErrorCode,
            body: error.message,
        };
    }
};

export default XmlUpload;
