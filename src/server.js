import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';

export const setupServer = () => {
  const app = express();

  app.use(cors());
  app.use(pino());

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  });

  app.get('/contacts/:contactId'),
    async (req, res) => {
      const contact = await getContactById(contactId);
      if (contact === null) {
        return res
          .status(404)
          .json({ status: 404, message: 'Contact not found', data: null });
      }

      res.json({
        status: 200,
        message: 'Successfully found contact with id {contactId}!',
        data: contact,
      });
    };

  app.use((req, res, next) => {
    res.status(404).json({ status: 404, message: 'Not found' });
  });

  const PORT = getEnvVar('PORT') || 3000;

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}`);
  });
};
