import { Module } from '@nestjs/common';
import { EmailMessageService } from './email-message.service';
import { EmailMessageController } from './email-message.controller';
import { MailModule } from '../mail/mail.module';
import { RabbitmqModule } from '../rabbitmq/rabbitmq.module';

@Module({
    imports: [MailModule, RabbitmqModule],
    providers: [EmailMessageService],
    controllers: [EmailMessageController],
})
export class EmailMessageModule {}
