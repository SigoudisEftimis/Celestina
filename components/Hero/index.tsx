"use client";
import Image from "next/image";
import { useState } from "react";
import FileUpload from "../widgets/FileUpload";
const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-12 pt-20 md:pt-28 xl:pb-20 xl:pt-36">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className=" xl:gap-32.5">
            <div className="mb-10 w-full text-center  lg:mb-0 lg:text-left">
              <h1 className="mb-5 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl xl:text-hero">
                Convert anything in{" "}
                <span className="relative inline-block  text-primary before:absolute before:bottom-1 before:left-0 before:-z-1 before:h-2 before:w-full before:bg-titlebg dark:before:bg-titlebgdark sm:before:h-3">
                  Seconds
                </span>
              </h1>

              <p className="text-center text-sm sm:text-base">
                Support for multiple formats and maximum efficiency, all in one
                place.
              </p>
            </div>

            <div className="mx-auto my-5 block w-full max-w-xl justify-center">
              <FileUpload />
            </div>
            <div className="mx-auto mt-15 block w-full max-w-2xl justify-center text-center">
              <h4 className="text-xs font-thin">
                Create an account and enjoy full benefits{" "}
                <a className="text-primary" href="/auth/signin">
                  Sign in
                </a>
              </h4>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
