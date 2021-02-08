import * as Joi from "joi";
import { Status } from "./status.enum";

export const validEvent = Joi.object({        
        nodeId: Joi.string().required() ,
        malshabId: Joi.string().required(),
        time: Joi.date().required(),
        location: Joi.string().required(), 
        status: Joi.string().required().valid(Status.Status1, Status.Status2),//TODO: insert statuses
        url: Joi.string()
});
