import * as mongoose from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError, UnitNotFoundError, getResObject } from '../shared/services/error';
import { updateUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';
import { IUnit } from '../shared/unit/unit.interface';

const updateUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = updateUnitSchema.validate(req);
        if (error) throw new ValidationError(error.message);

        const unitId: mongoose.Types.ObjectId = context.bindingData.id;
        const unit: IUnit = await UnitModel.findOneAndUpdate({ _id: unitId }, { $set: req.body })
            .exec()
            .catch((e) => {
                throw e instanceof FunctionError ? e : new DuplicateUnitNameError();
            });
        if (!unit) throw new UnitNotFoundError();

        const updatedUnit: IUnit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), updatedUnit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default updateUnitById;
