import {config} from "dotenv";
config();
import express, {Express} from "express";
import bodyParser from "body-parser";

import {buildRoutes} from "./routes";
import {buildSeeders} from "./seeders";


buildSeeders(); //populate database table with random data

const app: Express = express();

app.use(bodyParser.json());

buildRoutes(app);

const port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log(`Listening on ${port}...`);
});

/*app.use(function(req, res, next){
    req.setTimeout(5, function(){
        res.status(401).json("Error: Unauthorized access");
    });
    next();
});*/