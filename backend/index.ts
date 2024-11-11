import express from 'express';
import {config} from "dotenv";
import * as path from 'path';


import appRouter from './routes/router';
import errorHandler from './middleware/errorHandler';

config();

const app: express.Application = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_BUILD_DIRECTORY = '../frontend/build'

app.use(express.json())

app.use(express.static(path.join(__dirname, FRONTEND_BUILD_DIRECTORY)));

app.use('/api', appRouter);

app.use(errorHandler);

app.listen(PORT, function () {
    console.log(`App is listening on port: ${PORT}!`);
});