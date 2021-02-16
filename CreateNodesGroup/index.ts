/* eslint-disable import/no-unresolved */
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import nodesGroupValidation from './utils/req.validation';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import getConnection from '../shared/utils/db';
import UnitModel from '../shared/models/unit.model';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import { IUnit } from '../shared/interfaces/unit.interface';

const createNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const nodesGroup = req.body;
        const { error } = nodesGroupValidation.validate(nodesGroup);
        if (error) {
            context.res = { status: process.env.VALIDATION_ERROR_CODE, body: error.message };
            context.done();
        }
        await getConnection();
        const unit: IUnit = await UnitModel.findById(nodesGroup.unit);
        if (!unit) {
            context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group unit not Found' };
            context.done();
        }
        if (
            nodesGroup.owners.every((owner) => unit.owners.includes(owner)) &&
            nodesGroup.interviewers.every((interviewer) => unit.interviewers.includes(interviewer)) &&
            nodesGroup.nodes.every((node) => unit.nodes.includes(node))
        ) {
            const createdNodesGropp: INodesGroup = await NodesGroupModel.create(nodesGroup);
            if (!createdNodesGropp) {
                context.res = { status: process.env.NOT_FOUND_CODE, body: 'Nodes group not create' };
                context.done();
            }

            context.res = { status: process.env.SUCCESS_CODE, body: createdNodesGropp };
        } else {
            context.res = {
                status: process.env.VALIDATION_ERROR_CODE,
                body: 'Unit and nodes group have different properties',
            };
        }
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default createNodesGroup;
