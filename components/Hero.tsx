import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { motion as m } from 'framer-motion';
import { useTheme } from 'next-themes';

const Hero = () => {
  const { theme, setTheme } = useTheme();

  const heroImageUrl =
    'https://images.unsplash.com/photo-1609348445429-8cf379ff9bf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80';
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.95, ease: 'easeOut' }}
      className={`w-full flex flex-col space-y-8 md:space-y-0 md:flex-row
      hero      
      `}
    >
      <div className="hero-content w-full md:w-3/5 flex flex-col space-y-4 mb-3 md:mb-0 md:space-y-8">
        <div>
          <h1 className="flex flex-col text-3xl md:text-6xl font-bold space-y-3 md:space-y-4">
            <span className="dark:text-gray-900">Enhance your</span>
            <span className="scrolling-words-container">
              <span className="scrolling-words-box">
                <ul className="text-primary dark:text-slate-500 ">
                  <li></li>
                  <li>Strategic guidance</li>
                  <li>Academic writing</li>
                  <li>Research consulting</li>
                  <li>Publication support</li>
                </ul>
              </span>
            </span>
          </h1>
        </div>
        <div className="space-y-6  md:space-y-10">
          <p className="text-lg w-full w-full md:w-11/12 text-gray-900">
            Leadvert is research and academic business startup led by founders
            who live, think and research in academia. We are open to students,
            academics, and early career researchers interested in making
            significant contributions to academia.
          </p>
          <div>
            <Link
              href="/about"
              className={` px-6 py-3  text-lg 
                        md:text-xl rounded-xl bg-gray-900 text-white
                        hover:bg-secondary
                        dark:bg-secondary  dark:hover:bg-orange-500
                        `}
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/5 hero-media">
        <Image
          alt="hero Image"
          width={500}
          height={200}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMAAAADA..."
          priority={true}
          src={`/hero.png`}
        />
      </div>
    </m.div>
  );
};

export default Hero;
