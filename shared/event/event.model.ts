import * as mongoose from 'mongoose';

import { IEvent, Status } from './event.interface';

const EventSchema = new mongoose.Schema({
    nodeId: String,
    malshabId: String,
    time: Date,
    location: String,
    interviewersIds: [mongoose.Types.ObjectId],
    status: {
        type: String,
        enum: Status,
    },
    url: String,
});

const EventModel = mongoose.model<IEvent & mongoose.Document>(process.env.EVENT_COLLECTION_NAME, EventSchema);

export default EventModel;
