import { parse } from 'fast-xml-parser';
import File from '../interfaces/file.interface';
import getContainerClient from './blob.client';

export const blobXMLToJSON = (blob: ArrayBuffer): Array<Object> => {
    const bufferAsString: string = Buffer.from(blob).toString();
    return parse(bufferAsString);
};
export const uploadFileToBlob = (blobName: string, file: File): void => {
    const blobContainerClient = getContainerClient(blobName, file.filename);
    blobContainerClient.upload(Buffer.from(file.base64content, 'base64'), Buffer.from(file.base64content, 'base64').length);
};
export const uploadFileToBlobAsync = async (blobName: string, file: File): Promise<void> => {
    const blobContainerClient = getContainerClient(blobName, file.filename);
    await blobContainerClient.upload(Buffer.from(file.base64content, 'base64'), Buffer.from(file.base64content, 'base64').length);
};
