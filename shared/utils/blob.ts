import { parse } from 'fast-xml-parser';

export const blobXMLToJSON = (blob: ArrayBuffer): Array<Object> => {
    const bufferAsString: string = Buffer.from(blob).toString();
    return parse(bufferAsString);
};

export default blobXMLToJSON;
