import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { EmailMessageModule } from './email-message/email-message.module';

@Module({
    imports: [
        EmailMessageModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
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
        WinstonModule.forRoot({
            transports: [
                new winston.transports.File({
                    filename: 'app.log',
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('MyApp', { prettyPrint: true }),
                    ),
                }),
            ],
        }),
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
