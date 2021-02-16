// eslint-disable-next-line import/no-unresolved
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import * as mongoose from 'mongoose';
import reqValidation from '../shared/utils/interviewer.req.validation';
import getConnection from '../shared/utils/db';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import { IUnit } from '../shared/interfaces/unit.interface';
import UnitModel from '../shared/models/unit.model';

const addInterviewerToNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqValidation.validate(req);
        if (error) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
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

        const unit: IUnit = await UnitModel.findById(nodesGroup.unit);
        if (!unit) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group unit not found' };
            context.done();
        }
        if (!unit.interviewers.includes(interviewerId)) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group unit not include this interviewer id' };
            context.done();
        }

        if (nodesGroup.interviewers.includes(interviewerId)) {
            context.res = { status: process.env.SERVER_ERROR_CODE, body: 'Interviewer already exist in nodes group' };
            context.done();
        }
        const interviewers: mongoose.Types.ObjectId[] = [...nodesGroup.interviewers, interviewerId];
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, interviewers, { new: true });
        if (!updatedNodesGroup) context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not update' };
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default addInterviewerToNodesGroup;
