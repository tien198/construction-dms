import { Inject, Injectable, Scope } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Client, ClientConfig, type PoolConfig } from 'pg';

@Injectable({ scope: Scope.TRANSIENT })
export class PgSchemaInitializerService {
  private _client: Client;

  constructor(@Inject('PG_POOL_OPTIONS') readonly poolConf: PoolConfig) {}

  async init() {
    const pgClientConf: ClientConfig = {
      ...this.poolConf,
      database: 'postgres',
    };
    // Client connect to root database postgres
    this._client = new Client(pgClientConf);
    await this._client.connect();
    const existed = await this.isExisted();

    if (existed) {
      await this._client.end();
      return;
    }
    await this.createDatabase();
    await this._client.end();

    // Client connect to target database to init schema
    this._client = new Client(this.poolConf);

    await this._client.connect();
    await this.initSchema();
    await this._client.end();
  }

  async isExisted() {
    const res = await this._client.query(
      'SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname=$1)',
      [this.poolConf.database],
    );
    return res.rows[0].exists as boolean;
  }

  async createDatabase() {
    await this._client.query(`CREATE DATABASE "${this.poolConf.database}"`);
  }

  async initSchema() {
    const ddlPath = path.join(__dirname, 'migrations', 'v1-init.ddl.sql');
    const DDL = fs.readFileSync(ddlPath, 'utf-8');
    const ddlList = DDL.split(';');

    try {
      await this._client.query('BEGIN');
      for (const ddl of ddlList) {
        await this._client.query(ddl);
      }
      await this._client.query('COMMIT');
    } catch (error) {
      await this._client.query('ROLLBACK');
      console.error(error);
    }
  }
  /*
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
  */
}
