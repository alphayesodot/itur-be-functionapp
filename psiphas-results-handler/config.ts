import * as env from 'env-var';
import Malshab from '../shared/interfaces/malshab.interface';
import File from '../shared/interfaces/file.interface';

export const error = {
    serverErrorCode: env.get('SERVER_ERROR_CODE').asInt() || 500,
};

export const psiphasXmlKeySet = ['PSIPHAS_RESULTS', 'RECORD'];

export const resultObjToMalshab = (resultObj: any): Malshab => {
    const identityNumber = resultObj.CANDIDATE_ID;
    const objKeys = Object.keys(resultObj);
    const grades = objKeys
        .map((key) => {
            if (key && key.includes('EXAM_ID') && resultObj[key] && objKeys.includes(`GRADE_${key.slice(-1)}`) && resultObj[`GRADE_${key.slice(-1)}`])
                return {
                    examId: resultObj[key],
                    examName: resultObj[`EXAM_NAME_${key.slice(-1)}`],
                    grade: resultObj[`GRADE_${key.slice(-1)}`],
                };
            return undefined;
        })
        .filter((obj) => obj);
    return {
        identityNumber,
        grades,
    };
};

export const resultObjToPDF = (obj: any): File => {
    return { filename: `${obj.CANDIDATE_ID}-psiphas.pdf`, base64content: obj.PDF };
};
