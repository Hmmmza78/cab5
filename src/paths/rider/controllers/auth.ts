import { Request, Response, NextFunction } from "express";
import RiderService from "../../../services/rider"
import { BadRequestError, NotFoundError, ValidationError } from '../../../helpers/apiError';
import { RiderDocument } from '../../../models/rider';


export const create = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body as RiderDocument;
        const old = await RiderService.findOne({ phone });
        if (old != null) {
            return next(new BadRequestError("This phone already exists"));
        }
        const data = await RiderService.create(req["validData"]);
        return res.json({ status: "success", data });
    } catch (error) {
        return next(new ValidationError("Invalid fields: " + JSON.stringify(error)));
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { phone } = req.body;
        const data = await RiderService.findOne({ phone });
        if (data == null) {
            return next(new NotFoundError("No records found"));
        }
        return res.json({ status: "success", data })
    } catch (error) {
        return next(new ValidationError("Invalid phone number or password", error));
    }
}
