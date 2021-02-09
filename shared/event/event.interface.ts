import * as mongoose from 'mongoose';

export interface IEvent {
    nodeId: string;
    malshabId: string;
    time: Date;
    location: string;
    interviewersIds: mongoose.Types.ObjectId[];
    status: string;
    url?: string;
}
