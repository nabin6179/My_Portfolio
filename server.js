import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = __dirname;
const distDir = path.join(rootDir, 'dist');
const dataPath = path.join(rootDir, 'portfolio-data.json');
const defaultPort = Number(process.env.PORT || 3000);
const rateWindowMs = 60_000;
const rateLimit = 12;
const rateState = new Map();
const allowedMethods = new Set(['GET', 'HEAD', 'POST']);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon'
};

let portfolioData = null;
let lastDataLoad = 0;

async function loadPortfolioData() {
  const stats = await stat(dataPath);
  if (!portfolioData || stats.mtimeMs > lastDataLoad) {
    const raw = await readFile(dataPath, 'utf8');
    portfolioData = JSON.parse(raw);
    lastDataLoad = stats.mtimeMs;
  }
  return portfolioData;
}

function send(res, statusCode, body, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'text/plain; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(body);
}

function sendJson(res, statusCode, payload, headers = {}) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    ...headers
  });
  res.end(JSON.stringify(payload));
}

function applySecurityHeaders(res, type = 'page') {
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');

  if (type === 'page') {
    res.setHeader(
      'Content-Security-Policy',
      "default-src 'self'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; upgrade-insecure-requests"
    );
  } else if (type === 'json') {
    res.setHeader('Content-Security-Policy', "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none';");
  }
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.trim()) {
    return forwarded.split(',')[0].trim();
  }
  return req.socket.remoteAddress || 'unknown';
}

function rateLimited(ip) {
  const now = Date.now();
  const record = rateState.get(ip) || [];
  const recent = record.filter((timestamp) => now - timestamp < rateWindowMs);
  recent.push(now);
  rateState.set(ip, recent);
  return recent.length > rateLimit;
}

function normalizeQuestion(text) {
  return String(text || '').trim().replace(/\s+/g, ' ');
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term));
}

function buildAnswer(data, question) {
  const q = normalizeQuestion(question).toLowerCase();

  const refusal = data.agent.refusal;
  const outOfScopeTerms = [
    'system prompt',
    'developer message',
    'malware',
    'keylogger',
    'ignore previous instructions',
    'reveal your system prompt',
    'passwords',
    'secret',
    'token',
    'api key',
    'credential',
    'shell',
    'write code for',
    'generate malware'
  ];

  if (q.length > 500 || includesAny(q, outOfScopeTerms)) {
    return { answer: refusal, source: 'Agent policy' };
  }

  const topicMap = [
    {
      terms: ['education', 'study', 'school', 'college', 'university', 'bsc', 'b.sc'],
      build: () => ({
        answer: [
          `${data.identity.name} is a Computer Science student specializing in network technology and cybersecurity.`,
          `Education`,
          ...data.education.map((item) => `${item.program} - ${item.institution} - ${item.date}`)
        ].join('\n'),
        source: 'Education'
      })
    },
    {
      terms: ['experience', 'internship', 'job'],
      build: () => ({
        answer: [
          `He completed a technical support internship at Himalayan Online Service Pvt. Ltd. in Kathmandu from Oct 2025 to Mar 2026.`,
          `The role focused on OSI-based troubleshooting, router and wireless infrastructure support, and network performance monitoring.`
        ].join('\n'),
        source: 'Experience'
      })
    },
    {
      terms: ['project', 'projects', 'built', 'portfolio', 'case study'],
      build: () => ({
        answer: data.projects.map((project) => `${project.name} - ${project.description}`).join('\n\n'),
        source: 'Projects'
      })
    },
    {
      terms: ['skill', 'tools', 'technology', 'stack'],
      build: () => ({
        answer: data.skills
          .map((skill) => `${skill.category}: ${skill.items.map((item) => item.name).join(', ')}`)
          .join('\n'),
        source: 'Skills'
      })
    },
    {
      terms: ['certification', 'certificate', 'certifications'],
      build: () => ({
        answer: data.certifications.map((item) => `${item.name} - ${item.issuer} - ${item.date}`).join('\n'),
        source: 'Certifications'
      })
    },
    {
      terms: ['training', 'bootcamp', 'simulation'],
      build: () => ({
        answer: data.certifications
          .filter((item) => ['Bootcamp on Web Application Penetration Testing', 'Deloitte Australia - Cyber Job Simulation'].includes(item.name))
          .map((item) => `${item.name} - ${item.issuer} - ${item.date}`)
          .join('\n'),
        source: 'Training'
      })
    },
    {
      terms: ['lab', 'ctf', 'security lab', 'tryhackme', 'picoctf'],
      build: () => ({
        answer: data.lab.map((item) => `${item.category}: ${item.items.join(', ')}`).join('\n'),
        source: 'Security Lab'
      })
    },
    {
      terms: ['learning', 'currently', 'exploring', 'focus'],
      build: () => ({
        answer: data.currentFocus.map((item) => `${item.title} - ${item.description}`).join('\n'),
        source: 'Current Focus'
      })
    },
    {
      terms: ['contact', 'email', 'phone', 'reach', 'linkedin', 'github', 'website'],
      build: () => ({
        answer: [
          `Email: ${data.contact.email}`,
          `Phone: ${data.contact.phone}`,
          `Location: ${data.contact.location}`,
          `Public links: No verified GitHub, LinkedIn, or personal website URL was present in the source files.`
        ].join('\n'),
        source: 'Contact'
      })
    },
    {
      terms: ['who is nabin', 'who is nabin tiwari', 'about nabin'],
      build: () => ({
        answer: `${data.identity.summary} He is based in ${data.identity.location} and is open to internships.`,
        source: 'Profile'
      })
    }
  ];

  for (const entry of topicMap) {
    if (includesAny(q, entry.terms)) {
      return entry.build();
    }
  }

  if (q.includes('nabin') || q.includes('tiwari')) {
    return {
      answer: `${data.identity.name} is a ${data.identity.headline}. ${data.hero.intro} Open to internships.`,
      source: 'Profile'
    };
  }

  return { answer: refusal, source: 'Agent policy' };
}

