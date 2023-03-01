import Link from 'next/link';
import { motion as m } from 'framer-motion';
import Head from 'next/head';
import Select from 'react-select';
import React, { useEffect, useId, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import LoaderOnButton from '@/components/LoaderOnButton';
import { useTheme } from 'next-themes';
import { now } from 'moment';

export const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.5,
      staggerChildren: 0.2
    }
  }
};

export const item = {
  hidden: { y: '100%' },
  show: { y: '0%', transition: { duration: 0.5 } }
};

const options = [
  { value: 'Undergradaute', label: 'Undergradaute' },
  { value: 'Postgraduate', label: 'Postgraduate' },
  { value: 'PhD/Postdoc', label: 'PhD/Postdoc' },
  { value: 'Early career researcher', label: 'Early career researcher' },
  { value: 'Mid career researcher', label: 'Mid career researcher' },
  { value: 'Professor/Senior researcer', label: 'Professor/Senior researcer' }
];

export default function Proceed() {
  const router = useRouter();

  let em = router.query.email;
  const [email, setEmail] = useState<any>('');
  const [lastName, setLastName] = useState<any>('');
  const [givenNames, setGivenNames] = useState<any>('');

  const [career, setCareer] = useState<any>({});
  const [affiliation, setAffilation] = useState<any>('');
  const [research, setResearch] = useState<any>('');
  const [country, setCountry] = useState<any>({
    label: 'Nigeria',
    value: 'Nigeria'
  });
  const [countryArr, setCountryArr] = useState<any>([]);
  const [done, setDone] = useState<any>(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((resp) => {
        setCountryArr(
          resp.map((r: any) => {
            return { label: r.name.common, value: r.name.common };
          })
        );
      });

    if (em) {
      setEmail(em);
    } else {
      setTimeout(() => {
        // router.push('/signup');
      }, 1000);
    }
  }, [em, email, setEmail, setCountryArr, router]);

  const handleCareer = (selectedOption: any) => {
    setCareer(selectedOption);
  };
  const handleCountry = (selectedOption: any) => {
    setCountry(selectedOption);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(country);
    setLoader(true);
    let data = {
      Timestamp: new Date().toJSON(),
      'Email Address': email,
      Surname: lastName,
      'Given names': givenNames,
      'Career stage': career.value,
      Affiliation: affiliation,
      'Research field': research,
      'Country of residence': country.value
    };

    axios
      .post(`https://sheetdb.io/api/v1/tgo693jq7vdvw`, data)
      .then((response: any) => {
        setDone(true);
        sessionStorage.setItem('email_done', email);
      });
  };

  useEffect(() => {
    console.log(em);
    if (sessionStorage.getItem('email_done') == em) {
      router.push('/');
    }
    if (done) {
      router.push('/signup/done');
    }
  }, [done, router]);
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <m.div
        animate={{ y: '0%' }}
        exit={{ opacity: 1 }}
        initial={{ y: '100%' }}
        transition={{
          duration: 0.75,
          ease: 'easeOut'
        }}
        className="md:hidden absolute top-0 left-0 right-0 bottom-0 w-full h-full signup-container xx
                  bg-orange-50"
      >
        <Head>
          <title>Get Started with Leadvert</title>
          <meta
            name="description"
            content="Subscribe for Leadvert Newsletter"
          />
          <link rel="icon" href="/favicon.ico" />
          <style global jsx>{`
            html,
            body {
              overflow-y: hidden;
            }
            .layout {
              overflow-y: auto;
              scroll-behavior: smooth;
              height: 100vh;
            }
          `}</style>
        </Head>
        <m.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className=" w-full flex justify-center pt-5"
        >
          <div
            className={`max-w-screen-xl flex flex-col mt-4 md:mt-0 space-y-8  p-4 md:p-12 `}
          >
            <div className="flex w-full">
              <h1 className="leading-tight text-3xl md:text-5xl">
                Let us have some basic info to remember you.
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-wrap gap-y-6"
            >
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Last name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800  outline-none border-2 rounded-xl font-medium
                              border-secondary"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Given names</label>
                <input
                  type="text"
                  value={givenNames}
                  onChange={(e) => setGivenNames(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800  outline-none border-2 rounded-xl font-medium
                              border-secondary"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg">Email</label>
                <input
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800 outline-none
                              border-2 rounded-xl tracking-wider font-medium
                              border-secondary "
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Career Stage..</label>
                <Select
                  defaultValue={career}
                  onChange={handleCareer}
                  instanceId={useId()}
                  value={{ label: career.label, value: career.value }}
                  styles={{
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected ? 'grey' : 'white',
                      color: 'black'
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: theme == 'dark' ? '' : 'white',

                      borderColor: state.isFocused ? 'grey' : '#FF9737',
                      padding: '0.45rem',
                      borderRadius: '0.25rem',
                      borderWidth: '0.01rem',
                      fontWeight: '500'
                    })
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#FF9737',
                      primary: 'black'
                    }
                  })}
                  options={options}
                  className="w-11/12 border-secondary  bg-gray-200 rounded-xl text-white"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg">Affiliation</label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={(e) => setAffilation(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800  outline-none border-2 rounded-xl font-medium
                                border-secondary"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg">Research Field</label>
                <input
                  type="text"
                  value={research}
                  onChange={(e) => setResearch(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800  outline-none border-2 rounded-xl font-medium
                                border-secondary"
                />
              </div>

              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg text-gray-800 dark:text-slate-500">
                  Country of Residence
                </label>
                <Select
                  defaultValue={{ label: 'Nigeria', value: 'Nigeria' }}
                  onChange={handleCountry}
                  instanceId={useId()}
                  styles={{
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected ? 'grey' : 'white',
                      color: 'black'
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: theme == 'dark' ? '' : 'white',

                      borderColor: state.isFocused ? 'grey' : '#FF9737',
                      padding: '0.45rem',
                      borderRadius: '0.25rem',
                      borderWidth: '0.01rem',
                      fontWeight: '500'
                    })
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#FF9737',
                      primary: 'black'
                    }
                  })}
                  options={countryArr}
                  className="w-11/12 border-secondary   bg-gray-200 rounded-xl text-white"
                />
              </div>

              <div className="flex w-full md:w-1/3 flex-col mt-4 space-y-1 md:space-y-1">
                {!loader ? (
                  <button
                    type="submit"
                    className="focus-ring bg-gray-900 w-11/12 md:w-3/5 rounded
                                  hover:bg-primary  text-xl md:text-xl text-white text-center 
                                  p-4 md:px-4 md:py-2
                                  dark:bg-secondary  dark:hover:bg-orange-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    disabled
                    className="focus-ring bg-gray-900 w-11/12 md:w-3/5 rounded
                            hover:bg-primary  text-xl md:text-xl text-white text-center 
                            p-4 md:px-4 md:py-2  opacity-50"
                  >
                    Submitting .. <LoaderOnButton />
                  </button>
                )}
              </div>
            </form>
          </div>
        </m.main>
      </m.div>
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, ease: 'easeOut' }}
        className="hidden md:flex absolute top-0 left-0 right-0 bottom-0 w-full h-full signup-container xx
                  "
      >
        <Head>
          <title>Get Started with Leadvert</title>
          <meta
            name="description"
            content="Subscribe for Leadvert Newsletter"
          />
          <link rel="icon" href="/favicon.ico" />
          <style global jsx>{`
            html,
            body {
              overflow-y: hidden;
            }
            .layout {
              overflow-y: auto;
              scroll-behavior: smooth;
              height: 100vh;
            }
          `}</style>
        </Head>
        <m.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className=" w-full flex justify-center pt-5"
        >
          <div className="max-w-screen-xl flex flex-col mt-4 md:mt-0 space-y-8 p-4 md:p-12 ">
            <div className="flex w-full">
              <h1 className="leading-tight text-3xl md:text-5xl">
                Let us have some basic about you.
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-wrap gap-y-6"
            >
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg">Last name</label>
                <input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800 outline-none border-2 rounded-xl font-medium
                              border-secondary dark:focus:border-gray-300"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Given names</label>
                <input
                  type="text"
                  value={givenNames}
                  onChange={(e) => setGivenNames(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800  outline-none border-2 rounded-xl font-medium
                              border-secondary"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Email</label>
                <input
                  disabled
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800  outline-none
                              border-2 rounded-xl tracking-wider font-medium
                              border-secondary "
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg">Career Stage</label>
                <Select
                  value={{ label: career.label, value: career.value }}
                  onChange={handleCareer}
                  instanceId={useId()}
                  styles={{
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected ? 'grey' : 'white',
                      color: 'black'
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: theme == 'dark' ? '' : 'white',

                      borderColor: state.isFocused ? 'grey' : '#FF9737',
                      padding: '0.45rem',
                      borderRadius: '0.25rem',
                      borderWidth: '0.01rem',
                      fontWeight: '500'
                    })
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#FF9737',
                      primary: 'black'
                    }
                  })}
                  options={options}
                  className="w-11/12 border-secondary bg-gray-200 rounded-xl text-white"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Affiliation</label>
                <input
                  value={affiliation}
                  onChange={(e) => setAffilation(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800 outline-none border-2 rounded-xl font-medium
                                border-secondary"
                />
              </div>
              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg ">Research Field</label>
                <input
                  value={research}
                  onChange={(e) => setResearch(e.target.value)}
                  className="w-11/12 p-3 focus:border-gray-800 outline-none border-2 rounded-xl font-medium
                                border-secondary  dark:focus:border-gray-300"
                />
              </div>

              <div className="flex w-full md:w-1/3 flex-col  space-y-1 md:space-y-1">
                <label className="inline-block text-lg text-gray-800 dark:text-slate-500">
                  Country of Residence
                </label>
                <Select
                  defaultValue={{ label: 'Nigeria', value: 'Nigeria' }}
                  onChange={handleCountry}
                  instanceId={useId()}
                  styles={{
                    option: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: state.isSelected ? 'grey' : 'white',
                      color: 'black'
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: theme == 'dark' ? '' : 'white',

                      borderColor: state.isFocused ? 'grey' : '#FF9737',
                      padding: '0.45rem',
                      borderRadius: '0.25rem',
                      borderWidth: '0.01rem',
                      fontWeight: '500'
                    })
                  }}
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#FF9737',
                      primary: 'black'
                    }
                  })}
                  options={countryArr}
                  className="w-11/12 border-secondary bg-gray-200 rounded-xl text-white"
                />
              </div>

              <div className="flex w-full md:w-1/3 flex-col mt-4 space-y-1 md:space-y-1">
                {!loader ? (
                  <button
                    type="submit"
                    className="focus-ring bg-gray-900 w-7/12 md:w-3/5 rounded
                                  hover:bg-primary  text-xl md:text-xl text-white text-center 
                                  p-4 md:px-4 md:py-2
                                  dark:bg-secondary  dark:hover:bg-orange-500"
                  >
                    Submit
                  </button>
                ) : (
                  <button
                    disabled
                    className="focus-ring bg-gray-900 w-7/12 md:w-3/5 rounded
                        hover:bg-primary  text-xl md:text-xl text-white text-center 
                        p-4 md:px-4 md:py-2 opacity-50"
                  >
                    Submitting .. <LoaderOnButton />
                  </button>
                )}
              </div>
            </form>
          </div>
        </m.main>
      </m.div>
    </div>
  );
}
