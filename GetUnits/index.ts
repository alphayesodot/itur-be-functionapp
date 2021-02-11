import { AzureFunction, Context } from '@azure/functions';
import UnitModel from '../shared/unit/unit.model';
import { getResObject } from '../shared/services/error';
import getConnection from '../shared/services/db';

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
