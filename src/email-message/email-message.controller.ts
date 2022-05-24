import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { RabbitMqQueues } from '../consts/RabbitMqQueues';
import { EmailMessageService } from './email-message.service';
import { IEmailMessage } from '../types/IEmailMessage';

@Controller()
export class EmailMessageController {
    constructor(private readonly emailMessageService: EmailMessageService) {}

    @EventPattern(RabbitMqQueues.AccountVerification)
    public async sendAccountVerification(@Payload() body: IEmailMessage, @Ctx() context: RmqContext): Promise<void> {
        await this.emailMessageService.sendAccountVerification(body, context);
    }

    @EventPattern(RabbitMqQueues.ResetPassword)
    public async sendResetPassword(@Payload() body: IEmailMessage, @Ctx() context: RmqContext): Promise<void> {
        await this.emailMessageService.sentResetPassword(body, context);
    }
}
