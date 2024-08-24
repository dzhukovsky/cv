import { createRoot } from 'react-dom/client';
import { App } from './App';
import {
  RendererProvider,
  createDOMRenderer,
} from '@fluentui/react-components';
import sortCSSmq from 'sort-css-media-queries';

const container = document.getElementById('root');
const root = createRoot(container!);

const renderer = createDOMRenderer(document, {
  compareMediaQueries: sortCSSmq,
});

root.render(
  <RendererProvider renderer={renderer}>
    <App />
  </RendererProvider>,
);
