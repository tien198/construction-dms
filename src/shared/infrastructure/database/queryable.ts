import type { QueryConfig, QueryResult, QueryResultRow } from 'pg';

/**
 * Minimal query interface satisfied by both `Pool` (via PgPoolService)
 * and `PoolClient` (dedicated transactional connection).
 * Repositories depend on this, not on a concrete pg type.
 */

/*
  RESERVE. To learn after
*/
export interface Queryable {
  connect(): Promise<void>;
  end(): Promise<void>;
  query<R extends QueryResultRow = Record<string, unknown>>(
    queryTextOrConfig: string | QueryConfig,
    values?: unknown[],
  ): Promise<QueryResult<R>>;
}
