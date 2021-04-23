import {Express} from "express";
import {authRouter} from "./auth.router";
import {zooRouter} from "./zoo.router";
import {ticketRouter} from "./ticket.router";

export function buildRoutes(app: Express) {
    app.use("/auth", authRouter);
    app.use("/zoo", zooRouter);
    app.use("/ticket", ticketRouter);
}
