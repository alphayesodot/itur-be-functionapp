import { AzureFunction, Context, HttpRequest } from '@azure/functions';
import MalshabModel from '../shared/malshab.model';
import UserInterface from '../shared/user.interface';
import { getPermissions, malshabFilter } from '../getMalshabShared/utils';
import getConnection from '../shared/services/dbConnection';

const getMalshabs: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('GET MALSHABS: HTTP trigger function processed a request.');
    await getConnection();
    const user: UserInterface = req.body && req.body.user;
    const malshabs = await MalshabModel.find({});
    const filtered = malshabs.map((malshab) => malshabFilter(malshab, getPermissions(user.role))).filter((m) => m !== undefined);
    context.res = {
        status: 200 /* Defaults to 200 */,
        body: filtered,
    };
};

export default getMalshabs;
