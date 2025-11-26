import { Module } from '@nestjs/common';
import { CatModule } from './cat/cat.module';
import { ConstructionModule } from './construction/construction.module';

@Module({
  imports: [CatModule, ConstructionModule],
})
export class AppModule {}
