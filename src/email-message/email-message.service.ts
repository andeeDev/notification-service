import { Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RabbitMqOption } from '../types/RabbitMqOption';

@Injectable()
export class EmailMessageService {
    getRabbitMqOptions(context: RmqContext): RabbitMqOption {
        const channel: any = context.getChannelRef();
        const originalMessage: Record<string, any> = context.getMessage();

        return { channel, originalMessage };
    }
}
