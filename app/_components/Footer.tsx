"use client";

import dynamic from "next/dynamic";
const Particles = dynamic(() => import("../Particles/Particles"), { ssr: false });

export default function Footer() {
  return (
    <div className="w-full h-[300px] md:h-[700px] z-40">
      <Particles
        particleColors={["#ffffff", "#ffffff"]}
        particleCount={600}
        particleSpread={10}
        speed={0.5}
        particleBaseSize={200}
        moveParticlesOnHover={true}
        alphaParticles={true}
        disableRotation={true}
      />
    </div>
  );
}
