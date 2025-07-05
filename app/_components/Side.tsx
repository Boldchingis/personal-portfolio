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
      className="max-w-5xl min-h-screen flex justify-center flex-col mx-auto mt-20 items-center md:mt-40 py-10 md:py-20"
    >
      {isInView && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center mb-32"
        >
          <div className="inline-block">
            <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter">
              TECH SKILLS
            </h2>
            <div className="w-full h-1 bg-black transform rotate-1"></div>
          </div>
        </motion.div>
      )}

      <SkillsCloud />
    </div>
  );
}
