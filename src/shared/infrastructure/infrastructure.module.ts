import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence/persistence.module';

@Module({
  imports: [PersistenceModule.forRoot()],
  exports: [PersistenceModule],
})
export class InfrastructureModule {}
