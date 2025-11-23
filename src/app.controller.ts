import type { Response } from 'express';

import {
  Controller,
  Get,
  Post,
  Redirect,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app/:id')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':hello')
  getHello(@Param('id') id: string, @Param('hello') hello: string): string {
    console.log(`${id} ${hello}`);
    return this.appService.getHello();
  }

  @Get()
  getHelloWorld(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return 'hello world';
  }

  @Post()
  @Redirect('https://chatgpt.com/')
  createApp(): string {
    return 'This action adds a new app';
  }
}
