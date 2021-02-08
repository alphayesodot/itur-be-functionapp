import * as mongoose from 'mongoose';

export interface IEvent {
    nodeId: mongoose.Types.ObjectId;
    malshabId: mongoose.Types.ObjectId;
    time: Date;
    location: string;
    interviewersIds: mongoose.Types.ObjectId[];
    status: string;
    url: string;
}
