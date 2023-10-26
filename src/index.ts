import express, { NextFunction, Request, Response } from 'express';
import {AuthRoutes} from './routes/auth.js'
import Cors from 'cors'
import bodyParser from 'body-parser'

const app = express();
app.use(Cors()); // may have to check if any cors error occurs
app.use(bodyParser.json())
const port = 3001;

app.use(AuthRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.json({msg: 'An error occured', err})
})

app.listen(port, (): void => {
    console.log(`Listening on port: ${port}`);
})