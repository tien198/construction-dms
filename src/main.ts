import fs from 'fs';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NextFunction, Request, Response } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors([
    {
      origin: 'localhost:3000',
      methods: 'GET,PUT,POST,DELETE',
      credentials: true,
    },
    {
      origin: 'http://localhost:5173',
      methods: 'GET,PUT,POST,DELETE',
      credentials: true,
    },
  ]);
  /*
  app.use((req: Request, res: Response, next: NextFunction) => {
    if (req.originalUrl.startsWith('/api')) {
      return next();
    }

    const filePath = join(process.cwd(), 'client', 'dist', 'index.html');
    if (!fs.existsSync(filePath)) {
      return res.sendFile(filePath);
    }

    next();
  });
  */
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
