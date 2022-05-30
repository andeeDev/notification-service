import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import * as winston from 'winston';
import { EmailMessageModule } from './email-message/email-message.module';
import { configuration } from './config/configuration';
import { validationSchema } from './config/validation';

@Module({
    imports: [
        EmailMessageModule,
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            validationSchema,
            envFilePath: ['.env'],
        }),
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
