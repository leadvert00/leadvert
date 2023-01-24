import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Skeleton from '@/components/Skeleton';
import Moment from 'react-moment';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';
import BlogPosts from '@/components/BlogPosts';
import BlogCard from '@/components/BlogCard';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

const RICHTEXT_OPTIONS = {
  // lg:max-w-md
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => {
      return <h1 className="text-2xl  mt-6 mb-1 font-bold">{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node: any, children: any) => {
      return (
        <h2 className="text-xl md:text-2xl  mt-6 mb-1 font-bold">{children}</h2>
      );
    },
    [BLOCKS.HEADING_3]: (node: any, children: any) => {
      return (
        <h3 className="text-xl md:text-2xl   mt-6 mb-1 font-bold">
          {children}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (node: any, children: any) => {
      return (
        <h4 className="text-xl md:text-2xl   mt-6 mb-1 font-bold">
          {children}
        </h4>
      );
    },
    [BLOCKS.HEADING_5]: (node: any, children: any) => {
      return (
        <h5 className="text-xl md:text-2xl   mt-6 mb-1 font-bold">
          {children}
        </h5>
      );
    },
    [BLOCKS.HEADING_5]: (node: any, children: any) => {
      return (
        <h6 className="text-xl md:text-2xl  mt-6 mb-1 font-bold">{children}</h6>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return <p className="mb-4 mt-2">{children}</p>;
    }
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
  console.log(otherBlogs);
  console.log(otherTags);
  return (
    <>
      <div className="w-full hidden md:flex flex-col space-y-10 slug-container flex mt-16">
        <div className="flex w-full space-x-12">
          <div className="slug-1 ">
            <h1 className="text-3xl md:text-5xl leading-loose font-medium">
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
                <div className="uppercase tracking-wider text-sm">Category</div>
                <div className="capitalize">{tag.fields.label}</div>
              </div>
              <div className="flex flex-col  space-y-2">
                <div className="uppercase tracking-wider text-sm">Topics</div>
                <div className="flex"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full space-x-12  pt-8">
          <div className="slug-1">
            <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
          </div>
          <div className="slug-2 mt-6 space-y-16">
            <div className="w-full h-96 bg-purple-50"></div>
            <div className="w-full h-96 bg-purple-50"></div>
          </div>
        </div>
      </div>

      {/* *** DESIGN FOR MOBILE HERE****** */}

      <div className="flex md:hidden mt-16 flex flex-col space-y-0">
        <div className="bg-gray-50  slug-container">
          <div className="py-1 overflow-x-auto w-full flex ">
            {tags.map((tag: any, index: any) => (
              <button
                key={index}
                className={`px-4 py-2 mr-2 rounded-full font-medium tracking-wider border
                          hover:border-secondary text-sm
                          ${
                            tag.fields.label.trim().toLowerCase() ===
                            tag.fields.label.toLowerCase()
                              ? 'bg-primary text-white'
                              : 'bg-gray-200'
                          }`}
              >
                {tag.fields.label}
              </button>
            ))}
          </div>
        </div>
        <div className="slug-container flex flex-col space-y-4">
          <h1 className="text-3xl font-medium">{title}</h1>
          <p className="uppercase font-semibold">
            <span>{tag.fields.label}</span>
          </p>
        </div>
        <div>
          <Image
            className="w-full"
            src={`https:${heroImage.fields.file.url}`}
            width={heroImage.fields.file.details.image.width}
            height={heroImage.fields.file.details.image.height}
            alt=""
          />{' '}
        </div>
        <div className="slug-container">
          <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
        </div>
        <div className="slug-container">
          <div className="text-sm uppercase mb-4 tracking-wide">Topics</div>
          {otherTags.map((ot: any, index: any) => (
            <Link
              href={`/blog/${ot.fields.label.toLowerCase()}`}
              key={index}
              className="px-4 py-2 mr-2 bg-gray-200 rounded-full font-medium 
                        tracking-wider border
                        hover:border-secondary text-sm"
            >
              {ot.fields.label}
            </Link>
          ))}
        </div>
        <div className="slug-container space-y-2">
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
        <div className="slug-container">
          <div className="h-12"></div>
          <div className="relative bc">
            <div className="grid md:grid-cols-4 gap-4  grid-flow-row  auto-rows-min ">
              {otherBlogs.slice(0, 4).map((blog: any, index: any) => {
                return <BlogCard key={index} blog={blog} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
