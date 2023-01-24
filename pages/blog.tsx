import { createClient } from 'contentful';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BlogItem from '@/components/BlogItem';
import BlogCard from '@/components/BlogCard';

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
  // console.log(res);
  return {
    props: { blogs: res.items, tags: resT.items },
    revalidate: 2
  };
}

function Blog({ blogs, tags }: any) {
  console.log(tags);
  const useTag = (q: any, tag: any) => {
    console.log(q, tag);
    if (q === tag.trim().toLowerCase()) {
      console.log('return..');
      router.push('/blog');
    } else {
      console.log('whyyy');
      router.push(`/blog?q=${tag.trim().toLowerCase()}`);
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
  }, [q]);

  // console.log(blogsList);
  return (
    <div className="container mt-8 md:mt-6 flex flex-col space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-3xl font-semibold w-full">
          {/* Please feel free to find the most recent of our writings here.. */}
        </h1>
        <div className="space-y-2">
          <p className="font-medium text-lg">Search blog by Topics</p>
          <div className="flex">
            {tags.map((tag: any, index: any) => {
              return (
                <button
                  key={index}
                  onClick={() => useTag(q, `${tag.fields.label}`)}
                  className={`px-4 py-2 mr-3 rounded-full font-medium tracking-wider border
                          hover:border-secondary text-sm 
                          ${
                            tag.fields.label.trim().toLowerCase() === q
                              ? 'bg-primary text-white'
                              : 'bg-gray-200'
                          }`}
                >
                  {tag.fields.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative bc">
        <div className="grid md:grid-cols-4 gap-4  grid-flow-row  auto-rows-min ">
          {blogsList.map((blog: any, index: any) => {
            return <BlogCard key={index} blog={blog} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Blog;
