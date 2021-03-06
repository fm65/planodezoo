import express from "express";
import { check, validationResult } from 'express-validator';
import { AuthController } from "../controllers/auth.controller";
import { hash } from "bcrypt";
import { isAuth } from '../middlewares/auth.middleware';

const authRouter = express.Router();

authRouter.post("/subscribe",
    check('firstname').isLength({ min: 2 }).isAlpha(),
    check('lastname').isLength({ min: 2 }).isAlpha(),
    check('login').isLength({ min: 4 }).isAlphanumeric(),
    check('password').isLength({ min: 5 }),
    check('email').isEmail(),
    async function (req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const login = req.body.login;
        const password = req.body.password;
        const email = req.body.email;
        const role = req.body.role; // [0: 'guest', 1: 'employee', 2: 'veterinary', 3: 'admin', 4: 'home agent', 5: 'healer', 6:'service agent', 7: 'seller']

        const authController = await AuthController.getInstance();
        const passwordHashed = await hash(password, 5);
        const user = await authController.subscribe({
            firstname,
            lastname,
            login,
            password: passwordHashed,
            email,
            role,
        });
        if (user !== null) {
            res.json(user);
            res.status(201).end();
        } else {
            res.status(409).end();
        }
    });

authRouter.post("/login", async function (req, res) {
    const login = req.body.login;
    const password = req.body.password;
    if (login === undefined || password === undefined) {
        res.status(400).end();
        return;
    }
    const authController = await AuthController.getInstance();
    const session = await authController.log(login, password);
    if (session === null) {
        res.status(404).end();
        return;
    } else {
        res.json({
            token: session.token
        });
    }
});

authRouter.get("/", async function (req, res) {
    const authController = await AuthController.getInstance();
    const users = await authController.getAll();
    if (users !== null) {
        res.status(200);
        res.json(users);
    } else {
        res.status(404).end();
    }
});

authRouter.get("/:id", async function (req, res) {
    const authController = await AuthController.getInstance();
    const user = await authController.getById(parseInt(req.params.id));
    if (user !== null) {
        res.status(200);
        res.json(user);
    } else {
        res.status(404).end();
    }
})

authRouter.delete("/:id",
    isAuth,
    async function (req, res) {
        const authController = await AuthController.getInstance();
        const user = await authController.unsuscribe(parseInt(req.params.id));
        if (user !== null) {
            res.send("Deletion completed");
            res.status(200).end();
        } else {
            res.send("No such user");
            res.status(404).end();
        }
})

authRouter.put("/:id", async function (req, res) {
    const authController = await AuthController.getInstance();
    let user = await authController.getById(parseInt(req.params.id));
    if (user !== null) {
        await user.update({ 
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            login: req.body.login,
            password: req.body.password,
            email: req.body.email,
            role: req.body.role,
            TicketType:req.body.TicketType
        })
        res.send(user);
        res.status(201).end();
    } else {
        res.send("No such user");
        res.status(404).end();
    }

})

export {
    authRouter
};