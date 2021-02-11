import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import FunctionError from '../shared/utils/error';
import reqIdValidation from '../shared/utils/reqValidation';
import getConnection from '../shared/utils/db';
import NodesGroupModel from '../shared/models/nodesGroup.model';

const deleteNodesGroup: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const { error } = reqIdValidation.validate(req);
        if (error) {
            throw new FunctionError(400, 'Invalid id');
        }
        const { id } = context.bindingData;
        await getConnection();
        const nodesGroup = await NodesGroupModel.findByIdAndDelete(id).catch((err) => {
            throw new FunctionError(404, err.message);
        });
        context.res = { staus: process.env.SUCCESS_CODE, body: nodesGroup };
    } catch (error) {
        context.res = { status: error.code, body: error.message };
    }
};

export default deleteNodesGroup;
