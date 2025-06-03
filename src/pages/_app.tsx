import type { AppProps } from 'next/app';
import '../index.css';
import 'motion-ui/dist/motion-ui.min.css';
import SnackbarProvider from '../contexts/SnackbarContext';
import Layout from '../components/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SnackbarProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SnackbarProvider>
  );
}

export default MyApp;
