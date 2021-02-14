import Malshab from '../../shared/interfaces/malshab.interface';

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
