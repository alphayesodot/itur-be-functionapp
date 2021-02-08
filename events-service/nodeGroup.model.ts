import * as mongoose from "mongoose";
import INodeGroup from './nodeGroup.interface'
const nodeGroupSchema = new mongoose.Schema({
    owners: [mongoose.Types.ObjectId],
    interviewers: [mongoose.Types.ObjectId],
    nodes: [String]
    });
    
const nodeGroupModel = mongoose.model<INodeGroup & mongoose.Document>(
  process.env.NODE_GROUP_COLLECTION_NAME || 'nodeGroup',
  nodeGroupSchema
);
    
    export default nodeGroupModel;