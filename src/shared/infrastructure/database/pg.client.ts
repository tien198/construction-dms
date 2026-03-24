import type {
  ClientConfig,
  QueryConfig,
  QueryResult,
  QueryResultRow,
} from 'pg';
import { Client } from 'pg';

export class PgClient {
  private static instance: PgClient;
  private client: Client;
  private isConnected: boolean = false;

  private constructor(config?: ClientConfig) {
    this.client = new Client(config);
  }

  public static getInstance(config?: ClientConfig): PgClient {
    if (!PgClient.instance) {
      PgClient.instance = new PgClient(config);
    }
    return PgClient.instance;
  }

  public async connect(): Promise<void> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
    }
  }

  public async query<T extends QueryResultRow = any, I extends any[] = any[]>(
    textOrQueryConfig: string | QueryConfig<I>,
    values?: I,
  ): Promise<QueryResult<T>> {
    await this.connect();

    const start = Date.now();
    try {
      const res = await this.client.query<T, I>(textOrQueryConfig, values);
      const duration = Date.now() - start;
      console.log('Executed query', {
        text:
          typeof textOrQueryConfig === 'string'
            ? textOrQueryConfig
            : textOrQueryConfig.text,
        duration,
        rows: res.rowCount,
      });
      return res;
    } catch (err) {
      console.error('Error executing query', err);
      throw err;
    }
  }

  public getClient(): Client {
    return this.client;
  }

  public async close(): Promise<void> {
    if (this.isConnected) {
      await this.client.end();
      this.isConnected = false;
    }
  }
}

export const pgClient = PgClient.getInstance();
