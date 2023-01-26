import Head from 'next/head';
import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
};

export const item = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.5 } }
};

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const handleSubmit = (event: any) => {
    event.preventDefault();
    router.push(`/signup/proceed?email=${email}`);
    let data = {
      email,
      name: '',
      career: '',
      affliation: '',
      research: '',
      country: ''
    };
    axios
      .post(
        `https://sheet.best/api/sheets/53fac95b-414c-4bf0-a179-b0f33cceb5ca`,
        data
      )
      .then((response: any) => {});
  };
  const d = new Date();
  const styles = {
    myComponent: {
      fontSize: 200
    }
  };
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      className=" absolute top-0 left-0 right-0 w-full h-full signup-container xx
      bg-purple-50"
    >
      <Head>
        <title>Get Started with Leadvertxx</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <style global jsx>{`
          html,
          body {
            overflow-y: hidden;
          }
          .layout {
            overflow-y: auto;
            scroll-behavior: smooth;
            height: 100vh;
          }
        `}</style>
      </Head>
      <main className="overflow-hidden w-full">
        <div className=" flex flex-col space-y-4 md:space-y-6 ">
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex w-full md:w-1/2">
              <div className="w-full my-16  space-y-6 md:space-y-12">
                <h1 className="leading-tight text-3xl md:text-5xl text-black ">
                  Get Started with Leadvert
                </h1>
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-1 md:space-y-1">
                    <label className="inline-block text-lg text-gray-800 dark:text-slate-500">
                      Email address
                    </label>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-11/12 p-4 bg-white  text-lg outline-none border-2 font-medium
                                border-primary"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="focus-ring bg-gray-900 w-7/12 md:w-2/5 rounded 
                                  hover:bg-primary  text-xl md:text-xl text-white  
                                  p-4 md:px-4 md:py-2"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <div className="md:hidden">
                  <Image alt="" width="400" height="400" src={`/reg.png`} />
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-white  right-0 md:h-screen sign">
              {/* */}
            </div>
          </div>
        </div>
      </main>
    </m.div>
  );
}
