import swaggerJSDoc from 'swagger-jsdoc';
import { PORT } from './utils/consts';

const url = 'http://localhost' + ':' + PORT

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'My API',
            version: '1.0.0',
            description: 'API documentation for My API',
        },
        servers: [
            {
                url,
            },
        ],
    },
    apis: ['backend/routes/**/index.ts'], // Path to your API files with Swagger comments
};



export const swaggerSpec = swaggerJSDoc(swaggerOptions);

console.log(JSON.stringify(swaggerSpec, null, 2));

