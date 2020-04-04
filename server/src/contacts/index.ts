import * as path from 'path';

const dataStore = require('nedb');

export interface IContact {
  _id?: number;
  name: string;
  email: string;
}

export class Engine {
  private db: Nedb;
  constructor() {
    this.db = new dataStore({
      filename: path.join(__dirname, 'contacts.db'),
      autoload: true,
    });
  }

  public listContacts(): Promise<IContact[]> {
    return new Promise((resolve, reject) => {
      this.db.find({}, (err: Error, contacts: IContact[]) => {
        if (err) {
          reject(err);
        } else {
          resolve(contacts);
        }
      });
    });
  }

  public addContact(contact:IContact): Promise<IContact> {
    return new Promise((resolve, reject) => {
      this.db.insert(contact, (err:Error, newContact:IContact) => {
        if (err) {
          reject(err);
        } else {
          resolve(newContact);
        }
      });
    });
  }

  public deleteContact(contactId: string): Promise<number> {
    return new Promise((resolve, reject) => {
      this.db.remove({ _id: contactId }, {}, (err:Error, deleteCount: number) => {
        if (err) {
          reject(err);
        } else {
          resolve(deleteCount);
        }
      });
    });
  }
}
