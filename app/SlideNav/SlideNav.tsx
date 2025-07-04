"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CursorPosition {
  left: number;
  width: number;
  opacity: number;
}

export const SlideTabsExample: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Prevent scroll when mobile sheet is open
  useEffect(() => {
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isSheetOpen]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:block sticky top-0 z-30 w-full md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2">
        <div className="relative">
          {/* Gradient fade left - matches main background */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#f3f3f3] via-[#f3f3f3]/80 to-transparent z-20" />
          {/* Gradient fade right - matches main background */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#f3f3f3] via-[#f3f3f3]/80 to-transparent z-20" />
          <SlideTabs />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsSheetOpen(true)}
          className="p-3 rounded-full backdrop-blur-xl bg-white/90 border border-black hover:bg-white/95 transition-all duration-200"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-gray-700"
          >
            <path
              d="M3 12h18M3 6h18M3 18h18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Sheet */}
      <AnimatePresence>
        {isSheetOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSheetOpen(false)}
              className="sm:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            />

            {/* Sheet */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="sm:hidden fixed top-0 right-2 h-[95vh] mt-2 rounded-xl w-[85vw] max-w-[20rem] bg-white/95 backdrop-blur-xl border border-gray-300 z-50 overflow-y-auto shadow-xl"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsSheetOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-gray-600"
                  >
                    <path
                      d="M18 6L6 18M6 6l12 12"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>

                {/* Navigation Links */}
                <nav className="mt-12 space-y-2">
                  <MobileNavItem onClick={() => setIsSheetOpen(false)}>
                    Home
                  </MobileNavItem>
                  <MobileNavItem onClick={() => setIsSheetOpen(false)}>
                    About me
                  </MobileNavItem>
                  <MobileNavItem onClick={() => setIsSheetOpen(false)}>
                    Tech skills
                  </MobileNavItem>
                  <MobileNavItem onClick={() => setIsSheetOpen(false)}>
                    Projects
                  </MobileNavItem>
                  <MobileNavItem onClick={() => setIsSheetOpen(false)}>
                    Contact
                  </MobileNavItem>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

const SlideTabs: React.FC = () => {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-full max-w-full overflow-x-auto whitespace-nowrap rounded-full border border-gray-200 p-1 md:w-fit md:max-w-none backdrop-blur-xl bg-white/90 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent scroll-smooth"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      <Tab setPosition={setPosition}>Home</Tab>
      <Tab setPosition={setPosition}>About me</Tab>
      <Tab setPosition={setPosition}>Tech skills</Tab>
      <Tab setPosition={setPosition}>Projects</Tab>
      <Tab setPosition={setPosition}>Contact</Tab>
      <Cursor position={position} />
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
}

const Tab: React.FC<TabProps> = ({ children, setPosition }) => {
  const ref = useRef<HTMLLIElement | null>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      className="relative font-semibold z-10 block cursor-pointer px-4 py-3 md:px-6 md:py-4 text-sm md:text-base uppercase text-gray-700 hover:text-gray-900 transition-colors duration-200 flex-shrink-0"
    >
      {children}
    </li>
  );
};

interface CursorProps {
  position: CursorPosition;
}

const Cursor: React.FC<CursorProps> = ({ position }) => {
  return (
    <motion.li
      animate={{ ...position }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="absolute z-0 top-1 bottom-1 rounded-full bg-gray-200 backdrop-blur-sm"
    />
  );
};

interface MobileNavItemProps {
  children: React.ReactNode;
  onClick: () => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ children, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 3, backgroundColor: "rgba(243, 243, 243, 0.5)" }}
      className="w-full text-left p-3 rounded-lg font-semibold text-gray-700 hover:text-gray-900 hover:bg-gray-50 transition duration-200 uppercase text-sm tracking-wide"
    >
      {children}
    </motion.button>
  );
};

export default SlideTabsExample;
