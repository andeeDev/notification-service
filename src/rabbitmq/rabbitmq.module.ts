import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'rabbit-mq-module',
                transport: Transport.RMQ,
                options: {
                    urls: ['amqp://andee:guest@rabbitmq/notifications'],
                    queue: 'rabbit-mq-nest-js',
                },
            },
        ]),
    ],
    providers: [],
    exports: [],
})
export class RabbitmqModule {}
