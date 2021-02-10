import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import FunctionError from '../shared/services/error';
import { createUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const getResObject = (statusCode: number, body: object | string) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body };
};

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = createUnitSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);

        const unit = await UnitModel.create(req.body).catch((e) => {
            throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), e.message);
        });
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default httpTrigger;
