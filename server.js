import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {routes} from './app/routes/routes';
import passport from 'passport';
import {strategies} from './app/middleware/passport';
import dbConnection from './app/database/db';

const port = process.env.PORT || 4000;

const app = express();
app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(strategies(passport).initialize());
app.use(express.static("public"));
app.use(routes(app, express, passport));