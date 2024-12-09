import express from 'express';
import * as path from 'path';
import swaggerUi from 'swagger-ui-express';


import { swaggerSpec } from './swaggerConfig';
import appRouter from './routes/router';
import errorHandler from './middleware/errorHandler';


export const createApp = (): express.Application => {
    const app: express.Application = express();
    const FRONTEND_BUILD_DIRECTORY = '../frontend/build';

    app.use(express.json());
    app.use(express.static(path.join(__dirname, FRONTEND_BUILD_DIRECTORY)));
    app.use('/api', appRouter);

    if (true) {


        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
    
    app.use(errorHandler);

    return app;
};