import Layout from '@/components/Layout';
import '@/styles/globals.css';
import '@/styles/hero.scss';
import type { AppProps } from 'next/app';
import moment from 'moment';
import { AnimatePresence } from 'framer-motion';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <Layout>
      <AnimatePresence initial={false}>
        <Component {...pageProps} />
      </AnimatePresence>
    </Layout>
  );
}
