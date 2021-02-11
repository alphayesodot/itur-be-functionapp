import * as mongoose from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError, UnitNotFoundError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import { updateUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';
import { IUnit } from '../shared/unit/unit.interface';

const updateUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = updateUnitSchema.validate(req);
        if (error) throw new ValidationError(error.message);

        const unitId: mongoose.Types.ObjectId = context.bindingData.id;
        const unit: IUnit = await UnitModel.findOneAndUpdate({ _id: unitId }, req.body, { new: true })
            .exec()
            .catch((e) => {
                throw e;
            });
        if (!unit) throw new UnitNotFoundError();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default updateUnitById;
