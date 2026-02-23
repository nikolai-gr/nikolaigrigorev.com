import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";

// ── Skill data (no levels / indicators) ────────────────────────

interface Skill {
  name: string;
  id: string;
  cat: "lang" | "tools" | "ml" | "concepts";
}

const SKILLS: Skill[] = [
  { name: "Swift / SwiftUI", id: "swift", cat: "lang" },
  { name: "Python", id: "python", cat: "lang" },
  { name: "Java", id: "java", cat: "lang" },
  { name: "SQL", id: "sql", cat: "lang" },
  { name: "HTML / CSS", id: "html", cat: "lang" },
  { name: "Xcode", id: "xcode", cat: "tools" },
  { name: "CoreData", id: "coredata", cat: "tools" },
  { name: "Git", id: "git", cat: "tools" },
  { name: "Figma", id: "figma", cat: "tools" },
  { name: "MySQL", id: "mysql", cat: "tools" },
  { name: "Unix", id: "unix", cat: "tools" },
  { name: "PyTorch", id: "pytorch", cat: "ml" },
  { name: "Prompt Engineering", id: "prompt", cat: "ml" },
  { name: "MVVM", id: "mvvm", cat: "concepts" },
  { name: "Protocol-Oriented", id: "protocol", cat: "concepts" },
  { name: "RESTful APIs", id: "rest", cat: "concepts" },
  { name: "Clean Code", id: "cleancode", cat: "concepts" },
  { name: "HIG (Apple)", id: "hig", cat: "concepts" },
];

const SKILL_ICON_URLS: Record<string, string> = {
  swift: "https://cdn.simpleicons.org/swift",
  python: "https://cdn.simpleicons.org/python",
  java: "https://cdn.simpleicons.org/openjdk",
  sql: "https://cdn.simpleicons.org/postgresql",
  html: "https://cdn.simpleicons.org/html5",
  xcode: "https://cdn.simpleicons.org/xcode",
  coredata: "https://cdn.simpleicons.org/apple",
  git: "https://cdn.simpleicons.org/git",
  figma: "https://cdn.simpleicons.org/figma",
  mysql: "https://cdn.simpleicons.org/mysql",
  unix: "https://cdn.simpleicons.org/gnubash",
  pytorch: "https://cdn.simpleicons.org/pytorch",
  prompt: "https://cdn.simpleicons.org/openai",
  mvvm: "https://cdn.simpleicons.org/androidstudio",
  protocol: "https://cdn.simpleicons.org/openapiinitiative",
  rest: "https://cdn.simpleicons.org/postman",
  cleancode: "https://cdn.simpleicons.org/eslint",
  hig: "https://cdn.simpleicons.org/apple",
};

const SKILL_TEXT_LINES = [
  { label: "Languages", value: "Swift (SwiftUI), Python, Java, SQL, HTML/CSS" },
  { label: "Infrastructure/Tools", value: "Xcode, CoreData, Git, Figma, MySQL, PyTorch, Unix" },
  { label: "ML/AI", value: "PyTorch, Prompt Engineering" },
];

// ── Icon drawing on canvas ─────────────────────────────────────

