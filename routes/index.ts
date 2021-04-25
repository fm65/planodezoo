import {Express} from "express";
import {authRouter} from "./auth.router";
import {zooRouter} from "./zoo.router";
import {ticketRouter} from "./ticket.router";
import {animalRouter} from "./animal.router";
import spaceRouter from "./space.router";
import { healthbookRouter } from "./healthbook.router";
import { maintenancebookRouter } from "./maintenancebook.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/zoo", zooRouter);
    app.use("/ticket", ticketRouter);
    app.use("/space", spaceRouter);
    app.use("/animal", animalRouter);
    app.use("/healthbook", healthbookRouter);
    app.use("/maintenancebook", maintenancebookRouter);
}