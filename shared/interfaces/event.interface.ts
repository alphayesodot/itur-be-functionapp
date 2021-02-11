import * as mongoose from 'mongoose';
import Status from '../../events-service/utils/status.enum';

export interface IEvent {
    nodeId: string;
    malshabId: string;
    time: Date;
    location: string;
    interviewersIds: Array<mongoose.Types.ObjectId>;
    status: Status;
    url?: string;
}
