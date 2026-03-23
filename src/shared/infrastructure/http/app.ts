import express, { Application } from 'express';
import { json, urlencoded } from 'express';
import { errorHandler } from './middlewares/error-handler.middleware';
import { requestLogger } from './middlewares/request-logger.middleware';

export function createApp(): Application {
  const app = express();

  // ── Body parsers ──────────────────────────────────────────────
  app.use(json());
  app.use(urlencoded({ extended: true }));

  // ── Global middlewares ────────────────────────────────────────
  app.use(requestLogger);

  // ── Health check ──────────────────────────────────────────────
  app.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // ── Error handler (must be last) ──────────────────────────────
  app.use(errorHandler);

  return app;
}
