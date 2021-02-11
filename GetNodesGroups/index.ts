/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import nodesGroupModel from '../shared/models/nodesGroup.model';
import FunctionError from '../shared/utils/error';

const getNodesGroups: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    await getConnection()
        .then(async () => {
            const nodesGroups: INodesGroup[] = await nodesGroupModel
                .find()
                .exec()
                .catch((err) => {
                    throw new FunctionError(404, 'No nodes groups');
                });
            context.res = { status: process.env.SUCCESS_CODE, body: nodesGroups };
        })
        .catch((error) => {
            context.res = { status: error.code, body: error.message };
        });
};

export default getNodesGroups;
