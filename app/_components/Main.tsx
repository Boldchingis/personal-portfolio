"use client";
import dynamic from "next/dynamic";
import BirthdayCounter from "../Counter/Counter";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

const techSkills = [
  { name: "Linux", logo: "linux", color: "FCC624" },
  { name: "JavaScript", logo: "javascript", color: "F7DF1E" },
  { name: "TypeScript", logo: "typescript", color: "3178C6" },
  { name: "HTML5", logo: "html5", color: "E34F26" },
  { name: "CSS3", logo: "css3", color: "1572B6" },
  { name: "React", logo: "react", color: "61DAFB" },
  { name: "Next.js", logo: "next.js", color: "000000" },
  { name: "TailwindCSS", logo: "tailwind-css", color: "06B6D4" },
  { name: "MUI", logo: "mui", color: "007FFF" },
  { name: "Ant Design", logo: "ant-design", color: "0170FE" },
  { name: "Radix UI", logo: "radix-ui", color: "161618" },
  { name: "GSAP", logo: "greensock", color: "88CE02" },
  { name: "Framer Motion", logo: "framer-motion", color: "0081CB" },
  { name: "Shadcn UI", logo: "shadcn-ui", color: "000000" },
  { name: "Node.js", logo: "node.js", color: "339933" },
  { name: "RestAPI", logo: "node.js", color: "339933" },
  { name: "Express.js", logo: "express", color: "000000" },
  { name: "GraphQL", logo: "graphql", color: "E10098" },
  { name: "Apollo GraphQL", logo: "apollo-graphql", color: "311C87" },
  { name: "MongoDB", logo: "mongodb", color: "47A248" },
  { name: "MySQL", logo: "mysql", color: "4479A1" },
  { name: "Redis", logo: "redis", color: "DC382D" },
  { name: "Prisma", logo: "prisma", color: "2D3748" },
  { name: "Firebase", logo: "firebase", color: "FFCA28" },
  { name: "Vercel", logo: "vercel", color: "000000" },
  { name: "Git", logo: "git", color: "F05032" },
  { name: "GitHub", logo: "github", color: "181717" },
  { name: "Monorepo", logo: "vim", color: "019733" },
  { name: "Postman", logo: "postman", color: "FF6C37" },
];

type Skill = {
  name: string;
  logo: string;
  color: string;
};

const GlassBadge = ({ skill }: { skill: Skill }) => {
  // Create gradient styles based on skill color
  const gradientStyle = {
    background: `linear-gradient(135deg, 
      rgba(${parseInt(skill.color.slice(0, 2), 16)}, ${parseInt(
      skill.color.slice(2, 4),
      16
    )}, ${parseInt(skill.color.slice(4, 6), 16)}, 0.15) 0%, 
      rgba(${parseInt(skill.color.slice(0, 2), 16)}, ${parseInt(
      skill.color.slice(2, 4),
      16
    )}, ${parseInt(skill.color.slice(4, 6), 16)}, 0.05) 50%, 
      rgba(255, 255, 255, 0.1) 100%)`,
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderColor: "#000000", // Same black border for all
  };

  const hoverGradientStyle = {
    background: `linear-gradient(135deg, 
      rgba(${parseInt(skill.color.slice(0, 2), 16)}, ${parseInt(
      skill.color.slice(2, 4),
      16
    )}, ${parseInt(skill.color.slice(4, 6), 16)}, 0.25) 0%, 
      rgba(${parseInt(skill.color.slice(0, 2), 16)}, ${parseInt(
      skill.color.slice(2, 4),
      16
    )}, ${parseInt(skill.color.slice(4, 6), 16)}, 0.15) 50%, 
      rgba(255, 255, 255, 0.2) 100%)`,
    backdropFilter: "blur(16px)",
    WebkitBackdropFilter: "blur(16px)",
    borderColor: "#000000", // Same black border for all
  };

  return (
    <AnimatePresence>
      <motion.div
        className="group relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 80 }}
        // Removed whileHover scale and whileTap scale
      >
        <div
          className="relative px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden"
          // Removed shadow classes
          style={gradientStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget;
            Object.assign(target.style, hoverGradientStyle);
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget;
            Object.assign(target.style, gradientStyle);
          }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
              style={{ animation: "shine 1.5s ease-out infinite" }}
            />
          </div>

          {/* Skill name */}
          <span
            className="text-[14px] md:text-[16px] font-bold uppercase tracking-wide relative z-10 whitespace-nowrap transition-colors duration-300"
            style={{
              fontFamily: "monospace",
              color: "#000000", // Same black color for all text
              // Removed textShadow
            }}
          >
            {skill.name}
          </span>

          {/* Removed glowing border effect */}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
const BlurText = dynamic(() => import("../BlurText/BlurText"), { ssr: false });
const ElasticCursor = dynamic(() => import("../utils/ElasticCursor"), {
  ssr: false,
});

export default function Main() {
  return (
    <div className="min-h-[200vh] bg-[#f3f3f3] text-black px-4">
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid gap-y-4 md:gap-y-6 max-w-3xl text-center px-4 md:px-6">
          <div className="mx-auto aspect-square w-32 md:w-52 relative">
            <Image
              src="/profile.png"
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
              className="rounded-full md:rounded-md transition-opacity duration-300 ease-out"
            />
          </div>
          <BirthdayCounter
            birthDate="2006-07-20"
            fontSize={45}
            showAge={true}
            showMonths={true}
            showDays={true}
            showHours={true}
            textColor="#000000"
            fontWeight={800}
          />
          <ElasticCursor />
          <BlurText
            text="Fun fact: This is the time I'm currently living."
            delay={50}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="font-mono flex justify-center font-semibold opacity-60 text-sm md:text-xl text-black"
          />
          <BlurText
            text="I'm a full-stack developer with a strong focus on front-end development. I care about creating smooth, user-friendly interfaces that are easy to use. I like using design systems to keep projects consistent and easy to maintain. I enjoy working with modern front-end frameworks that help me build features quickly."
            delay={20}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="font-mono font-semibold flex justify-center text-lg md:text-2xl lg:text-3xl leading-relaxed"
          />
        </div>
      </div>
      <div className="max-w-5xl mx-auto mt-20 md:mt-40 pb-10 md:pb-20">
        <AnimatedText
          className="font-extrabold font-mono text-center mb-6 md:mb-12 text-2xl md:text-4xl text-black"
          text="TECH SKILLS"
        />
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {techSkills.map((skill, index) => (
            <GlassBadge key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
