import { Inject, Injectable } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { log } from 'console';
import { Client, type PoolConfig } from 'pg';

@Injectable()
export class PgSchemaInitializerService {
  client: Client;
  constructor(readonly poolConf: PoolConfig) {
    log(poolConf);
    this.client = new Client({ ...poolConf, database: 'postgres' });
  }

  async init() {
    // open
    await this.client.connect();
    const isExisted = await this.isExisted();
    if (!isExisted) {
      await this.createDatabase();
      await this.initSchema();
    }
    // close
    await this.client.end();
  }

  async isExisted() {
    log('------------------------------------');
    const res = await this.client.query(
      'SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname=$1)',
      [this.poolConf.database],
    );
    return res.rows[0].exists as boolean;
  }

  async createDatabase() {
    await this.client.query(`CREATE DATABASE "${this.poolConf.database}"`);
  }

  async initSchema() {
    const ddlPath = path.join(__dirname, 'migrations', 'v1-init.ddl.sql');
    const DDL = fs.readFileSync(ddlPath, 'utf-8');

    await this.client.query(DDL);
  }
}
