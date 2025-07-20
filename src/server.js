import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());
  app.use(express.json());

  app.use('/contacts', contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  const PORT = getEnvVar('PORT') || 3000;

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}`);
  });
};
