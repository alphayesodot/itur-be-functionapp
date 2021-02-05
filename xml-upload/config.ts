import * as functionConf from './function.json'
import findObjBySimilarKeyValue from './utils/find'
import * as env from 'env-var';

export const blobsFilterConf = [
    {
        blobName: findObjBySimilarKeyValue(functionConf.bindings, 'name', 'Haman').name,
        uniqueString: env.get('HAMAN_XML_UNIQUE_STRING').required().asString()
    },
    {
        blobName: findObjBySimilarKeyValue(functionConf.bindings, 'name', 'IturRamot').name,
        uniqueString: env.get('ITUR_RAMOT_XML_UNIQUE_STRING').required().asString()
    },
    {
        blobName: findObjBySimilarKeyValue(functionConf.bindings, 'name', 'Psiphas').name,
        uniqueString: env.get('PSIPHAS_XML_UNIQUE_STRING').required().asString()
    }
]