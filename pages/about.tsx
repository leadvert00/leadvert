import Image from 'next/image';
import React from 'react';
import { BsLinkedin } from 'react-icons/bs';
import { createClient } from 'contentful';
import Team from '@/components/Team';

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
  console.log(about);
  return (
    <div className="about-container mt-16 flex-col space-y-6 md:space-y-10">
      {about.map((ab: any, index: any) => {
        const { heading, body } = ab.fields;
        return (
          <div key={index} className="flex flex-col space-y-3 py-4">
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold">{heading}</h1>
            </div>
            <div className="text-lg">{body}</div>
          </div>
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
    </div>
  );
}

export default About;
