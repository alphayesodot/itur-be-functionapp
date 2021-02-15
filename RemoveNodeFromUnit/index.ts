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
        if (error) throw new ValidationError(error.message);

        const { node } = req.body;
        const unitId: Types.ObjectId = context.bindingData.id;
        const res = await UnitModel.updateOne({ _id: unitId }, { $pull: { nodes: node } })
            .exec()
            .catch((e) => {
                throw e;
            });
        if (res.n === 0) throw new UnitNotFoundError();
        if (res.nModified === 0) throw new NodeNotFoundError();

        const unit = await UnitModel.findById(unitId).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), unit);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default removeNodeFromUnit;
