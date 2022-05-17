import { Inject, Injectable } from '@nestjs/common';
import * as mailjetLib from 'node-mailjet';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EmailMessages } from './builder/EmailMessages';

@Injectable()
export class MailService {
    private mailjet;

    constructor(configService: ConfigService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
        this.mailjet = mailjetLib.connect(
            configService.get<string>('MAILJET_API_KEY'),
            configService.get<string>('MAILJET_SECRET_KEY'),
        );
    }

    async sendUserConfirmation(emailMessage: EmailMessages): Promise<void> {
        try {
            await this.mailjet.post('send', { version: 'v3.1' }).request(emailMessage);
            this.logger.info(`The message was sent to ${emailMessage.Messages[0].To}`);
        } catch (error) {
            this.logger.error(`The error happen sending message to ${emailMessage.Messages[0].To}, ${error.message}`);
        }
    }
}
