import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Moment from 'react-moment';

const BlogCard = ({ blog }: any) => {
  const {
    title,
    slug,
    tag,
    author,
    heroImage,
    body,
    description,
    publishDate
  } = blog.fields;
  console.log(blog.fields);
  return (
    <div
      className="rounded shadow border  hover:opacity-90 hover:shadow-xl transform transition duration-500 
            md:hover:scale-100"
    >
      <div className="relative">
        <Link href={slug}>
          <Image
            className="hover:scale-100"
            src={`https:${heroImage.fields.file.url}`}
            width={400}
            height={400}
            alt=""
          />
        </Link>

        <Link
          href={`/blog?q=${tag.fields.label.toLowerCase()}`}
          className="absolute bottom-0 bg-white px-2 py-1 text-primary
                font-semibold text-sm hover:underline border tracking-wider"
        >
          {tag.fields.label}
        </Link>
      </div>
      <div className="p-3 space-y-2">
        <div className="text-slate-600 font-medium text-sm">
          <Moment format="MMMM Do, YYYY">{publishDate}</Moment>
        </div>
        <Link
          href={slug}
          className="text-black   line-clamp-2 hover:underline
                    text-base font-bold"
        >
          {title}
        </Link>
        <div className="text-xs italic">By {author.fields.name}</div>
      </div>
    </div>
  );
};

export default BlogCard;

// width={heroImage.fields.file.details.image.width}
// height={heroImage.fields.file.details.image.height}
