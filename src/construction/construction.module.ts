import { Module } from '@nestjs/common';
import { ConstructionController } from './presentation/construction.controller';
import { ConstructionRespo } from './infrastructure/construction.respo';
import { DtoMapperModule } from './modules/dto.mapper.module';
import { ConstructionService } from './application/construction.service';
import { InfraMapperModule } from './modules/infra.mapper.module';

@Module({
  controllers: [ConstructionController],
  providers: [ConstructionService, ConstructionRespo],
  imports: [DtoMapperModule, InfraMapperModule],
  exports: [ConstructionService],
})
export class ConstructionModule {}
