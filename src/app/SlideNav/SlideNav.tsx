"use client";
import React, { useEffect, useRef, useState, lazy, Suspense, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

// Dynamic imports for heavy components with better error boundaries
const Hero = lazy(() => import("../_components/Hero"));
const Main = lazy(() => import("../_components/Main"));
const Side = lazy(() => import("../_components/Side"));
const Section = lazy(() => import("../_components/Section"));
const Footer = lazy(() => import("../_components/Footer"));

// Enhanced loading component with skeleton
const SectionLoader = ({ variant = 'default' }: { variant?: 'hero' | 'default' }) => (
  <div className={`${variant === 'hero' ? 'h-screen' : 'min-h-screen'} bg-[#f3f3f3] flex items-center justify-center relative overflow-hidden`}>
    {/* Animated background pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0 bg-gradient-to-br from-black/10 via-transparent to-black/10 animate-pulse" />
    </div>
    
    {/* Loading spinner with enhanced design */}
    <div className="relative flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-3 border-black/20 rounded-full animate-spin" />
        <div className="absolute inset-0 w-12 h-12 border-3 border-transparent border-t-black rounded-full animate-spin" style={{ animationDuration: '0.75s' }} />
      </div>
      
      {/* Loading text */}
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  </div>
);

interface CursorPosition {
  left: number;
  width: number;
  opacity: number;
}

export const SlideTabsExample: React.FC = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Section IDs for navigation
  const sections = ['home', 'about', 'skills', 'projects', 'contact'];

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

  // Enhanced scroll to section with offset and smooth animation
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setIsScrolling(true);
      setActiveSection(sectionId);
      
      // Calculate offset for fixed navigation
      const navHeight = 80; // Approximate navigation height
      const elementTop = element.offsetTop - navHeight;
      
      // Use smooth scroll with better performance
      window.scrollTo({
        top: elementTop,
        behavior: 'smooth'
      });
      
      // Clear existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Reset scrolling state after animation
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1000);
    }
  }, []);

  // Intersection Observer for active section detection
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% visible from top
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrolling) return; // Don't update during programmatic scrolling
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [sections, isScrolling]);

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden sm:block sticky top-0 z-30 w-full md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2">
        <div className="relative">
          {/* Gradient fade left - matches main background */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-gradient-to-r from-[#f3f3f3] via-[#f3f3f3]/80 to-transparent z-20" />
          {/* Gradient fade right - matches main background */}
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-gradient-to-l from-[#f3f3f3] via-[#f3f3f3]/80 to-transparent z-20" />
          <SlideTabs scrollToSection={scrollToSection} activeSection={activeSection} />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsSheetOpen(true)}
          className="p-3 rounded-full backdrop-blur-xl bg-white/90 border border-black hover:bg-white/95 transition-all duration-200"
          aria-label="Open navigation menu"
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
      <AnimatePresence mode="wait">
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
                  aria-label="Close navigation menu"
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
                  <MobileNavItem 
                    onClick={() => {
                      scrollToSection('home');
                      setIsSheetOpen(false);
                    }}
                  >
                    Home
                  </MobileNavItem>
                  <MobileNavItem 
                    onClick={() => {
                      scrollToSection('about');
                      setIsSheetOpen(false);
                    }}
                  >
                    About me
                  </MobileNavItem>
                  <MobileNavItem 
                    onClick={() => {
                      scrollToSection('skills');
                      setIsSheetOpen(false);
                    }}
                  >
                    Tech skills
                  </MobileNavItem>
                  <MobileNavItem 
                    onClick={() => {
                      scrollToSection('projects');
                      setIsSheetOpen(false);
                    }}
                  >
                    Projects
                  </MobileNavItem>
                  <MobileNavItem 
                    onClick={() => {
                      scrollToSection('contact');
                      setIsSheetOpen(false);
                    }}
                  >
                    Contact
                  </MobileNavItem>
                </nav>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Your Components with Suspense */}
      <div>
        {/* Home Section */}
        <section id="home">
          <Suspense fallback={<SectionLoader />}>
            <Hero />
          </Suspense>
        </section>

        {/* About Me Section */}
        <section id="about">
          <Suspense fallback={<SectionLoader />}>
            <Main />
          </Suspense>
        </section>

        {/* Tech Skills Section */}
        <section id="skills">
          <Suspense fallback={<SectionLoader />}>
            <Side />
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Suspense fallback={<SectionLoader />}>
            <Section />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Suspense fallback={<SectionLoader />}>
            <Footer />
          </Suspense>
        </section>
      </div>
    </>
  );
};

