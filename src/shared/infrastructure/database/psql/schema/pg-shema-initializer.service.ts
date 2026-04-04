import { Inject, Injectable, Scope } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Client, ClientConfig, type PoolConfig } from 'pg';

@Injectable({ scope: Scope.TRANSIENT })
export class PgSchemaInitializerService {
  constructor(@Inject('PG_POOL_OPTIONS') readonly poolConf: PoolConfig) {}

  async init() {
    const pgClientConf: ClientConfig = {
      ...this.poolConf,
      database: 'postgres',
    };
    await this.withClient(pgClientConf, async (client) => {
      const isExisted = await this.isExisted(client);
      if (isExisted) return;
      await this.createDatabase(client);
      await this.withClient(this.poolConf, async (client) => {
        await this.initSchema(client);
      });
    });
  }

  async isExisted(client: Client) {
    const res = await client.query(
      'SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname=$1)',
      [this.poolConf.database],
    );
    return res.rows[0].exists as boolean;
  }

  async createDatabase(client: Client) {
    await client.query(`CREATE DATABASE "${this.poolConf.database}"`);
  }

  async initSchema(client: Client) {
    const ddlPath = path.join(__dirname, 'migrations', 'v1-init.ddl.sql');
    const DDL = fs.readFileSync(ddlPath, 'utf-8');
    const ddlList = DDL.split(';');

    try {
      await client.query('BEGIN');
      for (const ddl of ddlList) {
        await client.query(ddl);
      }
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      console.error(error);
    }
  }

  async withClient(
    config: ClientConfig,
    fn: (client: Client) => Promise<void>,
  ): Promise<void> {
    const client = new Client(config);
    // open
    await client.connect();
    await fn(client);
    // close
    await client.end();
  }
}
