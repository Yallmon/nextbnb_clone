import GlobalStyle from "../styles/GlobalStyle";
import App, { AppProps, AppContext } from 'next/app'
import Header from "../components/Header"
import { wrapper } from "../store";
import { cookieStringToObject } from "../lib/utils";
import axios from "../lib/api";
import { meAPI } from "../lib/api/auth";
import { userActions } from "../store/user";

function MyApp({ Component, pageProps }: AppProps) {
  return <> 
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <div id="root-modal" />
  </>
}

MyApp.getInitialProps = async(context: AppContext) => {
  const appInitialProps = await App.getInitialProps(context);
  const cookieObject = cookieStringToObject(context.ctx.req?.headers.cookie);
  try {
    axios.defaults.headers.cookie = cookieObject.access_token;
    const {data} = await meAPI();
  } catch (e) { 
    console.log(e);
  }
  return {... appInitialProps};
};

export default wrapper.withRedux(MyApp);