interface SlideTabsProps {
  scrollToSection: (sectionId: string) => void;
  activeSection: string;
}

const SlideTabs: React.FC<SlideTabsProps> = ({ scrollToSection, activeSection }) => {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  
  const [activePosition, setActivePosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  const tabRefs = useRef<{ [key: string]: HTMLLIElement | null }>({
    home: null,
    about: null,
    skills: null,
    projects: null,
    contact: null,
  });

  // Update active tab position when activeSection changes
  useEffect(() => {
    const activeTabElement = tabRefs.current[activeSection];
    if (activeTabElement) {
      const { width } = activeTabElement.getBoundingClientRect();
      setActivePosition({
        left: activeTabElement.offsetLeft,
        width,
        opacity: 1,
      });
    }
  }, [activeSection]);

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({
          ...pv,
          opacity: 0,
        }));
      }}
      className="relative mx-auto flex w-full max-w-full overflow-x-auto whitespace-nowrap rounded-full border border-gray-200/50 p-1.5 md:w-fit md:max-w-none backdrop-blur-xl bg-white/95 shadow-lg shadow-black/5 scrollbar-hide scroll-smooth"
      style={{ WebkitOverflowScrolling: "touch" }}
    >
      {/* Active tab indicator */}
      <motion.li
        animate={{ ...activePosition }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className="absolute z-0 top-1.5 bottom-1.5 rounded-full bg-black shadow-sm"
      />
      
      {/* Hover indicator */}
      <Cursor position={position} />
      
      <Tab 
        ref={(el) => (tabRefs.current.home = el)}
        setPosition={setPosition} 
        onClick={() => scrollToSection('home')}
        isActive={activeSection === 'home'}
        sectionId="home"
      >
        Home
      </Tab>
      <Tab 
        ref={(el) => (tabRefs.current.about = el)}
        setPosition={setPosition} 
        onClick={() => scrollToSection('about')}
        isActive={activeSection === 'about'}
        sectionId="about"
      >
        About me
      </Tab>
      <Tab 
        ref={(el) => (tabRefs.current.skills = el)}
        setPosition={setPosition} 
        onClick={() => scrollToSection('skills')}
        isActive={activeSection === 'skills'}
        sectionId="skills"
      >
        Tech skills
      </Tab>
      <Tab 
        ref={(el) => (tabRefs.current.projects = el)}
        setPosition={setPosition} 
        onClick={() => scrollToSection('projects')}
        isActive={activeSection === 'projects'}
        sectionId="projects"
      >
        Projects
      </Tab>
      <Tab 
        ref={(el) => (tabRefs.current.contact = el)}
        setPosition={setPosition} 
        onClick={() => scrollToSection('contact')}
        isActive={activeSection === 'contact'}
        sectionId="contact"
      >
        Contact
      </Tab>
    </ul>
  );
};

interface TabProps {
  children: React.ReactNode;
  setPosition: React.Dispatch<React.SetStateAction<CursorPosition>>;
  onClick?: () => void;
  isActive: boolean;
  sectionId: string;
}

const Tab = React.forwardRef<HTMLLIElement, TabProps>(({ children, setPosition, onClick, isActive, sectionId }, ref) => {
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        const element = ref as React.RefObject<HTMLLIElement>;
        if (!element.current) return;
        const { width } = element.current.getBoundingClientRect();
        setPosition({
          left: element.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={`relative font-semibold z-20 block cursor-pointer px-4 py-3 md:px-6 md:py-4 text-sm md:text-base uppercase transition-all duration-300 flex-shrink-0 ${
        isActive
          ? 'text-white'
          : 'text-gray-700 hover:text-gray-900'
      }`}
    >
      {children}
    </li>
  );
});

Tab.displayName = 'Tab';

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