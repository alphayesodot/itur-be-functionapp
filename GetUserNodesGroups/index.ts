/* eslint-disable no-unused-expressions */
/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import nodesGroupModel from '../shared/models/nodesGroup.model';
import FunctionError from '../shared/utils/error';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import reqValidation from './utils/req.validation';
import notFoundObj from '../shared/utils/errorObj';

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const { userId } = req.params;

    // const { error } = reqValidation.validate(userId);
    // if (error) {
    //     throw new FunctionError(400, 'Invalid id');
    // }
    await getConnection()
        .then(async () => {
            const userNodesGroups: INodesGroup[] = await nodesGroupModel
                .find({ owners: userId })
                .exec()
                .catch((err) => {
                    throw new FunctionError(404, 'No nodes groups');
                });

            userNodesGroups.length > 0 ? (context.res = { status: process.env.SUCCESS_CODE, body: userNodesGroups }) : (context.res = notFoundObj);
        })
        .catch((err) => {
            context.res = {
                status: process.env.SERVER_ERROR_CODE,
                body: 'Mongoose connection failed',
            };
        });
};

export default httpTrigger;
