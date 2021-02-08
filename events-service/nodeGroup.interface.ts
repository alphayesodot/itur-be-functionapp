import { ObjectId } from "mongoose";

export default interface INodeGroup {
    owners: [ObjectId],
    interviewers: [ObjectId],
    nodes: [string]
 }