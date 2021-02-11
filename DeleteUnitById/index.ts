import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { ValidationError, UnitNotFoundError, getResObject } from '../shared/services/error';
import { deleteUnitByIdSchema } from '../shared/unit/unit.schema';
import UnitModel from '../shared/unit/unit.model';

const deleteUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = deleteUnitByIdSchema.validate(req);
        if (error) throw new ValidationError();

        const unitId = context.bindingData.id;
        const unit = await UnitModel.findByIdAndRemove(unitId).exec();
        if (!unit) throw new UnitNotFoundError();

        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default deleteUnitById;
