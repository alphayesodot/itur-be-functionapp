import { Schema, model, Document } from 'mongoose';
import Unit from './unit.interface';

import config from '../../config';

const { collectionNames } = config.mongo;

const unitSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
        index: true,
    },
});

export default model<Unit & Document>(collectionNames.unit, unitSchema);
