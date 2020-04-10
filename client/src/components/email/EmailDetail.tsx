import * as React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardHeader, CardContent, Avatar, Divider, Grid } from '@material-ui/core';
import { deepOrange } from '@material-ui/core/colors'

const emailStyles = makeStyles((theme) => ({
    card: {
        width: '100%',
        cursor: 'pointer'
    },
    avatar: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    }
}));

const EmailDetail = ({ email }) => {
    const classes = emailStyles();
    const { sender, subject, date, body } = email;

    const displaySenderInitials = (emailSender: string): string => {
        const senderArray = emailSender.split(' ');
        if (senderArray.length > 1) {
            return senderArray[0].charAt(0).trim().toUpperCase().concat(senderArray[1].charAt(0).trim().toUpperCase());
        }
        return senderArray[0].charAt(0).trim().toUpperCase();
    };

    return (
        <>
            <Card className={classes.card}>
                <Grid container>
                    <Grid item xs={7}>
                        <CardHeader
                            avatar={(
                                <Avatar className={classes.avatar} aria-label="Email" alt="John Doe">
                                    {displaySenderInitials(sender)}
                                </Avatar>
                            )}
                            title={sender}
                            subheader={subject || ''}
                        />
                    </Grid>
                    <Grid item xs={5}>
                        <p style={{ textAlign: 'right', paddingRight: '10px' }}>{date}</p>
                    </Grid>
                </Grid>

                <CardContent>
                    {body}
                </CardContent>
            </Card>
            <Divider light={true} style={{ marginTop: '1px' }} />
        </>
    );
}

export default EmailDetail;
