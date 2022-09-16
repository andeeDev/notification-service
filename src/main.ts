import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    const config: ConfigService = app.get<ConfigService>(ConfigService);

    const user: string = config.get('rabbitmq.user');
    const password: string = config.get('rabbitmq.password');
    const host: string = config.get('rabbitmq.host');
    const vhost: string = config.get('rabbitmq.vhost');
    const rabbitMqConnectionString: string = `amqp://${user}:${password}@${host}/${vhost}`;

    app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
            urls: [rabbitMqConnectionString],
            queue: 'notification-events',
            // false = manual acknowledgement; true = automatic acknowledgment
            noAck: false,
            // Get one by one
            prefetchCount: 1,
        },
    });

    await app.startAllMicroservices();
}

bootstrap();
