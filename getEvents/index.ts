import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import getConnection from '../shared/services/db';
import { getEventsSchema } from '../shared/event/event.schema';
import FunctionError from '../shared/services/error';

const getResObject = (statusCode, errorMessage) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body: errorMessage };
};

const httpTrigger: AzureFunction = async (context: Context, req: HttpRequest): Promise<void> => {
    try {
        await getConnection();

        const { error } = getEventsSchema.validate(req);
        if (error) throw new FunctionError(parseInt(process.env.VALIDATION_ERROR_CODE, 10), error.message);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default httpTrigger;
