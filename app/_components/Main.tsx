"use client";
import dynamic from "next/dynamic";
import BirthdayCounter from "../Counter/Counter";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef } from "react";
import { TypingAnimation } from "@/components/magicui/terminal";

const BlurText = dynamic(() => import("../BlurText/BlurText"), { ssr: false });
const ElasticCursor = dynamic(() => import("../utils/ElasticCursor"), {
  ssr: false,
});

export default function Main() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black px-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid gap-y-4 md:gap-y-8 max-w-4xl text-center px-4 md:px-6">
          <div className="mx-auto aspect-square w-32 md:w-52 relative">
            <Image
              src="/profile.png"
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
              className="rounded-full md:rounded-md transition-opacity duration-300 ease-out"
            />
          </div>

          <BirthdayCounter
            birthDate="2006-07-20"
            fontSize={45}
            showAge={true}
            showMonths={true}
            showDays={true}
            showHours={true}
            textColor="#000000"
            fontWeight={800}
          />

          <ElasticCursor />
          <BlurText
            text="Fun fact: This is the time I'm currently living."
            delay={20}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="flex justify-center font-semibold opacity-60 text-sm md:text-xl text-black"
          />

          <div className="h-auto flex items-center justify-center px-8">
            <div className="max-w-2xl text-center">
              <BlurText
                text="   I'm a full-stack developer with a strong focus on front-end
                development. I care about creating smooth, user-friendly
                interfaces that are easy to use. I like using design systems
                to keep projects consistent and easy to maintain. I enjoy
                working with modern front-end frameworks that help me build
                features quickly."
                delay={20}
                className="font-semibold text-lg md:text-2xl lg:text-3xl flex justify-center text-gray-900 dark:text-white leading-relaxed"
              ></BlurText>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
