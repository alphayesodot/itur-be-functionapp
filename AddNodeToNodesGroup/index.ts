// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as mongoose from 'mongoose';
import FunctionError from '../shared/utils/error';
import reqIdValidation from '../shared/utils/reqValidation';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import NodesGroupModel from '../shared/models/nodesGroup.model';

const addNodeToNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqIdValidation.validate(req);
        if (error) {
            throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);
        }

        const nodesGroupId = context.bindingData.id;
        const { nodeId } = req.body;

        if (!nodeId) throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Missing property: Node id');

        await getConnection();

        const nodesGroup: INodesGroup = await NodesGroupModel.findById(nodesGroupId).exec();
        if (!nodesGroup) {
            throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Nodes group not found');
        }

        const nodes: string[] = [...nodesGroup.nodes, nodeId];
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, nodes);
        if (!updatedNodesGroup) {
            throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Nodes group not update');
        }
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default addNodeToNodesGroup;
