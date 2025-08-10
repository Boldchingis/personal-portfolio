"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import RotatingText from "../RotatingText/RotatingText";



export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#f3f3f3]">
        {/* Subtle background elements for depth */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-black blur-3xl" />
          <div className="absolute bottom-1/3 right-1/3 w-48 h-48 rounded-full bg-black blur-3xl" />
        </div>
        
        <div className="container-perfect relative z-10">
          <div className="flex flex-col items-center justify-center min-h-screen section-spacing">
            <div className="w-full max-w-4xl mx-auto">
              <div className="flex flex-col items-center justify-center gap-8 md:gap-12 text-center">
                
                {/* Main title with enhanced animation */}
                <m.div
                  className="w-full text-center space-y-4"
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.25, 0.46, 0.45, 0.94],
                    delay: 0.1
                  }}
                >
                  <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-gray-800 leading-tight">
                    I'm Boldchingis
                  </h1>
                  
                  {/* Subtle accent line */}
                  <m.div 
                    className="w-24 h-1 bg-black mx-auto rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: 96 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                  />
                </m.div>

                {/* Creative + Rotating text with better spacing */}
                <m.div
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-black">
                    Creative
                  </p>
                  
                  <div className="relative">
                    <RotatingText
                      texts={['Thinking', 'Coding', 'Building']}
                      mainClassName="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-white bg-black backdrop-blur-sm px-6 py-3 rounded-xl shadow-perfect-md border border-white/10"
                      staggerFrom={"last"}
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: "-120%", opacity: 0 }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden"
                      transition={{
                        type: "spring",
                        damping: 35,
                        stiffness: 400,
                        mass: 0.8
                      }}
                      rotationInterval={2500}
                    />
                  </div>
                </m.div>

                {/* Subtle call-to-action hint */}
                <m.div
                  className="mt-12 md:mt-16"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 1.2 }}
                >
                  <m.div 
                    className="flex flex-col items-center gap-3 text-gray-600"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <span className="text-sm md:text-base font-medium tracking-wide uppercase">
                      Scroll to explore
                    </span>
                    <svg 
                      className="w-5 h-5 md:w-6 md:h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                      />
                    </svg>
                  </m.div>
                </m.div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
