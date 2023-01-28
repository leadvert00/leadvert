import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import LoaderOnButton from '@/components/LoaderOnButton';
import { useTheme } from 'next-themes';

export async function getStaticProps() {
  return {
    props: {
      EMAIL_SERVICE_ID: process.env.EMAIL_SERVICE_ID || null,
      EMAIL_TEMPLATE_ID: process.env.EMAIL_TEMPLATE_ID || null,
      EMAIL_API_KEY: process.env.EMAIL_API_KEY || null
    }
  };
}

export default function Contact({
  EMAIL_SERVICE_ID,
  EMAIL_TEMPLATE_ID,
  EMAIL_API_KEY
}: any) {
  const { theme, setTheme } = useTheme();
  const [loader, setLoader] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleSubmit = (event: any) => {
    event.preventDefault();

    setLoader(true);

    emailjs
      .sendForm(
        EMAIL_SERVICE_ID,
        EMAIL_TEMPLATE_ID,
        form.current,
        EMAIL_API_KEY
      )
      .then(
        (result: any) => {
          setSuccess(true);
          setLoader(false);
          form.current.reset();
        },
        (error: any) => {
          console.log(error);
        }
      );
  };
  const form: any = useRef();
  return (
    <div className="contact-container flex flex-col space-y-10 md:space-y-0 md:flex-row mt-12 md:mt-4 md:space-x-16">
      <div className="w-full md:w-8/12 flex flex-col space-y-8">
        <div className="space-y-4  text-2xl">
          <h1 className="leading-tight font-semibold text-3xl md:text-5xl ">
            Get In Touch
          </h1>
          <p className="w-full ">
            Fill in this form, we will be in touch with you shortly.
          </p>
        </div>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-wrap md:gap-2 text-lg space-y-2"
        >
          <div className="flex flex-col md:flex-row w-full space-y-2 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 flex flex-col space-y-1">
              <input
                placeholder="Name"
                type="text"
                required
                name="user_name"
                className="w-full p-3 focus:border-gray-800   bg-gray-100 dark:bg-gray-700
                              placeholder-gray-500  dark:placeholder-slate-300  border rounded"
              />
            </div>
            <div className="w-full md:w-1/2  flex flex-col space-y-1">
              <input
                type="email"
                placeholder="Email Address"
                required
                name="user_email"
                className="w-full p-3 focus:border-gray-800   bg-gray-100 dark:bg-gray-700
                            placeholder-gray-500  dark:placeholder-slate-300  border rounded"
              />
            </div>
          </div>
          <div className="w-full  flex flex-col space-y-1">
            <textarea
              required
              name="message"
              placeholder="Your message"
              rows={5}
              className="w-full p-3 focus:border-gray-800 bg-gray-100 dark:bg-gray-700
                            outline-none placeholder-gray-500  dark:placeholder-slate-300 border-2 rounded"
            />
          </div>

          <div className="w-full flex ">
            {!loader ? (
              <button
                type="submit"
                className={`focus-ring w-full rounded 
                              md:w-72  text-xl md:text-xl 
                             text-center text-white
                            capitalize  p-3 
                            ${
                              theme === 'dark'
                                ? 'bg-gray-800 hover:bg-gray-900 '
                                : 'bg-gray-900 text-white hover:bg-primary'
                            }  
                            `}
              >
                Send message
              </button>
            ) : (
              <button
                type="submit"
                disabled
                className="focus-ring bg-gray-900  md:w-72  rounded 
                            hover:bg-primary  text-xl md:text-xl text-white text-center 
                            capitalize  p-3  opacity-50"
              >
                Submitting.. <LoaderOnButton />
              </button>
            )}
          </div>
          {success && (
            <div className="w-full font-medium tracking-wide text-primary dark:text-secondary text-2xl">
              <p>Your message was sent successfully..</p>
            </div>
          )}
        </form>
      </div>
      <div className="w-full md:w-4/12 flex flex-col space-y-10">
        <div className="w-full flex-col space-y-3">
          <div className="text-slate-700 dark:text-slate-200">Phones:</div>
          <div className="flex flex-col space-y-5">
            <a
              className="text-2xl"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="tel:+234 816 246 4393"
            >
              +234 816 246 4393
            </a>
            <a
              className="text-2xl"
              target="_blank"
              rel="noopener noreferrer nofollow"
              href="tel:+234 701 481 1757"
            >
              +234 701 481 1757
            </a>
          </div>
        </div>
        <div className="w-full flex-col space-y-3">
          <div className="text-slate-700  dark:text-slate-200">Email:</div>
          <div className="flex flex-col space-y-5">
            <a
              className="text-2xl underline hover:no-underline underline-offset-8"
              href="mailto:hi@leadvert.org"
            >
              hi@leadvert.org
            </a>
          </div>
        </div>
        <div className="w-full flex-col space-y-3">
          <div className="text-slate-700  dark:text-slate-200">Follow:</div>
        </div>
      </div>
    </div>
  );
}
