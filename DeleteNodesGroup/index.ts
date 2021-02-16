/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import reqIdValidation from '../shared/utils/reqValidation';
import getConnection from '../shared/utils/db';
import NodesGroupModel from '../shared/models/nodesGroup.model';

const deleteNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqIdValidation.validate(req);
        if (error) {
            context.res = { status: process.env.VALIDATION_ERROR_CODE, body: error.message };
            context.done();
        }
        const { id } = context.bindingData;
        await getConnection();
        const nodesGroup = await NodesGroupModel.findByIdAndDelete(id);
        if (!nodesGroup) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not found' };
            context.done();
        }
        context.res = { staus: process.env.SUCCESS_CODE, body: nodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default deleteNodesGroup;
