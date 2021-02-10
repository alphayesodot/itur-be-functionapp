import * as mongoose from 'mongoose';
import { IUnit } from '../interfaces/unit.interface';

const UnitSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
});

const UnitModel = mongoose.model<IUnit & mongoose.Document>(process.env.UNITS_COLLECTION_NAME, UnitSchema);

export default UnitModel;