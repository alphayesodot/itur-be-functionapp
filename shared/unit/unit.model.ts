import * as mongoose from 'mongoose';
import { IUnit } from './unit.interface';

const UnitSchema: mongoose.Schema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
});

const UnitModel = mongoose.model<IUnit & mongoose.Document>(process.env.UNITS_COLLECTION_NAME, UnitSchema);

export default UnitModel;
