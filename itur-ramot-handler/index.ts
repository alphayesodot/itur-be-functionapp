import { AzureFunction, Context } from '@azure/functions';
import blobXMLToJSON from './utils/blobToJson';
import * as config from './config/config';
import { getNestedPropertiesFromArray, cleanObj } from '../shared/utils/index';
import { Malshab } from '../shared/malshab/malshab.interface';
import RamotUser from './config/ramotUser.interface';
import { parseRamotToMalshab } from './config/config';

const blobTrigger: AzureFunction = async function (context: Context, xmlBlob: any): Promise<void> {
    const parsedXML: object[] = blobXMLToJSON(xmlBlob);

    const ramotUsers: RamotUser[] = getNestedPropertiesFromArray(parsedXML, config.ramotXmlKeySet);
    const malshabUsers: Malshab[] = ramotUsers.map((user: RamotUser) => cleanObj(parseRamotToMalshab(user)));

    context.bindings.malshabqueue = malshabUsers;
};

export default blobTrigger;
