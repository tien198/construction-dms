import { Global, Module } from '@nestjs/common';
import { DB } from './common/respo/db';

@Global()
@Module({
  providers: [DB],
  exports: [DB],
})
export class GlobalModule {}
