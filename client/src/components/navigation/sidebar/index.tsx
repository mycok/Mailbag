import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Drawer, CssBaseline } from '@material-ui/core';

import MailboxList from '../../mailbox/MailboxList';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    },
    drawer: {
        flexShrink: 0,
    },
    drawerPaper: {
        width: 280
    },
    toolbar: {
        marginTop: '2.5em',
        marginLeft: '1em',
        marginBottom: '0.8em',
    }
}));

const Sidebar = ({ mailboxes, selectedMailbox, displayEmailList, displaySelectedEmailDetail }) => {
    const classes = useStyles();

    const handleMailboxSelection = (name: string) => {
        return displayEmailList(name);
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper
                }}
            >
                <div className={classes.toolbar} />
                <MailboxList
                    mailboxes={mailboxes}
                    selectedMailbox={selectedMailbox}
                    handleMailboxSelection={handleMailboxSelection}
                    displaySelectedEmailDetail={displaySelectedEmailDetail}
                />
            </Drawer>
        </div>
    );
};

export default Sidebar;
