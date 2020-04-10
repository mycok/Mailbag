import * as React from 'react';

import {
    Chip,
    ListItem,
    ListItemIcon,
    ListItemText,
} from '@material-ui/core';

const Mailbox = ({ mailbox, selectedMailbox, handleMailboxSelection, displaySelectedEmailDetail }) => {
    const { name, icon, emails } = mailbox;
    // ToDo: need to haandle cases where the selected mailbox has no emails when calling handleMailboxAndEmailSelection with an onClick event
    // const handleMailboxAndEmailSelection = (mailboxName, emailId) => {
    //     return Promise.all([
    //         handleMailboxSelection(mailboxName),
    //         displaySelectedEmailDetail(emailId)
    //     ]);
    // }
    const handleMailboxAndEmailSelection = (mailboxName: string) => {
        return handleMailboxSelection(mailboxName);
    }

    return (
        <ListItem
            button
            key={name}
            selected={selectedMailbox === name}
            style={{ color: selectedMailbox === name ? 'secondary' : '' }}
            onClick={() => handleMailboxAndEmailSelection(name)}
        >
            <ListItemIcon style={{ marginLeft: '0', color: '#fff' }}>{icon}</ListItemIcon>
            <ListItemText primary={name} />
            <Chip size="small" label={emails.length} />
        </ListItem>
    );
}

export default Mailbox;
