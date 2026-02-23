import { useState, useRef, useCallback, useEffect } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Code2, Smartphone, Brain, Coffee } from "lucide-react";
import photoWide from "@/assets/photo-wide.png";
import photoPortrait from "@/assets/photo-portrait.png";
import aboutMedia1 from "@/assets/about-media-1.jpg";
import aboutMedia2 from "@/assets/about-media-2.jpg";
import aboutMedia3 from "@/assets/about-media-3.jpg";
import aboutMedia4 from "@/assets/about-media-4.jpg";

const highlights = [
  {
    icon: <Smartphone size={22} />,
    label: "iOS Development",
    description: "Swift, SwiftUI, CoreData, MVVM architecture",
  },
  {
    icon: <Brain size={22} />,
    label: "AI & Machine Learning",
    description: "PyTorch, Prompt Engineering, Applied ML",
  },
  {
    icon: <Code2 size={22} />,
    label: "Full Stack Skills",
    description: "Python, Java, SQL, HTML/CSS, Git",
  },
  {
    icon: <Coffee size={22} />,
    label: "19+ Apps Built",
    description: "Portfolio of SwiftUI applications with 100 Days of Swift",
  },
];

const mediaPanels = [
  { id: "panel-1", src: aboutMedia1, alt: "Nikolai at car event" },
  { id: "panel-2", src: aboutMedia2, alt: "Nikolai in New York at night" },
  { id: "panel-3", src: aboutMedia3, alt: "Nikolai by the skyline at night" },
  { id: "panel-4", src: aboutMedia4, alt: "Nikolai with Brooklyn skyline" },
];

