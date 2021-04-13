import express from "express";
import {AuthController} from "../controllers/auth.controller";
import {hash} from "bcrypt";
import {log} from "util";

const authRouter = express.Router();

authRouter.post("/subscribe",
    async function(req, res) {
    const name     = req.body.name;
    const login    = req.body.login;
    const password = req.body.password;
    const email    = req.body.email;
    const role     = 0; // 0: guest, 1: employee, 2: admin
    if( name     === undefined ||
        login    === undefined ||
        password === undefined ||
        email    === undefined) {
        res.status(400).end();
        return;
    }
    const authController = await AuthController.getInstance();
    const passwordHashed = await hash(password, 5);
    const user = await authController.subscribe({
        name,
        login,
        password: passwordHashed,
        email,
        role,
    });
    if(user !== null) {
        res.status(201);
        res.json(user);
    } else {
        res.status(409).end();
    }
});

authRouter.post("/login", function(req, res) {
    const login    = req.body.login;
    const password = req.body.password;
    if(login === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
});

export {
    authRouter
};