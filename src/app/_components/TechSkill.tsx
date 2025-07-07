"use client";
import React, { forwardRef, useRef, useState, useEffect } from "react";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";

interface Skill {
  name: string;
  icon: string;
  color: string;
  package: string;
}

const techSkills: Skill[] = [
  { name: "Linux", icon: "/linux.svg", color: "#FCC624", package: "linux" },
  { name: "JavaScript", icon: "/javascript.svg", color: "#F7DF1E", package: "javascript" },
  { name: "TypeScript", icon: "/typescript.svg", color: "#3178C6", package: "typescript" },
  { name: "React", icon: "/react.svg", color: "#61DAFB", package: "react" },
  { name: "Next.js", icon: "/nextjs.svg", color: "#000000", package: "next" },
  { name: "TailwindCSS", icon: "/tailwindcss.svg", color: "#06B6D4", package: "tailwindcss" },
  { name: "GreenSock", icon: "/greensock.svg", color: "#88CE02", package: "gsap" },
  { name: "Node.js", icon: "/nodedotjs.svg", color: "#339933", package: "node" },
  { name: "Express.js", icon: "/express.svg", color: "#000000", package: "express" },
  { name: "GraphQL", icon: "/graphql.svg", color: "#E10098", package: "graphql" },
  { name: "MongoDB", icon: "/mongodb.svg", color: "#47A248", package: "mongodb" },
  { name: "MySQL", icon: "/mysql.svg", color: "#4479A1", package: "mysql" },
  { name: "Redis", icon: "/redis.svg", color: "#DC382D", package: "redis" },
  { name: "Prisma", icon: "/prisma.svg", color: "#2D3748", package: "prisma" },
];

const SkillsCloud = forwardRef<HTMLDivElement>((props, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full  max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <Terminal className="bg-white text-gray-800 rounded-xl font-mono p-0 overflow-hidden transition-all duration-700 ease-out min-h-[500px] sm:min-h-[550px] lg:min-h-[600px]">
        {isVisible && (
          <div className="p-3 sm:p-6 space-y-1 overflow-x-hidden">
            {/* User prompt with typing cursor */}
            <div className="flex items-center gap-1 sm:gap-2 mb-4 flex-wrap">
              <span className="text-green-600 font-bold text-xs sm:text-sm">boldchingis@linux</span>
              <span className="text-gray-500 text-xs sm:text-sm">:</span>
              <span className="text-blue-600 text-xs sm:text-sm">~/skills</span>
              <span className="text-gray-500 text-xs sm:text-sm">$</span>
              <TypingAnimation 
                className="text-gray-800 text-xs sm:text-sm font-normal ml-1"
                duration={50}
                delay={300}
              >
                cd tech_skills && ls -la
              </TypingAnimation>
            </div>

            {/* Command output header */}
            <AnimatedSpan
              delay={2000}
              className="text-gray-600 text-xs sm:text-sm border-b border-gray-300 pb-2 mb-4 block"
            >
              total {techSkills.length} packages
            </AnimatedSpan>

            {/* Skills grid - more realistic ls output */}
            <div className="space-y-1 mb-6">
              {techSkills.map((skill, index) => (
                <AnimatedSpan
                  key={skill.name}
                  delay={2200 + index * 80}
                  className="flex items-center gap-2 sm:gap-4 text-gray-800 transition-all duration-300 ease-out hover:bg-gray-200 rounded-md p-1 sm:p-2 -m-1 sm:-m-2 group cursor-pointer font-mono text-xs sm:text-sm"
                >
                  <div className="flex items-center gap-1 sm:gap-2 flex-1 min-w-0">
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                      loading="lazy"
                    />
                    <span className="text-green-600 font-medium group-hover:text-green-700 truncate">
                      {skill.package}
                    </span>
                  </div>
                </AnimatedSpan>
              ))}
            </div>

            {/* New command prompt */}
            <div className="flex items-center gap-1 sm:gap-2 mt-8 mb-4 flex-wrap">
              <span className="text-green-600 font-bold text-xs sm:text-sm">boldchingis@linux</span>
              <span className="text-gray-500 text-xs sm:text-sm">:</span>
              <span className="text-blue-600 text-xs sm:text-sm break-all">~/skills/tech_skills</span>
              <span className="text-gray-500 text-xs sm:text-sm">$</span>
              <div className="w-full sm:w-auto">
                <TypingAnimation
                  delay={2200 + techSkills.length * 80 + 800}
                  className="text-gray-800 text-xs sm:text-sm font-normal ml-1"
                  duration={40}
                >
                  systemctl status developer.service
                </TypingAnimation>
              </div>
            </div>

            {/* Service status output */}
            <div className="space-y-2 pl-0 font-mono text-xs sm:text-sm overflow-x-hidden">
              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2000}
                className="text-green-600 font-bold flex items-center gap-2"
              >
                <span className="w-2 h-2 bg-green-600 rounded-full animate-pulse flex-shrink-0"></span>
                <span className="break-words">developer.service - Full Stack Developer</span>
              </AnimatedSpan>
              
              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2150}
                className="text-gray-600 pl-4 break-all"
              >
                Loaded: loaded (/usr/lib/systemd/user/developer.service; enabled; vendor preset: enabled)
              </AnimatedSpan>
              
              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2300}
                className="text-gray-600 pl-4 break-words"
              >
                <span className="text-green-600">Active: active (running)</span> since Mon 2024-09-30 14:30:00 UTC; 2 months ago
              </AnimatedSpan>
              
              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2450}
                className="text-gray-600 pl-4 break-words"
              >
                Main PID: 1337 (fullstack-dev)
              </AnimatedSpan>
              
              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2600}
                className="text-gray-600 pl-4 break-words"
              >
                Tasks: 42 (limit: 4915)
              </AnimatedSpan>

              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2750}
                className="text-gray-600 pl-4 break-words"
              >
                Memory: 256.0M
              </AnimatedSpan>

              <AnimatedSpan
                delay={2200 + techSkills.length * 80 + 2900}
                className="text-gray-600 pl-4 break-words"
              >
                CPU: 3.14s
              </AnimatedSpan>
            </div>

            {/* Blinking cursor */}
            <AnimatedSpan
              delay={2200 + techSkills.length * 80 + 3200}
              className="flex items-center gap-1 sm:gap-2 mt-6 flex-wrap"
            >
              <span className="text-green-600 font-bold text-xs sm:text-sm">boldchingis@linux</span>
              <span className="text-gray-500 text-xs sm:text-sm">:</span>
              <span className="text-blue-600 text-xs sm:text-sm break-all">~/skills/tech_skills</span>
              <span className="text-gray-500 text-xs sm:text-sm">$</span>
              <span className="ml-1 w-2 h-3 sm:h-4 bg-gray-800 animate-pulse flex-shrink-0"></span>
            </AnimatedSpan>
          </div>
        )}
      </Terminal>
    </div>
  );
});

SkillsCloud.displayName = "SkillsCloud";
export default SkillsCloud;