/**
 * Structured logger.
 * Outputs JSON-formatted logs in production for easy ingestion by Datadog/CloudWatch/Loki.
 * Falls back to formatted console output in development.
 * Swap the underlying transport by replacing `output()` with Pino or Winston later.
 */
type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  [key: string]: unknown;
}

function output(entry: LogEntry) {
  if (process.env.NODE_ENV === 'production') {
    console.log(JSON.stringify(entry));
  } else {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
    const meta = Object.entries(entry)
      .filter(([k]) => !['level', 'message', 'timestamp'].includes(k))
      .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
      .join(' ');
    console.log(`${prefix} ${entry.message}${meta ? ' | ' + meta : ''}`);
  }
}

function createEntry(level: LogLevel, message: string, meta?: Record<string, unknown>): LogEntry {
  return { level, message, timestamp: new Date().toISOString(), ...meta };
}

export const logger = {
  info: (message: string, meta?: Record<string, unknown>) => output(createEntry('info', message, meta)),
  warn: (message: string, meta?: Record<string, unknown>) => output(createEntry('warn', message, meta)),
  error: (message: string, meta?: Record<string, unknown>) => output(createEntry('error', message, meta)),
  debug: (message: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV !== 'production') output(createEntry('debug', message, meta));
  },
};
