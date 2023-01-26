import { BsArrowRight } from 'react-icons/bs';
import BlogCard from './BlogCard';
import CircleButtonLink from './CircleButtonLink';
import { motion as m } from 'framer-motion';
export default function BlogPosts({ blogs }: any) {
  return (
    <div className="blog-container   bg-white space-y-6 md:space-y-12 ">
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [50, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex py-24  blog-post  flex-col md:flex-row space-y-2"
      >
        <div className="w-full md:w-3/12 ">
          <h2 className="text-2xl md:text-5xl font-semibold w-full ">
            Leadvert Blog
          </h2>
        </div>
        <div className="md:w-9/12 text-lg flex flex-col space-y-3">
          <div>
            <span className="font-medium text-primary">
              Research inspires us to continually improve.{' '}
            </span>{' '}
            Each post is handpicked for the most relevant and actionable tips,
            tricks, hacks, and hacks. Students, researchers, and academia across
            the world have found educational inspiration in our site because
            it&quot;s written by educators who know what they are talking about.
          </div>
          <div>
            <CircleButtonLink icon={<BsArrowRight />} to="/blog">
              Start reading the blog
            </CircleButtonLink>
          </div>
        </div>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [50, 0], opacity: 1 }}
        transition={{ duration: 0.5 }}
        className=" bg-white flex flex-col space-y-12"
      >
        <div className="flex flex-col md:flex-row md:justify-between items-center">
          <div className="space-y-2 lg:space-y-2">
            <h2 className="leading-tight text-3xl md:text-4xl text-black dark:text-white">
              Blog recommendations
            </h2>
            <p className="leading-tight text-2xl md:text-4xl text-gray-400 dark:text-slate-500">
              Prepared exclusively for you.
            </p>
          </div>
          <CircleButtonLink
            to="/blog"
            classNames="md:justify-center"
            icon={<BsArrowRight />}
          >
            See the full Blog
          </CircleButtonLink>
        </div>
        <div>
          <div className="relative bc">
            <div className="w-full flex flex-col md:flex-row flex-wrap  gap-y-2 md:gap-8 auto-rows-min  ">
              {blogs.slice(0, 3).map((blog: any, index: any) => {
                return <BlogCard key={index} blog={blog} />;
              })}
            </div>
          </div>
        </div>
      </m.div>
    </div>
  );
}

{
  /* <div className="blog-post-list">
      {blogs.map((blog: any, index: any) => {
        return <BlogCard key={index} blog={blog} />;
      })}
    </div> */
}
