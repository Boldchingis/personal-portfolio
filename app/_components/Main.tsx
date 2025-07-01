"use client";
import BirthdayCounter from "../Counter/Counter";
import ElasticCursor from "../utils/ElasticCursor";
import Image from "next/image";
import BlurText from "../BlurText/BlurText";

const handleAnimationComplete = () => {
  console.log("Animation completed!");
};

export default function Main() {
  return (
    <div className="min-h-[200vh] bg-[#08100c] text-white px-4">
      <ElasticCursor />
      <div className="flex items-center justify-center min-h-screen">
        <div className="grid gap-y-6 max-w-3xl text-center">
          <div className="mx-auto aspect-square w-52 relative">
            <Image
              src="/profile.png"
              alt="Profile Image"
              layout="fill"
              objectFit="cover"
              className="rounded-md transition-opacity duration-300 ease-out"
            />
          </div>

          <BirthdayCounter
            birthDate="2006-07-20"
            fontSize={60}
            showAge={true}
            showMonths={false}
            showDays={true}
            showHours={true}
            textColor="#ffffff"
            fontWeight={800}
          />

          <BlurText
            text="Fun fact: This is the time I'm currently living. 😂"
            delay={50}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="font-mono flex justify-center font-semibold opacity-60 text-xl"
          />

          <BlurText
            text="I'm a full-stack developer with a strong focus on front-end development. I care about creating smooth, user-friendly interfaces that are easy to use. I like using design systems to keep projects consistent and easy to maintain. I enjoy working with modern front-end frameworks that help me build features quickly."
            delay={20}
            animateBy="words"
            direction="bottom"
            onAnimationComplete={handleAnimationComplete}
            className="font-mono font-semibold flex justify-center text-3xl leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}
