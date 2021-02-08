import { ObjectId } from "mongoose";
import { Status } from "./utils/status.enum";

export interface IEvent {
    nodeId: string,
    malshabId: string,
    time: Date,
    location: string, 
    interviewersIds: Array<ObjectId>,
    status: Status,
    url?: string
 }


