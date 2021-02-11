import { AzureFunction, Context } from '@azure/functions';
import UnitModel from '../shared/unit/unit.model';
import { getResObject } from '../shared/services/error';
import getConnection from '../shared/services/db';
import { IUnit } from '../shared/unit/unit.interface';

const getUnits: AzureFunction = async (context: Context): Promise<void> => {
    try {
        await getConnection();
        const units: IUnit[] = await UnitModel.find().exec();
        context.res = getResObject(parseInt(process.env.SUCCESS_CODE, 10), units);
    } catch (e) {
        context.res = getResObject(e.code, e.message);
    }
};

export default getUnits;
