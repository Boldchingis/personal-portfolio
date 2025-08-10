"use client";

import { useEffect } from "react";
import Lenis from "lenis";

const LenisProvider = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.2,
      touchMultiplier: 2,
      infinite: false,
      normalizeWheel: true,
      // Enhanced settings for better performance
      lerp: 0.1,
      syncTouch: false,
      syncTouchLerp: 0.1,
    });

    let rafId: number;

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    // Handle resize events
    const handleResize = () => {
      lenis.resize();
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      window.removeEventListener('resize', handleResize);
      lenis.destroy();
    };
  }, []);

  return null;
};

export default LenisProvider;
