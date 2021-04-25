import { Request, Response, NextFunction } from "express";
import {SequelizeManager} from "../models";

export async function isAuth(req: Request, res: Response, next: NextFunction): Promise<void> {		
	
	const bearerHeader = req.headers['authorization'];
	if (bearerHeader) {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];

		const {Session} = await SequelizeManager.getInstance();
		const session = Session.findOne({
        	where: {token: bearerToken}
        }).then((sess) => {
        	if (!sess) {
        		res.status(401).json();
        		return;
        	}
        	
        }).catch((err) => {
			console.log(err);
			res.status(401).json();
			return;
		});
		next();
	} else {
		res.sendStatus(403);
		return;
	}
}

