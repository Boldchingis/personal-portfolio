"use client";

import React, { useState } from "react";
import { LazyMotion, domAnimation, m } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
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
    <LazyMotion features={domAnimation} strict>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: index * 0.1,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        onMouseEnter={() => setHovered(index)}
        onMouseLeave={() => setHovered(null)}
        className={cn(
          "rounded-xl relative bg-white dark:bg-gray-800 overflow-hidden h-80 md:h-96 w-full transition-all duration-300 ease-out shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700",
          hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
        )}
      >
        {/* Image with Next.js Image optimization */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
          />
        </div>
        
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
              aria-label={`View ${project.title} source code`}
            >
              <Github size={16} />
            </a>
          )}
          <a
            href={project.deployedLink}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-white/90 hover:bg-white text-black rounded-lg shadow-sm transition-colors duration-200"
            aria-label={`View ${project.title} live demo`}
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
      </m.div>
    </LazyMotion>
  );
});

ProjectCard.displayName = "ProjectCard"; 