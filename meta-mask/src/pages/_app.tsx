import { AppProps } from 'next/app';

import '../styles/global.css';
import AppStoreProvider from '../store/app-store';
import { CookiesProvider } from 'react-cookie';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppStoreProvider><CookiesProvider><Component {...pageProps} /></CookiesProvider></AppStoreProvider>
);

export default MyApp;
