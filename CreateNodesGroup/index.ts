import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import nodesGroupValidation from './utils/req.validation';
import FunctionError from '../shared/utils/error';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import getConnection from '../shared/utils/db';
import { connectionFailedObj, unitNotFoundObj, unitDifferentFromNodesGroupObj } from '../shared/utils/errorObjects';
import UnitModel from '../shared/models/unit.model';
import INodesGroup from '../shared/interfaces/nodesGroup.interface';
import { IUnit } from '../shared/interfaces/unit.interface';

const createNodesGroup: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    const { nodesGroup } = req.body;
    const { error } = nodesGroupValidation.validate(nodesGroup);
    if (error) throw new FunctionError(400, 'Invalid node group');

    await getConnection()
        .then(async () => {
            const unit: IUnit = await UnitModel.findById(nodesGroup.unit).catch((err) => {
                throw new FunctionError(404, 'Unit not Found');
            });

            if (unit) {
                if (unit.owners === nodesGroup.owners && unit.interviewers === nodesGroup.interviewers && unit.nodes === nodesGroup.nodes) {
                    const createdNodesGropp: INodesGroup = await NodesGroupModel.create(nodesGroup).catch((err) => {
                        throw new FunctionError(400, err.message);
                    });
                    context.res = { status: process.env.SUCCESS_CODE, body: createdNodesGropp };
                } else {
                    context.res = unitDifferentFromNodesGroupObj;
                }
            } else {
                context.res = unitNotFoundObj;
            }
        })
        .catch((err) => {
            context.res = connectionFailedObj;
        });
};

export default createNodesGroup;
