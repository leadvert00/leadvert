import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import LoaderOnButton from '@/components/LoaderOnButton';

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
    <div className="contact-container flex flex-col space-y-10 md:space-y-0 md:flex-row mt-12 md:mt-10 md:space-x-16">
      <div className="w-full md:w-8/12 flex flex-col space-y-8">
        <div className="space-y-4  text-2xl">
          <h1 className="leading-tight font-semibold text-3xl md:text-5xl text-black">
            Get In Touch
          </h1>
          <p className="w-full ">
            Fill in this form, we will be in touch with you shortly.
          </p>
        </div>
        <form
          ref={form}
          onSubmit={handleSubmit}
          className="flex flex-wrap md:gap-2 text-lg space-y-3"
        >
          <div className="flex flex-col md:flex-row w-full space-y-3 md:space-y-0 md:space-x-8">
            <div className="w-full md:w-1/2 flex flex-col space-y-1">
              <input
                placeholder="Name"
                type="text"
                required
                name="user_name"
                className="w-full p-3 focus:border-gray-800   bg-gray-100 
                              placeholder-gray-500 border rounded"
              />
            </div>
            <div className="w-full md:w-1/2  flex flex-col space-y-1">
              <input
                type="email"
                placeholder="Email Address"
                required
                name="user_email"
                className="w-full p-3 focus:border-gray-800   bg-gray-100 
                            placeholder-gray-500 border rounded"
              />
            </div>
          </div>
          <div className="w-full  flex flex-col space-y-1">
            <textarea
              required
              name="message"
              placeholder="Your message"
              rows={5}
              className="w-full p-3 focus:border-gray-800 bg-gray-100 
                            outline-none placeholder-gray-500 border-2 rounded"
            />
          </div>

          <div className="w-full flex ">
            {!loader ? (
              <button
                type="submit"
                className="focus-ring bg-gray-900 w-full rounded 
                            hover:bg-primary  md:w-72  text-xl md:text-xl text-white text-center 
                            capitalize  p-3 "
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
            <div className="w-full font-medium tracking-wide text-primary text-2xl">
              <p>Your message was sent successfully..</p>
            </div>
          )}
        </form>
      </div>
      <div className="w-full md:w-4/12 flex flex-col space-y-10">
        <div className="w-full flex-col space-y-3">
          <div className="text-slate-600">Phones:</div>
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
          <div className="text-slate-600">Email:</div>
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
          <div className="text-slate-600">Follow:</div>
        </div>
      </div>
    </div>
  );
}
