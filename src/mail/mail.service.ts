import { Inject, Injectable } from '@nestjs/common';
import { connect, MailjetClient } from 'node-mailjet';
import { ConfigService } from '@nestjs/config';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { IEmailMessages } from '../types/IEmailMessages';

@Injectable()
export class MailService {
    private mailjet: MailjetClient;

    constructor(configService: ConfigService, @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {
        this.mailjet = connect(
            configService.get<string>('MAILJET_API_KEY'),
            configService.get<string>('MAILJET_SECRET_KEY'),
        );
    }

    async sendUserConfirmation(emailMessages: IEmailMessages): Promise<void> {
        try {
            await this.mailjet.post('send', { version: 'v3.1' }).request(emailMessages);
            this.logger.info(`The message was sent to ${emailMessages.Messages[0].To}`);
        } catch (error) {
            this.logger.error(`The error happen sending message to ${emailMessages.Messages[0].To}, ${error.message}`);
        }
    }
}
