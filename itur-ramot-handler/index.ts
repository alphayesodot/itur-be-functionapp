// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context } from '@azure/functions';
import * as config from './config/index';

import { blobXMLToJSON } from '../shared/utils/blob';
import { getNestedPropertiesFromArray, cleanObj } from '../shared/utils/index';

import Malshab from '../shared/malshab/malshab.interface';
import RamotUser from './config/ramotUser.interface';
import Event from '../shared/event/event.interface';

const IturRamotHandler: AzureFunction = async (context: Context, xmlBlob: any): Promise<void> => {
    const parsedXML: object[] = blobXMLToJSON(xmlBlob);
    const ramotUsers: RamotUser[] = getNestedPropertiesFromArray(parsedXML, config.ramotXmlKeySet);

    const malshabUsers: Malshab[] = ramotUsers.map((user: RamotUser) => cleanObj(config.parseRamotToMalshab(user)));
    const events: Event[] = ramotUsers.map((user: RamotUser) => cleanObj(config.parseRamotToEvent(user)));

    context.bindings.malshabqueue = malshabUsers;
    context.bindings.eventsqueue = events;
};

export default IturRamotHandler;
