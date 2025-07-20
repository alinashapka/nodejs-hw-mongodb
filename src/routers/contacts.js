import express from 'express';
import {
  getAllContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
  replaceContactController,
} from '../controllers/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:id', ctrlWrapper(getContactController));

router.post('/', ctrlWrapper(createContactController));

router.delete('/:id', ctrlWrapper(deleteContactController));

router.patch('/:id', ctrlWrapper(updateContactController));

router.put('/:id', ctrlWrapper(replaceContactController));

export default router;
