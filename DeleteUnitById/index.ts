import { Types } from 'mongoose';
import { ValidationResult } from 'joi';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { ValidationError, UnitNotFoundError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import deleteUnitByIdSchema from './joi';
import { IUnit } from '../shared/unit/unit.interface';
import UnitModel from '../shared/unit/unit.model';

const deleteUnitById: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = deleteUnitByIdSchema.validate(req);
        if (error) throw new ValidationError(error.message);

        const unitId: Types.ObjectId = context.bindingData.id;
        const unit: IUnit = await UnitModel.findByIdAndRemove(unitId).exec();
        if (!unit) throw new UnitNotFoundError();

        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default deleteUnitById;
