import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const BlogItem = ({ blog }: any) => {
  const { title, slug, heroImage, description, publishDate } = blog.fields;

  return (
    <Link href={`/blog/${slug}`}>
      <div>
        <Image
          src={`https:${heroImage.fields.file.url}`}
          width={400}
          height={400}
          alt=""
        />
      </div>
      <div className="p-2 m-2 bg-yellow-200">{title}</div>
    </Link>
  );
};

export default BlogItem;
