"use client";

import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import { ComponentPropsWithoutRef, FC, ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const textRevealVariants = cva(
  "relative z-10",
  {
    variants: {
      size: {
        sm: "h-[150vh] text-sm sm:text-base md:text-lg",
        md: "h-[200vh] md:h-[250vh] lg:h-[300vh] text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl 3xl:text-5xl",
        lg: "h-[250vh] md:h-[300vh] lg:h-[350vh] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl",
        xl: "h-[300vh] md:h-[350vh] lg:h-[400vh] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl 3xl:text-7xl",
      },
      alignment: {
        left: "text-left",
        center: "text-center",
        right: "text-right",
      },
      spacing: {
        tight: "gap-x-1 leading-tight",
        normal: "gap-x-2 md:gap-x-3 lg:gap-x-4 leading-normal md:leading-relaxed",
        loose: "gap-x-3 md:gap-x-4 lg:gap-x-6 leading-relaxed md:leading-loose",
      },
    },
    defaultVariants: {
      size: "md",
      alignment: "center",
      spacing: "normal",
    },
  }
);

const backgroundVariants = cva("", {
  variants: {
    background: {
      transparent: "bg-transparent",
      white: "bg-white",
      black: "bg-black",
      gray: "bg-gray-50 dark:bg-gray-950",
      gradient: "bg-gradient-to-b from-transparent via-white/50 to-transparent dark:via-black/50",
    },
  },
  defaultVariants: {
    background: "transparent",
  },
});

export interface TextRevealProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof textRevealVariants>,
    VariantProps<typeof backgroundVariants> {
  children: string;
  /** Custom scroll offset for when animation starts/ends */
  offset?: [
    | "start end"
    | "end start"
    | "start start"
    | "end end"
    | "center center"
    | "center start"
    | "center end"
    | "start center"
    | "end center"
    | `${number} ${number}`
    | `${number} center`
    | `${number} start`
    | `${number} end`
    | `${number} ${number}px`
    | `${number} ${number}vw`
    | `${number} ${number}vh`
    | `${number} ${number}%`
    | `center ${number}`
    | "center center"
    | "center start"
    | "center end"
    | "start center"
    | "end center",
    | "start end"
    | "end start"
    | "start start"
    | "end end"
    | "center center"
    | "center start"
    | "center end"
    | "start center"
    | "end center"
    | `${number} ${number}`
    | `${number} center`
    | `${number} start`
    | `${number} end`
    | `${number} ${number}px`
    | `${number} ${number}vw`
    | `${number} ${number}vh`
    | `${number} ${number}%`
    | `center ${number}`
    | "center center"
    | "center start"
    | "center end"
    | "start center"
    | "end center"
  ];
  /** Animation duration multiplier */
  duration?: number;
  /** Custom container max width */
  maxWidth?: string;
  /** Custom padding */
  padding?: string;
  /** Custom word animation props */
  wordAnimation?: {
    opacity?: [number, number];
    scale?: [number, number];
    y?: [number, number];
    x?: [number, number];
  };
  /** Custom background text styling */
  backgroundText?: {
    show?: boolean;
    opacity?: number;
    className?: string;
  };
  /** Custom animated text styling */
  animatedText?: {
    className?: string;
  };
  /** Split by sentences instead of words */
  splitBySentences?: boolean;
  /** Custom split pattern */
  splitPattern?: RegExp;
}

export const TextReveal: FC<TextRevealProps> = ({
  children,
  className,
  size,
  alignment,
  spacing,
  background,
  offset = ["start end", "end start"],
  duration = 1,
  maxWidth = "max-w-6xl",
  padding = "px-4 sm:px-6 md:px-8 lg:px-12",
  wordAnimation = {
    opacity: [0, 1],
    scale: [0.8, 1],
    y: [20, 0],
  },
  backgroundText = {
    show: true,
    opacity: 0.1,
    className: "text-gray-400 dark:text-gray-600",
  },
  animatedText = {
    className: "text-gray-900 dark:text-white font-semibold",
  },
  splitBySentences = false,
  splitPattern,
  ...props
}) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });

  if (typeof children !== "string") {
    throw new Error("TextReveal: children must be a string");
  }

  // Determine how to split the text
  let textParts: string[];
  if (splitPattern) {
    textParts = children.split(splitPattern).filter(Boolean);
  } else if (splitBySentences) {
    textParts = children.split(/(?<=[.!?])\s+/).filter(Boolean);
  } else {
    textParts = children.split(" ");
  }

  return (
    <div
      ref={targetRef}
      className={cn(textRevealVariants({ size, className }))}
      {...props}
    >
      <div className={cn("sticky top-0 flex h-screen items-center justify-center", backgroundVariants({ background }))}>
        <div className={cn("w-full mx-auto", maxWidth, padding)}>
          <div className={cn(textRevealVariants({ alignment }))}>
            <span className={cn("inline-flex flex-wrap justify-center font-medium transition-colors duration-300", textRevealVariants({ spacing }), alignment === "left" && "justify-start", alignment === "right" && "justify-end")}>
              {textParts.map((part, i) => {
                const start = i / textParts.length;
                const end = start + (1 / textParts.length) * duration;
                return (
                  <Word
                    key={`${part}-${i}`}
                    progress={scrollYProgress}
                    range={[start, Math.min(end, 1)]}
                    wordAnimation={wordAnimation}
                    backgroundText={backgroundText}
                    animatedText={animatedText}
                  >
                    {part}
                  </Word>
                );
              })}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

interface WordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  wordAnimation: NonNullable<TextRevealProps["wordAnimation"]>;
  backgroundText: NonNullable<TextRevealProps["backgroundText"]>;
  animatedText: NonNullable<TextRevealProps["animatedText"]>;
}

