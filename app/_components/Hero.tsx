"use client";

import Threads from "../Threads/Threads";
import BlurText from "../BlurText/BlurText";

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div style={{ width: "100%", height: "600px", position: "relative" }}>
        <Threads
          amplitude={1}
          distance={0}
          enableMouseInteraction={true}
        />
        
        {/* Centered BlurText inside Threads */}
        <div className="absolute inset-0 flex items-center justify-center mb-80">
          <BlurText
            text="Hello I'm a fullstack developer focused on frontend development"
            delay={150}
            animateBy="words"
            direction="top"
            onAnimationComplete={handleAnimationComplete}
            className="text-5xl font-bold font-mono text-center w-[50%] mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
