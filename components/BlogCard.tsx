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
    <Link
      href={`/blog/${slug}`}
      className="rounded blog-card border md:border-0 shadow md:shadow-transparent my-4
                  md:my-0 md:border-transparent 
                  hover:shadow-2xl
                  hover:border-gray-200
                  transform transition duration-500"
    >
      <Image
        className="hover:scale-100"
        src={`https:${heroImage.fields.file.url}`}
        width={400}
        height={400}
        alt=""
      />

      <div className="px-4 py-3 space-y-1 flex flex-col">
        <span
          className="text-primary block uppercase tracking-wide 
                     text-sm "
        >
          {tag.fields.label}
        </span>

        <div
          className="text-black  hover:text-primary leading-relaxed
                    text-lg md:text-xl  font-medium"
        >
          <span className="line-clamp-2 hover:underline">{title}</span>
        </div>
        <div className="flex items-center space-x-2 ">
          <div className="text-sm ">
            <Moment format="MMMM D, YYYY">{publishDate}</Moment>
          </div>
          <div className="text-slate-600">*</div>
          <div className="text-sm ">By {author.fields.name}</div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;

// width={heroImage.fields.file.details.image.width}
// height={heroImage.fields.file.details.image.height}
