import { AzureFunction, Context } from '@azure/functions';
import * as mongoose from 'mongoose';
import EventModel from './event.model';
import nodeGroupModel from './nodeGroup.model';
import ApplicationError from './utils/error';
import validEvent from './utils/validate';

const queueTrigger: AzureFunction = async (context: Context, myQueueItem: string): Promise<void> => {
    const queueObj = JSON.parse(myQueueItem);
    const { error } = validEvent.validate(queueObj);
    if (error) {
        throw new ApplicationError(400, 'Invalid event object');
    }
    await mongoose
        .connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(async () => {
            const nodesGroups = await nodeGroupModel
                .find({ nodes: queueObj.nodeId })
                .exec()
                .catch((err) => {
                    throw new ApplicationError(404, `There is no Node Group with ${queueObj.nodeId} id`);
                });
            const interviewersList: Array<mongoose.ObjectId> = [];
            if (nodesGroups) {
                nodesGroups.forEach((node) => {
                    if (!node.interviewers) throw new ApplicationError(404, 'There is no interviewers');
                    node.interviewers.forEach((interviewerId: mongoose.ObjectId) => {
                        interviewersList.push(interviewerId);
                    });
                });
            }

            const eventObject = { ...queueObj, interviewersIds: [...interviewersList] };
            await EventModel.create(eventObject).catch((err) => {
                throw new ApplicationError(500, `Failed to create eventObject: ${eventObject}`);
            });
        })
        .catch((err) => {
            throw new ApplicationError(500, 'Mongoose connection failed');
        });
};

export default queueTrigger;
