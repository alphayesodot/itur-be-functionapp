import { Types } from 'mongoose';
import { ValidationResult } from 'joi';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { OwnerNotFoundError, ValidationError, UnitNotFoundError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import removeOwnerFromUnitSchema from './joi';
import UnitModel from '../shared/unit/unit.model';

const removeOwnerFromUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = removeOwnerFromUnitSchema.validate(req);
        if (error) {
            const resError = new ValidationError(error.message);
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const { owner } = req.body;
        const unitId: Types.ObjectId = context.bindingData.id;
        const res = await UnitModel.updateOne({ _id: unitId }, { $pull: { owners: owner } })
            .exec()
            .catch((e) => {
                context.res = getResObject(e.code, e.message);
                context.done();
            });

        if (res.n === 0) {
            const resError = new UnitNotFoundError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        } else if (res.nModified === 0) {
            const resError = new OwnerNotFoundError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const unit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(200, unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default removeOwnerFromUnit;
