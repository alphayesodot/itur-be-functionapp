import { AzureFunction, Context } from '@azure/functions';
import * as mongoose from 'mongoose';
import getConnection from '../shared/utils/db';
import EventModel from '../shared/models/event.model';
import NodesGroupModel from '../shared/models/nodesGroup.model';
import ApplicationError from './utils/error';
import validEvent from './utils/validate';
import { IEvent } from '../shared/interfaces/event.interface';

const createEvent: AzureFunction = async (context: Context, myQueueItem: IEvent): Promise<void> => {
    try {
        const queueObj = myQueueItem;
        const { error } = validEvent.validate(queueObj);
        if (error) {
            throw new ApplicationError(error.message);
        }
        await getConnection();
        const nodesGroups = await NodesGroupModel.find({ nodes: queueObj.nodeId })
            .exec()
            .catch((err) => {
                throw new ApplicationError(err.message);
            });
        const interviewersList: Array<mongoose.Types.ObjectId> = [];
        if (nodesGroups) {
            nodesGroups.forEach((node) => {
                if (!node.interviewers) throw new ApplicationError('There is no interviewers');
                node.interviewers.forEach((interviewerId: mongoose.Types.ObjectId) => {
                    interviewersList.push(interviewerId);
                });
            });
        }

        const eventObject = { ...queueObj, interviewersIds: [...interviewersList] };
      const createdEvent = await EventModel.create(eventObject);
      if(!createdEvent) throw new ApplicationError('Failed to create event');
    } catch (error) {
        throw new ApplicationError(error.message);
    }
};

export default createEvent;
