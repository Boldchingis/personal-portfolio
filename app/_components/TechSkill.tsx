"use client";
import React, { forwardRef, useRef, useEffect, useState } from "react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";

interface Skill {
  name: string;
  icon: string; // path to SVG file
  color: string;
}

const techSkills: Skill[] = [
  { name: "Linux", icon: "/linux.svg", color: "#FCC624" },
  { name: "JavaScript", icon: "/javascript.svg", color: "#F7DF1E" },
  { name: "TypeScript", icon: "/typescript.svg", color: "#3178C6" },
  { name: "React", icon: "/react.svg", color: "#61DAFB" },
  { name: "Next.js", icon: "/nextjs.svg", color: "#000000" },
  { name: "TailwindCSS", icon: "/tailwindcss.svg", color: "#06B6D4" },
  { name: "GreenSock", icon: "/greensock.svg", color: "#88CE02" },
  { name: "Node.js", icon: "/nodejs.svg", color: "#339933" },
  { name: "Express.js", icon: "/express.svg", color: "#000000" },
  { name: "GraphQL", icon: "/graphql.svg", color: "#E10098" },
  { name: "MongoDB", icon: "/mongodb.svg", color: "#47A248" },
  { name: "MySQL", icon: "/mysql.svg", color: "#4479A1" },
  { name: "Redis", icon: "/redis.svg", color: "#DC382D" },
  { name: "Prisma", icon: "/prisma.svg", color: "#2D3748" },
];

const skillPositions = [
  { x: 15, y: 20, rotation: -15 },
  { x: 75, y: 15, rotation: 25 },
  { x: 35, y: 35, rotation: -8 },
  { x: 85, y: 40, rotation: 12 },
  { x: 10, y: 60, rotation: -22 },
  { x: 60, y: 25, rotation: 18 },
  { x: 25, y: 75, rotation: -12 },
  { x: 90, y: 70, rotation: 30 },
  { x: 45, y: 55, rotation: -5 },
  { x: 70, y: 80, rotation: 15 },
  { x: 5, y: 85, rotation: -25 },
  { x: 55, y: 10, rotation: 8 },
  { x: 30, y: 90, rotation: -18 },
  { x: 95, y: 25, rotation: 20 },
];

const SkillsCloud = forwardRef<HTMLDivElement>((props, ref) => {
  const [isHovered, setIsHovered] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<
    { x: number; y: number; rotation: number }[]
  >([]);
  const skillRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Initialize positions on mount
  useEffect(() => {
    if (containerRef.current) {
      // Use the first N positions from skillPositions
      const neededPositions = skillPositions.slice(0, techSkills.length);
      setPositions(neededPositions);
    }
  }, []);

  // Create connections between skills
  const connections = [
    { from: 0, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 6 },
    { from: 5, to: 7 },
    { from: 6, to: 8 },
    { from: 7, to: 9 },
    { from: 8, to: 10 },
    { from: 9, to: 11 },
    { from: 10, to: 12 },
    { from: 11, to: 13 },
    { from: 0, to: 13 },
    { from: 1, to: 12 },
    { from: 2, to: 11 },
    { from: 3, to: 10 },
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px]"
    >
      {techSkills.map((skill, index) => {
        const position = positions[index] || { x: 50, y: 50, rotation: 0 };

        return (
          <div
            key={skill.name}
            ref={(el) => {(skillRefs.current[index] = el)}}
            className={`absolute transition-all duration-300 ease-out ${
              isHovered === index ? "z-10 scale-125" : "z-0"
            }`}
            style={{
              left: `${position.x}%`,
              top: `${position.y}%`,
              transform: `translate(-50%, -50%) rotate(${position.rotation}deg)`,
              color: isHovered === index ? skill.color : "currentColor",
            }}
            onMouseEnter={() => setIsHovered(index)}
            onMouseLeave={() => setIsHovered(null)}
          >
            <div className="flex flex-col items-center">
              <div
                className={`p-2 rounded-full ${
                  isHovered === index ? "bg-white shadow-lg" : "bg-white/10"
                }`}
              >
                <img 
                  src={skill.icon} 
                  alt={skill.name}
                  className="w-8 h-8 md:w-10 md:h-10" 
                />
              </div>
              {isHovered === index && (
                <div
                  className="mt-2 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap"
                  style={{ backgroundColor: skill.color }}
                >
                  {skill.name}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {/* Create animated beams between connected skills */}
      {connections.map((connection, index) => {
        // Create temporary ref objects to wrap the DOM elements
        const fromRefObj = { current: skillRefs.current[connection.from] } as React.RefObject<HTMLElement>;
        const toRefObj = { current: skillRefs.current[connection.to] } as React.RefObject<HTMLElement>;
        
        if (!fromRefObj.current || !toRefObj.current) return null;

        return (
          <AnimatedBeam
            key={`${connection.from}-${connection.to}-${index}`}
            containerRef={containerRef}
            fromRef={fromRefObj}
            toRef={toRefObj}
            curvature={index % 2 === 0 ? 30 : -30}
            endYOffset={index % 3 === 0 ? -10 : 10}
            reverse={index % 4 === 0}
          />
        );
      })}
    </div>
  );
});

SkillsCloud.displayName = "SkillsCloud";

export default SkillsCloud;