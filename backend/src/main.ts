import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

function corsOrigins(): string[] {
  const fromEnv = (process.env.FRONTEND_ORIGIN ?? '')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);

  if (process.env.NODE_ENV === 'production') {
    return fromEnv;
  }

  return [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    ...fromEnv,
  ];
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: corsOrigins() });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

