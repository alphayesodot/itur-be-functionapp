import { Schema, model, Document } from 'mongoose';
import NodesGroup from './nodesGroup.interface';

import config from '../../config';

const { collectionNames } = config.mongo;

const nodesGroupSchema = new Schema({
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
    unitId: {
        type: String,
        required: true,
        index: true,
    },
    ownerIds: [
        {
            type: Schema.Types.ObjectId,
            ref: collectionNames.user,
        },
    ],
    interviewersIds: [
        {
            type: Schema.Types.ObjectId,
            ref: collectionNames.user,
        },
    ],
    nodeIds: [
        {
            type: Schema.Types.ObjectId,
            ref: collectionNames.node,
        },
    ],
});

export default model<NodesGroup & Document>(collectionNames.nodesGroup, nodesGroupSchema);
