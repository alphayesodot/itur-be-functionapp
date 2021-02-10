import * as mongoose from 'mongoose';

export enum Status {
    Status1 = 'AcceptedValue1',
    Status2 = 'AcceptedValue2',
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
