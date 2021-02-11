import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError, getResObject } from '../shared/services/error';
import { createUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const createUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = createUnitSchema.validate(req);
        if (error) throw new ValidationError();

        const unit = await UnitModel.create(req.body).catch((e) => {
            throw e instanceof FunctionError ? e : new DuplicateUnitNameError();
        });
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default createUnit;
