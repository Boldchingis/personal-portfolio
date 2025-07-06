"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    githubLink: string;
    deployedLink: string;
    image: string;
    techStack: string[];
    category: string;
  };
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ProjectCard = React.memo(({ project, index, hovered, setHovered }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "rounded-xl relative bg-white dark:bg-gray-800 overflow-hidden h-80 md:h-96 w-full transition-all duration-300 ease-out shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700",
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
      )}
    >
      {/* Image */}
      <img
        src={project.image}
        alt={project.title}
        className="object-cover absolute inset-0 w-full h-full"
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 text-xs font-medium text-white bg-black/60 rounded-full backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {project.githubLink !== "#" && (
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-black/80 hover:bg-black text-white rounded-lg shadow-sm transition-colors duration-200"
          >
            <Github size={16} />
          </a>
        )}
        <a
          href={project.deployedLink}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-white/90 hover:bg-white text-black rounded-lg shadow-sm transition-colors duration-200"
        >
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Project Title - Always Visible on Desktop, Hidden on Mobile */}
      <div 
        className={cn(
          "absolute bottom-6 left-6 right-6 transition-opacity duration-300 hidden md:block",
          hovered === index ? "opacity-0" : "opacity-100"
        )}
      >
        <h3 className="text-xl md:text-2xl font-semibold text-white drop-shadow-lg">
          {project.title}
        </h3>
      </div>

      {/* Content Overlay - Desktop Hover Effect */}
      <div
        className={cn(
          "absolute inset-0 flex flex-col justify-end p-6 transition-opacity duration-300 hidden md:flex",
          hovered === index ? "opacity-100" : "opacity-0"
        )}
      >
        <div className="space-y-4">
          {/* Description */}
          <p className="text-white text-xl leading-relaxed font-medium drop-shadow-lg">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex gap-4 pt-3 border-t border-white/20">
            {project.githubLink !== "#" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200"
              >
                <Github size={14} />
                Code
              </a>
            )}
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm font-medium text-gray-200 hover:text-white transition-colors duration-200"
            >
              <ExternalLink size={14} />
              Live Demo
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Content - Always Visible */}
      <div className="absolute inset-0 flex flex-col justify-end p-4 md:hidden">
        <div className="space-y-3">
          {/* Title */}
          <h3 className="text-lg font-semibold text-white drop-shadow-lg">
            {project.title}
          </h3>
          
          {/* Description */}
          <p className="text-white text-lg leading-relaxed font-medium drop-shadow-lg">
            {project.description}
          </p>

          {/* Action Links */}
          <div className="flex gap-3 pt-2">
            {project.githubLink !== "#" && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs font-medium text-gray-200"
              >
                <Github size={12} />
                Code
              </a>
            )}
            <a
              href={project.deployedLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-medium text-gray-200"
            >
              <ExternalLink size={12} />
              Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = "ProjectCard"; 