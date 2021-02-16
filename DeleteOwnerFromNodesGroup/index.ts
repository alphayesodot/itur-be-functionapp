// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as mongoose from 'mongoose';
import reqValidation from '../shared/utils/owner.req.validation';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import NodesGroupModel from '../shared/models/nodesGroup.model';

const deleteOwnerFromNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqValidation.validate(req);
        if (error) {
            context.res = { status: process.env.VALIDATION_ERROR_CODE, body: error.message };
            context.done();
        }

        const nodesGroupId = context.bindingData.id;
        const { ownerId } = req.body;

        await getConnection();

        const nodesGroup: INodesGroup = await NodesGroupModel.findById(nodesGroupId).exec();
        if (!nodesGroup) context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not found' };

        if (!nodesGroup.owners.includes(ownerId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Owner not exist in nodes group' };
            context.done();
        }

        const owners: mongoose.Types.ObjectId[] = nodesGroup.owners.filter((owner) => owner != ownerId);
        if (owners.includes(ownerId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Owner not deleted' };
            context.done();
        }
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, owners, { new: true });
        if (!updatedNodesGroup) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not update' };
            context.done();
        }
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default deleteOwnerFromNodesGroup;
