import { Router, Request, Response } from 'express';

import * as Contacts from '../contacts';

export const contactsRouter = Router();

contactsRouter.route('/contacts')
.post(async (req:Request, res:Response) => {
  const { body } = req;
  try {
    const contactsEngine: Contacts.Engine = new Contacts.Engine();
    const contact: Contacts.IContact = await contactsEngine.addContact(body);
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
})
.get(async (req:Request, res:Response) => {
  try {
    const contactsEngine: Contacts.Engine = new Contacts.Engine();
    const contacts: Contacts.IContact[] = await contactsEngine.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(400).json({ error, success: false });
  }
});

contactsRouter.route('/contacts/:contactId')
.delete(async (req:Request, res:Response) => {
  const { params: { contactId } } = req;
  try {
    const contactsEngine: Contacts.Engine = new Contacts.Engine();
    const deleteCount: number = await contactsEngine.deleteContact(contactId);
    res.status(204).json(deleteCount);
  } catch (error) {
    res.status(404).json({ error, success: false });
  }
});
