"use client";
import dynamic from "next/dynamic";
import ElasticCursor from "../utils/ElasticCursor";
import { Meteors } from "@/components/magicui/meteors";

const BlurText = dynamic(() => import("../BlurText/BlurText"), { ssr: false });
const TrueFocus = dynamic(() => import("../TrueFocus/TrueFocus"), { ssr: false });

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div>
      <ElasticCursor />
      <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-screen">
        <div className="w-full h-[350px] md:h-[600px] relative">
          <Meteors />
          <div className="absolute inset-0 flex items-center flex-col gap-3 md:gap-4 justify-center mb-16 md:mb-80">
            <BlurText
              text="Hi I'm Boldchingis"
              delay={50}
              animateBy="words"
              direction="bottom"
              onAnimationComplete={handleAnimationComplete}
              className="text-7xl md:text-4xl lg:text-6xl my-10 font-bold  text-center flex justify-center w-full md:w-2/3 lg:w-1/2 mx-auto px-4"
            />
            <TrueFocus
              sentence="Developer, Creative, Innovator"
              manualMode={true}
              blurAmount={5}
              borderColor="white"
              animationDuration={0.8}
              pauseBetweenAnimations={0.8}
            />
          </div>
        </div>
      </div>
    </div>
  );
}