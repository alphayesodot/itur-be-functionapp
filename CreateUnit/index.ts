import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError, getResObject } from '../shared/services/error';
import { createUnitSchema } from '../shared/unit/unit.schema';
import { IUnit } from '../shared/unit/unit.interface';
import UnitModel from '../shared/unit/unit.model';

const createUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = createUnitSchema.validate(req);
        if (error) throw new ValidationError(error.message);

        const unit: IUnit = await UnitModel.create(req.body).catch((e) => {
            throw e instanceof FunctionError ? e : new DuplicateUnitNameError();
        });
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default createUnit;
