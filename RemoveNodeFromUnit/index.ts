import { Types } from 'mongoose';
import { ValidationResult } from 'joi';
import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { NodeNotFoundError, ValidationError, UnitNotFoundError } from '../shared/services/error';
import getResObject from '../shared/services/getResObject';
import removeNodeFromUnitSchema from './joi';
import UnitModel from '../shared/unit/unit.model';

const removeNodeFromUnit: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error }: ValidationResult = removeNodeFromUnitSchema.validate(req);
        if (error) {
            const resError = new ValidationError(error.message);
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const { node } = req.body;
        const unitId: Types.ObjectId = context.bindingData.id;
        const res = await UnitModel.updateOne({ _id: unitId }, { $pull: { nodes: node } })
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
            const resError = new NodeNotFoundError();
            context.res = getResObject(resError.code, resError.message);
            context.done();
        }

        const unit = await UnitModel.findById(unitId).exec();
        context.bindings.UpdateNodeGroups = { unitId, fieldName: 'nodes', removedItem: node };
        context.res = getResObject(200, unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default removeNodeFromUnit;
