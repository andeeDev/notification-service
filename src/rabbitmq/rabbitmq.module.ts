import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        ClientsModule.registerAsync([
            {
                name: 'notification-events',
                imports: [ConfigModule],
                inject: [ConfigService],
                useFactory: async (configService: ConfigService): Promise<any> => {
                    return {
                        transport: Transport.RMQ,
                        options: {
                            urls: [
                                `amqp://${configService.get<string>('rabbitmq.user')}:${configService.get<string>(
                                    'rabbitmq.password',
                                )}@${configService.get<string>('rabbitmq.host')}/${configService.get<string>(
                                    'rabbitmq.vhost',
                                )}`,
                            ],
                            queue: 'notification-events',
                        },
                    };
                },
            },
        ]),
    ],
    providers: [],
    exports: [],
})
export class RabbitmqModule {}
