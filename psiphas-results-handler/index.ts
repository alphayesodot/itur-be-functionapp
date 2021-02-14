// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context } from '@azure/functions';
import Malshab from '../shared/interfaces/malshab.interface';
import { getNestedPropertiesFromArray } from '../shared/utils';
import { psiphasXmlKeySet, resultObjToMalshab } from './config';

import blobXMLToJSON from './utils/index';

const blobTrigger: AzureFunction = async (context: Context, psiphasResultsBlob: any): Promise<void> => {
    const parsedXML: object[] = getNestedPropertiesFromArray(blobXMLToJSON(psiphasResultsBlob), psiphasXmlKeySet);
    const grades: Malshab[] = parsedXML.map((resultObj) => resultObjToMalshab(resultObj));

    context.bindings.malshabqueue = grades;

    //
    //  TODO: PARSE PDF AND SEND TO PDF-BLOB
    //
};

export default blobTrigger;
