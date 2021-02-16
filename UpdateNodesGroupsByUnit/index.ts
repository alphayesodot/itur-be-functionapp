import { AzureFunction, Context } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import updateNodesGroupsByUnitSchema from './joi';

const UpdateNodesGroupsByUnit: AzureFunction = async function (context: Context, queueMessage: any): Promise<void> {
    try {
        const { error }: ValidationResult = updateNodesGroupsByUnitSchema.validate(queueMessage);
        if (error) {
            context.log.error(`The nodesGroupsUpdate message that arrived is invalid. ${context.invocationId}`);
            context.done();
        }

        const connection = await getConnection();

        context.log('Queue trigger function processed work item ', queueMessage);

        const { unitId, fieldName, removedItem } = queueMessage;
    } catch (e) {
        context.log.error(e + context.invocationId);
    }
};

export default UpdateNodesGroupsByUnit;
