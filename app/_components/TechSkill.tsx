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
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const startDelay = 1800;

  return (
    <div
      ref={containerRef}
      className="w-full max-w-5xl mx-auto px-2 sm:px-4 lg:px-8"
      style={{ background: "#f3f3f3" }}
    >
      <Terminal className="bg-[#f3f3f3] text-gray-800 border border-gray-300 shadow-md rounded-lg font-mono p-2 sm:p-4 lg:p-6 overflow-hidden">
        {isVisible && (
          <>
            <TypingAnimation className="text-gray-700 text-xs sm:text-sm lg:text-base">
              &gt; cd tech_skills
            </TypingAnimation>
            <TypingAnimation delay={800} className="text-gray-700 text-xs sm:text-sm lg:text-base">
              &gt; ls
            </TypingAnimation>

            <div className="mt-2 space-y-1">
              {techSkills.map((skill, index) => (
                <AnimatedSpan
                  key={skill.name}
                  delay={startDelay + index * 100}
                  className="flex items-center gap-1 sm:gap-2 text-gray-800 min-w-0 flex-shrink-0"
                >
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                    loading="lazy"
                  />
                  <span
                    style={{ color: skill.color }}
                    className="text-xs sm:text-sm lg:text-base truncate min-w-0"
                  >
                    {skill.package}
                  </span>
                </AnimatedSpan>
              ))}
            </div>

            <TypingAnimation
            duration={0}
              delay={startDelay + techSkills.length * 100 + 300}
              className="text-gray-700 mt-4 text-xs sm:text-sm lg:text-base break-all"
            >
              &gt; systemctl status developer.service
            </TypingAnimation>

            <div className="space-y-1 mt-2">
              <AnimatedSpan
                delay={startDelay + techSkills.length * 100 + 800}
                className="text-xs sm:text-sm lg:text-base break-words"
              >
                - Full Stack Developer
              </AnimatedSpan>
              <AnimatedSpan
                delay={startDelay + techSkills.length * 100 + 1000}
                className="text-gray-600 text-xs sm:text-sm lg:text-base"
              >
                Loaded: loaded (enabled)
              </AnimatedSpan>
              <AnimatedSpan
                delay={startDelay + techSkills.length * 100 + 1200}
                className="text-xs sm:text-sm lg:text-base break-all"
              >
                <span className="hidden sm:inline">
                  Active: active (running) since Fri 2024-09-20 14:30:00
                </span>
                <span className="sm:hidden">Active: active (running)</span>
              </AnimatedSpan>
              <AnimatedSpan
                delay={startDelay + techSkills.length * 100 + 1400}
                className="text-gray-600 text-xs sm:text-sm lg:text-base break-words"
              >
                Main PID: 1337 (fullstack)
              </AnimatedSpan>
              <AnimatedSpan
                delay={startDelay + techSkills.length * 100 + 1600}
                className="text-gray-600 text-xs sm:text-sm lg:text-base break-words"
              >
                Tasks: 42, Memory: 256MB, CPU: 3.14s
              </AnimatedSpan>
            </div>
          </>
        )}
      </Terminal>
    </div>
  );
});

SkillsCloud.displayName = "SkillsCloud";
export default SkillsCloud;