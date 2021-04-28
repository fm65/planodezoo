import express from "express";
import { check, validationResult } from "express-validator";
import { TicketController} from "../controllers/ticket.controller";
import { DatabaseUtils } from "../database";
import { isAuth } from '../middlewares/auth.middleware';

const ticketRouter = express.Router();

ticketRouter.post("/add",
    check('type').isLength({ min: 1 }).isNumeric(),
    check('price').isLength({ min: 1 }).isNumeric(),
    isAuth,

    async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const type = req.body.type;
    const price  = req.body.price;
    const date = String(new Date());
 
    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.create({
        type,
        price,
        date,
    });
    if(ticket !== null) {
        res.json(ticket);
        res.status(201).end();
    } else {
        res.status(409).end();
    }
});

ticketRouter.get("/", isAuth, async function(req, res) {
    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.getAll();
    if(ticket !== null) {
        res.status(200);
        res.json(ticket);
    }else {
        res.status(404).end();
    }
});

ticketRouter.get("/user/:id", isAuth, async function(req,res) {
    const ticketController = await TicketController.getInstance();
    const ticketType = await ticketController.getByUser(parseInt(req.params.id));
    res.json(ticketType);
});

ticketRouter.get("/type/:type", isAuth, async function(req,res) {
    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.getByType(parseInt(req.params.type));
    if(ticket !== null) {
        res.status(200);
        res.json(ticket);
    } else {
        res.status(404).end();
    }
})

ticketRouter.delete("/:type", 
isAuth,
async function(req,res) {
    const ticketController = await TicketController.getInstance();
    const ticket = await ticketController.remove(parseInt(req.params.type));
    if(ticket !== null) {
        res.send("Deletion completed");
        res.status(200).end();
    } else {
        res.send("No such ticket");
        res.status(404).end();
    }
})

ticketRouter.put("/:type", async function (req, res) {
    const ticketController = await TicketController.getInstance();
    let ticket = await ticketController.getByType(parseInt(req.params.type));
    if (ticket !== null) {
        await ticket.update({ 
            price: req.body.price,
            date: req.body.date
        })
        res.send(ticket);
        res.status(201).end();
    } else {
        res.send("No such ticket");
        res.status(404).end();
    }

})

export {
    ticketRouter
}
