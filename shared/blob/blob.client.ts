import { BlobServiceClient } from '@azure/storage-blob';

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AzureWebJobsStorage);

const getContainerClient = (blobName: string, fileName: string) => {
    const containerClient = blobServiceClient.getContainerClient(blobName);
    return containerClient.getBlockBlobClient(fileName);
};

export default getContainerClient;
