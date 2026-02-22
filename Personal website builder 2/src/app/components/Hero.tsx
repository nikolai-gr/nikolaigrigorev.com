import { motion } from "motion/react";
import { Github, Linkedin, Mail, MapPin, ChevronDown } from "lucide-react";
import { NoodleManAnimation } from "./NoodleManAnimation";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at top, var(--t-hero-1) 0%, var(--t-hero-2) 60%)",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_rgba(99,102,241,0.08)_0%,_transparent_50%)]" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(var(--t-grid) 1px, transparent 1px), linear-gradient(90deg, var(--t-grid) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noodle man background animation */}
      <NoodleManAnimation />

      {/* Content — centered */}
      <div className="relative z-10 flex-1 flex items-center justify-center py-16 px-6">
        <div className="max-w-xl w-full text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <MapPin size={14} className="text-[#6366f1]" />
              <span style={{ fontSize: "0.875rem", color: "var(--t-text-body)" }}>
                New York City, NY
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              color: "var(--t-text)",
            }}
          >
            Nikolai Grigorev
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-[#6366f1] mb-6"
            style={{
              fontFamily: "JetBrains Mono, monospace",
              fontSize: "clamp(0.875rem, 2vw, 1.125rem)",
              fontWeight: 400,
            }}
          >
            iOS Developer · AI Enthusiast · CS Student
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-2xl mx-auto mb-10 text-center"
            style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--t-text-body)" }}
          >
            Building elegant, user-centric mobile experiences with Swift & SwiftUI.{" "}
            <br className="hidden sm:block" />
            Pursuing an M.S. in Artificial Intelligence at CU Boulder while{" "}
            <br className="hidden sm:block" />
            creating production-ready iOS applications.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4"
          >
            {[
              { href: "https://github.com/nikolai-gr", icon: <Github size={20} /> },
              { href: "https://www.linkedin.com/in/nikolai-gr/", icon: <Linkedin size={20} /> },
              { href: "mailto:nikolaig.dev@gmail.com", icon: <Mail size={20} />, noTarget: true },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                target={item.noTarget ? undefined : "_blank"}
                rel={item.noTarget ? undefined : "noopener noreferrer"}
                className="liquid-glass p-3.5 rounded-full"
                style={{ color: "var(--t-text-body)" }}
              >
                {item.icon}
              </a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex items-center justify-center gap-5"
          >
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="liquid-glass-primary px-7 py-3 text-white rounded-full"
              style={{ fontSize: "0.9rem", fontWeight: 500 }}
            >
              Learn More
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="liquid-glass px-7 py-3 rounded-full"
              style={{
                fontSize: "0.9rem",
                fontWeight: 500,
                color: "var(--t-text)",
              }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={20} style={{ color: "var(--t-text-dim)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
