import { useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────────────

interface Point { x: number; y: number }

type JointName =
  | "head" | "neck" | "shoulder" | "hip"
  | "rElbow" | "rWrist" | "lElbow" | "lWrist"
  | "rKnee" | "rAnkle" | "lKnee" | "lAnkle";

type Skeleton = Record<JointName, Point>;

const JOINTS: JointName[] = [
  "head", "neck", "shoulder", "hip",
  "rElbow", "rWrist", "lElbow", "lWrist",
  "rKnee", "rAnkle", "lKnee", "lAnkle",
];

// ── Proportions (fractions of figure height h) ─────────────────

function dims(h: number) {
  return {
    T: h * 0.30, N: h * 0.04, HR: h * 0.06,
    UA: h * 0.17, FA: h * 0.15,
    TH: h * 0.22, SH: h * 0.22,
  };
}

// ── Clothing styles ────────────────────────────────────────────

interface CStyle {
  strands: number;
  mobileStrands: number;
  spreadFac: number;
  maxSpread: number;
  lw: number;
  darkRGB: string;
  lightRGB: string;
}

const BARE: CStyle     = { strands: 4, mobileStrands: 2, spreadFac: 0.12, maxSpread: 6,  lw: 1.5, darkRGB: "180,180,190", lightRGB: "100,100,110" };
const TSHIRT: CStyle   = { strands: 7, mobileStrands: 4, spreadFac: 0.18, maxSpread: 10, lw: 2.0, darkRGB: "140,140,155", lightRGB: "80,80,95" };
const JACKET: CStyle   = { strands: 3, mobileStrands: 2, spreadFac: 0.24, maxSpread: 14, lw: 2.0, darkRGB: "110,110,125", lightRGB: "60,60,75" };
const TROUSERS: CStyle = { strands: 6, mobileStrands: 3, spreadFac: 0.16, maxSpread: 9,  lw: 2.0, darkRGB: "120,120,135", lightRGB: "70,70,85" };

// Rendering order: back limbs → torso → front limbs → head
interface DrawEntry { j1: JointName; j2: JointName; layers: CStyle[] }

const DRAW_ORDER: DrawEntry[] = [
  { j1: "hip", j2: "rKnee", layers: [TROUSERS] },
  { j1: "rKnee", j2: "rAnkle", layers: [BARE] },
  { j1: "shoulder", j2: "rElbow", layers: [TSHIRT, JACKET] },
  { j1: "rElbow", j2: "rWrist", layers: [BARE] },
  { j1: "neck", j2: "shoulder", layers: [BARE] },
  { j1: "shoulder", j2: "hip", layers: [TSHIRT, JACKET] },
  { j1: "hip", j2: "lKnee", layers: [TROUSERS] },
  { j1: "lKnee", j2: "lAnkle", layers: [BARE] },
  { j1: "shoulder", j2: "lElbow", layers: [TSHIRT, JACKET] },
  { j1: "lElbow", j2: "lWrist", layers: [BARE] },
  { j1: "head", j2: "neck", layers: [BARE] },
];

// ── 8 Activity Poses ──────────────────────────────────────────

function idlePose(p: number, h: number): Skeleton {
  const d = dims(h);
  const breathe = Math.sin(p * 0.8) * h * 0.004;
  const sway = Math.sin(p * 0.3) * 0.02;

  const hip = { x: 0, y: -breathe };
  const shoulder = { x: 0, y: hip.y - d.T };
  const neck = { x: 0, y: shoulder.y - d.N };
  const head = { x: 0, y: neck.y - d.HR };

  const rElbow = { x: -d.UA * 0.05, y: shoulder.y + d.UA };
  const rWrist = { x: -d.UA * 0.05 + Math.sin(p * 0.5) * h * 0.003, y: rElbow.y + d.FA * 0.95 };
  const lElbow = { x: d.UA * 0.05, y: shoulder.y + d.UA };
  const lWrist = { x: d.UA * 0.05 - Math.sin(p * 0.5) * h * 0.003, y: lElbow.y + d.FA * 0.95 };

  const rKnee = { x: Math.sin(sway) * d.TH * 0.3, y: hip.y + d.TH };
  const rAnkle = { x: rKnee.x, y: rKnee.y + d.SH };
  const lKnee = { x: h * 0.008, y: hip.y + d.TH };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

function writingPose(p: number, h: number): Skeleton {
  const d = dims(h);
  const lean = 0.12;

  const hip = { x: 0, y: 0 };
  const shoulder = { x: Math.sin(lean) * d.T, y: hip.y - Math.cos(lean) * d.T };
  const neck = { x: shoulder.x + Math.sin(lean) * d.N, y: shoulder.y - d.N };
  const head = { x: neck.x + h * 0.012, y: neck.y - d.HR };

  const rElbow = { x: shoulder.x + d.UA * 0.15, y: shoulder.y + d.UA * 0.75 };
  const writeX = shoulder.x + d.UA * 0.3;
  const writeY = hip.y - h * 0.04;
  const rWrist = { x: writeX + Math.cos(p * 3) * h * 0.012, y: writeY + Math.sin(p * 3) * h * 0.006 };

  const lElbow = { x: shoulder.x + d.UA * 0.1, y: shoulder.y + d.UA * 0.7 };
  const lWrist = { x: lElbow.x + d.FA * 0.5, y: lElbow.y + d.FA * 0.1 };

  const rKnee = { x: 0, y: hip.y + d.TH };
  const rAnkle = { x: 0, y: rKnee.y + d.SH };
  const lKnee = { x: h * 0.008, y: hip.y + d.TH };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

function typingPose(p: number, h: number): Skeleton {
  const d = dims(h);
  const lean = 0.08;
  const nod = Math.sin(p * 1.5) * h * 0.003;
  const tw = Math.sin(p * 5) * h * 0.005;

  const hip = { x: 0, y: 0 };
  const shoulder = { x: Math.sin(lean) * d.T, y: hip.y - Math.cos(lean) * d.T };
  const neck = { x: shoulder.x, y: shoulder.y - d.N };
  const head = { x: neck.x + nod, y: neck.y - d.HR };

  const armFwd = 0.75;
  const rElbow = { x: shoulder.x + Math.sin(armFwd) * d.UA * 0.8, y: shoulder.y + Math.cos(armFwd) * d.UA * 0.8 };
  const rWrist = { x: rElbow.x + d.FA * 0.55 + tw, y: rElbow.y + d.FA * 0.3 };
  const lElbow = { x: shoulder.x + Math.sin(armFwd - 0.08) * d.UA * 0.8, y: shoulder.y + Math.cos(armFwd - 0.08) * d.UA * 0.8 };
  const lWrist = { x: lElbow.x + d.FA * 0.5 - tw, y: lElbow.y + d.FA * 0.32 };

  const rKnee = { x: 0, y: hip.y + d.TH };
  const rAnkle = { x: 0, y: rKnee.y + d.SH };
  const lKnee = { x: h * 0.008, y: hip.y + d.TH };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

function bikePose(p: number, h: number): Skeleton {
  const d = dims(h);
  const lean = 0.15;
  const bob = Math.sin(p * 4) * h * 0.006;
  const pedalSpeed = 2;

  const hip = { x: 0, y: -bob };
  const shoulder = { x: Math.sin(lean) * d.T, y: hip.y - Math.cos(lean) * d.T };
  const neck = { x: shoulder.x + Math.sin(lean) * d.N, y: shoulder.y - d.N };
  const head = { x: neck.x + h * 0.008, y: neck.y - d.HR };

  const mkLeg = (phase: number) => {
    const thighA = Math.sin(phase) * 0.55 + 0.15;
    const kneeBend = 0.6 + Math.sin(phase + Math.PI * 0.5) * 0.35;
    const knee = { x: hip.x + Math.sin(thighA) * d.TH, y: hip.y + Math.cos(thighA) * d.TH };
    const shinA = thighA - kneeBend;
    const ankle = { x: knee.x + Math.sin(shinA) * d.SH, y: knee.y + Math.cos(shinA) * d.SH };
    return { knee, ankle };
  };
  const rL = mkLeg(p * pedalSpeed), lL = mkLeg(p * pedalSpeed + Math.PI);

  const armA = lean + 0.35;
  const rElbow = { x: shoulder.x + Math.sin(armA) * d.UA, y: shoulder.y + Math.cos(armA) * d.UA * 0.8 };
  const rWrist = { x: rElbow.x + d.FA * 0.45, y: rElbow.y + d.FA * 0.35 };
  const lElbow = { x: shoulder.x + Math.sin(armA - 0.05) * d.UA, y: shoulder.y + Math.cos(armA - 0.05) * d.UA * 0.8 };
  const lWrist = { x: lElbow.x + d.FA * 0.42, y: lElbow.y + d.FA * 0.38 };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee: rL.knee, rAnkle: rL.ankle, lKnee: lL.knee, lAnkle: lL.ankle };
}

function thinkingPose(p: number, h: number): Skeleton {
  const d = dims(h);
  const tilt = Math.sin(p * 0.4) * d.HR * 0.2;
  const shift = Math.sin(p * 0.25) * 0.03;

  const hip = { x: 0, y: 0 };
  const shoulder = { x: 0, y: hip.y - d.T };
  const neck = { x: 0, y: shoulder.y - d.N };
  const head = { x: tilt, y: neck.y - d.HR };

  const rElbow = { x: d.UA * 0.15, y: shoulder.y + d.UA * 0.45 };
  const rWrist = { x: d.HR * 0.35 + Math.sin(p * 0.6) * h * 0.002, y: neck.y + d.HR * 0.25 };

  const lElbow = { x: d.UA * 0.15, y: shoulder.y + d.UA * 0.6 };
  const lWrist = { x: -d.UA * 0.1, y: shoulder.y + d.UA * 0.45 };

  const rKnee = { x: Math.sin(shift) * d.TH * 0.3, y: hip.y + d.TH };
  const rAnkle = { x: rKnee.x, y: rKnee.y + d.SH };
  const lKnee = { x: h * 0.02 + Math.sin(shift + 0.5) * d.TH * 0.15, y: hip.y + d.TH * 0.95 };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

function stretchPose(p: number, h: number): Skeleton {
  const d = dims(h);
  const sideLean = Math.sin(p * 0.5) * 0.08;

  const hip = { x: 0, y: 0 };
  const shoulder = { x: Math.sin(sideLean) * d.T, y: hip.y - Math.cos(sideLean) * d.T };
  const neck = { x: shoulder.x, y: shoulder.y - d.N };
  const head = { x: shoulder.x, y: neck.y - d.HR };

  const raise = 2.7 + Math.sin(p * 0.6) * 0.12;
  const rElbow = { x: shoulder.x + Math.sin(raise + 0.15) * d.UA, y: shoulder.y + Math.cos(raise + 0.15) * d.UA };
  const rWrist = { x: rElbow.x + Math.sin(raise + 0.35) * d.FA, y: rElbow.y + Math.cos(raise + 0.35) * d.FA };
  const lElbow = { x: shoulder.x + Math.sin(raise - 0.15) * d.UA, y: shoulder.y + Math.cos(raise - 0.15) * d.UA };
  const lWrist = { x: lElbow.x + Math.sin(raise - 0.35) * d.FA, y: lElbow.y + Math.cos(raise - 0.35) * d.FA };

  const liftSide = Math.sin(p * 0.5);
  const rKnee = { x: 0, y: hip.y + d.TH * (liftSide > 0.3 ? 0.95 : 1) };
  const rAnkle = { x: 0, y: rKnee.y + d.SH };
  const lKnee = { x: h * 0.01, y: hip.y + d.TH * (liftSide < -0.3 ? 0.95 : 1) };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

function wavePose(p: number, h: number): Skeleton {
  const d = dims(h);
  const sway = Math.sin(p * 1.5) * 0.03;
  const wave = Math.sin(p * 3) * 0.35;

  const hip = { x: 0, y: 0 };
  const shoulder = { x: Math.sin(sway) * d.T, y: hip.y - d.T };
  const neck = { x: shoulder.x, y: shoulder.y - d.N };
  const head = { x: shoulder.x, y: neck.y - d.HR };

  const rAng = 2.8;
  const rElbow = { x: shoulder.x + Math.sin(rAng) * d.UA, y: shoulder.y + Math.cos(rAng) * d.UA };
  const rFAng = 2.5 + wave;
  const rWrist = { x: rElbow.x + Math.sin(rFAng) * d.FA, y: rElbow.y + Math.cos(rFAng) * d.FA };

  const lElbow = { x: shoulder.x - d.UA * 0.05, y: shoulder.y + d.UA };
  const lWrist = { x: lElbow.x + d.FA * 0.08, y: lElbow.y + d.FA * 0.95 };

  const rKnee = { x: 0, y: hip.y + d.TH };
  const rAnkle = { x: 0, y: rKnee.y + d.SH };
  const lKnee = { x: h * 0.01, y: hip.y + d.TH };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

function phonePose(p: number, h: number): Skeleton {
  const d = dims(h);
  const pace = Math.sin(p * 0.8) * h * 0.012;
  const legShift = Math.sin(p * 0.8) * 0.06;

  const hip = { x: pace, y: 0 };
  const shoulder = { x: pace, y: hip.y - d.T };
  const neck = { x: pace, y: shoulder.y - d.N };
  const head = { x: pace + d.HR * 0.15, y: neck.y - d.HR };

  const rElbow = { x: pace + d.UA * 0.25, y: shoulder.y + d.UA * 0.2 };
  const rWrist = { x: pace + d.HR * 0.2, y: neck.y + d.HR * 0.15 };

  const lElbow = { x: pace - d.UA * 0.2, y: shoulder.y + d.UA * 0.65 };
  const lWrist = { x: pace + d.UA * 0.02, y: hip.y - d.T * 0.32 };

  const rKnee = { x: pace + Math.sin(legShift) * d.TH * 0.4, y: hip.y + Math.cos(legShift * 0.5) * d.TH };
  const rAnkle = { x: rKnee.x, y: rKnee.y + d.SH };
  const lKnee = { x: pace + Math.sin(-legShift) * d.TH * 0.3, y: hip.y + d.TH };
  const lAnkle = { x: lKnee.x, y: lKnee.y + d.SH };

  return { head, neck, shoulder, hip, rElbow, rWrist, lElbow, lWrist, rKnee, rAnkle, lKnee, lAnkle };
}

const POSE_FNS = [idlePose, writingPose, typingPose, bikePose, thinkingPose, stretchPose, wavePose, phonePose];
const TRANS_DUR = 1.5;

// ── Helpers ────────────────────────────────────────────────────

function lerpSkel(a: Skeleton, b: Skeleton, t: number): Skeleton {
  const r = {} as Skeleton;
  for (const j of JOINTS) r[j] = { x: a[j].x + (b[j].x - a[j].x) * t, y: a[j].y + (b[j].y - a[j].y) * t };
  return r;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function shuffleN(n: number): number[] {
  const a = Array.from({ length: n }, (_, i) => i);
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── Drawing ────────────────────────────────────────────────────

function drawStrand(
  ctx: CanvasRenderingContext2D,
  p1: Point, p2: Point,
  idx: number, total: number,
  time: number, color: string,
  spreadFac: number, maxSpread: number, lw: number,
) {
  const dx = p2.x - p1.x, dy = p2.y - p1.y;
  const bLen = Math.sqrt(dx * dx + dy * dy);
  if (bLen < 0.5) return;

  const nx = -dy / bLen, ny = dx / bLen;
  const spread = Math.min(bLen * spreadFac, maxSpread);
  const off = total > 1 ? ((idx / (total - 1)) - 0.5) * spread : 0;
  const wFreq = 2.5 + idx * 0.7;
  const rawAmp = 1.2 + Math.sin(time * 0.3 + idx * 1.7) * 0.6;
  const wAmp = Math.min(rawAmp, bLen * 0.15);
  const wPhase = idx * 1.2 + time * 0.4;

  ctx.beginPath();
  const steps = 20;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const w = Math.sin(t * Math.PI * wFreq + wPhase) * wAmp;
    const x = p1.x + dx * t + nx * (off + w);
    const y = p1.y + dy * t + ny * (off + w);
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.stroke();
}

function drawBone(
  ctx: CanvasRenderingContext2D,
  p1: Point, p2: Point,
  style: CStyle, isMobile: boolean,
  isDark: boolean, alpha: number, time: number,
) {
  const strands = isMobile ? style.mobileStrands : style.strands;
  const rgb = isDark ? style.darkRGB : style.lightRGB;
  const color = `rgba(${rgb},${alpha})`;
  for (let s = 0; s < strands; s++) {
    drawStrand(ctx, p1, p2, s, strands, time, color, style.spreadFac, style.maxSpread, style.lw);
  }
}

function drawHead(
  ctx: CanvasRenderingContext2D,
  c: Point, r: number,
  time: number, color: string,
) {
  for (let i = 0; i < 5; i++) {
    const ri = r * (0.5 + (i / 5) * 0.5);
    const po = i * 1.257 + time * 0.2;
    const amp = 1.0 + Math.sin(time * 0.4 + i) * 0.4;
    ctx.beginPath();
    for (let j = 0; j <= 28; j++) {
      const a = (j / 28) * Math.PI * 2;
      const w = Math.sin(a * 3 + po) * amp;
      const x = c.x + Math.cos(a) * (ri + w);
      const y = c.y + Math.sin(a) * (ri + w);
      j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = color;
    ctx.lineWidth = 1.8;
    ctx.stroke();
  }
}

function drawCollar(
  ctx: CanvasRenderingContext2D,
  neckPt: Point, shoulderPt: Point,
  color: string, time: number,
) {
  const dx = shoulderPt.x - neckPt.x, dy = shoulderPt.y - neckPt.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  if (len < 1) return;
  const nx = -dy / len, ny = dx / len;
  const cl = len * 0.25;
  const flare = cl * 0.7;

  for (const sign of [1, -1]) {
    const end = { x: neckPt.x + nx * flare * sign + (dx / len) * cl, y: neckPt.y + ny * flare * sign + (dy / len) * cl };
    drawStrand(ctx, neckPt, end, sign > 0 ? 0 : 1, 2, time, color, 0.15, 4, 2.0);
  }
}

// ── Component ──────────────────────────────────────────────────

export function NoodleManAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = 0, height = 0;
    let rafId: number;
    let time = 0;
    let lastTs = 0;
    let fadeIn = 0;
    let isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const isMobile = window.innerWidth < 768;

    // Activity state machine
    let current = 0;
    let previous = 0;
    let transT = 1;
    let timer = 4;
    let queue = shuffleN(POSE_FNS.length).filter(i => i !== 0);

    const themeObs = new MutationObserver(() => {
      isDark = document.documentElement.getAttribute("data-theme") !== "light";
    });
    themeObs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    function resize() {
      const el = canvas!.parentElement;
      if (!el) return;
      const w = el.offsetWidth, h = el.offsetHeight;
      if (w <= 0 || h <= 0) return;
      width = w; height = h;
      canvas!.width = w * dpr; canvas!.height = h * dpr;
      canvas!.style.width = w + "px"; canvas!.style.height = h + "px";
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(ts: number) {
      if (width <= 0 || height <= 0) { rafId = requestAnimationFrame(draw); return; }
      const elapsed = ts - lastTs;
      if (elapsed < 33 && lastTs > 0) { rafId = requestAnimationFrame(draw); return; }
      const dt = lastTs ? elapsed / 1000 : 0.016;
      lastTs = ts;
      time += dt;
      fadeIn = Math.min(1, fadeIn + dt / 2);

      // Activity transitions
      timer -= dt;
      if (timer <= 0 && transT >= 1) {
        previous = current;
        if (queue.length === 0) queue = shuffleN(POSE_FNS.length);
        current = queue.pop()!;
        transT = 0;
        timer = 5 + Math.random() * 3;
      }
      if (transT < 1) transT = Math.min(1, transT + dt / TRANS_DUR);

      ctx!.clearRect(0, 0, width, height);

      // Figure config
      const scale = isMobile ? 0.8 : 1.0;
      const figH = height * 0.65 * scale;
      const groundY = height * 0.85;
      const figX = width * (isMobile ? 0.5 : 0.75);

      // Compute skeleton
      const actPhase = time * Math.PI * 2 * 0.5;
      const prevSkel = POSE_FNS[previous](actPhase, figH);
      const currSkel = POSE_FNS[current](actPhase, figH);
      const skel = transT >= 1 ? currSkel : lerpSkel(prevSkel, currSkel, easeInOut(transT));

      // Anchor feet to ground
      const maxAY = Math.max(skel.rAnkle.y, skel.lAnkle.y);
      const anchorY = groundY - maxAY;

      const baseAlpha = isDark ? 0.22 : 0.16;
      const alpha = baseAlpha * fadeIn;
      const bareRGB = isDark ? BARE.darkRGB : BARE.lightRGB;
      const bareColor = `rgba(${bareRGB},${alpha})`;
      const jacketRGB = isDark ? JACKET.darkRGB : JACKET.lightRGB;
      const jacketColor = `rgba(${jacketRGB},${alpha})`;

      // Draw bones in layered order (figure faces left: negate x)
      for (const entry of DRAW_ORDER) {
        const p1 = { x: figX - skel[entry.j1].x, y: anchorY + skel[entry.j1].y };
        const p2 = { x: figX - skel[entry.j2].x, y: anchorY + skel[entry.j2].y };
        for (const layer of entry.layers) {
          drawBone(ctx!, p1, p2, layer, isMobile, isDark, alpha, time);
        }
      }

      // Draw jacket collar
      const neckScreen = { x: figX - skel.neck.x, y: anchorY + skel.neck.y };
      const shoulderScreen = { x: figX - skel.shoulder.x, y: anchorY + skel.shoulder.y };
      drawCollar(ctx!, neckScreen, shoulderScreen, jacketColor, time);

      // Draw head
      const hc = { x: figX - skel.head.x, y: anchorY + skel.head.y };
      drawHead(ctx!, hc, figH * 0.06, time, bareColor);

      rafId = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement!);
    window.addEventListener("resize", resize);
    rafId = requestAnimationFrame(draw);

    return () => {
      themeObs.disconnect();
      ro.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ willChange: "transform" }}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block w-full h-full" aria-hidden />
    </div>
  );
}
