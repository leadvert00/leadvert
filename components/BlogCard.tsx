import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Moment from 'moment';
import { useTheme } from 'next-themes';

const BlogCard = ({ blog }: any) => {
  const { theme, setTheme } = useTheme();

  const { title, slug, tag, author, heroImage, publishDate } = blog.fields;

  const [pubDate, setPubDate] = useState(null);
  useEffect(() => {
    setPubDate(publishDate);
  }, [setPubDate, publishDate]);
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
                    md:transform md:transition md:duration-500
                    bg-transparent dark:bg-transparent dark:hover:bg-gray-800"
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
              className={` block uppercase tracking-wide text-sm
                          text-primary dark:text-slate-200
                      `}
            >
              {tag.fields.label}
            </span>

            <div
              className={`text-slate-800 dark:text-slate-50
                      text-lg md:text-xl`}
            >
              <span className="line-clamp-2 hover:underline tracking-tight font-medium">
                {title}
              </span>
            </div>

            <div className="flex items-center space-x-2 ">
              {publishDate && (
                <div className="text-sm ">
                  {Moment(pubDate).format('MMMM D, Y')}
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
