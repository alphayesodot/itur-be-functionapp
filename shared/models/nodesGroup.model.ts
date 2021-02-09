import * as mongoose from 'mongoose';
import INodesGroup from '../interfaces/nodesGroup.interface';

const nodeGroupSchema = new mongoose.Schema({
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
});

const nodeGroupModel = mongoose.model<INodesGroup & mongoose.Document>(process.env.NODE_GROUP_COLLECTION_NAME, nodeGroupSchema);

export default nodeGroupModel;