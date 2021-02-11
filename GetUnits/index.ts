import { AzureFunction, Context } from '@azure/functions';
import UnitModel from '../shared/unit/unit.model';
import getConnection from '../shared/services/db';

const getResObject = (statusCode: number, body: object | string) => {
    return { status: statusCode ?? process.env.SERVER_ERROR_CODE, body };
};

const getUnits: AzureFunction = async (context: Context): Promise<void> => {
    try {
        await getConnection();
        const units = await UnitModel.find().exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), units);
    } catch (err) {
        context.res = getResObject(err.code, err.message);
    }
};

export default getUnits;
