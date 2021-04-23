import express from "express";
import {check, validationResult} from 'express-validator';
import { TicketController } from "../controllers/ticket.controller";
import {hash} from "bcrypt";
import { AuthController } from "../controllers/auth.controller";

const ticketRouter = express.Router();

ticketRouter.post("/write/:id", 
    // check('name').isLength({min: 3}).isAlpha(),
    // check('price').isNumeric(),
    // // check('validation').isDate(), //format 2021-12-31 18:00:00
    
    // const errors = validationResult(req);
    // if(!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array() });
    // }
    async function(req,res) {
    const name = req.body.name;
    const price = req.body.price;
    const date = new Date();
    const validation = req.body.validation;
    const user_id = Number(req.params.id);

    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.write({
        name,
        price,
        date,
        validation,
        user_id,
    });
    if(ticket !== null) {
        res.status(201);
        res.json(ticket);
    } else {
        res.status(409).end();
    }
    
});



export {
    ticketRouter
}
