import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import createUnitSchema from './joi';
import { IUnit } from '../shared/unit/unit.interface';
import UnitModel from '../shared/unit/unit.model';

const createUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = createUnitSchema.validate(req);
        if (error) {
            const resError = new ValidationError(error.message);
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const unit: IUnit | void = await UnitModel.create(req.body).catch((e) => {
            const resError = e instanceof FunctionError ? e : new DuplicateUnitNameError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        });

        context.res = getResObject(200, unit as IUnit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default createUnit;
