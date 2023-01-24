import React, { useState } from 'react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { TfiClose } from 'react-icons/tfi';
import Link from 'next/link';
const Nav = () => {
  const [sideBar, setSideBar] = useState<boolean>(false);
  let linksData = [
    { title: 'Blog', link: '/blog' },
    { title: 'About', link: '/' },
    { title: 'Write For Us', link: '/' }
  ];
  return (
    <nav className="nav-container fixed top-0 left-0 right-0 border bg-white  shadow-md">
      <Link
        className="navbar-brand text-2xl"
        href="/"
        onClick={() => setSideBar(false)}
      >
        Leadvert
      </Link>
      {!sideBar ? (
        <BiMenuAltRight
          className="cursor-pointer text-4xl lg:hidden"
          onClick={() => setSideBar(true)}
        />
      ) : (
        <TfiClose
          className="times z-50  cursor-pointer text-3xl"
          onClick={() => setSideBar(false)}
        />
      )}

      <div className="main-nav-container items-center justify-between ">
        <ul className="nav-links space-x-12">
          {linksData.map((nl, index) => (
            <li key={index}>
              <Link
                key={index}
                href={nl.link}
                className="nav-link text-base tracking-wide
                      font-normal hover:text-primary"
              >
                {nl.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex">
          <a
            href=""
            className="flex nav-btn bg-gray-900 rounded hover:bg-primary
                          text-white  text-lg px-4 py-2 "
          >
            Contact Us
          </a>
        </div>
      </div>
      {sideBar && (
        <div className="sidebar fixed top-0 left-0 flex h-screen w-full lg:hidden">
          <div className="flex h-screen w-full flex-col">
            <div className="sidebar-container flex-col space-y-12">
              <ul className="sidebar-links">
                {linksData.map((nl, index) => (
                  <li
                    key={index}
                    className="sidebar-link-item"
                    onClick={() => setSideBar(false)}
                  >
                    <Link
                      href={nl.link}
                      className="sidebar-link tracking-wide text-2xl focus:text-primary font-medium"
                    >
                      {nl.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href=""
                className="flex nav-btn bg-gray-900 rounded font-semibold
                            hover:bg-primary
                          text-white w-7/12 text-2xl px-4 py-2 "
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
