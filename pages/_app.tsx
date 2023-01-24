import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/hero.scss';
import type { AppProps } from 'next/app';
import moment from 'moment';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
