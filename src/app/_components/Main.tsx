"use client";
import dynamic from "next/dynamic";
import BirthdayCounter from "../Counter/Counter";
import Image from "next/image";
import { LazyMotion, domAnimation, m, useInView } from "framer-motion";
import { useRef } from "react";
import { TypingAnimation } from "@/components/magicui/terminal";

// Dynamic import with no SSR for BlurText
const BlurText = dynamic(() => import("../BlurText/BlurText"), { 
  ssr: false,
  loading: () => (
    <div className="font-semibold text-base text-gray-900 leading-relaxed">
      I'm a full-stack developer with a strong focus on front-end development...
    </div>
  )
});

export default function Main() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: true, 
    amount: 0.3,
    margin: "-100px"
  });

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-[#f3f3f3] text-black relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none">
        </div>

        <div ref={containerRef} className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="max-w-6xl w-full">
            {/* Mobile Layout */}
            <div className="lg:hidden">
              <div className="flex flex-col items-center space-y-6">
                {/* Profile Image and Birthday Counter Row - Mobile */}
                <m.div 
                  className="w-full flex items-center justify-between space-x-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.2,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  {/* Profile Image - Left Side */}
                  <div className="w-28 h-28 rounded-full overflow-hidden shadow-lg flex-shrink-0">
                    <Image
                      src="/profile.png"
                      alt="Profile Image"
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      priority
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>

                  {/* Birthday Counter - Right Side */}
                  <div className="flex-1 max-w-xs">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-gray-200/50">
                      <BirthdayCounter
                        birthDate="2006-07-20"
                        fontSize={28}
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
                </m.div>

                {/* Fun Fact - Mobile */}
                <m.div 
                  className="text-center px-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <BlurText
                    text="Fun fact: This is the time I'm currently living. 😂"
                    delay={20}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className="font-semibold opacity-70 text-sm text-black leading-relaxed"
                  />
                </m.div>

                {/* Main Description - Mobile */}
                <m.div 
                  className="w-full px-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-black/10">
                    <BlurText
                      text="I'm a full-stack developer with a strong focus on front-end development. I care about creating smooth, user-friendly interfaces that are easy to use. I like using design systems to keep projects consistent and easy to maintain. I enjoy working with modern front-end frameworks that help me build features quickly."
                      delay={20}
                      className="font-semibold text-base text-gray-900 leading-relaxed"
                    />
                  </div>
                </m.div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center">
              
              {/* Left Column - Profile & Counter */}
              <m.div 
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
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                    />
                  </div>
                </div>

                {/* Birthday Counter with enhanced styling */}
                <m.div 
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
                </m.div>

                {/* Fun Fact Section - Desktop Only */}
                <m.div 
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <BlurText
                    text="Fun fact: This is the time I'm currently living. 😂"
                    delay={20}
                    animateBy="words"
                    direction="bottom"
                    onAnimationComplete={handleAnimationComplete}
                    className="font-semibold opacity-70 text-lg text-black leading-relaxed"
                  />
                </m.div>
              </m.div>

              {/* Right Column - Text Content */}
              <m.div 
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
                <m.div 
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
                    <BlurText
                      text="I'm a full-stack developer with a strong focus on front-end development. I care about creating smooth, user-friendly interfaces that are easy to use. I like using design systems to keep projects consistent and easy to maintain. I enjoy working with modern front-end frameworks that help me build features quickly."
                      delay={20}
                      className="font-semibold text-2xl text-gray-900 leading-relaxed"
                    />
                  </div>
                </m.div>

                {/* Decorative accent */}
                <m.div 
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
                </m.div>
              </m.div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}