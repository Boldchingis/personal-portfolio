"use client";

import { useRef, useState } from "react";
import { useInView, motion } from "framer-motion";
import { ProjectCard } from "@/components/ui/project-card";
import projectData from "../projectData.json";

export default function Section() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      ref={sectionRef}
      className="w-full min-h-screen bg-[#f3f3f3] dark:bg-gray-900 text-gray-900 dark:text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Title Section */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
                <div className="inline-block">
            <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter">
              PROJECTS
            </h2>
            <div className="w-full h-1 bg-black transform rotate-1"></div>
          </div>

          </motion.div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
              hovered={hovered}
              setHovered={setHovered}
            />
          ))}
        </div>
      </div>
    </div>
  );
}