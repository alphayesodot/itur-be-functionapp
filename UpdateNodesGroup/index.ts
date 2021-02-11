import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/utils/db';
import reqIdValidation from '../shared/utils/reqValidation';
import FunctionError from '../shared/utils/error';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import { IUnit } from '../shared/interfaces/unit.interface';
import UnitModel from '../shared/models/unit.model';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import validateAndUpdate from './utils/nodesgroup.validation';

const updateNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error } = reqIdValidation.validate(req);
        if (error) {
            throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);
        }
        const nodesGroupId = context.bindingData.id;
        const newNodesGroupProperties = req.body;
        await getConnection();
        const existNodesGroup: INodesGroup = await NodesGroupModel.findById(nodesGroupId).exec();
        if (!existNodesGroup) {
            throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Nodes group not found');
        }
        const newNodesGroup: INodesGroup = existNodesGroup;
        const unit: IUnit = await UnitModel.findById(existNodesGroup.unit);
        if (!unit) {
            throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Nodes group unit not found');
        }
        const nodesGroup = validateAndUpdate(newNodesGroupProperties, unit, newNodesGroup);
        if (!nodesGroup) {
            throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Nodes group and unit owners are different');
        }
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, newNodesGroup);
        if (!updatedNodesGroup) {
            throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), 'Nodes group not update');
        }
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: process.env.SERVER_ERROR_CODE, body: error.message };
    }
};

export default updateNodesGroup;
