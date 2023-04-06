import Head from 'next/head';
import ThemeProvider from '@/providers/ThemeProvider';
import Navbar from '@/components/Navbar';

import type {AppProps} from 'next/app';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {Provider} from 'react-redux';
import {store} from '@/redux/store';

const App = ({Component, pageProps}: AppProps) => {
  return (
    <Provider store={store}>
      <Head>
        <title>RicardoDev</title>
        <meta name="description" content="Crypto currency tracker" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Ricardo Toledo"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider>
        <main>
          <Navbar />
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
