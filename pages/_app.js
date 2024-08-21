import { GlobalStyle } from "../styles/global";
import ProvidersWrapper from "../components/providersWrapper";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ProvidersWrapper>
        <Component {...pageProps} />
      </ProvidersWrapper>
    </>
  );
}

export default MyApp;
