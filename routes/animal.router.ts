import express from "express";
import {check, validationResult} from 'express-validator';
import { AnimalController } from "../controllers/animal.controller";
import { isAuth } from '../middlewares/auth.middleware';

const animalRouter = express.Router();

animalRouter.post("/add",
    check('name').isLength({ min: 2 }).isAlpha(),
    check('species').isLength({ min: 2 }).isAlpha(),
    check('description').isLength({ min: 4 }).isAlphanumeric(),
    isAuth,

    async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const name = req.body.name;
    const species  = req.body.species;
    const description     = req.body.description;
    const created_at  = new Date();
 
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.create({
        name,
        species,
        description
    });
    if(animal !== null) {
        res.json(animal);
        res.status(201).end();
    } else {
        res.status(409).end();
    }
});

animalRouter.get("/", isAuth, async function(req, res) {
    const animalController = await AnimalController.getInstance();
    const animals = await animalController.getAll();
    if(animals !== null) {
        res.status(200);
        res.json(animals);
    }else {
        res.status(404).end();
    }
});

animalRouter.get("/:id", isAuth, async function(req,res) {
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.getById(parseInt(req.params.id));
    if(animal !== null) {
        res.status(200);
        res.json(animal);
    } else {
        res.status(404).end();
    }
})

animalRouter.delete("/:id", 
isAuth,
async function(req,res) {
    const animalController = await AnimalController.getInstance();
    const animal = await animalController.remove(parseInt(req.params.id));
    if(animal !== null) {
        res.send("Deletion completed");
        res.status(200).end();
    } else {
        res.send("No such animal");
        res.status(404).end();
    }
})

export {
    animalRouter
};

animalRouter.put("/:id", async function (req, res) {
    const animalController = await AnimalController.getInstance();
    let animal = await animalController.getById(parseInt(req.params.id));
    if (animal !== null) {
        await animal.update({ 
            name: req.body.name,
            species: req.body.species,
            description: req.body.description,
            spaceId: req.body.spaceId
        })
        res.send(animal);
        res.status(201).end();
    } else {
        res.send("No such animal");
        res.status(404).end();
    }

})