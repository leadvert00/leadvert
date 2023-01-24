import React from 'react';
import Nav from './Nav';

const Layout = ({ children }: any) => {
  return (
    <div>
      <Nav />
      {children}
      <footer>..</footer>
    </div>
  );
};

export default Layout;
