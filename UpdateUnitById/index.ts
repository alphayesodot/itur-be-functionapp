import { Types } from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError, UnitNotFoundError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import updateUnitSchema from './joi';
import UnitModel from '../shared/unit/unit.model';
import { IUnit } from '../shared/unit/unit.interface';

const updateUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error }: ValidationResult = updateUnitSchema.validate(req);
        if (error) {
            const resError = new ValidationError(error.message);
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        await getConnection();

        const unitId: Types.ObjectId = context.bindingData.id;
        const unit: IUnit | void = await UnitModel.findOneAndUpdate(unitId, req.body, { new: true })
            .exec()
            .catch((e) => {
                const resError = e instanceof FunctionError ? e : new DuplicateUnitNameError();
                context.res = getResObject(resError.code, resError.message);
                context.done();
            });

        if (!unit) {
            const resError = new UnitNotFoundError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        context.res = getResObject(200, unit as IUnit);
    } catch (e) {
        context.res = getResObject(e.status, e.message);
    }
};

export default updateUnitById;
