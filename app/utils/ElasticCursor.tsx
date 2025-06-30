"use client";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

// Hook for mouse position tracking
function useMouse() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  return mousePosition;
}

// Hook for media query detection
function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}



// Simple cn utility - replace with your actual implementation
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

// GSAP Ticker hook
function useTicker(callback: () => void, paused: boolean) {
  useEffect(() => {
    if (!paused && callback) {
      gsap.ticker.add(callback);
    }
    return () => {
      gsap.ticker.remove(callback);
    };
  }, [callback, paused]);
}

// Persistent instance hook
function useInstance<T>(value: T | (() => T)): T {
  const ref = useRef<T | null>(null);
  if (ref.current === null) {
    ref.current = typeof value === "function" ? (value as () => T)() : value;
  }
  return ref.current;
}

// Utility functions
function getScale(diffX: number, diffY: number): number {
  const distance = Math.sqrt(diffX * diffX + diffY * diffY);
  return Math.min(distance / 735, 0.35);
}

function getAngle(diffX: number, diffY: number): number {
  return (Math.atan2(diffY, diffX) * 180) / Math.PI;
}

function getHoverableRect(el: HTMLElement): DOMRect | null {
  if (el.classList.contains("cursor-can-hover")) {
    return el.getBoundingClientRect();
  }
  if (el.parentElement?.classList.contains("cursor-can-hover")) {
    return el.parentElement.getBoundingClientRect();
  }
  if (el.parentElement?.parentElement?.classList.contains("cursor-can-hover")) {
    return el.parentElement.parentElement.getBoundingClientRect();
  }
  return null;
}

const CURSOR_DIAMETER = 50;

interface QuickSetters {
  x?: (value: number) => void;
  y?: (value: number) => void;
  r?: (value: number) => void;
  sx?: (value: number) => void;
  sy?: (value: number) => void;
  width?: (value: number) => void;
}

function ElasticCursor() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const jellyRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorMoved, setCursorMoved] = useState(false);
  const { x, y } = useMouse();

  // Persistent objects for position and velocity
  const pos = useInstance(() => ({ x: 0, y: 0 }));
  const vel = useInstance(() => ({ x: 0, y: 0 }));
  const setters = useInstance<QuickSetters>(() => ({}));

  // Initialize GSAP quick setters
  useLayoutEffect(() => {
    if (!jellyRef.current) return;

    setters.x = gsap.quickSetter(jellyRef.current, "x", "px") as (value: number) => void;
    setters.y = gsap.quickSetter(jellyRef.current, "y", "px") as (value: number) => void;
    setters.r = gsap.quickSetter(jellyRef.current, "rotate", "deg") as (value: number) => void;
    setters.sx = gsap.quickSetter(jellyRef.current, "scaleX") as (value: number) => void;
    setters.sy = gsap.quickSetter(jellyRef.current, "scaleY") as (value: number) => void;
    setters.width = gsap.quickSetter(jellyRef.current, "width", "px") as (value: number) => void;
  }, [setters]);

  // Animation loop
  const loop = useCallback(() => {
    if (!setters.x || !setters.y || !setters.width || !setters.sx || !setters.sy || !setters.r) {
      return;
    }

    if (!isHovering) {
      const rotation = getAngle(vel.x, vel.y);
      const scale = getScale(vel.x, vel.y);

      setters.x(pos.x);
      setters.y(pos.y);
      setters.width(50 + scale * 300);
      setters.r(rotation);
      setters.sx(1 + scale);
      setters.sy(1 - scale * 2);
    } else {
      setters.r(0);
    }
  }, [isHovering, setters, pos, vel]);

  // Handle mouse movement
  useLayoutEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!jellyRef.current) return;

      if (!cursorMoved) {
        setCursorMoved(true);
      }

      const target = e.target as HTMLElement;
      const hoverRect = getHoverableRect(target);

      if (hoverRect) {
        const rect = target.getBoundingClientRect();
        setIsHovering(true);

        gsap.to(jellyRef.current, {
          rotate: 0,
          width: target.offsetWidth + 20,
          height: target.offsetHeight + 20,
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          borderRadius: 10,
          duration: 1.5,
          ease: "elastic.out(1, 0.3)",
        });
      } else {
        setIsHovering(false);
        gsap.to(jellyRef.current, {
          borderRadius: 50,
          width: CURSOR_DIAMETER,
          height: CURSOR_DIAMETER,
        });
      }

      // Animate position with elastic easing
      gsap.to(pos, {
        x: e.clientX,
        y: e.clientY,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)",
        onUpdate: () => {
          vel.x = (e.clientX - pos.x) * 1.2;
          vel.y = (e.clientY - pos.y) * 1.2;
        },
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, cursorMoved, pos, vel]);

  // Start the animation ticker
  useTicker(loop, !cursorMoved || isMobile);

  // Don't render on mobile
  if (isMobile) return null;

  return (
    <>
      {/* Main elastic cursor */}
      <div
        ref={jellyRef}
        className={cn(
          `w-[${CURSOR_DIAMETER}px] h-[${CURSOR_DIAMETER}px]`,
          "border-2 border-black dark:border-white",
          "fixed left-0 top-0 rounded-lg z-[999]",
          "pointer-events-none will-change-transform",
          "translate-x-[-50%] translate-y-[-50%]"
        )}
        style={{
          zIndex: 100,
          backdropFilter: "invert(100%)",
        }}
      />
      
      {/* Small dot cursor */}
      <div
        className={cn(
          "w-2 h-2 rounded-full fixed bg-white",
          "translate-x-[-50%] translate-y-[-50%]",
          "pointer-events-none transition-none duration-300"
        )}
        style={{
          top: y,
          left: x,
          backdropFilter: "invert(100%)",
        }}
      />
    </>
  );
}

export default ElasticCursor;