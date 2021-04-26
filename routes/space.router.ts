import express from 'express';
import { check, validationResult } from 'express-validator';
import { SpaceController, _SpaceController } from '../controllers/space.controller';
import { TicketController } from '../controllers/ticket.controller';
import {DatabaseUtils} from "../database";
import { isAuth, hasRole } from '../middlewares/auth.middleware';

const isAdmin = hasRole(3); 

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

spaceRouter.post("/", 
    check('name').isLength({​​​​​​ min: 2 }​​​​​​),
    check('description').isLength({​​​​​​ min: 2 }​​​​​​),
    check('image').isLength({​​​​​​ min: 2 }​​​​​​).isAlphanumeric(),
    check('type').isLength({​​​​​​ min: 2 }​​​​​​),
    check('capacity').isInt(),
    check('duration').isInt(),
    check('opening').isLength({​​​​​​ min: 5 }​​​​​​),
    check('closing').isLength({​​​​​​ min: 5 }​​​​​​),
    check('disabledAccess').isBoolean(),
    isAuth,
    isAdmin,
    async function(req, res) {​​​​​​
    const errors = validationResult(req);
    if (!errors.isEmpty()) {​​​​​​
        return res.status(400).json({​​​​​​ errors: errors.array() }​​​​​​);
    }​​​​​​    
    const name           = req.body.name;
    const description    = req.body.description;
    const image          = req.body.image;
    const type           = req.body.type;
    const capacity       = req.body.capacity;
    const duration       = req.body.duration;
    const opening        = req.body.opening;
    const closing        = req.body.closing;
    const disabledAccess = req.body.disabledAccess;
    const spaceController = await _SpaceController.getInstance();

    const space = await spaceController.create({​​​​​​
        name,
        description,
        image,
        type,
        capacity,
        duration,
        opening,
        closing,
        disabledAccess,
    }​​​​​​);

    if(space !== null) {​​​​​​
        res.status(201);
        res.json(space);
    }​​​​​​ else {​​​​​​
        res.status(409).end();
    }​​​​​​
}​​​​​​);

export default spaceRouter;