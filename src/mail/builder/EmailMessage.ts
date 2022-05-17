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
}
