import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import nodesGroupModel from '../shared/models/nodesGroup.model';
import FunctionError from '../shared/utils/error';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import reqIdValidation from '../shared/utils/reqValidation';

const getUserNodesGroups: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const userId = context.bindingData.id;
        const { error } = reqIdValidation.validate(req);
        if (error) {
            throw new FunctionError(400, 'Invalid id');
        }
        await getConnection();
        const userNodesGroups: INodesGroup[] = await nodesGroupModel
            .find({ owners: userId })
            .exec()
            .catch((err) => {
                throw new FunctionError(404, err.message);
            });
        context.res = { status: process.env.SUCCESS_CODE, body: userNodesGroups };
    } catch (error) {
        context.res = { status: error.code, body: error.message };
    }
};

export default getUserNodesGroups;