async function readBody(req, maxBytes = 8192) {
  return new Promise((resolve, reject) => {
    let size = 0;
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      size += Buffer.byteLength(chunk, 'utf8');
      if (size > maxBytes) {
        reject(new Error('Body too large'));
        req.destroy();
        return;
      }
      body += chunk;
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

async function handleAgent(req, res) {
  const ip = getClientIp(req);
  if (rateLimited(ip)) {
    sendJson(res, 429, { error: 'Rate limit exceeded.' });
    return;
  }

  const origin = req.headers.origin;
  if (origin) {
    try {
      const parsedOrigin = new URL(origin);
      const host = req.headers.host;
      if (parsedOrigin.host !== host) {
        sendJson(res, 403, { error: 'Origin rejected.' });
        return;
      }
    } catch {
      sendJson(res, 403, { error: 'Origin rejected.' });
      return;
    }
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    sendJson(res, 413, { error: 'Request too large.' });
    return;
  }

  let payload;
  try {
    payload = JSON.parse(body || '{}');
  } catch {
    sendJson(res, 400, { error: 'Invalid JSON.' });
    return;
  }

  const question = normalizeQuestion(payload.question);
  if (!question) {
    sendJson(res, 400, { error: 'Question is required.' });
    return;
  }
  if (question.length > 500) {
    sendJson(res, 413, { error: 'Question too long.' });
    return;
  }

  const data = await loadPortfolioData();
  const result = buildAnswer(data, question);
  const response = {
    answer: result.answer,
    source: result.source,
    allowedTopics: data.agent.allowedTopics
  };

  sendJson(res, 200, response);
}

async function serveStatic(req, res, pathname) {
  const staticBase = (await exists(path.join(distDir, 'index.html'))) ? distDir : rootDir;
  const safePath = pathname === '/' ? '/index.html' : pathname;
  const relativePath = decodeURIComponent(safePath).replace(/^\//, '');
  const filePath = path.normalize(path.join(staticBase, relativePath));
  const fallbackPath = path.normalize(path.join(rootDir, relativePath));

  if (!filePath.startsWith(staticBase) || !fallbackPath.startsWith(rootDir)) {
    send(res, 403, 'Forbidden');
    return;
  }

  if (await exists(filePath)) {
    const stats = await stat(filePath);
    if (stats.isDirectory()) {
      const indexFile = path.join(filePath, 'index.html');
      if (await exists(indexFile)) {
        return serveStaticFile(res, indexFile);
      }
    } else {
      return serveStaticFile(res, filePath);
    }
  }

  if (await exists(fallbackPath)) {
    const stats = await stat(fallbackPath);
    if (stats.isDirectory()) {
      const indexFile = path.join(fallbackPath, 'index.html');
      if (await exists(indexFile)) {
        return serveStaticFile(res, indexFile);
      }
    } else {
      return serveStaticFile(res, fallbackPath);
    }
  }

  return serveStaticFile(res, path.join(staticBase, 'index.html'));
}

async function exists(filePath) {
  try {
    await stat(filePath);
    return true;
  } catch {
    return false;
  }
}

function serveStaticFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const type = mimeTypes[ext] || 'application/octet-stream';
  applySecurityHeaders(res, ext === '.json' ? 'json' : 'page');
  res.writeHead(200, {
    'Content-Type': type,
    'Cache-Control': ext === '.pdf' ? 'public, max-age=86400' : 'no-store'
  });
  createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  applySecurityHeaders(res, req.url?.startsWith('/api/') ? 'json' : 'page');

  if (!req.url) {
    send(res, 400, 'Bad request');
    return;
  }

  const method = req.method || 'GET';
  if (!allowedMethods.has(method)) {
    sendJson(res, 405, { error: 'Method not allowed.' }, { Allow: 'GET, HEAD, POST' });
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/agent') {
    if (method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed.' }, { Allow: 'POST' });
      return;
    }
    await handleAgent(req, res);
    return;
  }

  if (method !== 'GET' && method !== 'HEAD') {
    sendJson(res, 405, { error: 'Method not allowed.' }, { Allow: 'GET, HEAD' });
    return;
  }

  await serveStatic(req, res, url.pathname);
});

server.listen(defaultPort, () => {
  console.log(`Nabin portfolio server running on http://localhost:${defaultPort}`);
});
