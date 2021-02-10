import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import FunctionError from '../shared/utils/error';
import reqValidation from './utils/reqValidation';
import getConnection from '../shared/utils/db';
import { connectionFailedObj } from '../shared/utils/errorObjects';
import NodesGroupModel from '../shared/models/nodesGroup.model';

const deleteNodesGroup: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { error } = reqValidation.validate(req);
    if (error) {
        throw new FunctionError(400, 'Invalid id');
    }
    const { id } = context.bindingData;
    await getConnection()
        .then(async () => {
            const nodesGroup = await NodesGroupModel.findByIdAndDelete(id).catch((err) => {
                throw new FunctionError(404, 'Nodes group not found');
            });
            context.res = { staus: process.env.SUCCESS_CODE, body: nodesGroup };
        })
        .catch((error) => {
            context.res = connectionFailedObj;
        });
};

export default deleteNodesGroup;
