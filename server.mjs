import { createReadStream, existsSync, statSync } from 'node:fs';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createServer } from 'node:http';

const root = join(fileURLToPath(new URL('.', import.meta.url)), 'dist');
const port = Number(process.env.PORT || 3000);

const contentTypes = {
  '.css': 'text/css; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
};

const cacheControl = (pathname) => {
  if (pathname.startsWith('/assets/') || /^\/(?:logo|favicon|apple-touch-icon|og-image)/.test(pathname)) {
    return 'public, max-age=31536000, immutable';
  }
  if (pathname === '/robots.txt' || pathname === '/sitemap.xml') {
    return 'public, max-age=3600';
  }
  return 'no-cache';
};

createServer((request, response) => {
  const pathname = new URL(request.url || '/', `http://${request.headers.host || 'localhost'}`).pathname;
  const requested = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
  const filePath = requested.startsWith(root) && existsSync(requested) && statSync(requested).isFile()
    ? requested
    : join(root, 'index.html');

  response.setHeader('Content-Type', contentTypes[extname(filePath)] || 'application/octet-stream');
  response.setHeader('Cache-Control', cacheControl(pathname));
  if (request.method === 'HEAD') {
    response.end();
    return;
  }
  createReadStream(filePath).on('error', () => response.writeHead(404).end()).pipe(response);
}).listen(port, '0.0.0.0', () => {
  console.log(`RH Studio listening on ${port}`);
});
