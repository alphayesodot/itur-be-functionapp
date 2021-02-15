import { Types } from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { NodeAlreadyExistInUnitError, UnitNotFoundError, ValidationError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import addNodeToUnitSchema from './joi';
import UnitModel from '../shared/unit/unit.model';

const addNodeToUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = addNodeToUnitSchema.validate(req);
        if (error) throw new ValidationError(error.message);

        const { node } = req.body;
        const unitId: Types.ObjectId = context.bindingData.id;
        const res = await UnitModel.updateOne({ _id: unitId }, { $addToSet: { nodes: node } })
            .exec()
            .catch((e) => {
                throw e;
            });
        if (res.n === 0) throw new UnitNotFoundError();
        if (res.nModified === 0) throw new NodeAlreadyExistInUnitError();

        const unit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default addNodeToUnit;
