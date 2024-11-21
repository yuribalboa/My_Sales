import 'reflect-metadata';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';

import routes from './routes';
import { AppDataSource } from '@shared/typeorm/data-source';
import ErrorHandleMiddleware from '@shared/middlewares/ErrorHandleMiddleware';

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.use(routes);
    app.use(ErrorHandleMiddleware.handleError);

    console.log('Conected to database!');

    app.listen(3333, () => {
      console.log('Server started on port 3333!');
    });
  })
  .catch(error => {
    console.error('Failed to connect to the database:', error);
  });
