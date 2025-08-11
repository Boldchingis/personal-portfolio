"use client";
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";
import { useRef } from "react";
import { TypingAnimation } from "@/components/magicui/terminal";

export default function Main() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  const transitionWithDelay = (delay = 0) => ({
    duration: 0.45,
    delay,
    ease: easeOut,
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black relative overflow-hidden flex flex-col justify-center">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-black blur-3xl" />
      </div>

      {/* Content */}
      <div ref={containerRef} className="container mx-auto px-4 py-16 sm:py-20 lg:py-28 relative z-10">
        {/* Title */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
            className="text-center space-y-4 mb-10 sm:mb-14 lg:mb-20"
          >
            <div className="inline-block relative">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter">
                ABOUT ME
              </h2>
              <motion.div
                className="w-full h-1 bg-black transform rotate-1 rounded-full"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </div>
            <motion.p
              className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              about me bla bla
            </motion.p>
          </motion.div>
        )}

        {/* Profile + Description */}
        <motion.div
          className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={transitionWithDelay(0.05)}
        >
          {/* Profile Image */}
          <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 flex-shrink-0">
            <Image
              src="/profile.png"
              alt="Profile Image"
              fill
              className="rounded-2xl shadow-xl object-cover"
              priority
              sizes="(max-width: 1024px) 160px, 224px"
            />
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={transitionWithDelay(0.1)}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 shadow-lg border border-black/10 max-w-3xl"
          >
            <TypingAnimation
              className="font-semibold text-lg sm:text-xl lg:text-2xl text-gray-900 leading-relaxed"
              duration={3}
              delay={150}
            >
              I'm a full-stack developer with a focus on front-end development. I care about
              building smooth, user-friendly interfaces that are easy to navigate. I enjoy working
              with modern front-end frameworks to bring ideas to life quickly and effectively.
            </TypingAnimation>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
