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
import { jsonLd, metadata } from '@/data';

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
        <meta charset="UTF-8">
        <meta name="language" content="en">
        <link rel="icon" type="image/x-icon" href="favicon.ico">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="robots" content="index, follow">

        <title>${metadata.title}</title>
        <meta name="author" content="${metadata.author}">
        <meta name="description" content="${metadata.description}">
        <meta name="keywords" content="${metadata.keywords}">
        <link rel="canonical" href="${metadata.url}">

        <meta property="og:title" content="${metadata.title}">
        <meta property="og:description" content="${metadata.description}">
        <meta property="og:site_name" content="${metadata.siteName}">
        <meta property="og:type" content="website">
        <meta property="og:url" content="${metadata.url}">
        <meta property="og:locale" content="en_US">

        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:creator" content="${metadata.author}">
        <meta name="twitter:title" content="${metadata.title}">
        <meta name="twitter:description" content="${metadata.description}">
        <meta name="twitter:site" content="${metadata.url}">

        <meta name="googlebot" content="notranslate">
        <meta name="google-site-verification" content="Zzq5NY7cVcCYNcp9SjwtaExeIVqjnnqnYYCBBEnQk_M" />
        
        <script type="application/ld+json">
          ${dangerouslySkipEscape(JSON.stringify(jsonLd))}
        </script>

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
