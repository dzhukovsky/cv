import './_app.scss';
import {
  createDOMRenderer,
  FluentProvider,
  RendererProvider,
  SSRProvider,
  webLightTheme,
} from '@fluentui/react-components';

function App({ Component, pageProps, renderer }) {
  return (
    <RendererProvider renderer={renderer || createDOMRenderer()}>
      <SSRProvider>
        <FluentProvider theme={webLightTheme}>
          <Component {...pageProps} />
        </FluentProvider>
      </SSRProvider>
    </RendererProvider>
  );
}

export default App;
