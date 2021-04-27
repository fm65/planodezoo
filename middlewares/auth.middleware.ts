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

export const hasRole =  (role: number) => {

	return async function hasRole(req: Request, res: Response, next: NextFunction): Promise<void>{

		const bearerHeader = req.headers['authorization'];
		if (bearerHeader) {
			const bearer = bearerHeader.split(' ');
			const bearerToken = bearer[1];

			const {User, Session} = await SequelizeManager.getInstance();

			const session = await Session.findOne({
	        	where: {token: bearerToken}
	        });
			if (session === null) {
				res.status(401).json();
				return;
			}
	        const user = await User.findOne({
	            	where: { id: session.UserId }
		    });
			if (user === null) {
				res.status(401).json();
				return;
			}
			if(!user || (user.role != role)) {
				res.status(401).json();
				return;
			}
			next();
		} else {
			res.sendStatus(403);
			return;
		}
	}
}
