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
    <div className="relative w-full overflow-hidden">
      <ElasticCursor />

      <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-screen">
        <div className="w-full h-[400px] md:h-[600px] relative">
          <Meteors />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 text-center">
            <div className="w-full text-center">
              <BlurText
                text="Hi I'm Boldchingis"
                delay={50}
                animateBy="words"
                direction="bottom"
                onAnimationComplete={handleAnimationComplete}
                className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full flex justify-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto"
              />
            </div>

            <div className="mt-6 sm:mt-8">
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
    </div>
  );
}
