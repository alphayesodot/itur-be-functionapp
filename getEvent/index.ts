import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { getEventSchema } from '../shared/event/event.schema';
import FunctionError from '../shared/services/error';
import EventModel from '../shared/event/event.model';

const getResObject = (statusCode, errorMessage) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body: errorMessage };
};

const getEvent: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = getEventSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);
        const eventId = context.bindingData.id;
        const event = await EventModel.findById(eventId).exec();
        if (!event) throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE, 10), `Not found Event with id: ${eventId}`);
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), event);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default getEvent;
