import {
  createDOMRenderer,
  renderToStyleElements,
} from '@fluentui/react-components';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import sortCSSmq from 'sort-css-media-queries';

class Document extends NextDocument {
  static async getInitialProps(ctx) {
    const renderer = createDOMRenderer(undefined, {
      compareMediaQueries: sortCSSmq,
    });
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => <App {...props} renderer={renderer} />,
      });

    const initialProps = await NextDocument.getInitialProps(ctx);
    const styles = renderToStyleElements(renderer);

    return {
      ...initialProps,
      styles: [...initialProps.styles, ...styles],
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
