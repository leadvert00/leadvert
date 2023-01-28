import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <footer
      role="navigation"
      className="w-full  border-t dark:border-slate-500 p-2 text-sm md:text-base flex justify-center space-x-1 md:space-x-4"
    >
      <span>
        {' '}
        &copy; All right reserved. Leadvert {new Date().getFullYear()}{' '}
      </span>
      <span>-</span>
      <Link href="/contact">Contact Us</Link>
    </footer>
  );
}

export default Footer;
