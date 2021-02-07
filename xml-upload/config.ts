import * as functionConf from './function.json'
import findObjInArrByKey from './utils/find'
import * as env from 'env-var';

export const error = {
    serverErrorCode: env.get('SERVER_ERROR_CODE').asInt() || 500
}

export const blobsFilterConf = [
    {
        blobName: findObjInArrByKey(functionConf.bindings, 'name', 'Haman').name,
        uniqueString: env.get('Haman_XML_Unique_String').required().asString()
    },
    {
        blobName: findObjInArrByKey(functionConf.bindings, 'name', 'IturRamotBlob').name,
        uniqueString: env.get('Itur_Ramot_XML_Unique_String').required().asString()
    },
    {
        blobName: findObjInArrByKey(functionConf.bindings, 'name', 'PsifasBlob').name,
        uniqueString: env.get('Psifas_XML_Unique_String').required().asString()
    }
]