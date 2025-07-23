import createHttpError from 'http-errors';

import {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
} from '../services/contacts.js';

export async function getAllContactsController(req, res) {
  const contacts = await getAllContacts();

  res.json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
}

export async function getContactController(req, res) {
  const { id } = req.params;
  const contact = await getContactById(id);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).send({
    status: 200,
    message: `Successfully found contact!`,
    data: contact,
  });
}

export async function createContactController(req, res) {
  const contact = await createContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
}

export async function deleteContactController(req, res) {
  const result = await deleteContact(req.params.id);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.status(204).send();
}

export async function updateContactController(req, res) {
  const result = await updateContact(req.params.id, req.body);

  if (result === null) {
    throw new createHttpError.NotFound('Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result,
  });
}

export async function replaceContactController(req, res) {
  const { value, updatedExisting } = await replaceContact(
    req.params.id,
    req.body,
  );

  if (updatedExisting === true) {
    return res.json({
      status: 200,
      message: 'Contact replaced successfully',
      data: value,
    });
  }

  res.status(201).json({
    status: 201,
    message: 'Contact created successfully',
    data: value,
  });
}
