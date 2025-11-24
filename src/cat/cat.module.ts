import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { AnotherService } from './another.service';
import { LoggerMiddleware } from 'src/common/middleware/logger.middleware';

@Module({
  controllers: [CatController],
  providers: [CatService, AnotherService],
  exports: [AnotherService],
})
export class CatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('cat/*id/{*id}');
  }
}