const Word: FC<WordProps> = ({ 
  children, 
  progress, 
  range, 
  wordAnimation,
  backgroundText,
  animatedText 
}) => {
  const opacity = useTransform(progress, range, wordAnimation.opacity || [0, 1]);
  const scale = useTransform(progress, range, wordAnimation.scale || [1, 1]);
  const y = useTransform(progress, range, wordAnimation.y || [0, 0]);
  const x = useTransform(progress, range, wordAnimation.x || [0, 0]);

  return (
    <span className="relative inline-block">
      {/* Background text */}
      {backgroundText.show && (
        <span 
          className={cn("absolute inset-0 select-none", backgroundText.className)}
          style={{ opacity: backgroundText.opacity }}
        >
          {children}
        </span>
      )}
      {/* Animated text */}
      <motion.span
        style={{
          opacity,
          scale,
          y,
          x,
        }}
        className={cn("relative transition-colors duration-300", animatedText.className)}
      >
        {children}
      </motion.span>
    </span>
  );
};

// Preset configurations for common use cases
export const textRevealPresets = {
  hero: {
    size: "lg" as const,
    alignment: "center" as const,
    spacing: "loose" as const,
    background: "gradient" as const,
    wordAnimation: {
      opacity: [0, 1],
      scale: [0.5, 1],
      y: [50, 0],
    },
  },
  subtitle: {
    size: "sm" as const,
    alignment: "center" as const,
    spacing: "normal" as const,
    background: "transparent" as const,
    wordAnimation: {
      opacity: [0, 1],
      scale: [0.9, 1],
      y: [10, 0],
    },
  },
  dramatic: {
    size: "xl" as const,
    alignment: "center" as const,
    spacing: "loose" as const,
    background: "black" as const,
    wordAnimation: {
      opacity: [0, 1],
      scale: [0.3, 1],
      y: [100, 0],
    },
    animatedText: {
      className: "text-white font-bold",
    },
    backgroundText: {
      show: false,
    },
  },
  typewriter: {
    size: "md" as const,
    alignment: "left" as const,
    spacing: "tight" as const,
    background: "transparent" as const,
    wordAnimation: {
      opacity: [0, 1],
      scale: [1, 1],
      y: [0, 0],
    },
    duration: 0.3,
  },
} as const;

// Usage examples:
// <TextReveal {...textRevealPresets.hero}>Your hero text here</TextReveal>
// <TextReveal size="lg" alignment="left" splitBySentences>Long text split by sentences</TextReveal>
// <TextReveal wordAnimation={{ opacity: [0, 1], scale: [0.5, 1], y: [30, 0] }}>Custom animation</TextReveal>