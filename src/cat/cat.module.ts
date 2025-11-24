import { Module } from '@nestjs/common';
import { CatService } from './cat.service';
import { CatController } from './cat.controller';
import { AnotherService } from './another.service';

@Module({
  controllers: [CatController],
  providers: [CatService, AnotherService],
  exports: [AnotherService],
})
export class CatModule {}
