import { Global, Module } from '@nestjs/common';
import { DB } from './common/respo/db';

@Global()
@Module({
  providers: [DB],
})
export class GlobalModule {}
