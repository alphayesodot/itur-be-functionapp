// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context } from '@azure/functions';
import * as config from './config';

import blobXMLToJSON from './utils/index';
import { getNestedPropertiesFromArray, cleanObj } from '../shared/utils/index';
import { parseRamotToMalshab, parseRamotToEvent } from './config';

import Malshab from '../shared/interfaces/malshab.interface';
import RamotUser from './config/ramotUser.interface';
import Event from '../shared/interfaces/event.interface';

const IturRamotHandler: AzureFunction = async (context: Context, xmlBlob: any): Promise<void> => {
    const parsedXML: object[] = blobXMLToJSON(xmlBlob);
    const ramotUsers: RamotUser[] = getNestedPropertiesFromArray(parsedXML, config.ramotXmlKeySet);

    const malshabUsers: Malshab[] = ramotUsers.map((user: RamotUser) => cleanObj(parseRamotToMalshab(user)));
    const events: Event[] = ramotUsers.map((user: RamotUser) => cleanObj(parseRamotToEvent(user)));

    context.bindings.malshabqueue = malshabUsers;
    context.bindings.eventsqueue = events;
};

export default IturRamotHandler;
