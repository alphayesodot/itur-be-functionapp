import * as mongoose from 'mongoose';

export enum Status {
    status1 = 'status1',
    status2 = 'status2',
}
export interface IEvent {
    nodeId: string;
    malshabId: string;
    time: Date;
    location: string;
    interviewersIds: mongoose.Types.ObjectId[];
    status: Status;
    url?: string;
}
