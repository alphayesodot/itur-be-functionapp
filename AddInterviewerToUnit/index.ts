import { Types } from 'mongoose';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { ValidationResult } from 'joi';
import getConnection from '../shared/services/db';
import { InterviewerAlreadyExistInUnitError, UnitNotFoundError, ValidationError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import addInterviewerToUnitSchema from './joi';
import UnitModel from '../shared/unit/unit.model';

const addInterviewerToUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        const { error }: ValidationResult = addInterviewerToUnitSchema.validate(req);
        if (error) {
            const resError = new ValidationError(error.message);
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        await getConnection();

        const { interviewer } = req.body;
        const unitId: Types.ObjectId = context.bindingData.id;
        const res = await UnitModel.updateOne({ _id: unitId }, { $addToSet: { interviewers: interviewer } })
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
            const resError = new InterviewerAlreadyExistInUnitError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const unit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(200, unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default addInterviewerToUnit;
