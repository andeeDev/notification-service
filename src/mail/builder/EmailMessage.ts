import { EmailUser } from './EmailUser';

export class EmailMessage {
    From: EmailUser;

    To: EmailUser[];

    Subject: string;

    TextPart: string;

    HTMLPart: string;

    CustomID: string;

    constructor() {
        this.From = new EmailUser('andrey14501450@gmail.com', 'Auction app');
    }

    addTo(emails: string[]): void {
        this.To = emails.map((email: string) => new EmailUser(email));
    }

    setMessageData(subject: string, textPart: string, htmlPart: string, customID: string): void {
        this.Subject = subject;
        this.TextPart = textPart;
        this.HTMLPart = htmlPart;
        this.CustomID = customID;
    }
}
