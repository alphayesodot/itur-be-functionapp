import { AzureFunction, Context } from "@azure/functions";
import blobXMLToJSON from './utils/blobToJson';
import ramotXmlKeySet from './config';
const blobTrigger: AzureFunction = async function (context: Context, myBlob: any): Promise<void> {
    
    let usersArr: Array<Object> = blobXMLToJSON(myBlob)[ramotXmlKeySet[0]][ramotXmlKeySet[1]][ramotXmlKeySet[2]];
    // const usersArr: Array<Object> = blobXMLToJSON(context.bindings.myBlob)['itu:ITURTORAMOTDATA'].PSIFAS_EVENTS.PSIFASRECORD;
    // const usersArr: Array<Object> = blobXMLToJSON(context.bindings.myBlob)['itu:ITURTORAMOTDATA'].PSIFAS_EVENTS.PSIFASRECORD;
    context.bindings.outqueue = usersArr;
    context.done();
    
};

export default blobTrigger;
