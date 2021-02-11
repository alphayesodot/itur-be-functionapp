import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import nodesGroupValidation from './utils/req.validation';
import FunctionError from '../shared/utils/error';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import getConnection from '../shared/utils/db';
import UnitModel from '../shared/models/unit.model';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import { IUnit } from '../shared/interfaces/unit.interface';

const createNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const nodesGroup = req.body;
        const { error } = nodesGroupValidation.validate(nodesGroup);
        if (error) throw new FunctionError(400, error.message);

        await getConnection();
        const unit: IUnit = await UnitModel.findById(nodesGroup.unit).catch((err) => {
            throw new FunctionError(404, err.message);
        });
        if (!unit) throw new FunctionError(404, 'Unit not Found');
        if (
            nodesGroup.owners.every((owner) => unit.owners.includes(owner)) &&
            nodesGroup.interviewers.every((interviewer) => unit.interviewers.includes(interviewer)) &&
            nodesGroup.nodes.every((node) => unit.nodes.includes(node))
        ) {
            const createdNodesGropp: INodesGroup = await NodesGroupModel.create(nodesGroup).catch((err) => {
                throw new FunctionError(400, err.message);
            });
            context.res = { status: process.env.SUCCESS_CODE, body: createdNodesGropp };
        } else {
            context.res = {
                status: process.env.VALIDATION_ERROR_CODE,
                body: 'Unit and nodes group have different properties',
            };
        }
    } catch (error) {
        context.res = { status: error.code, body: error.message };
    }
};

export default createNodesGroup;
