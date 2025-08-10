"use client";
import BirthdayCounter from "../Counter/Counter";
import Image from "next/image";
import { motion, useInView, easeOut } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { TypingAnimation } from "@/components/magicui/terminal";

export default function Main() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.3,
    margin: "-100px"
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation config adjusted for mobile
  const animDuration = isMobile ? 0 : 0.45;
  const animDelayStart = isMobile ? 0 : 0.05;

  const transitionWithDelay = (delay = animDelayStart) => ({
    duration: animDuration,
    delay,
    ease: easeOut, // Use a valid easing function from framer-motion
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-black blur-3xl" />
        <div className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-black blur-3xl" />
      </div>

      <div ref={containerRef} className="container mx-auto px-4 relative z-10 py-8">
        <div className="min-h-screen flex items-center justify-center">
          <div className="max-w-6xl w-full">
            
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <div className="flex flex-col items-center space-y-6">
                
                {/* Profile Image & Birthday Counter */}
                <motion.div 
                  className="w-full flex items-start justify-between gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={transitionWithDelay(0)}
                >
                  {/* Profile Image */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <Image
                      src="/profile.png"
                      alt="Profile Image"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      priority
                      sizes="(max-width: 640px) 96px, 112px"
                    />
                  </div>

                  {/* Birthday Counter */}
                  <div className={`flex-1 min-w-0
                    bg-white/95 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200/50
                    ${isMobile ? "" : "backdrop-blur-sm"}`}
                  >
                    <BirthdayCounter
                      birthDate="2006-07-20"
                      fontSize={24}
                      showAge
                      showMonths
                      showDays
                      showHours
                      showMinutes
                      showSeconds
                      textColor="#000000"
                      fontWeight={800}
                    />
                  </div>
                </motion.div>

                {/* Fun Fact */}
                <motion.div 
                  className="text-center px-4 w-full"
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={transitionWithDelay(0.05)}
                >
                  {isMobile ? (
                    <p className="font-semibold opacity-70 text-sm text-black leading-relaxed">
                      Fun fact: This is my total lifespan right now. 😂
                    </p>
                  ) : (
                    <TypingAnimation
                      className="font-semibold opacity-70 text-sm text-black leading-relaxed"
                      duration={2}
                      delay={100}
                    >
                      Fun fact: This is my total lifespan right now. 😂
                    </TypingAnimation>
                  )}
                </motion.div>

                {/* Description */}
                <motion.div 
                  className="w-full px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={transitionWithDelay(0.1)}
                >
                  <div className={`bg-white/80 rounded-2xl p-4 sm:p-5 shadow-lg border border-black/10
                    ${isMobile ? "" : "backdrop-blur-sm"}`}
                  >
                    {isMobile ? (
                      <p className="font-semibold text-xl sm:text-base text-gray-900 leading-relaxed">
                        I'm a full-stack developer with a focus on front-end development. I care about building smooth, user-friendly interfaces that are easy to navigate. I enjoy working with modern front-end frameworks to bring ideas to life quickly and effectively.
                      </p>
                    ) : (
                      <TypingAnimation
                        className="font-semibold text-xl sm:text-base text-gray-900 leading-relaxed"
                        duration={3}
                        delay={150}
                      >
                        I'm a full-stack developer with a focus on front-end development. I care about building smooth, user-friendly interfaces that are easy to navigate. I enjoy working with modern front-end frameworks to bring ideas to life quickly and effectively.
                      </TypingAnimation>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column */}
              <motion.div 
                className="lg:col-span-5 space-y-8"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={transitionWithDelay(0)}
              >
                {/* Profile Image */}
                <div className="relative mx-auto aspect-square w-48">
                  <Image
                    src="/profile.png"
                    alt="Profile Image"
                    fill
                    className="rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-300 object-cover"
                    priority
                    sizes="192px"
                  />
                </div>

                {/* Birthday Counter */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={transitionWithDelay(0.05)}
                >
                  <div className="absolute -inset-2 bg-white/50 backdrop-blur-sm rounded-xl transform -rotate-1"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10">
                    <BirthdayCounter
                      birthDate="2006-07-20"
                      fontSize={32}
                      showAge
                      showMonths
                      showDays
                      showHours
                      textColor="#000000"
                      fontWeight={800}
                    />
                  </div>
                </motion.div>

                {/* Fun Fact */}
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={transitionWithDelay(0.1)}
                >
                  <TypingAnimation
                    className="font-semibold opacity-70 text-lg text-black leading-relaxed"
                    duration={3}
                    delay={100}
                  >
                    Fun fact: This is my total lifespan right now. 😂
                  </TypingAnimation>
                </motion.div>
              </motion.div>

              {/* Right Column */}
              <motion.div 
                className="lg:col-span-7 space-y-12"
                initial={{ opacity: 0, x: 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={transitionWithDelay(0.05)}
              >
                {/* Description */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={transitionWithDelay(0.1)}
                  className="relative"
                >
                  <div className="absolute -inset-4 bg-white/30 backdrop-blur-sm rounded-2xl transform rotate-1"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-black/10">
                    <TypingAnimation
                      className="font-semibold text-2xl text-gray-900 leading-relaxed"
                      duration={4}
                      delay={150}
                    >
                      I'm a full-stack developer with a focus on front-end development. I care about building smooth, user-friendly interfaces that are easy to navigate. I enjoy working with modern front-end frameworks to bring ideas to life quickly and effectively.
                    </TypingAnimation>
                  </div>
                </motion.div>

                {/* Decorative line */}
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={transitionWithDelay(0.15)}
                >
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                  <div className="w-2 h-2 bg-black rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/20 to-transparent"></div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
