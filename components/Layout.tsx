import React from 'react';
import Nav from './Nav';

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Nav />
      {children}
      <footer>..</footer>
    </div>
  );
};

export default Layout;
