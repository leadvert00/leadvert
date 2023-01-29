import Image from 'next/image';
import React from 'react';
import { createClient } from 'contentful';
import Team from '@/components/Team';
import { motion as m } from 'framer-motion';
import CircleButtonLink from '@/components/CircleButtonLink';
import { BsArrowRight } from 'react-icons/bs';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID!,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!
  });
  const resPerson = await client.getEntries({
    content_type: 'person'
  });
  const resAbout = await client.getEntries({
    content_type: 'about'
  });

  return {
    props: { members: resPerson.items, about: resAbout.items },
    revalidate: 2
  };
}

function About({ members, about }: any) {
 
  return (
    <div className="about-container mt-16 flex-col space-y-6 md:space-y-10">
      {about.map((ab: any, index: any) => {
        const { heading, body } = ab.fields;
        return (
          <m.div
            initial={{ opacity: 0 }}
            whileInView={{ y: [30, 0], opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            key={index}
            className="flex flex-col space-y-3 py-4"
          >
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold">{heading}</h1>
            </div>
            <div className="text-lg">{body}</div>
          </m.div>
        );
      })}

      <div className="flex flex-col space-y-3 py-4">
        <div>
          <h1 className="text-3xl md:text-5xl font-semibold">MEET THE TEAM</h1>
        </div>

        <div className="flex flex-col space-y-6">
          {members.map((member: any, index: any) => (
            <Team key={index} member={member} />
          ))}
        </div>
      </div>

      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ y: [30, 0], opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex flex flex-col space-y-8"
      >
        <p
          className="text-xl md:text-2xl tracking-wide bg-purple-50 p-2 leading-loose
         underline underline-offset-8"
        >
          The world is changing, and innovators are needed. That is one reason
          why we have to assist you in obtaining the education you actually
          desire and deserve.
        </p>
        <div className="flex  flex-col md:flex-row md:space-x-12">
          <CircleButtonLink to="/signup" icon={<BsArrowRight />}>
            Continue with Us
          </CircleButtonLink>
          <CircleButtonLink to="/contact" icon={<BsArrowRight />}>
            Contact Us Today
          </CircleButtonLink>
        </div>
      </m.div>
    </div>
  );
}

export default About;