function drawIcon(ctx: CanvasRenderingContext2D, id: string, sz: number) {
  const r = sz * 0.38;
  ctx.lineWidth = sz * 0.055;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (id) {
    case "swift": {
      ctx.beginPath();
      ctx.moveTo(-r * 0.9, r * 0.1);
      ctx.quadraticCurveTo(-r * 0.3, -r * 0.9, r * 0.8, -r * 0.6);
      ctx.quadraticCurveTo(r * 0.2, -r * 0.1, -r * 0.5, r * 0.5);
      ctx.quadraticCurveTo(r * 0.3, r * 0.3, r * 0.8, -r * 0.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, r * 0.5);
      ctx.quadraticCurveTo(-r * 0.8, r * 0.8, -r * 0.3, r * 0.9);
      ctx.quadraticCurveTo(r * 0.5, r * 0.8, r * 0.9, r * 0.3);
      ctx.stroke();
      break;
    }
    case "python": {
      ctx.beginPath();
      ctx.arc(-r * 0.15, -r * 0.2, r * 0.45, -1.5, 1.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r * 0.15, r * 0.2, r * 0.45, 1.64, 4.64);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-r * 0.2, -r * 0.42, r * 0.07, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(r * 0.2, r * 0.42, r * 0.07, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "java": {
      ctx.beginPath();
      ctx.roundRect(-r * 0.4, -r * 0.05, r * 0.65, r * 0.7, r * 0.08);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r * 0.35, r * 0.3, r * 0.18, -1.2, 1.2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.12, -r * 0.2);
      ctx.quadraticCurveTo(-r * 0.02, -r * 0.5, -r * 0.12, -r * 0.75);
      ctx.moveTo(r * 0.1, -r * 0.2);
      ctx.quadraticCurveTo(r * 0.2, -r * 0.5, r * 0.1, -r * 0.75);
      ctx.stroke();
      break;
    }
    case "sql": {
      ctx.beginPath();
      ctx.ellipse(0, -r * 0.4, r * 0.55, r * 0.22, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, -r * 0.4);
      ctx.lineTo(-r * 0.55, r * 0.4);
      ctx.moveTo(r * 0.55, -r * 0.4);
      ctx.lineTo(r * 0.55, r * 0.4);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, r * 0.4, r * 0.55, r * 0.22, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(0, 0, r * 0.55, r * 0.22, 0, Math.PI * 0.05, Math.PI * 0.95);
      ctx.stroke();
      break;
    }
    case "html": {
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.85);
      ctx.lineTo(r * 0.65, -r * 0.55);
      ctx.lineTo(r * 0.5, r * 0.55);
      ctx.lineTo(0, r * 0.85);
      ctx.lineTo(-r * 0.5, r * 0.55);
      ctx.lineTo(-r * 0.65, -r * 0.55);
      ctx.closePath();
      ctx.stroke();
      ctx.font = `bold ${sz * 0.2}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("< >", 0, 0);
      break;
    }
    case "xcode": {
      ctx.beginPath();
      ctx.roundRect(-r * 0.4, -r * 0.75, r * 0.8, r * 0.38, r * 0.06);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.06, -r * 0.37);
      ctx.lineTo(-r * 0.06, r * 0.75);
      ctx.moveTo(r * 0.06, -r * 0.37);
      ctx.lineTo(r * 0.06, r * 0.75);
      ctx.stroke();
      break;
    }
    case "coredata": {
      for (let i = 0; i < 3; i++) {
        const y = -r * 0.5 + i * r * 0.5;
        ctx.beginPath();
        ctx.ellipse(0, y, r * 0.55, r * 0.16, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(-r * 0.55, -r * 0.5);
      ctx.lineTo(-r * 0.55, r * 0.5);
      ctx.moveTo(r * 0.55, -r * 0.5);
      ctx.lineTo(r * 0.55, r * 0.5);
      ctx.stroke();
      break;
    }
    case "git": {
      const dots: [number, number][] = [[0, r * 0.55], [-r * 0.4, -r * 0.35], [r * 0.4, -r * 0.35]];
      for (const [dx, dy] of dots) {
        ctx.beginPath();
        ctx.arc(dx, dy, r * 0.11, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.beginPath();
      ctx.moveTo(0, r * 0.44);
      ctx.lineTo(0, -r * 0.05);
      ctx.lineTo(-r * 0.4, -r * 0.24);
      ctx.moveTo(0, -r * 0.05);
      ctx.lineTo(r * 0.4, -r * 0.24);
      ctx.stroke();
      break;
    }
    case "figma": {
      const w = r * 0.32, h = r * 0.35;
      ctx.beginPath(); ctx.roundRect(-w, -h * 2.2, w, h, [r * 0.1, 0, 0, 0]); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(0, -h * 2.2, w, h, [0, r * 0.1, r * 0.1, 0]); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(-w, -h * 1.2, w, h, r * 0.02); ctx.stroke();
      ctx.beginPath(); ctx.arc(w * 0.5, -h * 0.7, w * 0.48, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(-w, -h * 0.2, w, h, [0, 0, r * 0.1, r * 0.1]); ctx.stroke();
      break;
    }
    case "mysql": {
      ctx.beginPath();
      ctx.moveTo(-r * 0.7, r * 0.25);
      ctx.quadraticCurveTo(-r * 0.3, -r * 0.8, r * 0.3, -r * 0.3);
      ctx.quadraticCurveTo(r * 0.7, -r * 0.05, r * 0.5, r * 0.45);
      ctx.quadraticCurveTo(r * 0.3, r * 0.7, -r * 0.1, r * 0.5);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.1, -r * 0.45);
      ctx.quadraticCurveTo(r * 0.1, -r * 0.8, r * 0.35, -r * 0.6);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r * 0.15, -r * 0.08, r * 0.05, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case "unix": {
      ctx.beginPath();
      ctx.roundRect(-r * 0.65, -r * 0.5, r * 1.3, r * 1.0, r * 0.1);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.65, -r * 0.22);
      ctx.lineTo(r * 0.65, -r * 0.22);
      ctx.stroke();
      ctx.font = `bold ${sz * 0.22}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(">_", 0, r * 0.15);
      break;
    }
    case "pytorch": {
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.8);
      ctx.bezierCurveTo(r * 0.5, -r * 0.4, r * 0.6, r * 0.15, r * 0.35, r * 0.5);
      ctx.quadraticCurveTo(r * 0.15, r * 0.8, 0, r * 0.8);
      ctx.quadraticCurveTo(-r * 0.15, r * 0.8, -r * 0.35, r * 0.5);
      ctx.bezierCurveTo(-r * 0.6, r * 0.15, -r * 0.5, -r * 0.4, 0, -r * 0.8);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -r * 0.25);
      ctx.bezierCurveTo(r * 0.2, r * 0.0, r * 0.2, r * 0.3, 0, r * 0.45);
      ctx.bezierCurveTo(-r * 0.2, r * 0.3, -r * 0.2, r * 0.0, 0, -r * 0.25);
      ctx.stroke();
      break;
    }
    case "prompt": {
      ctx.beginPath();
      for (let i = 0; i <= 8; i++) {
        const a = (i / 8) * Math.PI * 2 - Math.PI * 0.5;
        const rad = i % 2 === 0 ? r * 0.8 : r * 0.25;
        i === 0 ? ctx.moveTo(Math.cos(a) * rad, Math.sin(a) * rad) : ctx.lineTo(Math.cos(a) * rad, Math.sin(a) * rad);
      }
      ctx.closePath();
      ctx.stroke();
      break;
    }
    case "mvvm": {
      ctx.beginPath(); ctx.roundRect(-r * 0.55, -r * 0.7, r * 0.6, r * 0.45, r * 0.06); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(-r * 0.25, -r * 0.35, r * 0.6, r * 0.45, r * 0.06); ctx.stroke();
      ctx.beginPath(); ctx.roundRect(r * 0.05, 0, r * 0.6, r * 0.45, r * 0.06); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(-r * 0.25, r * 0.65);
      ctx.lineTo(r * 0.25, r * 0.65);
      ctx.moveTo(r * 0.1, r * 0.5);
      ctx.lineTo(r * 0.25, r * 0.65);
      ctx.lineTo(r * 0.1, r * 0.8);
      ctx.stroke();
      break;
    }
    case "protocol": {
      ctx.beginPath();
      ctx.arc(-r * 0.25, 0, r * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(r * 0.25, 0, r * 0.38, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case "rest": {
      ctx.beginPath();
      ctx.moveTo(-r * 0.6, -r * 0.25);
      ctx.lineTo(r * 0.6, -r * 0.25);
      ctx.moveTo(r * 0.3, -r * 0.5);
      ctx.lineTo(r * 0.6, -r * 0.25);
      ctx.lineTo(r * 0.3, 0);
      ctx.moveTo(r * 0.6, r * 0.25);
      ctx.lineTo(-r * 0.6, r * 0.25);
      ctx.moveTo(-r * 0.3, 0);
      ctx.lineTo(-r * 0.6, r * 0.25);
      ctx.lineTo(-r * 0.3, r * 0.5);
      ctx.stroke();
      break;
    }
    case "cleancode": {
      ctx.font = `300 ${sz * 0.42}px 'JetBrains Mono', monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("{ }", 0, 0);
      break;
    }
    case "hig": {
      ctx.beginPath();
      ctx.moveTo(0, r * 0.85);
      ctx.bezierCurveTo(-r * 0.55, r * 0.85, -r * 0.75, r * 0.25, -r * 0.55, -r * 0.15);
      ctx.bezierCurveTo(-r * 0.4, -r * 0.5, -r * 0.15, -r * 0.55, 0, -r * 0.35);
      ctx.bezierCurveTo(r * 0.15, -r * 0.55, r * 0.4, -r * 0.5, r * 0.55, -r * 0.15);
      ctx.bezierCurveTo(r * 0.75, r * 0.25, r * 0.55, r * 0.85, 0, r * 0.85);
      ctx.closePath();
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(r * 0.05, -r * 0.45);
      ctx.quadraticCurveTo(r * 0.3, -r * 0.85, r * 0.15, -r * 0.85);
      ctx.quadraticCurveTo(0, -r * 0.7, r * 0.05, -r * 0.45);
      ctx.stroke();
      break;
    }
  }
}

// ── Node types ─────────────────────────────────────────────────

interface ONode {
  skill: Skill;
  orbitFracX: number;
  orbitFracY: number;
  orbitSpd: number;
  orbitIncl: number;
  breathePhase: number;
  angle: number;
  x: number; y: number; z: number;
  sx: number; sy: number;
  scale: number;
  alpha: number;
  startX: number; startY: number;
  enterT: number;
  hoverT: number;
  prevZ: number;
}

interface Sparkle { x: number; y: number; life: number }

// ── Helpers ────────────────────────────────────────────────────

function springEase(t: number): number {
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return 1 - Math.pow(1 - t, 4) * Math.cos(t * Math.PI * 2.5);
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

// ── Component ──────────────────────────────────────────────────

export function Skills() {
  const { ref: headerRef, isInView: headerVisible } = useInView(0.1);
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipNameRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    if (!section || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = 0, height = 0;
    let rafId: number;
    let time = 0;
    let lastTs = 0;
    let inView = false;
    let isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const isMobile = window.innerWidth < 768;

    const skills = isMobile ? SKILLS.filter(s => s.cat !== "concepts") : SKILLS;

    let cursorX = -9999, cursorY = -9999;
    let cursorActive = false;
    let touchTimeout = 0;

    // Create nodes with orbital parameters
    const nodes: ONode[] = skills.map((skill, i) => ({
      skill,
      orbitFracX: 0.18 + (i / skills.length) * 0.22 + Math.sin(i * 2.2) * 0.04,
      orbitFracY: 0.09 + (i / skills.length) * 0.12 + Math.cos(i * 2.4) * 0.02,
      orbitSpd: 0.12 + Math.sin(i * 1.3) * 0.06 + (i % 3) * 0.03,
      orbitIncl: (Math.sin(i * 3.1) * 0.45),
      breathePhase: i * 1.1,
      angle: (i / skills.length) * Math.PI * 2 + Math.sin(i * 0.7) * 0.5,
      x: 0, y: 0, z: 0,
      sx: 0, sy: 0,
      scale: 1, alpha: 0.5,
      startX: 0, startY: 0,
      enterT: 0,
      hoverT: 0,
      prevZ: 0,
    }));

    const sparkles: Sparkle[] = [];
    let hoveredIdx = -1;
    const iconCache = new Map<string, HTMLImageElement>();

    // Preload internet icons; fallback to vector drawIcon if load fails.
    for (const s of skills) {
      const iconUrl = SKILL_ICON_URLS[s.id];
      if (!iconUrl) continue;
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.decoding = "async";
      img.src = iconUrl;
      iconCache.set(s.id, img);
    }

    // Theme observer
    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.getAttribute("data-theme") !== "light";
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    // Intersection observer for burst entrance
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inView) {
          inView = true;
          assignStartPositions();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(section);

    function assignStartPositions() {
      const cx = width / 2, cy = height / 2;
      for (const n of nodes) {
        const a = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * 0.8;
        n.startX = cx + Math.cos(a) * dist;
        n.startY = cy + Math.sin(a) * dist;
        n.enterT = 0;
      }
    }

    // Mouse & touch
    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
      cursorActive = true;
    }
    function onMouseLeave() {
      cursorActive = false;
      cursorX = -9999;
      cursorY = -9999;
    }
    function onTouchStart(e: TouchEvent) {
      const rect = canvas!.getBoundingClientRect();
      const t = e.touches[0];
      cursorX = t.clientX - rect.left;
      cursorY = t.clientY - rect.top;
      cursorActive = true;
      clearTimeout(touchTimeout);
      touchTimeout = window.setTimeout(() => {
        cursorActive = false;
        cursorX = -9999;
        cursorY = -9999;
        hoveredIdx = -1;
        if (tooltipRef.current) tooltipRef.current.style.opacity = "0";
      }, 2000);
    }

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("touchstart", onTouchStart, { passive: true });

    function resize() {
      const el = section;
      if (!el) return;
      const w = el.offsetWidth, h = el.offsetHeight;
      if (w <= 0 || h <= 0) return;
      width = w; height = h;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    // Main animation loop
    function draw(ts: number) {
      if (document.hidden) { rafId = requestAnimationFrame(draw); return; }
      if (width <= 0 || height <= 0) { rafId = requestAnimationFrame(draw); return; }

      const elapsed = ts - lastTs;
      if (elapsed < 33 && lastTs > 0) { rafId = requestAnimationFrame(draw); return; }
      const dt = lastTs ? Math.min(elapsed / 1000, 0.1) : 0.016;
      lastTs = ts;
      time += dt;

      ctx!.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = isMobile ? height * 0.47 : height * 0.40;
      const iconSz = isMobile ? 28 : 38;
      // Keep animation visuals identical to light theme in both light and dark modes.
      const accent = "52,56,90";
      const logoFill = `rgba(26,26,46,`;

      // Update nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.prevZ = n.z;

        // Orbital update
        n.angle += n.orbitSpd * dt;
        const breathe = 1 + Math.sin(time * 0.5 + n.breathePhase) * 0.03;
        const orbitRX = width * n.orbitFracX * breathe;
        const orbitRY = height * n.orbitFracY * breathe;
        const incl = n.orbitIncl;

        n.x = cx + orbitRX * Math.cos(n.angle) * Math.cos(incl);
        n.y = cy + orbitRY * Math.sin(n.angle) * 0.95;
        n.z = Math.sin(n.angle) * Math.cos(incl);

        // Entrance
        if (!inView) {
          n.enterT = 0;
          n.sx = n.startX || cx;
          n.sy = n.startY || cy;
        } else {
          n.enterT = Math.min(1, n.enterT + dt / 1.5);
          const e = springEase(n.enterT);
          if (n.enterT < 1) {
            n.sx = lerp(n.startX, n.x, e);
            n.sy = lerp(n.startY, n.y, e);
          } else {
            n.sx = n.x;
            n.sy = n.y;
          }
        }

        // Depth-based scale & alpha
        const df = (n.z + 1) / 2;
        n.scale = 0.6 + df * 0.45;
        n.alpha = 0.3 + df * 0.4;

        // Magnetic cursor pull (prompt 4)
        if (cursorActive && n.enterT >= 1) {
          const dx = cursorX - n.sx, dy = cursorY - n.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 1) {
            const pull = Math.min(8, 250 / (dist + 60));
            n.sx += (dx / dist) * pull;
            n.sy += (dy / dist) * pull;
          }
        }

        // Sparkle at z-peak (prompt 4)
        if (n.prevZ < 0.92 && n.z >= 0.92 && n.enterT >= 1 && sparkles.length < 25) {
          sparkles.push({ x: n.sx, y: n.sy, life: 1 });
        }
      }

      // Hit-testing (prompt 3)
      let newHovered = -1;
      let minDist = 50;
      if (cursorActive) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = cursorX - nodes[i].sx, dy = cursorY - nodes[i].sy;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < minDist) { minDist = d; newHovered = i; }
        }
      }
      hoveredIdx = newHovered;

      // Hover animation
      for (let i = 0; i < nodes.length; i++) {
        const target = i === hoveredIdx ? 1 : 0;
        nodes[i].hoverT = lerp(nodes[i].hoverT, target, dt * 8);
      }

      // Hover repel: push nearby nodes away from hovered node
      if (hoveredIdx >= 0) {
        const hn = nodes[hoveredIdx];
        for (let i = 0; i < nodes.length; i++) {
          if (i === hoveredIdx) continue;
          const dx = nodes[i].sx - hn.sx, dy = nodes[i].sy - hn.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120 && dist > 1) {
            const push = (1 - dist / 120) * 12;
            nodes[i].sx += (dx / dist) * push;
            nodes[i].sy += (dy / dist) * push;
          }
        }
      }

      // Keep a minimum distance between icons to avoid overlaps.
      const minGap = isMobile ? 34 : 44;
      const minGapSq = minGap * minGap;
      const boundPad = isMobile ? 20 : 28;
      for (let pass = 0; pass < 2; pass++) {
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const a = nodes[i];
            const b = nodes[j];
            let dx = b.sx - a.sx;
            let dy = b.sy - a.sy;
            let d2 = dx * dx + dy * dy;

            if (d2 < 1e-4) {
              // Deterministic tiny nudge when two points are identical.
              const angle = (i * 0.73 + j * 1.21 + time) % (Math.PI * 2);
              dx = Math.cos(angle);
              dy = Math.sin(angle);
              d2 = 1;
            }

            if (d2 < minGapSq) {
              const d = Math.sqrt(d2);
              const push = (minGap - d) * 0.5;
              const nx = dx / d;
              const ny = dy / d;
              a.sx -= nx * push;
              a.sy -= ny * push;
              b.sx += nx * push;
              b.sy += ny * push;
            }
          }
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        nodes[i].sx = Math.max(boundPad, Math.min(width - boundPad, nodes[i].sx));
        nodes[i].sy = Math.max(boundPad + 40, Math.min(height - boundPad, nodes[i].sy));
      }

      // Sort by z for depth ordering
      const sorted = nodes.slice().sort((a, b) => a.z - b.z);

      // Draw constellation lines on all devices; mobile gets stronger lines for visibility.
      const linkDistance = isMobile ? 360 : 320;
      const lineStrength = isMobile ? 1.35 : 0.78;
      const lineWidth = isMobile ? 2.6 : 2.2;
      for (let i = 0; i < sorted.length; i++) {
        for (let j = i + 1; j < sorted.length; j++) {
          const a = sorted[i], b = sorted[j];
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const lineAlpha = Math.max(0, 1 - dist / linkDistance) * lineStrength * Math.min(a.alpha, b.alpha);
            ctx!.beginPath();
            ctx!.moveTo(a.sx, a.sy);
            ctx!.lineTo(b.sx, b.sy);
            ctx!.strokeStyle = `rgba(${accent},${lineAlpha})`;
            ctx!.lineWidth = lineWidth;
            ctx!.stroke();
          }
        }
      }
      // Draw nodes back-to-front
      for (const n of sorted) {
        const s = n.scale + n.hoverT * 0.3;
        const a = n.alpha + n.hoverT * 0.25;
        const sz = iconSz * s;

        // Glow halo (skip on mobile)
        if (!isMobile) {
          const glowR = sz * 0.9 + n.hoverT * 8;
          const grad = ctx!.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, glowR);
          const glowAlpha = 0.08 + n.hoverT * 0.12;
          grad.addColorStop(0, `rgba(${accent},${glowAlpha})`);
          grad.addColorStop(1, `rgba(${accent},0)`);
          ctx!.beginPath();
          ctx!.arc(n.sx, n.sy, glowR, 0, Math.PI * 2);
          ctx!.fillStyle = grad;
          ctx!.fill();
        }

        // Draw icon
        ctx!.save();
        ctx!.translate(n.sx, n.sy);
        ctx!.scale(s, s);
        const iconAlpha = a * 0.82;
        const iconImg = iconCache.get(n.skill.id);

        if (iconImg && iconImg.complete && iconImg.naturalWidth > 0) {
          const sz = iconSz * 0.95;
          ctx!.globalAlpha = 1;
          ctx!.drawImage(iconImg, -sz / 2, -sz / 2, sz, sz);
          ctx!.globalAlpha = 1;
        } else {
          ctx!.strokeStyle = `${logoFill}${iconAlpha})`;
          ctx!.fillStyle = `${logoFill}${iconAlpha})`;
          drawIcon(ctx!, n.skill.id, iconSz);
        }
        ctx!.restore();
      }

      // Draw sparkles (prompt 4)
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.life -= dt / 0.4;
        if (sp.life <= 0) { sparkles.splice(i, 1); continue; }
        ctx!.beginPath();
        ctx!.arc(sp.x, sp.y, 2 * sp.life, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(99,102,241,${sp.life * 0.5})`;
        ctx!.fill();
      }

      // Tooltip (prompt 3)
      if (hoveredIdx >= 0 && tooltipRef.current && tooltipNameRef.current) {
        const hn = nodes[hoveredIdx];
        const tooltipPad = 12;
        const sideOffset = 20;
        const topOffset = -16;

        tooltipNameRef.current.textContent = hn.skill.name;

        const tooltipW = tooltipRef.current.offsetWidth || 96;
        const tooltipH = tooltipRef.current.offsetHeight || 32;

        let tx = hn.sx + sideOffset;
        let ty = hn.sy + topOffset;

        // Keep tooltip inside canvas and avoid crossing over nearby nodes.
        if (tx + tooltipW > width - tooltipPad) tx = hn.sx - tooltipW - sideOffset;
        if (tx < tooltipPad) tx = tooltipPad;
        if (ty < tooltipPad) ty = hn.sy + 14;
        if (ty + tooltipH > height - tooltipPad) ty = height - tooltipH - tooltipPad;

        tooltipRef.current.style.opacity = "1";
        tooltipRef.current.classList.add("is-visible");
        tooltipRef.current.style.transform = `translate(${Math.round(tx)}px, ${Math.round(ty)}px)`;
      } else if (tooltipRef.current) {
        tooltipRef.current.style.opacity = "0";
        tooltipRef.current.classList.remove("is-visible");
      }

      rafId = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(section);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      themeObs.disconnect();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("touchstart", onTouchStart);
      cancelAnimationFrame(rafId);
      clearTimeout(touchTimeout);
    };
  }, []);

  return (
    <section id="skills" className="relative">
      <div
        ref={sectionRef}
        className="relative overflow-hidden z-10"
        style={{ minHeight: "max(100vh, 600px)" }}
      >
        {/* Section header */}
        <div ref={headerRef} className="absolute top-0 left-0 z-10 pt-12 md:pt-16 px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={headerVisible ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p
              className="text-[#6366f1] mb-2"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem" }}
            >
              04. Skills
            </p>
            <h2
              className="skills-title"
              style={{
                fontSize: "2rem",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: "var(--t-text)",
              }}
            >
              Technical Toolkit
            </h2>
          </motion.div>
        </div>

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ cursor: "default" }}
          aria-hidden
        />

        {/* Tooltip */}
        <div
          ref={tooltipRef}
          className="skill-tooltip absolute top-0 left-0 pointer-events-none liquid-glass rounded-lg px-3 py-1.5 z-20 inline-flex items-center w-max"
          style={{
            opacity: 0,
            width: "max-content",
            maxWidth: "calc(100% - 24px)",
            transition: "opacity 150ms ease",
            willChange: "transform, opacity",
          }}
        >
        <span
          ref={tooltipNameRef}
          className="gradient-underline-text skill-tooltip-underline"
          style={{
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "0.82rem",
            fontWeight: 500,
              color: "#1a1a2e",
              whiteSpace: "nowrap",
            }}
          />
        </div>
        <div className="absolute left-0 right-0 bottom-8 md:bottom-10 z-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            {SKILL_TEXT_LINES.map((item) => (
              <p
                key={item.label}
                style={{
                  fontSize: "1.2rem",
                  lineHeight: 1.45,
                  color: "#111111",
                }}
              >
                <span style={{ fontWeight: 700, color: "#111111" }}>{item.label}: </span>
                <span style={{ fontWeight: 400, color: "#111111" }}>{item.value}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
