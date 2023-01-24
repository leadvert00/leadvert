import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import Skeleton from '@/components/Skeleton';
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
});

const RICHTEXT_OPTIONS = {
  // lg:max-w-md
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => {
      return <p className="text-red-900 w-1/2  mt-4">{children}</p>;
    },
    [INLINES.HYPERLINK]: (node: any, children: any) => {
      return (
        <a className="text-indigo font-bold" href={node.data.uri}>
          {children}
        </a>
      );
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
  const { title, slug, heroImage, body, description, publishDate, tags } =
    blog.fields;
  console.log(blog);
  return (
    <div>
      <div className="banner">
        <Image
          src={`https:${heroImage.fields.file.url}`}
          width={heroImage.fields.file.details.image.width}
          height={heroImage.fields.file.details.image.height}
          alt=""
        />
        <h1>{title}</h1>
      </div>
      <div className="info">
        <p>Tags:</p>
        {tags && (
          <div>
            {tags.map((tag: any) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        )}
      </div>
      <div className="method">
        <div>{documentToReactComponents(body, RICHTEXT_OPTIONS)}</div>
      </div>
    </div>
  );
}
