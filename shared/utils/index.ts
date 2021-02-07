import { HTMLdecode } from './decode';

export const getNestedPropertiesFromArray = (arr: object[], keySet: string[]) => {
    let nested: any = arr;
    keySet.forEach((key: string) => {
        nested = nested[key];
    });
    return nested;
};

export const parseIntIfExists = (v: any) => {
    return isNaN(parseInt(v)) ? undefined : parseInt(v);
};

export const cleanObj = (obj: any) => {
    let cleanedObj = obj;
    for (let propName in cleanedObj) {
        if (typeof cleanedObj[propName] == 'string') cleanedObj[propName] = HTMLdecode(cleanedObj[propName]);
        if (cleanedObj[propName] === null || cleanedObj[propName] === undefined || cleanedObj[propName] === '') {
            delete cleanedObj[propName];
        };
        if (Array.isArray(cleanedObj[propName])) cleanedObj[propName] = cleanArr(cleanedObj[propName]);
    }
    return cleanedObj;
};

const cleanArr = (arr: any[]) => {
    return arr.filter((obj) => {
        return Object.keys(cleanObj(obj)).length !== 0 && obj != null;
    });
};
