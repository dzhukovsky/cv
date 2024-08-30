// https://vike.dev/onRenderHtml
export { onRenderHtml };

import ReactDOMServer, { renderToStaticMarkup } from 'react-dom/server';
import { Layout } from './Layout';
import { escapeInject, dangerouslySkipEscape } from 'vike/server';
import type { OnRenderHtmlAsync } from 'vike/types';
import {
  createDOMRenderer,
  RendererProvider,
  renderToStyleElements,
  SSRProvider,
} from '@fluentui/react-components';
import sortCSSmq from 'sort-css-media-queries';
import { metadata } from '@/data';

const onRenderHtml: OnRenderHtmlAsync = async (
  pageContext,
): ReturnType<OnRenderHtmlAsync> => {
  const { Page } = pageContext;

  // This onRenderHtml() hook only supports SSR, see https://vike.dev/render-modes for how to modify
  // onRenderHtml() to support SPA
  if (!Page)
    throw new Error(
      'My onRenderHtml() hook expects pageContext.Page to be defined',
    );

  const renderer = createDOMRenderer(undefined, {
    compareMediaQueries: sortCSSmq,
  });

  // Alternativly, we can use an HTML stream, see https://vike.dev/streaming
  const pageHtml = ReactDOMServer.renderToString(
    <RendererProvider renderer={renderer}>
      <SSRProvider>
        <Layout pageContext={pageContext}>
          <Page />
        </Layout>
      </SSRProvider>
    </RendererProvider>,
  );

  const style = renderToStaticMarkup(<>{renderToStyleElements(renderer)}</>);

  const documentHtml = escapeInject`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${metadata.title}</title>
        <meta name="description" content="${metadata.description}" />
        <meta name="keywords" content="${metadata.keywords}" />
        <script defer src="https://cloud.umami.is/script.js" 
          data-website-id="b51e153a-f932-4f11-b54b-55fe153bde03">
        </script>
        ${dangerouslySkipEscape(style)}
      </head>
      <body>
        <div id="react-root">${dangerouslySkipEscape(pageHtml)}</div>
      </body>
    </html>`;

  return {
    documentHtml,
    pageContext: {
      // We can add custom pageContext properties here, see https://vike.dev/pageContext#custom
    },
  };
};
