import { parse } from 'fast-xml-parser';

const blobXMLToJSON = (blob: ArrayBuffer): Array<Object> => {
    const bufferAsString: string = Buffer.from(blob).toString();
    return parse(bufferAsString);
};

export const parsePhoneNumber = (str: string | number): string => {
    return str.toString().startsWith('0') ? str.toString() : `0${str}`;
};

export default blobXMLToJSON;
