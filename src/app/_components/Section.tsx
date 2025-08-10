"use client";

import { useRef, useState } from "react";
import { useInView, LazyMotion, domAnimation, m } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import projectData from "../projectData.json";

export default function Section() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <LazyMotion features={domAnimation} strict>
      <div className="min-h-screen bg-[#f3f3f3] relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-black blur-3xl" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full bg-black blur-3xl" />
        </div>

        <div className="container-perfect relative z-10 section-spacing">
          <div ref={sectionRef} className="min-h-screen flex flex-col justify-center space-y-16 md:space-y-20">
            {/* Title Section */}
            {isInView && (
              <m.div
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
                    PROJECTS
                  </h2>
                  
                  {/* Animated underline */}
                  <m.div 
                    className="w-full h-1 bg-black transform rotate-1 rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>
                
                {/* Optional subtitle */}
                <m.p 
                  className="text-gray-600 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  A showcase of my work and passion projects
                </m.p>
              </m.div>
            )}

            {/* Projects Grid */}
            <div className="flex-1 flex items-center justify-center">
              <div className="w-full max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
                  {projectData.map((project, index) => (
                    <m.div
                      key={project.id}
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
                      transition={{
                        duration: 0.6,
                        ease: [0.25, 0.46, 0.45, 0.94],
                        delay: 0.3 + (index * 0.1)
                      }}
                    >
                      <ProjectCard 
                        project={project} 
                        index={index}
                        hovered={hovered}
                        setHovered={setHovered}
                      />
                    </m.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}