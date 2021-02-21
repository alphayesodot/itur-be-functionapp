// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context } from '@azure/functions';
import Malshab from '../shared/interfaces/malshab.interface';
import File from '../shared/interfaces/file.interface';
import * as config from './config';

import blobXMLToJSON from './utils/index';
import { getNestedPropertiesFromArray } from '../shared/utils';
import { uploadFileToBlob } from '../shared/blob/blob.tools';

const ResultsHandler: AzureFunction = async (context: Context, psiphasResultsBlob: any): Promise<void> => {
    try {
        const parsedXML: Array<any> = getNestedPropertiesFromArray(blobXMLToJSON(psiphasResultsBlob), config.psiphasXmlKeySet);

        const grades: Malshab[] = parsedXML.map((resultObj) => config.resultObjToMalshab(resultObj));
        context.bindings.malshabqueue = grades;

        const documents: File[] = parsedXML
            .filter((resultObj) => resultObj.CANDIDATE_ID && resultObj.PDF)
            .map((resultObj) => config.resultObjToPDF(resultObj));
        documents.forEach((file: File) => uploadFileToBlob(process.env.PDF_BLOB_NAME, file));
    } catch (error) {
        context.res = {
            status: error.code || config.error.serverErrorCode,
            body: error.message,
        };
    }
};

export default ResultsHandler;
