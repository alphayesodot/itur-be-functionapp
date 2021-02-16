import { Types } from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { OwnerAlreadyExistInUnitError, UnitNotFoundError, ValidationError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import addOwnerToUnitSchema from './joi';
import UnitModel from '../shared/unit/unit.model';

const addOwnerToUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = addOwnerToUnitSchema.validate(req);
        if (error) {
            const resError = new ValidationError(error.message);
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const { owner } = req.body;
        const unitId: Types.ObjectId = context.bindingData.id;
        const res = await UnitModel.updateOne({ _id: unitId }, { $addToSet: { owners: owner } })
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
            const resError = new OwnerAlreadyExistInUnitError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const unit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(200, unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default addOwnerToUnit;
