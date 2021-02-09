import * as mongoose from 'mongoose';
import INodesGroup from '../interfaces/nodesGroup.interface';

const nodesGroupSchema = new mongoose.Schema({
    name: String,
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
});

const nodesGroupModel = mongoose.model<INodesGroup & mongoose.Document>(process.env.NODE_GROUP_COLLECTION_NAME , nodesGroupSchema);

export default nodesGroupModel;