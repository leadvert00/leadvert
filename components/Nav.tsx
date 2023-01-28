import React, { useState } from 'react';
import { BiMenuAltRight, BiX } from 'react-icons/bi';
import { TfiClose } from 'react-icons/tfi';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

const Nav = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [sideBar, setSideBar] = useState<boolean>(false);
  let linksData = [
    { title: 'Home', link: '/' },
    { title: 'Blog', link: '/blog' },
    { title: 'About', link: '/about' }
  ];
  return (
    <nav
      role="navigation"
      className="z-50 nav-container fixed top-0 left-0 right-0 dark:border bg-white dark:bg-black dark:border-t-0 dark:border-l-0 dark:border-r-0 dark:border-slate-500   shadow-md"
    >
      <Link
        className="navbar-brand text-2xl"
        href="/"
        onClick={() => setSideBar(false)}
      >
        Leadvert
      </Link>
      <button
        className="text-primary"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        toggle
      </button>
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
        <ul className="nav-links space-x-10">
          {linksData.map((nl, index) => (
            <li key={index}>
              <Link
                key={index}
                href={nl.link}
                className={`nav-link text-base tracking-wide dark:text-white
                        hover:text-primary dark:hover:text-secondary
                        ${
                          router.pathname == nl.link ||
                          (router.pathname.includes(nl.link) && nl.link !== '/')
                            ? 'font-bold underline'
                            : ''
                        }
                      `}
              >
                <span> {nl.title}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex ml-4">
          <Link
            href="/contact"
            className={`flex nav-btn rounded 
                          text-white  text-lg px-4 py-2
                          ${
                            theme === 'dark'
                              ? 'bg-gray-800 hover:bg-gray-900'
                              : 'bg-gray-900 text-white hover:bg-primary'
                          }  
                          `}
          >
            Contact Us
          </Link>
        </div>
      </div>
      {sideBar && (
        <div className="sidebar fixed top-0 left-0 flex h-screen w-full lg:hidden">
          <div className="flex h-screen w-full flex-col">
            <div
              className={` flex-col space-y-12 
             ${
               theme === 'dark' ? 'sidebar-container-dark' : 'sidebar-container'
             }
            `}
            >
              <ul className="sidebar-links">
                {linksData.map((nl, index) => (
                  <li
                    key={index}
                    className="sidebar-link-item"
                    onClick={() => setSideBar(false)}
                  >
                    <Link
                      href={nl.link}
                      className={`sidebar-link tracking-wide text-2xl focus:text-primary font-medium
                      ${
                        router.pathname == nl.link ||
                        (router.pathname.includes(nl.link) && nl.link !== '/')
                          ? 'font-bold underline'
                          : ''
                      }
                      
                      `}
                    >
                      {nl.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                onClick={() => setSideBar(false)}
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
