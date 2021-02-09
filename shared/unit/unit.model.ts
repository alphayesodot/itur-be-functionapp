import * as mongoose from 'mongoose';

import { IUnit } from './unit.interface';

const UnitSchema = new mongoose.Schema({
    name: String,
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
});

const UnitModel = mongoose.model<IUnit & mongoose.Document>(process.env.UNITS_COLLECTION_NAME, UnitSchema);

export default UnitModel;
