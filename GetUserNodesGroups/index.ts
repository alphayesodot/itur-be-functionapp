/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import nodesGroupModel from '../shared/models/nodesGroup.model';
import FunctionError from '../shared/utils/error';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import reqValidation from './utils/req.validation';
import {groupNotFoundObj} from '../shared/utils/errorObjects';

const getUserNodesGroups: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const { userId } = context.bindingData;
    const { error } = reqValidation.validate(req);
    if (error) {
        throw new FunctionError(400, 'Invalid id');
    }
    await getConnection()
        .then(async () => {
            const userNodesGroups: INodesGroup[] = await nodesGroupModel
                .find({ owners: userId })
                .exec()
                .catch((err) => {
                    throw new FunctionError(404, 'No nodes groups');
                });

            userNodesGroups.length > 0 ? (context.res = { status: process.env.SUCCESS_CODE, body: userNodesGroups }) : (context.res = groupNotFoundObj);
        })
        .catch((err) => {
            context.res = {
                status: process.env.SERVER_ERROR_CODE,
                body: 'Mongoose connection failed',
            };
        });
};

export default getUserNodesGroups;
