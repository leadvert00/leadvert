import Link from 'next/link';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
const NotFound = () => {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 4000);
  }, []);
  return (
    <div className="not-found">
      <h1>Not Found</h1>
      <p>Page not found..</p>
      <p>
        Redirect to <Link href="/">HomePage</Link> for more..
      </p>
    </div>
  );
};

export default NotFound;
