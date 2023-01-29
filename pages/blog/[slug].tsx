import Head from 'next/head';
import React, { useEffect } from 'react';
import { BLOCKS } from '@contentful/rich-text-types';
import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '@/components/Skeleton';
import Moment from 'react-moment';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';
import { useRouter } from 'next/router';
import { motion as m } from 'framer-motion';
import Select from 'react-select';

let client: any;

export async function getStaticProps({ params }: any) {
  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
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

export const getStaticPaths = async () => {
  client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
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

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.DOCUMENT]: (node: any, children: any) => children,
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="break-words mb-3 md:mb-5">{children}</p>
    ),
    [BLOCKS.HEADING_1]: (node: any, children: any) => (
      <h1 className="font-medium text-2xl md:text-3xl mt-6 md:mt-8  ">
        {children}
      </h1>
    ),
    [BLOCKS.HEADING_2]: (node: any, children: any) => (
      <h2 className=" font-medium text-2xl md:text-3xl mt-6 md:mt-8 mb-1 md:mb-2  ">
        {children}
      </h2>
    ),
    [BLOCKS.HEADING_3]: (node: any, children: any) => (
      <h3 className=" font-medium  text-2xl md:text-3xl mt-6 md:mt-8 mb-1 md:mb-2  ">
        {children}
      </h3>
    ),
    [BLOCKS.HEADING_4]: (node: any, children: any) => (
      <h4 className=" font-medium  text-2xl md:text-3xl mt-6 md:mt-8 mb-1 md:mb-2  ">
        {children}
      </h4>
    ),
    [BLOCKS.HEADING_5]: (node: any, children: any) => (
      <h5 className=" font-medium text-2xl md:text-3xl mt-6 md:mt-8 mb-1 md:mb-2  ">
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
            width={500}
            height={500}
            alt={`Image for ${node.data.target.fields.title}`}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
            placeholder="blur"
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

export default function BlogDetails({ blog, blogs, tags }: any) {
  const router = useRouter();
  useEffect(() => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, []);
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

  const otherTags = tags.filter(
    (t: any) =>
      t.fields.label.trim().toLowerCase() !=
      tag.fields.label.trim().toLowerCase()
  );
  const defaultTag = {
    value: tag.fields.label.trim().toLowerCase(),
    label: tag.fields.label
  };
  const styles = {
    option: (provided: any, state: any) => ({
      ...provided,
      fontWeight: state.isSelected ? 'bold' : 'normal',
      color: '#000',
      backgroundColor: '#f3f4f6'
    }),
    singleValue: (provided: any, state: any) => ({
      ...provided,
      color: '#000'
    })
  };
  const selectTags = tags.map((t: any) => {
    return {
      value: t.fields.label.trim().toLowerCase(),
      label: t.fields.label
    };
  });
  selectTags.push({ value: '/', label: 'Blog Home' });

  const otherBlogs = blogs.filter(
    (bl: any) =>
      bl.fields.slug != blog.fields.slug &&
      bl.fields.tag.fields.label.trim().toLowerCase() ==
        tag.fields.label.trim().toLowerCase()
  );
  const handleTag = (e: any) => {
    if (e.value === '/') {
      router.push('/blog');
    } else {
      router.push(`/blog?q=${e.value}`);
    }
  };

  return (
    <>
      <Head>
        <title>Leadvert Blog - {title} </title>
        <meta name="description" content="Leadvert Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.95, ease: 'easeOut' }}
        className="mt-8 md:mt-16 flex flex-col space-y-2 md:space-y-2"
      >
        <div className="hidden md:flex md:flex-col">
          <div className="hidden md:flex tag-container items-center h-14 bg-gray-100 space-x-8">
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
                  className={`uppercase text-sm tracking-wider  hover:text-primary
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
          <div className="w-full hidden md:flex flex-col space-y-8 slug-container flex ">
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
                    src={`https:${heroImage.fields.file.url}`}
                    width={heroImage.fields.file.details.image.width}
                    height={heroImage.fields.file.details.image.height}
                    alt={`Image for ${title}`}
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
                    placeholder="blur"
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
                    <div className="uppercase tracking-wider text-sm">
                      Author
                    </div>
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
                    <div className="uppercase tracking-wider text-sm">
                      Topics
                    </div>
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
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ y: [30, 0], opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex w-full space-x-12  pt-8"
            >
              <div className="slug-1 space-y-12">
                <div className=" slug-con">
                  {documentToReactComponents(body, RICHTEXT_OPTIONS)}
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="text-sm uppercase mb-2 tracking-wide">
                    Topics
                  </div>
                  <div>
                    {otherTags.map((ot: any, index: any) => (
                      <Link
                        href={`/blog?q=${ot.fields.label.toLowerCase()}`}
                        key={index}
                        className="px-4 py-2 mr-2 bg-gray-100 rounded-full font-medium 
                                tracking-wider border 
                                hover:border-secondary text-sm"
                      >
                        {ot.fields.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <m.div
                  initial={{ opacity: 0 }}
                  whileInView={{ y: [30, 0], opacity: 1 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="border-t border-b py-4 flex items-center"
                >
                  <div className="w-2/12">
                    <Image
                      className="w-24 h-24 rounded-full"
                      src={`https:${author.fields.image.fields.file.url}`}
                      width={heroImage.fields.file.details.image.width}
                      height={heroImage.fields.file.details.image.height}
                      alt=""
                    />
                  </div>
                  <div className="w-10/12  flex flex-col space-y-2">
                    <div className="flex flex-col justify-between  space-y-2">
                      <h4 className="font-semibold">{author.fields.name}</h4>
                      <p className="text-sm">{author.fields.shortBio}</p>
                      <a
                        target="_blank"
                        className="tracking-wide w-24 text-xs text-blue-800 hover:underline"
                        href={author.fields.linkedin}
                        rel="noopener noreferrer"
                      >
                        LINKEDIN
                      </a>
                    </div>
                  </div>
                </m.div>
              </div>
              <div className="slug-2 mt-6 space-y-16">
                <div className="w-full h-96 bg-purple-50"></div>
              </div>
            </m.div>
            <m.div
              initial={{ opacity: 0 }}
              whileInView={{ y: [30, 0], opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="flex flex-col space-y-3"
            >
              <h3 className="text-2xl md:text-3xl  uppercase font-semibold w-full b-heading">
                <span className="">Discover more Blog..</span>
              </h3>
              <div className="relative bc">
                <div className="w-full flex flex-col md:flex-row flex-wrap md:gap-8 auto-rows-min  ">
                  {otherBlogs.slice(0, 3).map((blog: any, index: any) => {
                    return <BlogCard key={index} blog={blog} />;
                  })}
                </div>
              </div>
            </m.div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="bg-gray-50  tag-container">
            <Select
              classNames={{
                control: (state) =>
                  state.isFocused
                    ? ' h-14 tracking-wide underline underline-offset-4'
                    : ' tracking-wide h-14  underline underline-offset-4'
              }}
              options={selectTags}
              styles={styles}
              onChange={handleTag}
              value={defaultTag}
            ></Select>
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
              alt={`Image for ${title}`}
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
              placeholder="blur"
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
                    className="tracking-wide font-semibold text-blue-800 hover:underline"
                    href={author.fields.linkedin}
                    rel="noopener noreferrer"
                  >
                    LINKEDIN
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="h-12">..</div>
              <h3 className="text-3xl uppercase font-semibold w-full b-heading">
                <span className="">Discover more Blog..</span>
              </h3>
              <div className="relative bc">
                <div className="w-full flex flex-col md:flex-row flex-wrap  gap-y-2 md:gap-8 auto-rows-min  ">
                  {otherBlogs.slice(0, 4).map((blog: any, index: any) => {
                    return <BlogCard key={index} blog={blog} />;
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </>
  );
}
