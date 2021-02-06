import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../services/db';
import { getEventSchema } from './validation.schema';
import { FunctionError } from './error';
import EventModel from './model';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        await getConnection();

        const { error } = getEventSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE), error.message);

        const eventId = context.bindingData.id;
        const event = await EventModel.findById(eventId).exec();
        if (!event) throw new FunctionError(parseInt(process.env.NOT_FOUND_CODE), `Not found Event with id: ${eventId}`);
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE), event);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

const getResObject = (statusCode, errorMessage) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body: errorMessage };
};

export default httpTrigger;
