import Head from 'next/head';
import { motion as m } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

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
      .then((response: any) => {
        console.log(response);
      });

    // alert(`The name you entered was: ${email}`);
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
      className=" absolute top-0 left-0 right-0 w-full h-full signup-container
      bg-purple-50"
    >
      <main className="overflow-hidden w-full">
        <div className=" flex flex-col space-y-4 md:space-y-6 ">
          <div className="flex w-full">
            <div className="flex w-1/2">
              <div className="w-full my-16 space-y-12">
                <h1 className="leading-tight text-3xl md:text-5xl text-black ">
                  Get Started with Leadvert
                </h1>
                <form className="w-full space-y-4" onSubmit={handleSubmit}>
                  <div className="flex flex-col space-y-1 md:space-y-2">
                    <label
                      className=" tracking-wide text-gray-600 text-lg
                                  text-gray-800 font-bold"
                    >
                      Email address
                    </label>
                    <input
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      className="w-11/12 p-4 bg-white outline-none border-2
                                border-primary"
                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="focus-ring bg-gray-900 w-7/12 md:w-2/5 rounded
                                  hover:bg-primary  text-xl md:text-xl text-white text-center 
                                  p-4 md:px-4 md:py-2"
                    >
                      Get Started
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-1/2 bg-white absolute right-0 h-screen"></div>
          </div>
        </div>
      </main>
    </m.div>
  );
}
