import { Inject, Injectable, Scope } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Client, ClientConfig, type PoolConfig } from 'pg';
import { v7 } from 'uuid';

@Injectable({ scope: Scope.TRANSIENT })
export class PgSchemaInitializerService {
  private _client: Client | undefined;

  constructor(@Inject('PG_POOL_OPTIONS') readonly poolConf: PoolConfig) {}

  // Main Method for the service
  async init() {
    await this.createDatabase();
    await this.initSchema();
  }

  // Client connect to root "postgres" database to create database
  async createDatabase() {
    const pgClientConf: ClientConfig = {
      ...this.poolConf,
      database: 'postgres',
    };
    this._client = new Client(pgClientConf);
    await this._client.connect();

    const existed = await this.isDatabaseExisted();
    if (!existed) {
      await this._client.query(`CREATE DATABASE "${this.poolConf.database}"`);
    }
    await this._client.end();
  }

  async isDatabaseExisted() {
    const res = await this._client!.query(
      'SELECT EXISTS (SELECT 1 FROM pg_database WHERE datname=$1)',
      [this.poolConf.database],
    );
    return res.rows[0].exists as boolean;
  }

  // Client connect to target database, then init schema
  async initSchema() {
    this._client = new Client(this.poolConf);

    await this._client.connect();
    const isTablesExisted = await this.isTablesExisted();

    if (isTablesExisted.rows[0].exists) {
      return;
    }

    const ddlPath = path.join(__dirname, 'migrations', 'v1-init.ddl.sql');
    const DDL = fs.readFileSync(ddlPath, 'utf-8');
    const ddlList = DDL.split(';');

    try {
      await this._client.query('BEGIN');
      for (const ddl of ddlList) {
        await this._client.query(ddl);
      }
      await this.initData();
      await this._client.query('COMMIT');
    } catch (error) {
      await this._client.query('ROLLBACK');
      console.error(error);
    } finally {
      await this._client.end();
    }
  }

  async isTablesExisted() {
    return this._client!.query(
      'SELECT EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema=$1)',
      ['public'],
    );
  }

  // Init data in schema init Transaction
  async initData() {
    await this._client!.query(
      'INSERT INTO administrative_documents (id, no, level, date, pursuant_to_dec_tct_id, pursuant_to_dec_ttmn_id) VALUES ($1, $2, $3, $4, $5, $6)',
      [v7(), '01/QĐ-TCT', 'TCT', new Date(), null, null],
    );
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
