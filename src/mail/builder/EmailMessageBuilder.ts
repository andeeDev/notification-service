import { EmailMessage } from './EmailMessage';
import { MessageBuilder } from './MesssageBuilder';
import { EmailUser } from './EmailUser';

export class EmailMessageBuilder extends MessageBuilder<EmailMessage> {
    constructor() {
        super();
        this.message = new EmailMessage();
    }

    buildReset(email: string, code: string): EmailMessageBuilder {
        this.message.Subject = 'Auction app notification';
        this.message.TextPart = 'Never send data to other people';
        this.message.HTMLPart = `<h3>Dear user, your reset code is ${code}</h3>`;
        this.message.CustomID = 'ResetEmail';
        this.message.To = [new EmailUser(email, 'name')];

        return this;
    }

    buildVerification(email: string, code: string): EmailMessageBuilder {
        this.message.To = [new EmailUser(email)];
        this.message.Subject = 'Auction app notification';
        this.message.TextPart = 'Never send data to other people';
        this.message.HTMLPart = `<h3>Dear user, your verification code is ${code}</h3>`;
        this.message.CustomID = 'ConfirmAccount';

        return this;
    }

    build(): any {
        return { Messages: [this.message] };
    }
}
