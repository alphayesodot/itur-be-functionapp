import htmlDecode from './decode';

export const getNestedPropertiesFromArray = (arr: object[], keySet: string[]) => {
    let nested: any = arr;
    keySet.forEach((key: string) => {
        nested = nested[key];
    });
    return nested;
};

export const parseIntIfExists = (v: any) => {
    return Number.isNaN(parseInt(v, 10)) ? undefined : parseInt(v, 10);
};

/**
 * Check if a property is from type Object (Array not included).
 */
export const isObject = (v: any) => {
    return Object.prototype.toString.call(v) === '[object Object]';
};

/**
 * Recursive removal of undefined, null and empty string properties from Object.
 * Also works with nested Objects and Arrays.
 */
export const cleanObj = (obj: any) => {
    const cleanedObj = obj;
    Object.keys(cleanedObj).forEach((key) => {
        if (typeof cleanedObj[key] === 'string') cleanedObj[key] = htmlDecode(cleanedObj[key]);
        if (cleanedObj[key] === null || cleanedObj[key] === undefined || cleanedObj[key] === '') delete cleanedObj[key];
        // eslint-disable-next-line no-use-before-define
        if (Array.isArray(cleanedObj[key])) cleanedObj[key] = cleanArr(cleanedObj[key]);
        if (isObject(cleanedObj[key])) cleanObj(cleanedObj[key]);
    });
    return cleanedObj;
};

/**
 * Recursive removal of undefined, null and empty string properties from Array.
 * Also works with nested Objects and Arrays.
 */
const cleanArr = (arr: any[]) => {
    return arr.filter((obj) => {
        return Object.keys(cleanObj(obj)).length !== 0 && obj != null;
    });
};
