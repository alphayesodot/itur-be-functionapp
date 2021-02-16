// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import reqValidation from '../shared/utils/node.req.validaion';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import NodesGroupModel from '../shared/models/nodesGroup.model';

const deleteNodeFromNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqValidation.validate(req);
        if (error) {
            context.res = { status: process.env.VALIDATION_ERROR_CODE, body: error.message };
            context.done();
        }

        const nodesGroupId = context.bindingData.id;
        const { nodeId } = req.body;

        await getConnection();

        const existNodesGroup: INodesGroup = await NodesGroupModel.findById(nodesGroupId).exec();
        if (!existNodesGroup) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not found' };
            context.done();
        }

        if (!existNodesGroup.nodes.includes(nodeId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Node not exist in nodes group' };
            context.done();
        }
        const nodes: string[] = existNodesGroup.nodes.filter((node) => node !== nodeId);
        if (nodes.includes(nodeId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Node not deleted' };
            context.done();
        }
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, nodes, { new: true });
        if (!updatedNodesGroup) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not update' };
            context.done();
        }
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default deleteNodeFromNodesGroup;
