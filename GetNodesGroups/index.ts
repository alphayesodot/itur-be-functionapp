/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import nodesGroupModel from '../shared/models/nodesGroup.model';

const getNodesGroups: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();
        const nodesGroups: INodesGroup[] = await nodesGroupModel.find().exec();
        context.res = { status: process.env.SUCCESS_CODE, body: nodesGroups };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default getNodesGroups;
