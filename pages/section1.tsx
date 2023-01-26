import React from 'react';
import { motion as m } from 'framer-motion';

function section1() {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.75, ease: 'easeOut' }}
      exit={{ opacity: 0 }}
      className="absolute top-0 left-0 w-full h-full bg-blue-900"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, obcaecati
      commodi corporis facere eligendi, explicabo minima sint earum enim cumque
      neque consequatur beatae perspiciatis provident? Eos error quas autem
      eveniet!
    </m.div>
  );
}

export default section1;
