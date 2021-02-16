// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as mongoose from 'mongoose';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import reqValidation from '../shared/utils/interviewer.req.validation';

const deleteInterviewerFromNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqValidation.validate(req);
        if (error) {
            context.res = { status: process.env.VALIDATION_ERROR_CODE, body: error.message };
            context.done();
        }

        const nodesGroupId = context.bindingData.id;
        const { interviewerId } = req.body;

        await getConnection();

        const nodesGroup: INodesGroup = await NodesGroupModel.findById(nodesGroupId).exec();
        if (!nodesGroup) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not found' };
            context.done();
        }
        if (!nodesGroup.interviewers.includes(interviewerId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Interviewer not exist in nodes group' };
            context.done();
        }
        const interviewers: mongoose.Types.ObjectId[] = nodesGroup.interviewers.filter((interviewer) => interviewer != interviewerId);
        if (interviewers.includes(interviewerId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Interviewer not deleted' };
            context.done();
        }
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, interviewers, { new: true });
        if (!updatedNodesGroup) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not update' };
            context.done();
        }
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default deleteInterviewerFromNodesGroup;
