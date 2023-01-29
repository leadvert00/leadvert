import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import Moment from 'moment';
// import 'moment-timezone';
import { compareAsc, format, isValid } from 'date-fns';

const BlogCard = ({ blog }: any) => {
  const { title, slug, tag, author, heroImage, publishDate } = blog.fields;
  // console.log(blog.fields);
  const dateToFormat = new Date(publishDate);

  return (
    <>
      {slug && (
        <Link
          href={`/blog/${slug}`}
          scroll={true}
          className="rounded blog-card border md:border-0 shadow md:shadow-transparent my-4
                    md:my-0 md:border-transparent
                    md:hover:shadow-2xl
                    md:hover:border-gray-200
                    md:transform md:transition md:duration-500"
        >
          <Image
            src={`https:${heroImage.fields.file.url}`}
            width={400}
            height={400}
            alt={`Image for ${title}`}
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
            placeholder="blur"
          />

          <div className="px-4 py-3 space-y-1.5 flex flex-col">
            <span
              className="text-primary block uppercase tracking-wide
                        text-sm "
            >
              {tag.fields.label}
            </span>

            <div
              className="text-black  hover:text-primary 
                      text-lg md:text-xl"
            >
              <span className="line-clamp-2 hover:underline tracking-tight font-medium">
                {title}
              </span>
            </div>

            <div className="flex items-center space-x-2 ">
              {publishDate && (
                <div className="text-sm ">
                  {isValid(dateToFormat) && (
                    <> {format(dateToFormat, 'MMMM dd, yyyy')}</>
                  )}

                  {/* {publishDate.toString()} */}
                  {/* {Moment(publishDate).format('MM-DD-YYY')} */}
                  {/* <Moment format="MMMM D, YYYY"Moment>{dateToFormat}</Moment> */}
                </div>
              )}
              <div className="text-slate-600">*</div>
              <div className="text-sm ">By {author.fields.name}</div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default BlogCard;
