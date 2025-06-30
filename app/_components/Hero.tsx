"use client";

import Threads from "../Threads/Threads";
import BlurText from "../BlurText/BlurText";
import TrueFocus from "../TrueFocus/TrueFocus";
export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div>
     
      <div className="flex flex-col items-center justify-center h-screen">
        <div style={{ width: "100%", height: "600px", position: "relative" }}>
          <Threads amplitude={1} distance={0} enableMouseInteraction={true} />
          {/* Centered BlurText inside Threads */}
          <div className="absolute inset-0 flex items-center flex-col gap-4 justify-center mb-80">
            <BlurText
              text="Hi I'm Boldchingis"
              delay={150}
              animateBy="words"
              direction="top"
              onAnimationComplete={handleAnimationComplete}
              className="text-5xl font-bold font-mono text-center flex justify-center w-[50%] mx-auto"
            />
            <TrueFocus
              sentence="Developer, Creative, Innovator"
              manualMode={true}
              blurAmount={5}
              borderColor="white"
              animationDuration={1}
              pauseBetweenAnimations={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
