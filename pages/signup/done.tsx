import React, { useEffect } from 'react';
import { motion as m } from 'framer-motion';
import { Router, useRouter } from 'next/router';
function Done() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 4000);
  }, [router]);
  return (
    <m.div
      animate={{ y: '0%' }}
      exit={{ opacity: 1 }}
      initial={{ y: '100%' }}
      transition={{
        duration: 0.75,
        ease: 'easeOut'
      }}
      className="mt-4 absolute top-0 left-0 right-0 bottom-0 w-full h-full signup-container
      bg-purple-50 flex items-center justify-center flex flex-col space-y-2"
    >
      <h2 className="text-6xl tracking-wide font-semibold">Done</h2>
      <p className="text-lg">You will now receive Leadvert newsletters..</p>
    </m.div>
  );
}

export default Done;
