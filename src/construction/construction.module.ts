import { Module } from '@nestjs/common';
import { ConstructionService } from './services/construction.service';
import { ConstructionController } from './construction.controller';
import { ConstructionRespo } from './infrastructure/construction.respo';
import { MapperModule } from './modules/mapper.module';

@Module({
  controllers: [ConstructionController],
  providers: [ConstructionService, ConstructionRespo],
  imports: [MapperModule],
  exports: [ConstructionService],
})
export class ConstructionModule {}
