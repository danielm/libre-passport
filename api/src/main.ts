import { NestFactory, Reflector } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import helmet from '@fastify/helmet';
import compression from '@fastify/compress';
import { EntityNotFoundExceptionFilter } from './filters/entity-not-found-exception.filter';
import { setupSwagger } from './utils/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter()
  );

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Automatically transform payloads to their DTO classes
    /*disableErrorMessages: true, ToDo: production only */
    whitelist: true, // Strip any non-whitelisted properties from the input object
    forbidNonWhitelisted: true, //Throw an error if a non-whitelisted property is present in the input object
    /*transformOptions: {
      enableImplicitConversion: true
    },*/
  }));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalFilters(new EntityNotFoundExceptionFilter());

  await app.register(helmet);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });

  const configService = app.get(ConfigService);
  const host = configService.get<string>('API_HOST');
  const port = configService.get<string>('API_PORT');
  const env = configService.get<string>('NODE_ENV');
  const prefix = configService.get<string>('API_PREFIX');

  app.setGlobalPrefix(prefix);

  // Documentation
  if (env !== 'production') {
    setupSwagger(app);
  }

  await app.listen(port, host);

  Logger.log(
    `🚀 Application(env: ${env}) is running on: http://${host}:${port}/${prefix}`
  );
}
bootstrap();

