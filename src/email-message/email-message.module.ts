import { Module } from '@nestjs/common';
import { EmailMessageService } from './email-message.service';
import { EmailMessageController } from './email-message.controller';
import { MailModule } from '../mail/mail.module';

@Module({
    imports: [MailModule],
    providers: [EmailMessageService],
    controllers: [EmailMessageController],
})
export class EmailMessageModule {}
