import { Router, Request, Response } from 'express';

import * as Contacts from '../contacts';

export const contactsRouter = Router();

contactsRouter.route('/contacts')
.post(async (req:Request, res:Response) => {
  const { body } = req;
  try {
    const contactsEngine: Contacts.Engine = new Contacts.Engine();
    const contact: Contacts.IContact = await contactsEngine.addContact(body);
    res.json(contact);
  } catch (error) {
    res.status(500).send('Email client error');
  }
})
.get(async (req:Request, res:Response) => {
  try {
    const contactsEngine: Contacts.Engine = new Contacts.Engine();
    const contacts: Contacts.IContact[] = await contactsEngine.listContacts();
    res.json(contacts);
  } catch (error) {
    res.status(500).send('Email client error');
  }
});

contactsRouter.route('/contacts/:contactId')
.delete(async (req:Request, res:Response) => {
  const { params: { contactId } } = req;
  try {
    const contactsEngine: Contacts.Engine = new Contacts.Engine();
    const deleteCount: number = await contactsEngine.deleteContact(contactId);
    res.json(deleteCount);
  } catch (error) {
    res.status(500).send('Email client error');
  }
});
