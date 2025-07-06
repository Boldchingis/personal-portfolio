"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import ElasticCursor from "../utils/ElasticCursor";
import { Meteors } from "@/components/magicui/meteors";
import RotatingText from "../RotatingText/RotatingText";

const BlurText = dynamic(() => import("../BlurText/BlurText"), { ssr: false });

export default function Hero() {
  const handleAnimationComplete = () => {
    console.log("Animation completed!");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f3f3f3]">
      <ElasticCursor />

      <div className="flex flex-col items-center justify-center min-h-[60vh] md:min-h-screen">
        <div className="w-full h-[400px] md:h-[600px] relative">
          <Meteors />

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 px-4 text-center">
            <motion.div 
              className="w-full text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <BlurText
                text="Hi I'm Boldchingis"
                delay={50}
                animateBy="words"
                direction="top"
                onAnimationComplete={handleAnimationComplete}
                className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl w-full flex justify-center max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[50%] mx-auto text-gray-800"
              />
            </motion.div>

            <motion.div 
              className="flex  items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-black">Creative</p>
              
              <div className="relative">
                <RotatingText
                  texts={['Thinking', 'Coding', 'Building']}
                  mainClassName="text-lg sm:text-xl md:text-2xl font-medium text-white bg-black backdrop-blur-sm px-4 py-2 rounded-lg border border-purple-200/50"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
