import * as React from 'react';

import { Grid } from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInboxSharp';
import DraftsIcon from '@material-ui/icons/DraftsSharp';
import SentIcon from '@material-ui/icons/SendSharp';
import AllMailIcon from '@material-ui/icons/MailOutlineSharp';
import FlaggedIcon from '@material-ui/icons/FlagSharp';
import TrashIcon from '@material-ui/icons/DeleteForeverSharp';
import SpamIcon from '@material-ui/icons/DeleteSweepSharp';

import Sidebar from './components/navigation/sidebar';
import NavigationBar from './components/navigation/navbar';
import EmailList from './components/email/EmailList';
import EmailDetail from './components/email/EmailDetail';

interface IMailboxes {
    date: string,
    name: string,
    icon: any,
    to: string,
    emails: IEmail[]
};

interface IEmail {
    date: string,
    sender: string,
    subject: string,
    reciepient: string,
    id: string,
    cc: [],
    bcc: [],
    body: string
};

const mailboxes: IMailboxes[] = [
    {
        date: `Thu 26 Apr 2018 20:19:05`,
        name: 'Inbox',
        icon: <InboxIcon />,
        to: '/inbox',
        emails: [
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '145647',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Hi awesome,
                We saw that you signed up for Turing on Sep 23, 2019 to get matched with top U.S. remote software jobs but haven't uploaded your resume yet.
                Here's a subset of the jobs we're hiring for (Full-Time, 2+ Years of Engagement).
                Please upload your resume so that you can access selective jobs that match your skills.
                `
            },
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '7896',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Dear Andela Alumni,
                First, I hope that you, your family and all your loved ones are healthy and safe. You and all Andelans are in my thoughts. My husband Eric and I are both OK for now. We are sheltering-in-place in Sonoma, California and have been home bound for about three weeks. While we both have elderly parents and grandparents with pre-existing conditions, all are healthy and on lock down in their homes for now. That said, we both know people directly affected by COVID-19 as it becomes clear that most of us will be personally affected by this pandemic. 
                Second, I wanted to share an update on Andela from Jeremy that summarizes how the company is responding and navigating through the COVID-19 pandemic. Andela has been ahead of the curve in terms of working from home in all locations and has kept the health and safety of the Andela team at the center of their response. They have also focused the team on doing everything that they safely can to help partners continue to run their business and tech teams through this crisis. More details below. 
                Lastly, I wanted to offer to help those of you who may be currently looking for work and those of you in leadership positions helping your teams grapple with and move forward during this time of great uncertainty. 
                If you are currently job searching, please reach out to me via email and also look for another alumni email in the coming days with specific information on the updated Andela Talent Marketplace. If you are a recent Andelan, you may have received information on this from Annabelle Amotsuka on the Andela Talent team. If you are an alumni from a year ago or more, this may be new information and I encourage you to read through and take the time to sign on. 
                If you are leading a team, I am collecting resources that have been helpful to me and others to understand and move through this time, even in the face of great uncertainty. I'm happy to share these with you and if I better understand your current circumstances, can help curate information to your needs more specifically.
                `
            }
        ]
    },
    {
        date: `Thu, 26 Apr 2018 20:19:05`,
        name: 'Drafts',
        icon: <DraftsIcon />,
        to: '/drafts',
        emails: [
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '00098',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Hi awesome,
                We saw that you signed up for Turing on Sep 23, 2019 to get matched with top U.S. remote software jobs but haven't uploaded your resume yet.
                Here's a subset of the jobs we're hiring for (Full-Time, 2+ Years of Engagement).
                Please upload your resume so that you can access selective jobs that match your skills.
                `
            }
        ]
    },
    {
        date: `Thu 26 Apr 2018 20:19:05`,
        name: 'Sent',
        icon: <SentIcon />,
        to: '/sent',
        emails: [
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '11123',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Hi awesome,
                We saw that you signed up for Turing on Sep 23, 2019 to get matched with top U.S. remote software jobs but haven't uploaded your resume yet.
                Here's a subset of the jobs we're hiring for (Full-Time, 2+ Years of Engagement).
                Please upload your resume so that you can access selective jobs that match your skills.
                `
            },
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '09234',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Hi awesome,
                We saw that you signed up for Turing on Sep 23, 2019 to get matched with top U.S. remote software jobs but haven't uploaded your resume yet.
                Here's a subset of the jobs we're hiring for (Full-Time, 2+ Years of Engagement).
                Please upload your resume so that you can access selective jobs that match your skills.
                `
            }
        ]
    },
    {
        date: `Thu 26 Apr 2018 20:19:05`,
        name: 'All Mail',
        icon: <AllMailIcon />,
        to: '/allmail',
        emails: [
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '1987',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Hi awesome,
                We saw that you signed up for Turing on Sep 23, 2019 to get matched with top U.S. remote software jobs but haven't uploaded your resume yet.
                Here's a subset of the jobs we're hiring for (Full-Time, 2+ Years of Engagement).
                Please upload your resume so that you can access selective jobs that match your skills.
                `
            },
            {
                date: `Thu, 26 Apr 2018 20:19:05`,
                id: '1985',
                sender: 'awesomeme155@gmail.com',
                subject: 'Test single email template',
                reciepient: 'mycovan@gmail.com',
                cc: [],
                bcc: [],
                body: `
                Hi awesome,
                We saw that you signed up for Turing on Sep 23, 2019 to get matched with top U.S. remote software jobs but haven't uploaded your resume yet.
                Here's a subset of the jobs we're hiring for (Full-Time, 2+ Years of Engagement).
                Please upload your resume so that you can access selective jobs that match your skills.
                `
            }
        ]
    },
    {
        date: `Thu 26 Apr 2018 20:19:05`,
        name: 'Flagged',
        icon: <FlaggedIcon />,
        to: '/flagged',
        emails: []
    },
    {
        date: `Thu 26 Apr 2018 20:19:05`,
        name: 'Trash',
        icon: <TrashIcon />,
        to: '/trash',
        emails: [],
    },
    {
        date: `Thu 26 Apr 2018 20:19:05`,
        name: 'Spam',
        icon: <SpamIcon />,
        to: '/spam',
        emails: []
    }
];

