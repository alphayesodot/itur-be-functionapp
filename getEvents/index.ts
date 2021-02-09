import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import { startOfDay, endOfDay } from 'date-fns';
import getConnection from '../shared/services/db';
import { getEventsSchema } from '../shared/event/event.schema';
import FunctionError from '../shared/services/error';
import EventModel from '../shared/event/event.model';

const getResObject = (statusCode, errorMessage) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body: errorMessage };
};

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = getEventsSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);

        const { interviewerId, date } = req.body;
        const events = await EventModel.find({
            time: {
                $gte: startOfDay(new Date(date)),
                $lte: endOfDay(new Date(date)),
            },
            // check that interviewersIds contain interviewerId
            interviewersIds: interviewerId,
        }).exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), events);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default httpTrigger;
