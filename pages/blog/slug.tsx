import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Skeleton from '@/components/Skeleton';
import Moment from 'react-moment';
import Link from 'next/link';
import { BiArrowBack } from 'react-icons/bi';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

const RICHTEXT_OPTIONS = {
  // lg:max-w-md
  renderNode: {
    [BLOCKS.HEADING_1]: (node: any, children: any) => {
      return <h1 className="text-2xl  mt-4 mb-0.5 font-bold">{children}</h1>;
    },
    [BLOCKS.HEADING_2]: (node: any, children: any) => {
      return <h2 className="text-2xl  mt-6 mb-0.5 font-bold">{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (node: any, children: any) => {
      return <h3 className="text-2xl  mt-6 mb-0.5 font-bold">{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (node: any, children: any) => {
      return <h4 className="text-2xl  mt-6 mb-0.5font-bold">{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (node: any, children: any) => {
      return <h5 className="text-xl  mt-6 mb-0.5font-bold">{children}</h5>;
    },
    [BLOCKS.HEADING_5]: (node: any, children: any) => {
      return <h6 className="text-xl  mt-6 mb-0.5 font-bold">{children}</h6>;
    },
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return <p className="mb-3 ">{children}</p>;
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
  if (!items.length) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    };
  }
  return {
    props: { blog: items[0] },
    revalidate: 2
  };
}

export default function BlogDetails({ blog }: any) {
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
  return (
    <div className="">
      <div className="slug-hero">
        <Image
          src={`https:${heroImage.fields.file.url}`}
          width={heroImage.fields.file.details.image.width}
          height={heroImage.fields.file.details.image.height}
          alt=""
        />
        <div className="slug-in bg-white space-y-10">
          <div>
            <div className="flex flex-col space-y-10 items-center">
              <Link
                href=""
                className="uppercase font-semibold tracking-wider hover:underline"
              >
                {' '}
                {tag.fields.label}
              </Link>
              <h1 className="leading-tight w-11/12 text-3xl md:text-5xl text-center text-black font-semibold">
                {title}
              </h1>
              <div className="border-t border-b p-2 w-full flex justify-center space-x-8">
                <div>{author.fields.name}</div>
                <Moment format="MMMM Do, YYYY">{publishDate}</Moment>
              </div>
            </div>
          </div>
          <div className="slug-body">
            <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
          </div>
        </div>
      </div>
    </div>
  );
  // return (
  //   <div>
  //     <div className="banner">
  //       <Image
  //         src={`https:${heroImage.fields.file.url}`}
  //         width={heroImage.fields.file.details.image.width}
  //         height={heroImage.fields.file.details.image.height}
  //         alt=""
  //       />
  //       <h1>{title}</h1>
  //     </div>
  //     <div className="info">
  //       <p>Tags:</p>
  //       {tags && (
  //         <div>
  //           {tags.map((tag: any) => (
  //             <span key={tag}>{tag}</span>
  //           ))}
  //         </div>
  //       )}
  //     </div>
  //     <div className="method">
  //       <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
  //     </div>
  //   </div>
  // );

  <div className="max-w-screen-lg space-y-4">
    <h1 className="text-3xl md:text-5xl font-bold text-center ">{title}</h1>
    <div className="slug-image">
      <Image
        src={`https:${heroImage.fields.file.url}`}
        width={heroImage.fields.file.details.image.width}
        height={heroImage.fields.file.details.image.height}
        alt=""
      />
    </div>
    <div className="slug-container">
      <div className="flex flex-col items-center justify-center space-y-2">
        <p className="text-2xl">{description}</p>

        <div className="border-2 "></div>
      </div>
    </div>
  </div>;
}