export function About() {
  const { ref, isInView } = useInView();
  const sectionRef = useRef<HTMLElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [isHovering, setIsHovering] = useState(false);
  const [activePanel, setActivePanel] = useState(0);
  const [isMediaStripHovered, setIsMediaStripHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [80, -20, 20, -80]);
  const parallaxY2 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, -30, 30, -100]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  }, []);

  const tiltX = (mousePos.y - 0.5) * -22;
  const tiltY = (mousePos.x - 0.5) * 22;

  useEffect(() => {
    if (isMediaStripHovered) {
      return;
    }

    const timer = window.setInterval(() => {
      setActivePanel((prev) => (prev + 1) % mediaPanels.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [isMediaStripHovered]);

  return (
    <section id="about" className="py-12 md:py-16 relative" ref={(el) => {
      (ref as React.MutableRefObject<HTMLElement | null>).current = el;
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    }}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[#6366f1] mb-2"
            style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem" }}
          >
            01. About Me
          </p>
          <h2
            className="mb-12"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            Who I Am
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* ── Photo Composition ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-2 md:order-1"
          >
            <div
              ref={photoContainerRef}
              className="relative"
              style={{ perspective: "1200px" }}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => {
                setIsHovering(false);
                setMousePos({ x: 0.5, y: 0.5 });
              }}
            >
              {/* Cursor-following glow */}
              <motion.div
                className="absolute -inset-8 rounded-3xl pointer-events-none z-0"
                animate={{
                  opacity: isHovering ? 0.6 : 0,
                  background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(99,102,241,0.15), transparent 50%)`,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />

              {/* Main wide photo */}
              <motion.div
                className="relative z-10 rounded-2xl overflow-hidden"
                style={{ y: parallaxY, transformStyle: "preserve-3d" }}
                animate={{
                  rotateX: isHovering ? tiltX : 0,
                  rotateY: isHovering ? tiltY : 0,
                  scale: isHovering ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 320, damping: 24 }}
              >
                {/* Clip-path reveal */}
                <motion.div
                  initial={{ clipPath: "inset(0 100% 0 0)" }}
                  animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="relative"
                >
                  <img
                    src={photoWide}
                    alt="Nikolai Grigorev"
                    className="w-full rounded-2xl"
                    style={{
                      aspectRatio: "4/3",
                      objectFit: "cover",
                      objectPosition: "center 30%",
                    }}
                  />
                  {/* Glass overlay on bottom */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-1/3"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)",
                    }}
                  />
                </motion.div>

                {/* Liquid glass border frame */}
                <div
                  className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                  style={{
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.15), inset 0 -1px 0 rgba(0,0,0,0.2), 0 8px 32px rgba(0,0,0,0.3)",
                  }}
                />
              </motion.div>

              {/* Portrait overlay card */}
              <motion.div
                className="absolute z-30 rounded-xl"
                style={{
                  bottom: "-24px",
                  right: "-16px",
                  width: "45%",
                  y: parallaxY2,
                  transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.8, y: 40 }}
                animate={
                  isInView
                    ? {
                        opacity: 1,
                        scale: isHovering ? 1.05 : 1,
                        y: 0,
                        rotateX: isHovering ? tiltX * 0.8 : 0,
                        rotateY: isHovering ? tiltY * 0.8 : 0,
                      }
                    : {}
                }
                transition={{
                  opacity: { duration: 0.6, delay: 0.9 },
                  scale: { type: "spring", stiffness: 300, damping: 25 },
                  rotateX: { type: "spring", stiffness: 280, damping: 26 },
                  rotateY: { type: "spring", stiffness: 280, damping: 26 },
                }}
              >
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={isInView ? { clipPath: "inset(0% 0 0 0)" } : {}}
                  transition={{ duration: 1, delay: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <img
                    src={photoPortrait}
                    alt="Nikolai Grigorev portrait"
                    className="w-full rounded-xl"
                    style={{
                      aspectRatio: "3/4",
                      objectFit: "cover",
                    }}
                  />
                </motion.div>

                {/* Glass border */}
                <div
                  className="absolute inset-0 rounded-xl pointer-events-none"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.2), 0 12px 40px rgba(0,0,0,0.35), 0 4px 12px rgba(0,0,0,0.2)",
                  }}
                />

              </motion.div>

              {/* Corner accent - top left (static, behind photos) */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "-4px",
                  left: "-4px",
                  width: 24,
                  height: 24,
                  borderTop: "2px solid #6366f1",
                  borderLeft: "2px solid #6366f1",
                  borderTopLeftRadius: 8,
                  opacity: 0.6,
                  zIndex: 5,
                }}
              />

              {/* Corner accent - bottom right (static, behind photos) */}
              <div
                className="absolute pointer-events-none"
                style={{
                  bottom: "-30px",
                  right: "-22px",
                  width: 24,
                  height: 24,
                  borderBottom: "2px solid #6366f1",
                  borderRight: "2px solid #6366f1",
                  borderBottomRightRadius: 8,
                  opacity: 0.6,
                  zIndex: 5,
                }}
              />

              {/* Floating decorative elements */}
              <motion.div
                className="absolute z-0 rounded-full"
                style={{
                  width: 80,
                  height: 80,
                  top: "-20px",
                  right: "30%",
                  background: "radial-gradient(circle, rgba(99,102,241,0.15), transparent 70%)",
                  filter: "blur(1px)",
                }}
                animate={{
                  y: [0, -12, 0],
                  x: [0, 6, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute z-0 rounded-full"
                style={{
                  width: 6,
                  height: 6,
                  top: "15%",
                  left: "-12px",
                  background: "#6366f1",
                  opacity: 0.5,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 0.9, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute z-0"
                style={{
                  width: 40,
                  height: 1,
                  bottom: "40%",
                  left: "-30px",
                  background: "linear-gradient(90deg, transparent, rgba(99,102,241,0.4), transparent)",
                }}
                animate={{
                  opacity: [0.3, 0.7, 0.3],
                  scaleX: [1, 1.5, 1],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />
              <motion.div
                className="absolute z-0 rounded-full"
                style={{
                  width: 4,
                  height: 4,
                  bottom: "20%",
                  right: "10%",
                  background: "#6366f1",
                  opacity: 0.4,
                }}
                animate={{
                  y: [0, 15, 0],
                  x: [0, -8, 0],
                  opacity: [0.4, 0.8, 0.4],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
            </div>

            {/* Stripe-style media animation placeholder (5 sections) */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-20 md:mt-24"
            >
              <div className="grid grid-cols-12 gap-4 md:gap-5">
                <div className="col-span-9 relative rounded-2xl overflow-hidden">
                  <div className="h-[260px] md:h-[300px] w-full relative">
                    {mediaPanels.map((panel, idx) => (
                      <motion.img
                        key={panel.id}
                        src={panel.src}
                        alt={panel.alt}
                        className="absolute inset-0 w-full h-full object-cover"
                        animate={{
                          opacity: activePanel === idx ? 1 : 0,
                          scale: activePanel === idx ? 1 : 1.04,
                        }}
                        transition={{ duration: 0.45, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 38%, rgba(0,0,0,0.18) 100%)",
                    }}
                  />
                </div>

                <div
                  className="col-span-3 flex gap-2 md:gap-2.5"
                  onMouseEnter={() => setIsMediaStripHovered(true)}
                  onMouseLeave={() => setIsMediaStripHovered(false)}
                >
                  {mediaPanels.slice(1).map((panel, idx) => {
                    const panelIndex = idx + 1;
                    const isActive = activePanel === panelIndex;
                    return (
                      <motion.button
                        key={panel.id}
                        type="button"
                        aria-label={`Media section ${panelIndex + 1}`}
                        onMouseEnter={() => {
                          setActivePanel(panelIndex);
                          setIsMediaStripHovered(true);
                        }}
                        onFocus={() => {
                          setActivePanel(panelIndex);
                          setIsMediaStripHovered(true);
                        }}
                        onBlur={() => setIsMediaStripHovered(false)}
                        className="flex-1 rounded-xl md:rounded-2xl overflow-hidden border border-white/20"
                        animate={{
                          opacity: isActive ? 1 : 0.72,
                          scale: isActive ? 1 : 0.96,
                        }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <img
                          src={panel.src}
                          alt={panel.alt}
                          className="w-full h-full object-cover"
                        />
                        <span className="sr-only">{panel.id}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ── Text + Highlights ── */}
          <div className="order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <p
                className="mb-6"
                style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--t-text-body)" }}
              >
                I am an iOS Developer and CIS student at City Tech (CUNY) driven by a "lifting
                while climbing" philosophy. My focus is on bridging the gap between robust backend
                logic and elegant, user-centric interfaces. With a foundation in Computer
                Information Systems and an upcoming Master's in Artificial Intelligence at UC
                Boulder, I am dedicated to becoming an AI-Enhanced iOS Developer.
              </p>
              <p
                className="mb-6"
                style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--t-text-body)" }}
              >
                Currently, I am deep-diving into the iOS ecosystem, specifically modern mobile
                architecture and the integration of Large Language Models (LLMs) into native
                applications. Whether it's building with SwiftUI or exploring the latest in mobile
                AI, I aim to create seamless digital experiences.
              </p>
              <p
                className="mb-8"
                style={{ fontSize: "1rem", lineHeight: 1.8, color: "var(--t-text-body)" }}
              >
                Based in New York City, I'm always excited to connect with fellow developers,
                engineers, and tech enthusiasts who are passionate about the future of iOS and AI
                innovation. Let's build the next generation of mobile technology together! 🦄
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.25 } }}
                  className="p-5 rounded-xl hover:border-[#6366f1]/30 hover:bg-[#6366f1]/5 transition-all group cursor-default"
                  style={{
                    backgroundColor: "var(--t-bg-card-alt)",
                    border: "1px solid var(--t-border)",
                    boxShadow: "var(--t-shadow)",
                  }}
                >
                  <div className="text-[#6366f1] mb-3 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4
                    className="mb-1"
                    style={{ fontSize: "0.9rem", fontWeight: 600, color: "var(--t-text)" }}
                  >
                    {item.label}
                  </h4>
                  <p style={{ fontSize: "0.8rem", lineHeight: 1.5, color: "var(--t-text-muted)" }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
