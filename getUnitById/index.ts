import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import FunctionError from '../shared/services/error';
import { getUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const getResObject = (statusCode, errorMessage) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body: errorMessage };
};

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = getUnitSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);

        const unitId = context.bindingData.id;
        const unit = await UnitModel.findById(unitId).exec();
        if (!unit) throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), `Not found Unit with id: ${unitId}`);
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default httpTrigger;
