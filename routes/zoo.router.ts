import express from "express";
import { ZooController } from "../controllers/zoo.controller";

const zooRouter = express.Router();

zooRouter.get("/can-open", async function (req, res) {
    const zooController = await ZooController.getInstance();
    const rolesOK = await zooController.canZooOpen();
    if (!rolesOK) {
        console.log("OUVERTURE IMPOSSIBLE")
        res.status(404).end();
        return;
    } else {
        console.log("*** OUVERTURE DU ZOO ***");
    }
});

export {
    zooRouter
}