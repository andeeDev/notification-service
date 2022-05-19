import { EmailMessage } from './EmailMessage';
import { MessageBuilder } from './MesssageBuilder';
import { IEmailMessages } from '../../types/IEmailMessages';

export class EmailMessageBuilder extends MessageBuilder<EmailMessage, IEmailMessages> {
    message = new EmailMessage();

    buildReset(emails: string[], code: string): EmailMessageBuilder {
        this.message.addTo(emails);
        this.message.setMessageData(
            'Auction app notification',
            'Never send data to other people',
            `<h3>Dear user, your reset code is ${code}</h3>`,
            'ResetEmail',
        );

        return this;
    }

    buildVerification(emails: string[], code: string): EmailMessageBuilder {
        this.message.addTo(emails);
        this.message.setMessageData(
            'Auction app notification',
            'Never send data to other people',
            `<h3>Dear user, your verification code is ${code}</h3>`,
            'ConfirmAccount',
        );

        return this;
    }

    build(): IEmailMessages {
        return { Messages: [this.message] };
    }
}
