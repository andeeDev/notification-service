import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { INestMicroservice } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app: INestMicroservice = await NestFactory.createMicroservice(AppModule, {
        transport: Transport.RMQ,
        options: {
            urls: ['amqp://andee:guest@rabbitmq//notifications'],
            queue: 'rabbit-mq-nest-js',
            // false = manual acknowledgement; true = automatic acknowledgment
            noAck: false,
            // Get one by one
            prefetchCount: 1,
        },
    });

    await app.listen();
}
bootstrap();
