import React, { useEffect } from 'react';
import { useAnimation, motion as m } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CircleButtonLink from './CircleButtonLink';
import { BsArrowRight } from 'react-icons/bs';

const squareVariants = {
  visible: { opacity: 1, scale: 1, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 1 }
};

const Quote = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ y: [50, 0], opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="quote-container relative flex flex-col space-y-4 md:spave-y-6 items-center"
    >
      <div className="text-center w-full flex flex-col space-y-4  items-center">
        <div className="flex flex-col md:w-9/12 items-center space-y-0 md:space-y-2">
          <sup className="flex-none w-36 text-sm  bg-brand font-medium p-1 tracking-wide">
            Robert A. Heinlein
          </sup>
          <h1 className="text-2xl md:text-5xl font-semibold">
            Everything is theoretically impossible, until it is done.
          </h1>
        </div>
        <div className="w-full md:w-11/12 flex flex-col space-y-6 md:space-y-8">
          <p className="md:text-center text-base md:text-lg md:px-8">
            We have progressively made a difference in academia over the last
            two years. We believe that the only way to find opportunities in
            life is to be curious and eager to explore the unknown. Our experts
            will clarify concepts for developing your creative thinking capacity
            in applications of creativity in the modern world. By implementing
            our strategies and techniques, we help you become extraordinary by
            allowing your creativity to flow freely through you to achieve your
            goal.
          </p>
        </div>
      </div>
      <div className="flex w-full justify-center ">
        <CircleButtonLink
          to="/signup"
          classNames="justify-center"
          icon={<BsArrowRight />}
        >
          Move along with us
        </CircleButtonLink>
      </div>
    </m.div>
  );
};

export default Quote;
