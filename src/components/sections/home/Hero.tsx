// components/sections/Hero.tsx
"use client";

import { useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Image from "next/image";

const Hero: React.FC = () => {
  const [accessCode, setAccessCode] = useState("");

  return (
    <section className="py-16 mt-16">
      <div className="container mx-auto flex flex-col lg:flex-row items-start px-4 gap-8">
        <div className="px-4 text-center lg:text-start flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6 max-w-3xl mx-auto">
            Turn your assessments into success stories
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl">
            AI-powered skills and knowledge assessment platform, designed for
            educational institutions and organizations worldwide.
          </p>
          <div className="flex flex-col justify-center  sm:flex-row lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4 mb-16">
            <Button variant="primary" size="lg">
              Sign up - it's free
            </Button>
            <Button variant="secondary" size="lg">
              Learn more
            </Button>
          </div>

          {/* Test Taker Section */}
        </div>
        <div className="flex-1">
          <Image
            src="/assets/images/bg-hero.png"
            alt="Hero"
            width={20}
            height={20}
            unoptimized
            className="w-full h-auto rounded-2xl border-solid border-6 border-[rgba(0, 92, 173,.3)]"
          />
        </div>
      </div>
      <div className="bg-primary mt-8 ">
        <div className="container flex flex-col lg:flex-row justify-center items-center lg:gap-8 p-8  w-full  ">
          <div className="w-full text-white flex-1 text-center lg:text-left">
            <h2 className="text-4xl font-bold mb-2 ">Here to take a test?</h2>
            <p className=" mb-6 text-lg">
              No registration required. Enter your access code and start.
            </p>
          </div>
          <div className="flex border-solid   flex-col justify-end sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1 w-full">
            <div className="w-full flex flex-col lg:flex-row  lg:gap-4">
              <div className="w-full ">
                <Input
                  id="accessCode"
                  placeholder="Enter the access code"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value)}
                  className="grow"
                  placeHolderClassName="placeholder:text-white"
                />
              </div>
              <div className="w-full lg:w-[40%]">
                <Button variant="accent" size="md" className="w-full">
                  Start your test
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
