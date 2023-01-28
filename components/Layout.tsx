import React from 'react';
import Footer from './Footer';
import Nav from './Nav';

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Nav />
      {children}
      <Footer></Footer>
    </div>
  );
};

export default Layout;
