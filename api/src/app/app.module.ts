import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configSchema from './app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { DataAccessApplicationModule } from '@libre-passport/data-access-application';
// import { Application } from 'libs/data-access-application/src/lib/application.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      cache: true,
      validationSchema: configSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('POSTGRES_HOST'),
        port: +configService.getOrThrow('POSTGRES_PORT'),
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.getOrThrow('POSTGRES_DATABASE'),
        synchronize: false,
        logging: configService.get('POSTGRES_LOGGING', false),
        entities: [/*Application*/],
      }),
      inject: [ConfigService],
    }),
    // DataAccessApplicationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
