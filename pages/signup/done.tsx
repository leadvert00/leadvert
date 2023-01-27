import React, { useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { Router, useRouter } from 'next/router';
import Image from 'next/image';
function Done() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 5000);
  }, [router]);
  return (
    <>
      <m.div
        animate={{ y: '0%' }}
        exit={{ opacity: 1 }}
        initial={{ y: '100%' }}
        transition={{ duration: 1 }}
        className="md:hidden w-full flex-col justify-center items-center h-full"
      >
        <div className="flex w-full flex-col  bg-white p-2 justify-center  mt-28">
          <div className="flex flex-col items-center space-x-4">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-full"
            >
              <Image alt="" width="400" height="400" src={`/done.png`} />
            </m.div>{' '}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="flex flex-col space-y-2 w-full items-center justify-center"
            >
              <h2 className="text-6xl tracking-wide font-semibold">Done</h2>
              <p className="text-xl text-center">
                You will now receive Leadvert newsletters..
              </p>
            </m.div>
          </div>
        </div>
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="hidden w-full md:flex justify-center items-center h-full"
      >
        <div className="flex w-7/12  bg-white p-4 justify-center  mt-28">
          <div className="flex items-center space-x-4 border  shadow-xl">
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="w-1/2"
            >
              <Image alt="" width="400" height="400" src={`/done.png`} />
            </m.div>{' '}
            <div className="flex flex-col space-y-2 w-1/2">
              <h2 className="text-6xl tracking-wide font-semibold">Done</h2>
              <p className="text-lg pr-4">
                You will now receive Leadvert newsletters..
              </p>
            </div>
          </div>
        </div>
      </m.div>
    </>
  );
}

export default Done;
