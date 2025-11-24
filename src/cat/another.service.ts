import { Injectable } from '@nestjs/common';

@Injectable()
export class AnotherService {
  getHello(): string {
    return 'Hello from AnotherService!';
  }
}
