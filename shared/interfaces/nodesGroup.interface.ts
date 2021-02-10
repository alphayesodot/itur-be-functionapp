import { ObjectId } from 'mongoose';

export default interface INodesGroup {
    owners: [ObjectId];
    interviewers: [ObjectId];
    nodes: [string];
    unit: ObjectId;
}
