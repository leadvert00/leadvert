import Head from 'next/head';
import { Inter } from '@next/font/google';
import { createClient } from 'contentful';

import Hero from '@/components/Hero';
import Quote from '@/components/Quote';
// import Services from '@/components/Services';
// import BlogPosts from '@/components/BlogPosts';

const inter = Inter({ subsets: ['latin'] });

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
  const res = await client.getEntries({
    content_type: 'blogPost'
  });

  return {
    props: { blogs: res.items },
    revalidate: 2
  };
}

export default function Home({ blogs }: any) {
  return (
    <>
      <Head>
        <title>Leadvert </title>
        <meta name="description" content="Academic Consultant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-medium">
        <Hero />
        <Quote />
        {/* <Services />
        <BlogPosts blogs={blogs} /> */}
      </main>
    </>
  );
}
