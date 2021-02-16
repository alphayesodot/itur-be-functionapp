import { AzureFunction, Context } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import updateNodesGroupsSchema from './joi';

const UpdateNodesGroups: AzureFunction = async function (context: Context, queueMessage: any): Promise<void> {
    try {
        const { error }: ValidationResult = updateNodesGroupsSchema.validate(queueMessage);
        if (error) {
            context.log.error(`The nodesGroupsUpdate message that arrived is invalid. ${context.invocationId}`);
            context.done();
        }

        await getConnection();

        context.log('Queue trigger function processed work item ', queueMessage);

        const { unitId, fieldName, removedItem } = queueMessage;
    } catch (e) {
        context.log.error(e + context.invocationId);
    }
};

export default UpdateNodesGroups;
