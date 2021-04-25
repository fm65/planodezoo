import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { SpaceController } from '../controllers/space.controller';
import { TicketController } from '../controllers/ticket.controller';
import {DatabaseUtils} from "../database";

const spaceRouter = express.Router();

spaceRouter.get("/stats/:id/:date", async function(req, res) {
    const connection = await DatabaseUtils.getConnection();
    const spaceController = new SpaceController(connection);
    const spaceList = await spaceController.getStatsBySpace(parseInt(req.params.id), req.params.date);
    res.json(spaceList);  
});

spaceRouter.get("/stats/week/:id/:date", async function(req, res) {
    const connection = await DatabaseUtils.getConnection();
    const spaceController = new SpaceController(connection);
    const spaceList = await spaceController.getStatsBySpace(parseInt(req.params.id), req.params.date);
    if(spaceList.length >= 7) {
        const weeklyList = await spaceController.getStatsByWeek(spaceList);
        res.send(weeklyList);
    } 
});

spaceRouter.get("/access/:space_id/:user_id", async function(req,res) {
    const ticketController = await TicketController.getInstance();
    const userAuthorized = await ticketController.checkValidation(parseInt(req.params.space_id), parseInt(req.params.user_id));
    res.status(200);
    res.json(userAuthorized);
})

export default spaceRouter;