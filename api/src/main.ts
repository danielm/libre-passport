import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  const configService = app.get(ConfigService);
  const host = configService.get<string>('API_HOST');
  const port = configService.get<string>('API_PORT');
  const env = configService.get<string>('NODE_ENV');
  const prefix = configService.get<string>('API_PREFIX');

  app.setGlobalPrefix(prefix);
  await app.listen(port, host);

  Logger.log(
    `🚀 Application(env: ${env}) is running on: http://${host}:${port}/${prefix}`
  );
}
bootstrap();

