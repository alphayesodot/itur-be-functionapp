import * as mongoose from 'mongoose';

export default interface INodesGroup {
    owners: mongoose.Types.ObjectId[];
    interviewers: mongoose.Types.ObjectId[];
    nodes: string[];
    unit: mongoose.Types.ObjectId;
}
