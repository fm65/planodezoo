import express from "express";
import {check, validationResult} from 'express-validator';
import { MaintenancebookController } from "../controllers/maintenancebook.controller";
import { isAuth, hasRole } from '../middlewares/auth.middleware';

const isAdmin = hasRole(3); 

const maintenancebookRouter = express.Router();

maintenancebookRouter.post("/add",
    isAuth,
    isAdmin,
    async function(req, res) {
    const date      = String(new Date());
    const isDone    = req.body.isDone;
    const comment   = req.body.comment;
    const month     =  req.body.month;
 
    const maintenancebookController = await MaintenancebookController.getInstance();
    const maintenancebook = await maintenancebookController.create({
        date,
        isDone,
        comment,
        month,
    });
    if(maintenancebook !== null) {
        res.json(maintenancebook);
        res.status(201).end();
    } else {
        res.status(409).end();
    }
});

maintenancebookRouter.get("/", async function(req, res) {
    const maintenancebookController = await MaintenancebookController.getInstance();
    const maintenancebook = await maintenancebookController.getAll();
    if(maintenancebook !== null) {
        res.status(200);
        res.json(maintenancebook);
    }else {
        res.status(404).end();
    }
});

maintenancebookRouter.get("/:id", async function(req,res) {
    const maintenancebookController = await MaintenancebookController.getInstance();
    const maintenancebook = await maintenancebookController.getById(parseInt(req.params.id));
    if(maintenancebook !== null) {
        res.status(200);
        res.json(maintenancebook);
    } else {
        res.status(404).end();
    }
})

maintenancebookRouter.delete("/:id", 
isAuth,
isAdmin,
async function(req,res) {
    const maintenancebookController = await MaintenancebookController.getInstance();
    const Maintenancebook = await maintenancebookController.remove(parseInt(req.params.id));
    if(Maintenancebook !== null) {
        res.send("Deletion completed");
        res.status(200).end();
    } else {
        res.send("No such maintenancebook");
        res.status(404).end();
    }
})

export {
    maintenancebookRouter
};