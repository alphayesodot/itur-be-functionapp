import * as mongoose from 'mongoose';
import { IEvent } from '../interfaces/event.interface';

const EventsSchema = new mongoose.Schema({
    nodeId: String,
    malshabId: String,
    time: Date,
    location: String,
    interviewersIds: {
        type: [mongoose.Types.ObjectId],
        required: false,
    },
    status: {
        type: String,
        required: false,
    },
    url: {
        type: String,
        required: false,
    },
});

const EventModel = mongoose.model<IEvent & mongoose.Document>(process.env.EVENT_COLLECTION_NAME, EventsSchema);
export default EventModel;
