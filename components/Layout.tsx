import React from 'react';
import Nav from './Nav';

const Layout = ({ children }: any) => {
  return (
    <div>
      <Nav />
      {children}
      <footer className='fixed bottom-0 left-0 right-0'>..</footer>
    </div>
  );
};

export default Layout;
