import * as mongoose from 'mongoose';
import MalshabInterface from '../shared/malshab.interface';
import { Permissionroles } from '../shared/types';
import rolePermissions from '../shared/config';

export const malshabFilter = (malshab: MalshabInterface & mongoose.Document<any>, allowedKeys: string[]): Partial<MalshabInterface> | undefined => {
    const filtered = Object.keys(malshab.toJSON())
        .filter((key) => allowedKeys.includes(key))
        .reduce((obj, key) => {
            // eslint-disable-next-line no-param-reassign
            obj[key] = malshab[key];
            return obj;
        }, {});
    if (Object.keys(filtered).length) return filtered;
    return undefined;
};

export const getPermissions = (role: number): string[] => {
    switch (role) {
        case Permissionroles.Interviewer: {
            return rolePermissions.interviewer;
        }
        case Permissionroles.check: {
            return rolePermissions.check;
        }
        default: {
            return [];
        }
    }
};
