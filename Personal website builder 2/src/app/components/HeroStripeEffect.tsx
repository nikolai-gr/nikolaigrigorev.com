import { useEffect, useRef } from "react";

/**
 * Stripe-style hero: symmetric wavy bands (like stripe.com hero).
 */
export function HeroStripeEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    let width = 0;
    let height = 0;
    let rafId: number;
    let t = 0;

    const palette = [
      [139, 92, 246],
      [167, 139, 250],
      [244, 114, 182],
      [251, 146, 60],
      [253, 186, 116],
      [250, 204, 21],
    ];

    const numBands = 12;
    const bandThickness = 0.07;
    const centerY = 0.5;
    const bands: Array<{ yBase: number; colorIndex: number; phase: number; amplitude: number; wavelength: number; thickness: number; speed: number }> = [];
    for (let i = 0; i < numBands; i++) {
      const u = (i / (numBands - 1)) * 2 - 1;
      const yBase = centerY + u * 0.45;
      const colorIndex = i % palette.length;
      const phase = (i / numBands) * Math.PI;
      const amplitude = 0.035;
      const wavelength = 1;
      const speed = 0.4;
      bands.push({ yBase, colorIndex, phase, amplitude, wavelength, thickness: bandThickness, speed });
    }

    function resize() {
      const container = canvas.parentElement;
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      if (w <= 0 || h <= 0) return;
      width = w;
      height = h;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function drawBand(
      yBase: number,
      color: number[],
      phase: number,
      amplitude: number,
      wavelength: number,
      thickness: number,
      speed: number
    ) {
      const y0 = height * yBase;
      const thick = height * thickness;
      const steps = 80;
      const dx = (width + 200) / steps;
      const xStart = -100;

      ctx.beginPath();
      for (let i = 0; i <= steps; i++) {
        const x = xStart + i * dx;
        const normX = x / width;
        const wave = amplitude * height * Math.sin(normX * Math.PI * wavelength + t * speed + phase);
        const y = y0 + wave;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = steps; i >= 0; i--) {
        const x = xStart + i * dx;
        const normX = x / width;
        const wave = amplitude * height * Math.sin(normX * Math.PI * wavelength + t * speed + phase);
        const y = y0 + wave + thick;
        ctx.lineTo(x, y);
      }
      ctx.closePath();

      const g = ctx.createLinearGradient(0, 0, width, 0);
      g.addColorStop(0, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
      g.addColorStop(0.2, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`);
      g.addColorStop(0.5, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.85)`);
      g.addColorStop(0.8, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.5)`);
      g.addColorStop(1, `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`);
      ctx.fillStyle = g;
      ctx.fill();
    }

    function draw() {
      if (width <= 0 || height <= 0) {
        rafId = requestAnimationFrame(draw);
        return;
      }
      t += 0.012;
      ctx.clearRect(0, 0, width, height);
      bands.forEach((b) => {
        drawBand(b.yBase, palette[b.colorIndex], b.phase, b.amplitude, b.wavelength, b.thickness, b.speed);
      });
      rafId = requestAnimationFrame(draw);
    }

    resize();
    const ro = new ResizeObserver(() => resize());
    ro.observe(canvas.parentElement!);
    window.addEventListener("resize", resize);
    draw();

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      className="absolute top-0 right-0 bottom-0 w-1/2 min-h-screen pointer-events-none overflow-hidden"
      aria-hidden
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
        style={{ width: "100%", height: "100%", minHeight: "100vh" }}
        aria-hidden
      />
    </div>
  );
}
