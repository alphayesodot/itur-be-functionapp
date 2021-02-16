/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import nodesGroupModel from '../shared/models/nodesGroup.model';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import reqIdValidation from '../shared/utils/reqValidation';

const getUserNodesGroups: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const userId = context.bindingData.id;
        const { error } = reqIdValidation.validate(req);
        if (error) {
            context.res = { status: process.env.VALIDATION_ERROR_CODE, body: error.message };
            context.done();
        }
        await getConnection();
        const userNodesGroups: INodesGroup[] = await nodesGroupModel.find({ owners: userId }).exec();
        context.res = { status: process.env.SUCCESS_CODE, body: userNodesGroups };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default getUserNodesGroups;
