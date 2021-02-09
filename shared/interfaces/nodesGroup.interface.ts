import { ObjectId } from 'mongoose';

export default interface INodesGroup {
    name: [string];
    owners: [ObjectId];
    interviewers: [ObjectId];
    nodes: [string];
}
