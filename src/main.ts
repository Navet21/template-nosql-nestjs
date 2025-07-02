import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  //Cambia el prefijo al que quieras que tenga la versión de tu api!
  app.setGlobalPrefix('api/templateNestJs');

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
