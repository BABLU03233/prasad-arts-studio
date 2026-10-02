// Prerender the app to static HTML and inject it into dist/index.html so the
// first paint does not wait for the client JavaScript. React then hydrates the
// same markup in the browser. Run after `vite build`.
import fs from 'node:fs/promises';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'warn' });
try {
  const { default: App } = await vite.ssrLoadModule('/src/App.jsx');
  const markup = renderToString(React.createElement(React.StrictMode, null, React.createElement(App)));
  const file = 'dist/index.html';
  const doc = await fs.readFile(file, 'utf8');
  if (!doc.includes('<div id="root"></div>')) throw new Error('root placeholder not found in dist/index.html');
  await fs.writeFile(file, doc.replace('<div id="root"></div>', `<div id="root">${markup}</div>`));
  console.log(`prerendered ${markup.length} chars into ${file}`);
} finally {
  await vite.close();
}
