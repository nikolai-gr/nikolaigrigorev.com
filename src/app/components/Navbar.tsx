import { useState, useRef, useCallback, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTheme } from "./hooks/useTheme";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const resumePdfPath = "/Nikolai_Grigorev_Resume.pdf";

  /* ── Sliding glass pill ── */
  const capsuleRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pill, setPill] = useState({ x: 0, w: 0, h: 0, y: 0 });
  const [capsuleSize, setCapsuleSize] = useState({ w: 0, h: 0 });

  const LENS_SCALE = 1.0;
  const springConfig = { type: "spring" as const, stiffness: 500, damping: 35, mass: 0.6 };

  const measure = useCallback((i: number) => {
    const capsule = capsuleRef.current;
    const btn = linkRefs.current[i];
    if (!capsule || !btn) return;
    const cr = capsule.getBoundingClientRect();
    const br = btn.getBoundingClientRect();
    setCapsuleSize({ w: cr.width, h: cr.height });
    setPill({
      x: br.left - cr.left,
      w: br.width,
      h: br.height,
      y: br.top - cr.top,
    });
  }, []);

  const onEnter = useCallback(
    (i: number) => {
      setHoveredIdx(i);
      measure(i);
    },
    [measure]
  );

  const onLeave = useCallback(() => setHoveredIdx(null), []);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navRef = useRef<HTMLElement>(null);

  const go = (href: string) => {
    setMobileOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  // Close mobile menu on outside tap
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent | TouchEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [mobileOpen]);

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-[9999] liquid-glass-nav transition-all duration-500"
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-3 md:py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => go("#hero")}
          className="tracking-tight cursor-pointer"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "1.125rem",
            fontWeight: 600,
            color: "var(--t-text)",
          }}
        >
          {"<NG />"}
        </button>

        {/* ── Desktop: Floating glass capsule ── */}
        <div className="hidden md:flex items-center gap-3">
          <div
            ref={capsuleRef}
            className="liquid-glass-capsule relative flex items-center p-1"
            onMouseLeave={onLeave}
          >
            {/* Sliding glass pill with magnified lens */}
            <AnimatePresence>
              {hoveredIdx !== null && (
                <motion.div
                  className="liquid-glass-pill"
                  style={{
                    top: pill.y,
                    height: pill.h,
                    zIndex: 20,
                  }}
                  initial={{ opacity: 0, left: pill.x, width: pill.w }}
                  animate={{
                    opacity: 1,
                    left: pill.x,
                    width: pill.w,
                    height: pill.h,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{
                    left: springConfig,
                    width: springConfig,
                    opacity: { duration: 0.15 },
                  }}
                >
                  {/* Lens: clipped duplicate of all nav labels */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      overflow: "hidden",
                      borderRadius: "9999px",
                      transform: `scale(${LENS_SCALE})`,
                      transformOrigin: "50% 50%",
                      zIndex: 2,
                    }}
                  >
                    <motion.div
                      animate={{ x: -pill.x, y: -pill.y }}
                      transition={{
                        x: { duration: 0 },
                        y: { duration: 0 },
                      }}
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: capsuleSize.w,
                        height: capsuleSize.h,
                        display: "flex",
                        alignItems: "center",
                        padding: "4px",
                      }}
                    >
                      {navLinks.map((link) => (
                        <span
                          key={link.href}
                          className="nav-link-underline nav-link-underline-force px-4 py-1.5"
                          style={{
                            fontSize: "0.8rem",
                            fontWeight: 400,
                            color: "var(--t-text)",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                          }}
                        >
                          {link.label}
                        </span>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {navLinks.map((link, i) => (
              <button
                key={link.href}
                ref={(el) => {
                  linkRefs.current[i] = el;
                }}
                onClick={() => go(link.href)}
                onMouseEnter={() => onEnter(i)}
                className={`nav-link-underline ${hoveredIdx === i ? "nav-link-underline-hide" : ""} relative z-10 px-4 py-1.5 cursor-pointer transition-colors duration-150`}
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 400,
                  color:
                    hoveredIdx === i
                      ? "transparent"
                      : "var(--t-text-body)",
                  borderRadius: "9999px",
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="liquid-glass p-2.5 rounded-full cursor-pointer"
            aria-label="Toggle theme"
            style={{ color: "var(--t-text-body)" }}
          >
            <motion.div
              key={isDark ? "moon" : "sun"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </motion.div>
          </button>

          {/* Resume CTA */}
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-primary px-5 py-2 rounded-full text-white"
            style={{ fontSize: "0.825rem", fontWeight: 500 }}
          >
            Resume
          </a>
        </div>

        {/* ── Mobile buttons ── */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="liquid-glass w-11 h-11 flex items-center justify-center rounded-full cursor-pointer shrink-0"
            aria-label="Toggle theme"
            style={{ color: "var(--t-text-body)" }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            className="liquid-glass w-11 h-11 flex items-center justify-center rounded-full cursor-pointer shrink-0"
            style={{ color: "var(--t-text)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <a
            href={resumePdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass-primary h-11 px-3 flex items-center justify-center rounded-full text-white shrink-0"
            style={{ fontSize: "0.8rem", fontWeight: 500 }}
          >
            Resume
          </a>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden liquid-glass-nav"
          >
            <div className="px-6 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => go(link.href)}
                  className="nav-link-underline transition-colors text-left cursor-pointer py-1"
                  style={{ fontSize: "0.875rem", color: "var(--t-text-body)" }}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
