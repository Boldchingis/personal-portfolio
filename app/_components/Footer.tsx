"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/animated-underline-text-one";
import { useRef } from "react";
import { useInView } from "framer-motion";

const Particles = dynamic(() => import("../Particles/Particles"), { ssr: false });

export default function Footer() {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true });

  const handleEmailClick = () => {
    window.location.href = "mailto:bboldchingis@gmail.com";
  };

  const handlePhoneClick = () => {
    window.location.href = "tel:+97699498619";
  };

  const handleInstagramClick = () => {
    window.open("https://www.instagram.com/boldchingis_/", "_blank");
  };

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/ObludaRaikou", "_blank");
  };

  const handleGitHubClick = () => {
    window.open("https://github.com/Boldchingis", "_blank");
  };

  return (
    <div 
      ref={footerRef}
      className="w-full min-h-screen relative bg-[#f3f3f3] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Particles background */}
      <div className="absolute inset-0 z-0">
        <Particles
          particleColors={["#000000", "#000000"]}
          particleCount={400}
          particleSpread={10}
          speed={0.5}
          particleBaseSize={200}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={true}
        />  
      </div>
      
      <div className="relative z-10 w-full max-w-7xl mx-auto px-8 py-32">
        {isInView && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center mb-32"
          >
            <div className="inline-block">
              <h2 className="text-5xl md:text-7xl font-black text-black mb-6 tracking-tighter">
                LET'S CREATE
              </h2>
              <div className="w-full h-1 bg-black transform rotate-1"></div>
            </div>
          </motion.div>
        )}

        <div className="relative">
          {/* Floating Social Media Icons - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute left-8 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col space-y-6"
            style={{
              animation: "float-left 6s ease-in-out infinite"
            }}
          >
            {/* Email */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleEmailClick}
              className="group cursor-pointer"
              style={{
                animation: "float-email 4s ease-in-out infinite",
                animationDelay: "0s"
              }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handlePhoneClick}
              className="group cursor-pointer"
              style={{
                animation: "float-phone 5s ease-in-out infinite",
                animationDelay: "1s"
              }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            </motion.div>

            {/* GitHub */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleGitHubClick}
              className="group cursor-pointer"
              style={{
                animation: "float-github 6s ease-in-out infinite",
                animationDelay: "2s"
              }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Floating Social Media Icons - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute right-8 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col space-y-6"
            style={{
              animation: "float-right 7s ease-in-out infinite"
            }}
          >
            {/* Instagram */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleInstagramClick}
              className="group cursor-pointer"
              style={{
                animation: "float-instagram 5.5s ease-in-out infinite",
                animationDelay: "0.5s"
              }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
            </motion.div>

            {/* Facebook */}
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFacebookClick}
              className="group cursor-pointer"
              style={{
                animation: "float-facebook 4.5s ease-in-out infinite",
                animationDelay: "1.5s"
              }}
            >
              <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
            </motion.div>
          </motion.div>

          {/* Centered Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center"
          >
            <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl border border-white/30 transform rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="flex items-center justify-between mb-8 md:mb-10">
                <h3 className="text-2xl md:text-3xl font-black text-black">
                  Send Message
                </h3>
                <div className="w-16 md:w-20 h-1 bg-black transform rotate-12"></div>
              </div>
              
              <form 
                action="mailto:bboldchingis@gmail.com"
                method="post"
                encType="text/plain"
                className="space-y-6 md:space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                  <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-100/80 border-2 border-transparent rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 placeholder-gray-500 font-medium text-base md:text-lg"
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-100/80 border-2 border-transparent rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 placeholder-gray-500 font-medium text-base md:text-lg"
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div className="transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                  <input
                    type="text"
                    name="subject"
                    required
                    className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-100/80 border-2 border-transparent rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 placeholder-gray-500 font-medium text-base md:text-lg"
                    placeholder="Subject"
                  />
                </div>
                
                <div className="transform rotate-1 hover:rotate-0 transition-transform duration-300">
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full px-6 md:px-8 py-4 md:py-5 bg-gray-100/80 border-2 border-transparent rounded-2xl focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 placeholder-gray-500 font-medium text-base md:text-lg resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05, rotate: 2 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full bg-black text-white py-5 md:py-6 px-8 md:px-10 rounded-2xl font-bold text-lg md:text-xl hover:bg-gray-800 transition-all duration-300 transform hover:-translate-y-1 shadow-xl hover:shadow-2xl mt-6 md:mt-8"
                >
                  SEND MESSAGE
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Mobile Contact Icons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="xl:hidden mt-12"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-black mb-4">Get In Touch</h3>
              <p className="text-gray-600">Choose your preferred way to connect</p>
            </div>
            
            <div className="grid grid-cols-5 gap-6 max-w-sm mx-auto">
              {/* Email - Mobile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleEmailClick}
                className="group cursor-pointer"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </motion.div>

              {/* Phone - Mobile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePhoneClick}
                className="group cursor-pointer"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </motion.div>

              {/* GitHub - Mobile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleGitHubClick}
                className="group cursor-pointer"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
              </motion.div>

              {/* Instagram - Mobile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleInstagramClick}
                className="group cursor-pointer"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
              </motion.div>

              {/* Facebook - Mobile */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFacebookClick}
                className="group cursor-pointer"
              >
                <div className="w-14 h-14 bg-black rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
