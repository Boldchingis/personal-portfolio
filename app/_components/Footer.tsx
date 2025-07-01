import Particles from "../Particles/Particles";

export default function Footer() {
  return (
    <div style={{ width: "100%", height: "700px" }} className=" z-40">
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
