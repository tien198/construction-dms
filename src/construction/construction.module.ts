import { Module } from '@nestjs/common';
import { ConstructionController } from './presentation/construction.controller';
import { ConstructionRespo } from './infrastructure/construction.respo';
import { MapperModule } from './modules/dto.mapper.module';
import { ConstructionService } from './application/construction.service';

@Module({
  controllers: [ConstructionController],
  providers: [ConstructionService, ConstructionRespo],
  imports: [MapperModule],
  exports: [ConstructionService],
})
export class ConstructionModule {}
