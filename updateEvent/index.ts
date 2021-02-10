import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { updateEventSchema } from '../shared/event/event.schema';
import FunctionError from '../shared/services/error';
import EventModel from '../shared/event/event.model';
import { IEvent } from '../shared/event/event.interface';

const getResObject = (statusCode: Number | undefined, errorMessage: any) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body: errorMessage };
};

const updateEvent: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = updateEventSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);

        const eventId = context.bindingData.id;
        const event: Partial<IEvent> = {
            ...req.body,
        };

        const updatedEvent = await EventModel.findOneAndUpdate({ _id: eventId }, event, { new: true, rawResult: true }).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), updatedEvent);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default updateEvent;
