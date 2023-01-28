import Image from 'next/image';
import { BLOCKS } from '@contentful/rich-text-types';
import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { motion as m } from 'framer-motion';

const RICHTEXT_OPTIONS = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node: any, children: any) => (
      <p className="break-words mb-2">{children}</p>
    )
  }
};
function Team({ member }: any) {
  const { image, name, coach, longBio, linkedin } = member.fields;
  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ y: [30, 0], opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="flex border-t  py-4 flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-8 "
    >
      <div className="w-7/12 md:w-3/12">
        <Image
          src={`https:${image.fields.file.url}`}
          className="rounded"
          alt="jimoh"
          width="500"
          height="500"
        />
      </div>
      <div className="w-full md:w-9/12 space-y-4">
        <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row items-center">
          <div className="w-full flex flex-col space-y-1 md:w-3/5">
            <div className="uppercase text-sm font-medium">{coach}</div>
            <h3 className="text-3xl font-semibold">{name}</h3>
          </div>
          <div className="w-full md:w-2/5">
            <a
              target="_blank"
              className="tracking-wide w-24 text-xs text-blue-800 hover:underline"
              href={linkedin}
              rel="noopener noreferrer"
            >
              <BsLinkedin className="text-4xl md:text-4xl" />
            </a>
          </div>
        </div>
        <div className="space-y-2">
          {documentToReactComponents(longBio, RICHTEXT_OPTIONS)}
        </div>
      </div>
    </m.div>
  );
}

export default Team;
