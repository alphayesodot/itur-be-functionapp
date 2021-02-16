import { AzureFunction, Context } from '@azure/functions';

const UpdateNodeGroups: AzureFunction = async function (context: Context, myQueueItem: any): Promise<void> {
    context.log('Queue trigger function processed work item', myQueueItem);
};

export default UpdateNodeGroups;
