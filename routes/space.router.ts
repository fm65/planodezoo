import express from 'express';
import { SpaceController } from '../controllers/space.controller';
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



export default spaceRouter;