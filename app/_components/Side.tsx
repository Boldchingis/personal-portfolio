"use client";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { useRef } from "react";

const SkillsCloud = dynamic(() => import("./TechSkill"), {
  ssr: false,
});

export default function TechSkillsSection() {
  const skillRef = useRef(null);
  const isInView = useInView(skillRef, { once: true });

  return (
    <div
      ref={skillRef}
      className="max-w-5xl h-[130vh] flex justify-center flex-col  mx-auto mt-20 items-center md:mt-40 pb-10 md:pb-20"
    >
      {isInView && (
        <AnimatedText
          className="font-extrabold text-center mb-6 md:mb-12 text-2xl md:text-4xl text-black"
          text="TECH SKILLS"
        />
      )}
      <SkillsCloud />
    </div>
  );
}