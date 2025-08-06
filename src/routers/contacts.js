import express from 'express';
import {
  getAllContactsController,
  getContactController,
  createContactController,
  deleteContactController,
  updateContactController,
  replaceContactController,
} from '../controllers/contacts.js';

import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { upload } from '../middlewares/upload.js';

import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contact.js';

import { authenticate } from '../middlewares/authenticate.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = express.Router();

router.use(authenticate);

router.get('/', ctrlWrapper(getAllContactsController));

router.get('/:id', isValidId, ctrlWrapper(getContactController));

router.post(
  '/',
  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteContactController));

router.patch(
  '/:id',
  upload.single('photo'),
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(updateContactController),
);

router.put('/:id', isValidId, ctrlWrapper(replaceContactController));

export default router;
