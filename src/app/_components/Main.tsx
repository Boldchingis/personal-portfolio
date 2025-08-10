"use client";
import BirthdayCounter from "../Counter/Counter";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TypingAnimation } from "@/components/magicui/terminal";

export default function Main() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.3,
    margin: "-100px"
  });

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-black relative overflow-hidden">
      {/* Enhanced background decorative elements */}
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
                
                {/* Profile Image and Birthday Counter Row - Mobile */}
                <motion.div 
                  className="w-full flex items-start justify-between gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {/* Profile Image - Left Side */}
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <Image
                      src="/profile.png"
                      alt="Profile Image"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      priority
                      sizes="(max-width: 640px) 96px, 112px"
                      onError={(e) => {
                        console.error('Image failed to load:', e);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  {/* Birthday Counter - Right Side */}
                  <div className="flex-1 min-w-0">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 sm:p-4 shadow-sm border border-gray-200/50">
                      <BirthdayCounter
                        birthDate="2006-07-20"
                        fontSize={24}
                        showAge={true}
                        showMonths={true}
                        showDays={true}
                        showHours={true}
                        showMinutes={true}
                        showSeconds={true}
                        textColor="#000000"
                        fontWeight={800}
                      />
                    </div>
                  </div>
                </motion.div>

                {/* Fun Fact - Mobile */}
                <motion.div 
                  className="text-center px-4 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <TypingAnimation
                    className="font-semibold opacity-70 text-sm text-black leading-relaxed"
                    duration={5}
                    delay={600}
                  >
                    Fun fact: This is my total lifespan right now. 😂
                  </TypingAnimation>
                </motion.div>

                {/* Main Description - Mobile */}
                <motion.div 
                  className="w-full px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-5 shadow-lg border border-black/10">
                    <TypingAnimation
                      className="font-semibold text-xl sm:text-base text-gray-900 leading-relaxed"
                      duration={10}
                      delay={800}
                    >
                      I'm a full-stack developer with a focus on front-end development. I care about building smooth, user-friendly interfaces that are easy to navigate. I enjoy working with modern front-end frameworks to bring ideas to life quickly and effectively.
                    </TypingAnimation>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column - Profile & Counter */}
              <motion.div 
                className="lg:col-span-5 space-y-8"
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Profile Image with unique styling */}
                <div className="relative">
                  <div className="relative mx-auto aspect-square w-48">
                    <Image
                      src="/profile.png"
                      alt="Profile Image"
                      fill
                      className="rounded-2xl shadow-xl transform -rotate-1 hover:rotate-0 transition-transform duration-500 object-cover"
                      priority
                      sizes="192px"
                      onError={(e) => {
                        console.error('Desktop image failed to load:', e);
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                </div>

                {/* Birthday Counter with enhanced styling */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className="absolute -inset-2 bg-white/50 backdrop-blur-sm rounded-xl transform -rotate-1"></div>
                  <div className="relative bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-black/10">
                    <BirthdayCounter
                      birthDate="2006-07-20"
                      fontSize={32}
                      showAge={true}
                      showMonths={true}
                      showDays={true}
                      showHours={true}
                      textColor="#000000"
                      fontWeight={800}
                    />
                  </div>
                </motion.div>

                {/* Fun Fact Section - Desktop Only */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <TypingAnimation
                    className="font-semibold opacity-70 text-lg text-black leading-relaxed"
                    duration={5}
                    delay={800}
                  >
                    Fun fact: This is my total lifespan right now. 😂
                  </TypingAnimation>
                </motion.div>
              </motion.div>

              {/* Right Column - Text Content */}
              <motion.div 
                className="lg:col-span-7 space-y-12"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
              >
                {/* Main Description */}
                <motion.div 
                  className="relative"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.0,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className="absolute -inset-4 bg-white/30 backdrop-blur-sm rounded-2xl transform rotate-1"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-10 shadow-xl border border-black/10">
                    <TypingAnimation
                      className="font-semibold text-2xl text-gray-900 leading-relaxed"
                      duration={10}
                      delay={1000}
                    >
                      I'm a full-stack developer with a focus on front-end development. I care about building smooth, user-friendly interfaces that are easy to navigate. I enjoy working with modern front-end frameworks to bring ideas to life quickly and effectively.
                    </TypingAnimation>
                  </div>
                </motion.div>

                {/* Decorative accent */}
                <motion.div 
                  className="flex items-center space-x-4"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 1.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
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