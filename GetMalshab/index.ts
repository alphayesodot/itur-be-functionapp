import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import MalshabModel from '../shared/malshab.model';
import UserInterface from '../shared/user.interface';
import { getPermissions, malshabFilter } from '../getMalshabShared/utils';
import getConnection from '../shared/services/dbConnection';

const getMalshab: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('GET-MALSHAB: HTTP trigger function processed a request.');
    await getConnection();
    const user: UserInterface = req.body && req.body.user;
    const taz = req.body && req.body.taz;

    if (!user || !taz) {
        context.res = {
            status: 400,
            body: 'id or user is not spesfied',
        };
    } else {
        const malshab = await MalshabModel.find({ taz });
        const filtered = malshabFilter(malshab[0], getPermissions(user.role));
        context.res = {
            status: 200 /* Defaults to 200 */,
            body: filtered,
        };
    }
};

export default getMalshab;
