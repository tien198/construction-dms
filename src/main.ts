import path from 'path';
import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();

  app.setGlobalPrefix('api');
  app.enableCors([
    {
      origin: '*',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    },
  ]);
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }

    const filePath = path.join(process.cwd(), 'client', 'dist', 'index.html');
    if (!fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }

    next();
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
