import GlobalStyle from "../styles/GlobalStyle";
import type { AppProps } from 'next/app'
import Header from "../components/Header"

function MyApp({ Component, pageProps }: AppProps) {
  return <> 
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
  </>
}

export default MyApp
