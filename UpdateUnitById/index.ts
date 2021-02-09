import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import FunctionError from '../shared/services/error';
import { updateUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const getResObject = (statusCode: number, body: object | string) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body };
};

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = updateUnitSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);

        const unitId = context.bindingData.id;
        const unit = await UnitModel.findOneAndUpdate({ _id: unitId }, { $set: req.body }, { upsert: true })
            .exec()
            .catch(() => {
                throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), "Unit's name is already exist");
            });
        if (!unit) throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), `Not found Unit with id: ${unitId}`);

        const updatedUnit = await UnitModel.find({ _id: unitId }).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), updatedUnit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default httpTrigger;
