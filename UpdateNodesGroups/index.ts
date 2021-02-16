import { AzureFunction, Context } from '@azure/functions';

const UpdateNodesGroups: AzureFunction = async function (context: Context, myQueueItem: any): Promise<void> {
    try {
        const { unitId, fieldName, removedItem } = myQueueItem;
        context.log('Queue trigger function processed work item', myQueueItem);
    } catch (e) {
        context.res = e;
    }
};

export default UpdateNodesGroups;
