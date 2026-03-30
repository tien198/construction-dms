import * as yaml from 'js-yaml';
import * as fs from 'fs';
import { DbConfig } from './database.config.type';

export default () => {
  const database = yaml.load(
    fs.readFileSync('./config/database.config.yaml', 'utf8'),
  ) as DbConfig;
  return database;
};
