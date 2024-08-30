// https://vike.dev/onRenderClient
export { onRenderClient };

import ReactDOM from 'react-dom/client';
import { Layout } from './Layout';
import type { OnRenderClientAsync } from 'vike/types';
import {
  createDOMRenderer,
  RendererProvider,
} from '@fluentui/react-components';
import sortCSSmq from 'sort-css-media-queries';

let root: ReactDOM.Root;
const onRenderClient: OnRenderClientAsync = async (
  pageContext,
): ReturnType<OnRenderClientAsync> => {
  const { Page } = pageContext;

  // This onRenderClient() hook only supports SSR, see https://vike.dev/render-modes for how to modify onRenderClient()
  // to support SPA
  if (!Page)
    throw new Error(
      'My onRenderClient() hook expects pageContext.Page to be defined',
    );

  const container = document.getElementById('react-root');
  if (!container) throw new Error('DOM element #react-root not found');

  const renderer = createDOMRenderer(document, {
    compareMediaQueries: sortCSSmq,
  });

  const page = (
    <RendererProvider renderer={renderer}>
      <Layout pageContext={pageContext}>
        <Page />
      </Layout>
    </RendererProvider>
  );
  if (pageContext.isHydration) {
    root = ReactDOM.hydrateRoot(container, page);
  } else {
    if (!root) {
      root = ReactDOM.createRoot(container);
    }
    root.render(page);
  }
};
