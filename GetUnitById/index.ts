import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { ValidationError, UnitNotFoundError, getResObject } from '../shared/services/error';
import { getUnitByIdSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const getUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = getUnitByIdSchema.validate(req);
        if (error) throw new ValidationError();

        const unitId = context.bindingData.id;
        const unit = await UnitModel.findById(unitId).exec();
        if (!unit) throw new UnitNotFoundError();

        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default getUnitById;