const App = () => {
    const [selectedMailbox, selectMailbox] = React.useState(mailboxes[0]);
    const [emailList, retrieveEmails] = React.useState([...mailboxes[0].emails]);
    const [selectedEmail, selectEmail] = React.useState(mailboxes[0].emails[0]);

    const displayEmailList = (mailboxName: string) => {
        const selMailbox = mailboxes.filter(mailbox => mailbox.name === mailboxName);

        return Promise.all([
            selectMailbox(selMailbox[0]),
            retrieveEmails(selMailbox[0].emails),
        ]);
    }

    const displaySelectedEmailDetail = (emailId: string) => {
        const selectedEmails = selectedMailbox.emails.filter(email => email.id === emailId);
        return selectEmail(selectedEmails[0]);
    }

    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={10}>
                <NavigationBar />
            </Grid>

            <Grid item container>
                <Grid item xs={2}>
                    <Sidebar
                        mailboxes={mailboxes}
                        selectedMailbox={selectedMailbox.name}
                        displayEmailList={displayEmailList}
                        displaySelectedEmailDetail={displaySelectedEmailDetail}
                    />
                </Grid>
                <Grid item xs={4} style={{ height: '94vh', borderRight: 'solid 1px #fff' }}>
                    <EmailList
                        emails={emailList}
                        selectedEmail={selectedEmail}
                        displaySelectedEmailDetail={displaySelectedEmailDetail}
                    />
                </Grid>
                <Grid item xs={6} style={{ height: '94vh' }}>
                    {
                        selectedEmail.hasOwnProperty('body') && (
                            <EmailDetail email={selectedEmail} />
                        )
                    }
                </Grid>
            </Grid>

        </Grid>
    )
}

export default App;