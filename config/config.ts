import * as yaml from 'js-yaml';
import * as fs from 'fs';

export default () => {
  const config = yaml.load(
    fs.readFileSync('./config/config.yaml', 'utf8'),
  ) as Record<string, any>;

  if (1024 > config.http.port || config.http.port > 49151) {
    throw new Error('HTTP port must be between 1024 and 49151');
  }

  return config;
};
