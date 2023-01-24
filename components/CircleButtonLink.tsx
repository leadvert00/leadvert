import Link from 'next/link';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
const CircleButtonLink = (prop: any) => {
  return (
    <Link
      href={prop.to}
      className={`${prop.classNames} flex space-x-4 md:space-x-6  font-medium text-xl items-center button-link`}
    >
      <span>{prop.children}</span>
      <span className="circle flex text-3xl">{prop.icon}</span>
    </Link>
  );
};

export default CircleButtonLink;
