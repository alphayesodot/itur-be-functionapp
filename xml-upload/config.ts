import * as env from 'env-var';
import findObjInArrByKey from './utils/find';
import * as functionConf from './function.json';

export const error = {
    serverErrorCode: env.get('SERVER_ERROR_CODE').asInt() || 500,
};

export const blobsFilterConf = [
    {
        blobName: findObjInArrByKey(functionConf.bindings, 'name', 'Haman').name,
        uniqueString: env.get('HAMAN_XML_UNIQUE_STRING').required().asString(),
    },
    {
        blobName: findObjInArrByKey(functionConf.bindings, 'name', 'IturRamot').name,
        uniqueString: env.get('ITUR_RAMOT_XML_UNIQUE_STRING').required().asString(),
    },
    {
        blobName: findObjInArrByKey(functionConf.bindings, 'name', 'Psifas').name,
        uniqueString: env.get('PSIFAS_XML_UNIQUE_STRING').required().asString(),
    },
];
