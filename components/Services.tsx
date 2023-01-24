import React from 'react';
import { HiOutlineAcademicCap } from 'react-icons/hi';
import { GiArchiveResearch } from 'react-icons/gi';
import { GiWorld } from 'react-icons/gi';
import { MdEditNote } from 'react-icons/md';
import { GiTeacher } from 'react-icons/gi';
import { RiGuideLine } from 'react-icons/ri';
import CircleButtonLink from './CircleButtonLink';
import { BsArrowRight } from 'react-icons/bs';

const arr = [
  {
    title: 'Academic Writing',
    icon: <HiOutlineAcademicCap />,
    description: `We are committed to providing you with excellent academic papers for your purpose.`
  },
  {
    title: 'Research Consulting',
    icon: <GiArchiveResearch />,
    description:
      'We allow you to leverage our expertise in qualitative research design and execution.'
  },
  {
    title: 'Publication Support',
    icon: <GiWorld />,
    description: `We make it easy for you to publish your content from idea to finished product.`
  },
  {
    title: `Editorial Service`,
    icon: <MdEditNote />,
    description: `We provide editorial support to assist you in producing the finest content possible.`
  },
  {
    title: `Graduate Admission`,
    icon: <GiTeacher />,
    description: `We offer academic assistance as you apply for admission to any institution in the globe.`
  },
  {
    title: `Strategic Guidiance`,
    icon: <RiGuideLine />,
    description: `We give information on the right strategy you need to accomplish your academic mission. `
  }
];
const Services = () => {
  return (
    <div className="service-container  space-y-4 md:space-y-6 bg-white">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 ">
        <div className="w-full md:w-3/12 truncate">
          <sup className="text-secondary font-medium tracking-wider text-lg">
            Why Choose Us?
          </sup>
          <h2 className="text-2xl md:text-5xl font-semibold w-full ">
            We are connected because...
          </h2>
        </div>
        <div className="w-full md:w-9/12 flex space-y-4 md:space-y-0 flex-wrap md:gap-4 md:gap-y-5">
          {arr.map((x, index) => (
            <div
              className="service-card hover:opacity-80 py-4 px-2 space-y-2 shadow-md border flex flex-col items-center 
              justify-center m-1"
              key={index}
            >
              <div className="box text-4xl relative p-4 bg-gray-800 text-white rounded-full">
                {x.icon}
                <span className="icon-dot"></span>
              </div>
              <h3 className="text-xl text-center font-semibold">{x.title}</h3>
              <p className="text-center ">{x.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-full  justify-center">
        <CircleButtonLink
          to=""
          classNames="justify-center"
          icon={<BsArrowRight />}
        >
          Connect With Us
        </CircleButtonLink>
      </div>
    </div>
  );
};

export default Services;
