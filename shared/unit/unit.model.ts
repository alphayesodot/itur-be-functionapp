import * as mongoose from 'mongoose';
import { IUnit } from './unit.interface';
import { UniqueUnitFieldsValidationError } from '../services/error';

const UnitSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
});

const validateUnit = async (model: any, doc: IUnit, unitId?: mongoose.Types.ObjectId): Promise<void> => {
    const units: IUnit[] = await model.find({
        $and: [
            {
                $or: [
                    { owners: { $elemMatch: { $in: doc.owners || [] } } },
                    { interviewers: { $elemMatch: { $in: doc.interviewers || [] } } },
                    { nodes: { $elemMatch: { $in: doc.nodes || [] } } },
                ],
            },
            { _id: { $ne: unitId } },
        ],
    });
    if (units.length > 0) {
        throw new UniqueUnitFieldsValidationError();
    }
};

UnitSchema.pre(['findOneAndUpdate', 'updateOne'], async function (next: Function): Promise<void> {
    try {
        const { model } = this as any;
        const doc = (this as any)._update.$addToSet || (this as any)._update;
        const unitId = (this as any)._conditions._id;
        await validateUnit(model, doc, unitId);
        next();
    } catch (e) {
        next(e);
    }
});

UnitSchema.post(
    'validate',
    async function (doc: IUnit, next: Function): Promise<void> {
        try {
            const model = this.default;
            await validateUnit(model, doc);
            next();
        } catch (e) {
            next(e);
        }
    }.bind(this),
);

const UnitModel = mongoose.model<IUnit & mongoose.Document>(process.env.UNITS_COLLECTION_NAME, UnitSchema);

export default UnitModel;
