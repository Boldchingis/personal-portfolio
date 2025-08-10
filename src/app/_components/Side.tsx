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
    <div className="min-h-screen bg-[#f3f3f3] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-black blur-3xl" />
      </div>

      <div className="container-perfect relative z-10 section-spacing">
        <div
          ref={skillRef}
          className="min-h-screen flex flex-col justify-center items-center space-y-16 md:space-y-24"
        >
          {/* Title Section */}
          {isInView && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94],
                delay: 0.1
              }}
              className="text-center space-y-6"
            >
              <div className="inline-block relative">
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black mb-4 tracking-tighter">
                  TECH SKILLS
                </h2>
                
                {/* Animated underline */}
                <motion.div 
                  className="w-full h-1 bg-black transform rotate-1 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                />
              </div>
              
              {/* Optional subtitle */}
              <motion.p 
                className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                Technologies and tools I work with to bring ideas to life
              </motion.p>
            </motion.div>
          )}

          {/* Skills Cloud Section */}
          <div className="w-full flex-1 flex items-center justify-center">
            <SkillsCloud />
          </div>
        </div>
      </div>
    </div>
  );
}
