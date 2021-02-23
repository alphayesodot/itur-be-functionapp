import { Schema, model, Document } from 'mongoose';
import { Role, User } from './user.interface';

import config from '../../config';

const { collectionNames } = config.mongo;

const userSchema = new Schema({
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
    role: {
        type: String,
        enum: Role,
        required: true,
    },
    unit: {
        type: Schema.Types.ObjectId,
        ref: collectionNames.unit,
    },
});

export default model<User & Document>(collectionNames.user, userSchema);
