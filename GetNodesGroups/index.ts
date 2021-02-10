/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-expressions */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import nodesGroupModel from '../shared/models/nodesGroup.model';
import FunctionError from '../shared/utils/error';
import { groupNotFoundObj } from '../shared/utils/errorObjects';

const getNodesGroups: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    await getConnection();
    const nodesGroups: INodesGroup[] = await nodesGroupModel
        .find()
        .exec()
        .catch((err) => {
            throw new FunctionError(404, 'No nodes groups');
        });
    nodesGroups.length > 0 ? (context.res = { status: process.env.SUCCESS_CODE, body: nodesGroups }) : (context.res = groupNotFoundObj);
};

export default getNodesGroups;
