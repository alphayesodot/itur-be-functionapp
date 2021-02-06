import * as mongoose from 'mongoose';

import { IEvent } from './interface';

const EventSchema = new mongoose.Schema({
    nodeId: mongoose.Types.ObjectId,
    malshabId: mongoose.Types.ObjectId,
    time: Date,
    location: String,
    interviewersIds: [mongoose.Types.ObjectId],
    status: String,
    url: String,
});

const EventModel = mongoose.model<IEvent & mongoose.Document>(process.env.EVENT_COLLECTION_NAME, EventSchema);

export default EventModel;
