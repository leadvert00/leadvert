import Link from 'next/link';
import React from 'react';

function Footer() {
  return (
    <div className="w-full bg-gray-100 border-t p-2 text-sm md:text-base flex justify-center space-x-1 md:space-x-4">
      <span>
        {' '}
        &copy; All right reserved. Leadvert {new Date().getFullYear()}{' '}
      </span>
      <span>-</span>
      <Link href="/contact">Contact Us</Link>
    </div>
  );
}

export default Footer;
