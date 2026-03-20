import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly configService: ConfigService,
    private readonly appService: AppService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('config')
  getConfig(): string {
    return this.configService.get('http.port')!;
  }

  @Get('database')
  getDatabase(): string {
    return this.configService.get('database.host')!;
  }
}
