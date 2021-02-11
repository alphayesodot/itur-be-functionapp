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
            throw new FunctionError(400, error.message);
        }
        const nodesGroupId = context.bindingData.id;
        const newNodesGroupProperties = req.body;
        await getConnection();
        const existNodesGroup: INodesGroup = await NodesGroupModel.findById(nodesGroupId)
            .exec()
            .catch((err) => {
                throw new FunctionError(404, err.message);
            });
        const newNodesGroup: INodesGroup = existNodesGroup;
        const unit: IUnit = await UnitModel.findById(existNodesGroup.unit).catch((err) => {
            throw new FunctionError(404, err.message);
        });
        const nodesGroup = validateAndUpdate(newNodesGroupProperties, unit, newNodesGroup);
        if (!nodesGroup) {
            throw new FunctionError(400, 'Nodes group and unit owners are different');
        }
        const updatedNodesGroup = await NodesGroupModel.findByIdAndUpdate(nodesGroupId, newNodesGroup).catch((err) => {
            throw new FunctionError(404, err.message);
        });
        context.res = { status: process.env.SUCCESS_CODE, body: updatedNodesGroup };
    } catch (error) {
        context.res = { status: error.code, body: error.message };
    }
};

export default updateNodesGroup;
