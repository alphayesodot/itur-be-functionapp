import * as mongoose from 'mongoose';
import INodesGroup from '../interfaces/nodesGroup.interface';

const nodesGroupSchema = new mongoose.Schema({
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String],
    unit: mongoose.Types.ObjectId,
});

const NodesGroupModel = mongoose.model<INodesGroup & mongoose.Document>(process.env.NODES_GROUP_COLLECTION_NAME, nodesGroupSchema);

export default NodesGroupModel;
