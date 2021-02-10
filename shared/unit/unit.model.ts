import * as mongoose from 'mongoose';

import { IUnit } from './unit.interface';

const UnitSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
});

UnitSchema.post(
    'validate',
    async function (doc: IUnit, next: Function) {
        const units = await this.default.find({
            $or: [
                { owners: { $elemMatch: { $in: doc.owners } } },
                { interviewers: { $elemMatch: { $in: doc.interviewers } } },
                { nodes: { $elemMatch: { $in: doc.nodes } } },
            ],
        });
        if (units.length > 0) {
            next(new Error('Owners, interviewrs, and node must be unique'));
        }
        next();
    }.bind(this),
);

const UnitModel = mongoose.model<IUnit & mongoose.Document>(process.env.UNITS_COLLECTION_NAME, UnitSchema);

export default UnitModel;
