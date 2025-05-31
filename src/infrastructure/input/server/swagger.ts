import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Excusas',
    version: '1.0.0',
    description: 'Documentación de la API de Excusas',
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Servidor local',
    },
  ],
  tags: [
    {
      name: 'Excusas',
      description: 'Operaciones relacionadas con las excusas',
    },
  ],
};
const options = {
  swaggerDefinition,
  apis: ['./src/infrastructure/input/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}