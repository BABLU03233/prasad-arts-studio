import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' makes built asset URLs relative so the site works when served
// from a sub-path (e.g. GitHub Pages project sites) as well as from a domain root.
export default defineConfig({ base: './', plugins: [react()], server: { port: 5173 } });
