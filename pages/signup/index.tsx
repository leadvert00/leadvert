import Head from 'next/head';
import { motion as m } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Image from 'next/image';
import { Magic } from 'magic-sdk';
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
  const [loader, setLoader] = useState(false);

  const handleSubmit1 = (event: any) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email,
      name: '',
      career: '',
      affliation: '',
      research: '',
      country: ''
    };
    // fetch(`https://sheetdb.io/api/v1/3yko7v0zohb8v/search?email=${email}`)
    //   .then((resCheck) => resCheck.json())
    //   .then((resCheck) => {
    //     if (resCheck.length == 0) {
    //       axios
    //         .post(`https://sheetdb.io/api/v1/3yko7v0zohb8v`, data)
    //         .then((response: any) => {
    //           console.log(response);
    //         });
    //     }
    //     setTimeout(() => {
    //       router.push(`/signup/proceed?email=${email}`);
    //     }, 1000);
    //   });
    // setTimeout(() => {
    //   router.push(`/signup/proceed?email=${email}`);
    // }, 1000);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoader(true);
    let data = {
      email,
      name: '',
      career: '',
      affliation: '',
      research: '',
      country: ''
    };

    alert(process.env.MAGIC_API_KEY);
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
        <title>Get Started with Leadvert</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
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
                    {!loader ? (
                      <button
                        type="submit"
                        className="focus-ring bg-gray-900 w-7/12 md:w-2/5 rounded 
                                  hover:bg-primary  text-xl md:text-xl text-white  
                                  p-4 md:px-4 md:py-2"
                      >
                        Submit
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled
                        className="focus-ring bg-gray-900 w-7/12 md:w-2/5 rounded 
                                  hover:bg-primary  text-xl md:text-xl text-white  
                                  p-4 md:px-4 md:py-2  opacity-50"
                      >
                        Submitting..
                      </button>
                    )}
                  </div>
                </form>
                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="md:hidden"
                >
                  <Image alt="" width="400" height="400" src={`/reg.png`} />
                </m.div>
              </div>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-full md:w-1/2 bg-white  right-0 md:h-screen sign"
            >
              {/* */}
            </m.div>
          </div>
        </div>
      </main>
    </m.div>
  );
}
