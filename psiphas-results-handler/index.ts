// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context } from '@azure/functions';
import Malshab from '../shared/interfaces/malshab.interface';
import File from '../shared/interfaces/file.interface';
import { psiphasXmlKeySet, resultObjToMalshab, resultObjToPDF } from './config';
import { getNestedPropertiesFromArray } from '../shared/utils';
import blobXMLToJSON from './utils/index';

const blobTrigger: AzureFunction = async (context: Context, psiphasResultsBlob: any): Promise<void> => {
    const parsedXML: Array<any> = getNestedPropertiesFromArray(blobXMLToJSON(psiphasResultsBlob), psiphasXmlKeySet);

    const grades: Malshab[] = parsedXML.map((resultObj) => resultObjToMalshab(resultObj));
    context.bindings.malshabqueue = grades;

    // const documents: File[] = parsedXML.filter((resultObj) => resultObj.CANDIDATE_ID && resultObj.PDF).map((resultObj) => resultObjToPDF(resultObj));
    // context.bindings.fileuploadqueue = documents;
};

export default blobTrigger;
