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

        const documentedCandidates: Array<any> = parsedXML.filter((resultObj) => resultObj.CANDIDATE_ID && resultObj.PDF);
        const documents: File[] = documentedCandidates.map((resultObj) => config.resultObjToPDF(resultObj));
        const malshabDocumentsLinks: Malshab[] = documentedCandidates.map((resultObj) => config.resultObjToMalshabPdfInfo(resultObj));

        documents.forEach((file: File) => uploadFileToBlob(process.env.PDF_BLOB_NAME, file));
        context.bindings.malshabqueue = grades.concat(malshabDocumentsLinks);
    } catch (error) {
        context.res = {
            status: error.code || config.error.serverErrorCode,
            body: error.message,
        };
    }
};

export default ResultsHandler;
