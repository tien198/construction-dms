import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import * as fs from 'fs';

export default registerAs(
  'database',
  () =>
    yaml.load(
      fs.readFileSync('./config/database.config.yaml', 'utf8'),
    ) as Record<string, any>,
);
