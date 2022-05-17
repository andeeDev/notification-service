import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, Payload, RmqContext } from '@nestjs/microservices';
import { MailService } from '../mail/mail.service';
import { RabbitMqQueues } from '../consts/RabbitMqQueues';
import { EmailMessageBuilder } from '../mail/builder/EmailMessageBuilder';
import { EmailMessageService } from './email-message.service';
import { IEmailMessage } from '../types/IEmailMessage';

@Controller()
export class EmailMessageController {
    constructor(private readonly emailMessageService: EmailMessageService, private readonly mailService: MailService) {}

    @MessagePattern(RabbitMqQueues.AccountVerification)
    public async sendAccountVerification(
        @Payload() { email, code }: IEmailMessage,
        @Ctx() context: RmqContext,
    ): Promise<void> {
        const { channel, originalMessage } = this.emailMessageService.getRabbitMqOptions(context);

        await this.mailService.sendUserConfirmation(new EmailMessageBuilder().buildVerification(email, code).build());

        channel.ack(originalMessage);
    }

    @MessagePattern(RabbitMqQueues.ResetPassword)
    public async sendResetPassword(
        @Payload() { email, code }: IEmailMessage,
        @Ctx() context: RmqContext,
    ): Promise<void> {
        const { channel, originalMessage } = this.emailMessageService.getRabbitMqOptions(context);

        await this.mailService.sendUserConfirmation(new EmailMessageBuilder().buildReset(email, code).build());

        channel.ack(originalMessage);
    }
}
