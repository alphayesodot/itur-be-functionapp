import { AzureFunction, Context } from "@azure/functions";
import * as mongoose from 'mongoose';
import  EventModel from './event.model'
import nodeGroupModel from './nodeGroup.model';
import {InvalidEventObject, NodeGroupNotFound, InterviewersNotFoud, CreateEventFailed, MongooseConnectionFailed} from './utils/error';
import {validEvent} from './utils/validate';

const queueTrigger: AzureFunction = async function (context: Context, myQueueItem: string): Promise<void> {
  const queueObj = JSON.parse(myQueueItem);
    const {error} = validEvent.validate(queueObj);
    if(error){
      throw new InvalidEventObject();
    }
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(async () => {
      const nodesGroups = await nodeGroupModel.find({nodes: queueObj.nodeId}).exec()
      .catch((error)=>{ throw new NodeGroupNotFound(queueObj.nodeId)});
      let interviewersList: Array<mongoose.ObjectId>=[];
      if(nodesGroups){
        nodesGroups.forEach(node => {
          if(!node.interviewers) throw new InterviewersNotFoud()
           node.interviewers.forEach((interviewerId: mongoose.ObjectId) => {
            interviewersList.push(interviewerId)
          });
        });
      }
      
      const eventObject = {...queueObj, interviewersIds: [...interviewersList]};
      await EventModel.create(eventObject).catch((error)=>{
        throw new CreateEventFailed(eventObject)});
    })
    .catch((err) => {
      throw new MongooseConnectionFailed();
    });    
};

export default queueTrigger;
