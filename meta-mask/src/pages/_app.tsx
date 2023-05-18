import { AppProps } from 'next/app';

import '../styles/global.css';
import AppStoreProvider from '../store/app-store';
import { CookiesProvider } from 'react-cookie';
import  { Toaster } from 'react-hot-toast';


const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppStoreProvider><CookiesProvider><Component {...pageProps} /><Toaster/></CookiesProvider></AppStoreProvider>
);

export default MyApp;
