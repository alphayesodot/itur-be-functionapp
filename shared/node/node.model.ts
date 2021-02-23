import { Schema, model, Document } from 'mongoose';
import { Node, NodeType } from './node.interface';

import config from '../../config';

const { collectionNames } = config.mongo;

const nodeSchema = new Schema({
    id: {
        type: String,
        required: true,
        index: true,
    },
    alias: {
        type: String,
        index: true,
    },
    type: {
        type: String,
        enum: NodeType,
        default: NodeType.Unknown,
    },
    nodeGroupId: {
        type: Schema.Types.ObjectId,
        ref: collectionNames.nodesGroup,
    },
});

export default model<Node & Document>(collectionNames.node, nodeSchema);
