import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RabbitMqOption } from '../types/RabbitMqOption';
import { EmailMessageBuilder } from '../mail/builder/EmailMessageBuilder';
import { IEmailMessage } from '../types/IEmailMessage';
import { MailService } from '../mail/mail.service';
import { IEmailMessages } from '../types/IEmailMessages';

@Injectable()
export class EmailMessageService {
    constructor(private readonly mailService: MailService) {}

    async sendAccountVerification({ email, code }: IEmailMessage, context: RmqContext): Promise<void> {
        await this.sendGeneralEmailMessage(new EmailMessageBuilder().buildVerification([email], code).build(), context);
    }

    async sentResetPassword({ email, code }: IEmailMessage, context: RmqContext): Promise<void> {
        await this.sendGeneralEmailMessage(new EmailMessageBuilder().buildReset([email], code).build(), context);
    }

    async sendGeneralEmailMessage(emailMessages: IEmailMessages, context: RmqContext): Promise<void> {
        const { channel, originalMessage } = this.getRabbitMqOptions(context);

        await this.mailService.sendUserConfirmation(emailMessages);

        channel.ack(originalMessage);
    }

    getRabbitMqOptions(context: RmqContext): RabbitMqOption {
        const channel: any = context.getChannelRef();
        const originalMessage: Record<string, any> = context.getMessage();

        return { channel, originalMessage };
    }
}
