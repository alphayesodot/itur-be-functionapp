import * as mongoose from 'mongoose';
import { IEvent } from './event.interface';

const EventsSchema = new mongoose.Schema({
    nodeId: String,
    malshabId: String,
    time: Date,
    location: String,
    interviewersIds: [mongoose.Types.ObjectId],
    status: String,
    url: {
        type: String,
        required: false,
    },
});

const EventModel = mongoose.model<IEvent & mongoose.Document>(process.env.EVENT_COLLECTION_NAME || 'event', EventsSchema);
export default EventModel;
