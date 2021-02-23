import { Schema, model, Document } from 'mongoose';

import { Event, EventStatus } from './event.interface';

import config from '../../config';

const { collectionNames } = config.mongo;

const eventSchema = new Schema({
    nodeId: {
        type: Schema.Types.ObjectId,
        ref: collectionNames.node,
    },
    malshabShort: {
        id: {
            type: Schema.Types.ObjectId,
            ref: collectionNames.malshab,
            required: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
    },
    time: {
        type: Date,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    interviewersIds: [
        {
            type: Schema.Types.ObjectId,
            ref: collectionNames.user,
        },
    ],
    status: {
        type: EventStatus,
        default: EventStatus.Created,
    },
    url: String,
    results: [
        {
            notes: String,
            filesUrls: [String],
        },
    ],
});

export default model<Event & Document>(collectionNames.event, eventSchema);
