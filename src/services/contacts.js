import { Contact } from '../models/contacts.js';

export const getAllContacts = async (page, perPage, sortBy, sortOrder) => {
  const skip = (page - 1) * perPage;

  const [contacts, totalItems] = await Promise.all([
    Contact.find({ userId })
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
    Contact.countDocuments({ userId }),
  ]);

  const totalPages = Math.ceil(totalItems / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: page < totalPages,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload, userId) => {
  const contact = await Contact.create({ ...payload, userId });
  return contact;
};

export const updateContact = async (contactId, updateData, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    updateData,
    { new: true },
  );

  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const deleted = await Contact.findByIdAndDelete({ _id: contactId, userId });
  return deleted;
};
