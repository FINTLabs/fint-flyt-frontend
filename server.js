process.env.NODE_ENV = process.env.NODE_ENV || 'production';

import express from 'express';
import path from 'path';
import log4js from 'log4js';
import morgan from 'morgan';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8000;
const BASE_PATH = process.env.VITE_BASE_PATH || process.env.BASE_PATH || '/';
const DIST_DIR = path.join(__dirname, 'dist');
const log = log4js.getLogger();
log.level = process.env.LOGGING_LEVEL || 'info';

const isStaticAsset = (url) =>
    url.startsWith(`${BASE_PATH}/static/`) ||
    /\.(?:css|js|map|png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|eot)$/.test(url);

const isHealthOrMetrics = (url) => url === `${BASE_PATH}/health` || url === `${BASE_PATH}/metrics`;

morgan.token('short-date', () => new Date().toISOString());
morgan.token('remote', (req) => req.ip || req.connection?.remoteAddress || '-');
const conciseFormat = ':short-date :method :url :status :response-time ms :remote';

log4js.configure({
    appenders: {
        http: {
            type: 'stdout',
        },
    },
    categories: {
        default: {
            appenders: ['http'],
            level: 'info',
        },
    },
});

const httpLog = log4js.getLogger('http');

const app = express();
app.disable('x-powered-by');

app.use(
    morgan(conciseFormat, {
        skip: (req) =>
            isStaticAsset(req.originalUrl || req.url) ||
            isHealthOrMetrics(req.originalUrl || req.url),
        stream: {
            write: (line) => httpLog.info(line.trim()),
        },
    })
);

app.use(
    `${BASE_PATH}/`,
    express.static(DIST_DIR, {
        etag: true,
        maxAge: '1y',
    })
);

app.get(`${BASE_PATH}/health`, (req, res) => res.status(200).send('OK'));

const spaRegex = new RegExp(`^${BASE_PATH}(?:/.*)?$`);
app.get(spaRegex, (req, res) => {
    if (req.path.startsWith(`${BASE_PATH}/api`)) {
        return res.json([]);
    }
    res.sendFile(path.join(DIST_DIR, 'index.html'));
});

app.listen(PORT, () => log.info(`Application started on http://localhost:${PORT}${BASE_PATH}`));
