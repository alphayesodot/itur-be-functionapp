import * as mongoose from 'mongoose';

export interface IUnit {
    name: string;
    owners: mongoose.Types.ObjectId[];
    interviewers: mongoose.Types.ObjectId[];
    nodes: string[];
}