import React, { ReactNode } from 'react';
import {
  Block,
  BLOCKS,
  Document,
  Inline,
  INLINES,
  MARKS,
  Text
} from '@contentful/rich-text-types';

import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '@/components/Skeleton';
import Moment from 'react-moment';
import Link from 'next/link';
import {
  BiArrowBack,
  BiArrowFromLeft,
  BiArrowToLeft,
  BiChevronsLeft,
  BiChevronsRight,
  BiRightArrow
} from 'react-icons/bi';
import BlogPosts from '@/components/BlogPosts';
import BlogCard from '@/components/BlogCard';
import { useRouter } from 'next/router';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

const RICHTEXT_OPTIONS = {
  // lg:max-w-md
  renderNode: {
    [BLOCKS.DOCUMENT]: (node: any, children: any) => children,
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="mb-4 mt-2">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="font-medium text-2xl md:text-3xl mt-2 mb-1">{children}</h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className=" font-medium text-2xl md:text-3xl mt-2 mb-1">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className=" font-medium  text-2xl md:text-3xl mt-2 mb-1">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className=" font-medium  text-2xl md:text-3xl mt-2 mb-1">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: any) => (
      <h5 className=" font-medium text-2xl md:text-3xl mt-2 mb-1">
        {children}
      </h5>
    ),
    [BLOCKS.HEADING_6]: (node: any, children: any) => (
      <h6 className=" font-medium  text-xl md:text-2xl my-1">{children}</h6>
    ),
    [BLOCKS.EMBEDDED_ASSET]: (node: any, children: any) => {
      return (
        <div className="mb-6 w-full">
          <Image
            src={node.data.target.fields.file.url}
            alt={node.data.target.fields.title}
            width={500}
            height={500}
          />
        </div>
      );
    },
    [BLOCKS.UL_LIST]: (node: any, children: any) => (
      <ul className="list-disc px-4">{children}</ul>
    ),
    [BLOCKS.OL_LIST]: (node: any, children: any) => (
      <ol className="list-decimal px-4">{children}</ol>
    ),
    [BLOCKS.LIST_ITEM]: (node: any, children: any) => <li>{children}</li>,

    [BLOCKS.QUOTE]: (node: any, children: any) => (
      <blockquote>{children}</blockquote>
    ),
    [BLOCKS.HR]: () => <hr />
  }
};

export const getStaticPaths = async () => {
  const res = await client.getEntries({ content_type: 'blogPost' });
  const paths = res.items.map((item: any) => {
    return {
      params: { slug: item.fields.slug }
    };
  });
  return {
    paths,
    fallback: true
  };
};

export async function getStaticProps({ params }: any) {
  const { items } = await client.getEntries({
    content_type: 'blogPost',
    'fields.slug': params.slug
  });
  const resT = await client.getEntries({
    content_type: 'tags'
  });
  const res = await client.getEntries({
    content_type: 'blogPost'
  });

  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { blog: items[0], tags: resT.items, blogs: res.items },
    revalidate: 2
  };
}

