"use client";
import dynamic from "next/dynamic";
import BirthdayCounter from "../Counter/Counter";
import Image from "next/image";

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
  return (
    <div className="group relative">
      <div className="relative px-3 py-2 md:px-6 md:py-3 rounded-lg md:rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-lg hover:shadow-xl">
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <span className="text-[14px] md:text-[16px] font-bold text-white uppercase tracking-wide relative z-10 whitespace-nowrap" style={{ fontFamily: 'monospace' }}>
          {skill.name}
        </span>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

const BlurText = dynamic(() => import("../BlurText/BlurText"), { ssr: false });
const ElasticCursor = dynamic(() => import("../utils/ElasticCursor"), { ssr: false });

export default function Main() {
  return (
    <div className="min-h-[200vh] bg-[#08100c] text-white px-4">
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
            textColor="#ffffff"
            fontWeight={800}
          />
          <ElasticCursor />
          <BlurText
            text="Fun fact: This is the time I'm currently living. 😂"
            delay={50}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="font-mono flex justify-center font-semibold opacity-60 text-sm md:text-xl"
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
        <h1 className="font-extrabold font-mono text-center mb-6 md:mb-12 text-2xl md:text-4xl">
          TECH SKILLS
        </h1>
        <div className="flex flex-wrap justify-center gap-2 md:gap-3">
          {techSkills.map((skill, index) => (
            <GlassBadge key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}