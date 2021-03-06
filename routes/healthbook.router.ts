import express from "express";
import {check, validationResult} from 'express-validator';
import { HealthbookController } from "../controllers/healthbook.controller";
import { isAuth, hasRole } from '../middlewares/auth.middleware';

const isVeterinary = hasRole(2); 

const healthbookRouter = express.Router();

healthbookRouter.post("/add",
    isAuth,
    isVeterinary,
    async function(req, res) {
    const date = String(new Date());
    const isDone  = req.body.isDone;
    const comment     = req.body.comment;
    

    const healthbookController = await HealthbookController.getInstance();
    const healthbook = await healthbookController.create({
        date,
        isDone,
        comment
    });
    if(healthbook !== null) {
        res.json(healthbook);
        res.status(201).end();
    } else {
        res.status(409).end();
    }
});

healthbookRouter.get("/", isAuth, async function(req, res) {
    const healthbookController = await HealthbookController.getInstance();
    const healthbook = await healthbookController.getAll();
    if(healthbook !== null) {
        res.status(200);
        res.json(healthbook);
    }else {
        res.status(404).end();
    }
});

healthbookRouter.get("/:id", isAuth, async function(req,res) {
    const healthbookController = await HealthbookController.getInstance();
    const healthbook = await healthbookController.getById(parseInt(req.params.id));
    if(healthbook !== null) {
        res.status(200);
        res.json(healthbook);
    } else {
        res.status(404).end();
    }
})

healthbookRouter.delete("/:id", 
isAuth,
async function(req,res) {
    const healthbookController = await HealthbookController.getInstance();
    const healthbook = await healthbookController.remove(parseInt(req.params.id));
    if(healthbook !== null) {
        res.send("Deletion completed");
        res.status(200).end();
    } else {
        res.send("No such healthbook");
        res.status(404).end();
    }
})

healthbookRouter.put("/:id", async function (req, res) {
    const healthbookController = await HealthbookController.getInstance();
    let healthbook = await healthbookController.getById(parseInt(req.params.id));
    if (healthbook !== null) {
        await healthbook.update({ 
            date: req.body.date,
            isDone: req.body.isDone,
            comment: req.body.comment,
            AnimalId: req.body.AnimalId
        })
        res.send(healthbook);
        res.status(201).end();
    } else {
        res.send("No such healthbook");
        res.status(404).end();
    }

})

export {
    healthbookRouter
};