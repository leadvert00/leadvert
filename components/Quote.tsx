import React from 'react';
import CircleButtonLink from './CircleButtonLink';
import { BsArrowRight } from 'react-icons/bs';

const Quote = () => {
  return (
    <div className="quote-container flex flex-col space-y-4 md:spave-y-6 items-center">
      <div className="text-center w-full flex flex-col space-y-4  items-center">
        <div className="flex flex-col md:w-9/12 items-center space-y-0 md:space-y-2">
          <sup className="flex-none w-36 text-sm  bg-purple-100 p-1 tracking-wide">
            Robert A. Heinlein
          </sup>
          <h1 className="text-2xl md:text-5xl font-semibold">
            Everything is theoretically impossible, until it is done.
          </h1>
        </div>
        <div className="w-full md:w-10/12 flex flex-col space-y-6 md:space-y-8">
          <p className="md:text-center text-base md:px-8">
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
          to=""
          classNames="justify-center"
          icon={<BsArrowRight />}
        >
          Move along with us
        </CircleButtonLink>
      </div>
    </div>
  );
};

export default Quote;