export default function BlogDetails({ blog, blogs, tags }: any) {
  const router = useRouter();
  if (!blog) return <Skeleton />;
  const {
    title,
    slug,
    heroImage,
    body,
    description,
    publishDate,
    tag,
    author
  } = blog.fields;
  console.log(blog);

  const otherTags = tags.filter(
    (t: any) =>
      t.fields.label.trim().toLowerCase() !=
      tag.fields.label.trim().toLowerCase()
  );
  console.log(blogs);
  const otherBlogs = blogs.filter(
    (bl: any) =>
      bl.fields.slug != blog.fields.slug &&
      bl.fields.tag.fields.label.trim().toLowerCase() ==
        tag.fields.label.trim().toLowerCase()
  );
  const handleTag = (e: any) => {
    if (e.target.value === '/') {
      router.push('/blog');
    } else {
      router.push(`/blog?q=${e.target.value}`);
    }
  };
  console.log(otherBlogs);
  console.log(otherTags);
  console.log(tag.fields.label.toLowerCase());
  return (
    <div className="mt-8 md:mt-16 flex flex-col space-y-2 md:space-y-2">
      <div className="hidden md:flex md:flex-col">
        <div className="hidden md:flex tag-container items-center h-16 bg-gray-100 space-x-8">
          <Link
            href="/blog"
            className={`uppercase tracking-wide  hover:text-primary`}
          >
            Blog Home
          </Link>
          {tags.map((t: any, index: any) => {
            return (
              <Link
                key={index}
                href={`/blog?q=${t.fields.label.trim().toLowerCase()}`}
                className={`uppercase tracking-wide  hover:text-primary
                ${
                  t.fields.label.trim().toLowerCase() ===
                  tag.fields.label.trim().toLowerCase()
                    ? 'underline font-medium'
                    : ''
                }`}
              >
                {t.fields.label}
              </Link>
            );
          })}
        </div>
        <div className="w-full hidden md:flex flex-col space-y-10 slug-container flex ">
          <div className="flex w-full space-x-12">
            <div className="slug-1 ">
              <h1 className="text-3xl md:text-4xl leading-loose font-medium">
                {title}
              </h1>
            </div>
            <div className="slug-2"></div>
          </div>
          <div className="flex w-full space-x-12">
            <div className="slug-1 ">
              <div className="slug-hero-image">
                <Image
                  className=""
                  src={`https:${heroImage.fields.file.url}`}
                  width={heroImage.fields.file.details.image.width}
                  height={heroImage.fields.file.details.image.height}
                  alt=""
                />{' '}
              </div>
            </div>
            <div className="slug-2">
              <div className="w-full flex flex-col  space-y-6">
                <div className="flex flex-col space-y-2">
                  <div className="uppercase tracking-wider text-sm">
                    Published
                  </div>
                  <div className="capitalize">
                    <Moment format="MMMM Do, YYYY">{publishDate}</Moment>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="uppercase tracking-wider text-sm">Author</div>
                  <div className="capitalize">{author.fields.name}</div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="uppercase tracking-wider text-sm">
                    Category
                  </div>
                  <Link
                    href={`/blog?q=${tag.fields.label.toLowerCase()}`}
                    className="capitalize hover:underline text-purple-700"
                  >
                    {tag.fields.label}
                  </Link>
                </div>
                <div className="flex flex-col  space-y-2">
                  <div className="uppercase tracking-wider text-sm">Topics</div>
                  <div className="flex">
                    {otherTags.map((ot: any, index: any) => (
                      <Link
                        href={`/blog?q=${ot.fields.label.toLowerCase()}`}
                        key={index}
                        className="px-4 py-2 mr-2 bg-gray-200 rounded-full 
                                  tracking-wider border capitalize
                                  hover:border-secondary text-sm"
                      >
                        {ot.fields.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full space-x-12  pt-8">
            <div className="slug-1 slug-con">
              <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
            </div>
            <div className="slug-2 mt-6 space-y-16">
              <div className="w-full h-96 bg-purple-50"></div>
              <div className="w-full h-96 bg-purple-50"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="bg-gray-50  tag-container">
          <select
            className="w-full p-4 font-semibold tracking-wide uppercase"
            onChange={handleTag}
          >
            {tags.map((t: any, index: any) => (
              <option
                key={index}
                selected={
                  t.fields.label.trim().toLowerCase() ===
                  tag.fields.label.trim().toLowerCase()
                }
                value={t.fields.label.trim().toLowerCase()}
              >
                {' '}
                {t.fields.label}
              </option>
            ))}
            <option className="uppercase font-medium" value="/">
              Blog Home
            </option>
          </select>
        </div>
        <div className="slug-container">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-medium">{title}</h1>
            <div className="uppercase text-sm tracking-wide text-primary">
              {tag.fields.label}
            </div>
          </div>
        </div>
        <div className="slug-hero-image">
          <Image
            className="w-full"
            src={`https:${heroImage.fields.file.url}`}
            width={heroImage.fields.file.details.image.width}
            height={heroImage.fields.file.details.image.height}
            alt=""
          />{' '}
        </div>
        <div className="slug-container space-y-8">
          <div className="slug-con">
            <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
          </div>
          <div className="">
            <div className="text-sm uppercase mb-4 tracking-wide">Topics</div>
            {otherTags.map((ot: any, index: any) => (
              <Link
                href={`/blog?q=${ot.fields.label.toLowerCase()}`}
                key={index}
                className="px-4 py-2 mr-2 bg-gray-200 rounded-full font-medium 
                  tracking-wider border 
                  hover:border-secondary text-sm"
              >
                {ot.fields.label}
              </Link>
            ))}
          </div>
          <div className="space-y-2">
            <div className="text-sm uppercase">About the Author</div>
            <div className="flex flex-col space-y-1">
              <Image
                className="w-16 h-16 rounded-full"
                src={`https:${author.fields.image.fields.file.url}`}
                width={heroImage.fields.file.details.image.width}
                height={heroImage.fields.file.details.image.height}
                alt=""
              />
              <div className="w-full flex flex-col space-y-2">
                <h4 className="font-semibold">{author.fields.name}</h4>
                <p className="text-sm">{author.fields.shortBio}</p>
                <a
                  target="_blank"
                  className="tracking-wide hover:underline"
                  href={author.fields.linkedin}
                  rel="noopener noreferrer"
                >
                  LINKEDIN
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <div className="h-12">..</div>
            <div className="relative bc">
              <div className="grid md:grid-cols-4 gap-4  grid-flow-row  auto-rows-min ">
                {otherBlogs.slice(0, 4).map((blog: any, index: any) => {
                  return <BlogCard key={index} blog={blog} />;
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
