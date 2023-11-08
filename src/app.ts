import 'dotenv/config';
import express from 'express';
import 'reflect-metadata';
import swaggerUI from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import { router } from './ways/routes';

const app = express()

app.use(express.json());
app.use(router)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))

export default app 