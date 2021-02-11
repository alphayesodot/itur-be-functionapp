import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { FunctionError, ValidationError, DuplicateUnitNameError, UnitNotFoundError, getResObject } from '../shared/services/error';
import { updateUnitSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const updateUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = updateUnitSchema.validate(req);
        if (error) throw new ValidationError();

        const unitId = context.bindingData.id;
        const unit = await UnitModel.findOneAndUpdate({ _id: unitId }, { $set: req.body })
            .exec()
            .catch((e) => {
                throw e instanceof FunctionError ? e : new DuplicateUnitNameError();
            });
        if (!unit) throw new UnitNotFoundError();

        const updatedUnit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), updatedUnit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default updateUnitById;
