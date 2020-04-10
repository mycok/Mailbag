import * as React from 'react';

import Email from './Email';
// import NoMessages from '../../../public/images/Messages.svg';

export interface IEmail {
    sender: string,
    subject: string,
    reciepient: string,
    cc: [],
    bcc: [],
    body: string
}

const EmailList = ({ emails, selectedEmail, displaySelectedEmailDetail }) => (
    <div>
        {
            emails.length === 0 || !emails[0].hasOwnProperty('sender') ? (
                <>
                    {/* <NoMessages style={{ marginTop: '50%', marginLeft: '180px' }}/> */}
                    <p style={{ textAlign: 'center', marginTop: '2%', fontSize: 'medium' }}>No Messages Available!!</p>
                </>
            ) : (
                    emails.map((email) => {
                        return (
                            <Email
                                key={email.sender + (Math.random() * 100)}
                                email={email}
                                selectedEmail={selectedEmail}
                                displaySelectedEmailDetail={displaySelectedEmailDetail}
                            />
                        )
                    })
                )
        }
    </div>
);

export default EmailList;