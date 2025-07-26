"use client";
import React, { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HeroSection = () => {
  const router = useRouter();
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100; // Adjust this value as needed

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-center w-full pt-36 md:pt-48 space-y-2 ">
        <h1 className="text-center text-3xl md:text-5xl font-bold gradient-title gradient">
          Your AI Powered Career Companion For <br /> Professional Success
        </h1>
        <p className="text-center text-muted-foreground flex mx-auto w-lg max-w-full">
          Advance your career with personal guidance, interview prep, and
          AI-powered tools for job success
        </p>
      </div>

      <div className="flex justify-center gap-4 mt-3">
        <Button
          onClick={() => {
            router.push("/onboarding");
            console.log("clicked");
          }}
          size="lg"
          className="px-8 cursor-pointer"
        >
          Get Started
        </Button>

        <Button
          onClick={() => router.push("/about")}
          size="lg"
          variant="outline"
          className="px-8 cursor-pointer"
        >
          Learn More
        </Button>
      </div>

      <div className="hero-image-wrapper">
        <div ref={imageRef} className="hero-image">
          <Image
            priority
            src="/banner.jpeg"
            width={1280 * 2}
            height={720 * 2}
            alt="banner"
            className="w-[80%] mx-auto object-cover mb-6"
          />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
