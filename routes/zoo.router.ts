import express from "express";
import { ZooController } from "../controllers/zoo.controller";

const zooRouter = express.Router();

zooRouter.get("/can-open", async function (req, res) {
    const zooController = await ZooController.getInstance();
    const rolesOK = await zooController.canZooOpen();
    if (rolesOK === null) {
        res.status(404).end();
        return;
    } else {
        res.status(200);
        res.send(rolesOK);
    }
});

export {
    zooRouter
}