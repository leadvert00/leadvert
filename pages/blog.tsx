import { createClient } from 'contentful';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlogCard from '@/components/BlogCard';
import Link from 'next/link';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
  const res = await client.getEntries({
    content_type: 'blogPost'
  });
  const resT = await client.getEntries({
    content_type: 'tags'
  });
  return {
    props: { blogs: res.items, tags: resT.items },
    revalidate: 2
  };
}

function Blog({ blogs, tags }: any) {
  console.log(tags);
  function sendTag(q: any, tag: any) {
    console.log(q, tag);
    if (q === tag.trim().toLowerCase()) {
      setTimeout(() => {
        router.push('/blog');
      }, 500);
    } else {
      setTimeout(() => {
        router.push(`/blog?q=${tag.trim().toLowerCase()}`);
      }, 500);
    }
  }

  const handleTag = (e: any) => {
    if (e.target.value === '/') {
      setTimeout(() => {
        router.push('/blog');
      }, 500);
    } else {
      setTimeout(() => {
        router.push(`/blog?q=${e.target.value}`);
      }, 500);
    }
  };

  const [blogsList, setBlogsList] = useState<any[]>([]);
  const router = useRouter();
  let q = router.query.q;
  useEffect(() => {
    console.log(q);
    if (q) {
      setBlogsList([]);
      blogs.map((blog: any) => {
        console.log(blog);
        if (blog.fields.tag.fields.label) {
          if (q === blog.fields.tag.fields.label.trim().toLowerCase()) {
            console.log(q);
            setBlogsList((blogsList) => blogsList.concat(blog));
          }
        }
      });
    } else {
      setBlogsList(blogs);
    }
  }, [q, blogs]);

  // console.log(blogsList);
  return (
    <div className="mt-8 md:mt-16 flex flex-col space-y-2 md:space-y-2">
      <div className="hidden md:flex tag-container items-center h-16 bg-gray-100 space-x-8">
        <Link
          href="/blog"
          className={`uppercase tracking-wide  hover:text-primary
                ${typeof q === 'undefined' ? 'underline font-medium' : ''}`}
        >
          Blog Home
        </Link>
        {tags.map((tag: any, index: any) => {
          return (
            <Link
              key={index}
              href={`/blog?q=${tag.fields.label.trim().toLowerCase()}`}
              onClick={() => sendTag(q, `${tag.fields.label}`)}
              className={`uppercase tracking-wide  hover:text-primary
                ${
                  tag.fields.label.trim().toLowerCase() === q
                    ? 'underline font-medium'
                    : ''
                }`}
            >
              {tag.fields.label}
            </Link>
          );
        })}
      </div>
      <div className="md:hidden bg-gray-50  tag-container">
        <select
          className="w-full p-4 font-semibold tracking-wide uppercase"
          onChange={handleTag}
        >
          {tags.map((t: any, index: any) => (
            <option
              key={index}
              className="uppercase font-medium"
              selected={t.fields.label.trim().toLowerCase() === q}
              value={t.fields.label.trim().toLowerCase()}
            >
              {' '}
              {t.fields.label}
            </option>
          ))}
          <option
            className="uppercase font-medium"
            value="/"
            selected={typeof q === 'undefined'}
          >
            Blog Home
          </option>
        </select>
      </div>
      <div className="slug-container flex flex-col space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold w-full b-heading">
          <span className="">Most Recent writings here..</span>
        </h1>

        <div className="relative bc">
          <div className="w-full flex flex-col md:flex-row flex-wrap  gap-y-2 md:gap-8 auto-rows-min ">
            {blogsList.map((blog: any, index: any) => {
              return <BlogCard key={index} blog={blog} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
