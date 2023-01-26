import React from 'react';
import Nav from './Nav';
import { AnimatePresence } from 'framer-motion';

const Layout = ({ children }: any) => {
  return (
    <div className="layout">
      <Nav />
      <AnimatePresence exitBeforeEnter>{children}</AnimatePresence>
      <footer>..</footer>
    </div>
  );
};

export default Layout;
