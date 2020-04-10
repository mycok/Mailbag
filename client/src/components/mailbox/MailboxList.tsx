import * as React from 'react';

import { List } from '@material-ui/core';

import Mailbox from './Mailbox';

export interface IMailbox {
    name: string,
    icon: any,
    to: string,
    messages: []
}

const MailboxList = ({ mailboxes, selectedMailbox, handleMailboxSelection, displaySelectedEmailDetail }) => (
    <List>
        {mailboxes.map((mailbox) => {
            return (
                <Mailbox
                    key={mailbox.name}
                    mailbox={mailbox}
                    selectedMailbox={selectedMailbox}
                    handleMailboxSelection={handleMailboxSelection}
                    displaySelectedEmailDetail={displaySelectedEmailDetail}
                />
            );
        })}
    </List>
);

export default MailboxList;