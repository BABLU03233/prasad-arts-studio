import React from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const root = document.getElementById('root');
const tree = <React.StrictMode><App /></React.StrictMode>;
// The HTML is prerendered at build time, so hydrate when markup already exists.
if (root.firstElementChild) hydrateRoot(root, tree);
else createRoot(root).render(tree);
