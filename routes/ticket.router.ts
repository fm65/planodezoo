import express from "express";
import { TicketController} from "../controllers/ticket.controller";
import { DatabaseUtils } from "../database";

const ticketRouter = express.Router();

ticketRouter.get("/:id", async function(req,res) {
    const ticketController = await TicketController.getInstance();
    const ticketType = await ticketController.getByUser(parseInt(req.params.id));
    res.json(ticketType);
});



export {
    ticketRouter
}
