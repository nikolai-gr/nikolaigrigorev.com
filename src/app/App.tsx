import { useEffect, useState } from "react";
import { ThemeProvider } from "./components/hooks/useTheme";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Experience } from "./components/Experience";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { Education } from "./components/Education";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import skillsBg from "@/assets/skills-bg.jpg";

export default function App() {
  const [isWindowLoaded, setIsWindowLoaded] = useState(document.readyState === "complete");
  const [isSkillsBgLoaded, setIsSkillsBgLoaded] = useState(false);

  useEffect(() => {
    if (document.readyState === "complete") {
      setIsWindowLoaded(true);
      return;
    }

    const onLoad = () => setIsWindowLoaded(true);
    window.addEventListener("load", onLoad, { once: true });
    return () => window.removeEventListener("load", onLoad);
  }, []);

  useEffect(() => {
    const preloadLink = document.createElement("link");
    preloadLink.rel = "preload";
    preloadLink.as = "image";
    preloadLink.href = skillsBg;
    document.head.appendChild(preloadLink);

    const img = new Image();
    img.decoding = "async";
    img.src = skillsBg;

    const markLoaded = () => setIsSkillsBgLoaded(true);
    img.onload = markLoaded;
    img.onerror = markLoaded;

    if (img.complete) {
      markLoaded();
    }

    return () => {
      img.onload = null;
      img.onerror = null;
      preloadLink.remove();
    };
  }, []);

  const isAppReady = isWindowLoaded && isSkillsBgLoaded;

  return (
    <ThemeProvider>
      <div
        className="min-h-screen transition-[opacity,filter,background-color] duration-700 bg-[var(--t-bg)] text-[var(--t-text-default)] [font-family:Inter,sans-serif]"
        style={{
          opacity: isAppReady ? 1 : 0,
          filter: isAppReady ? "blur(0px)" : "blur(4px)",
          pointerEvents: isAppReady ? "auto" : "none",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <div
          className="relative bg-cover bg-top bg-no-repeat transition-opacity duration-700"
          style={{
            backgroundImage: isSkillsBgLoaded ? `url(${skillsBg})` : undefined,
            backgroundColor: "rgba(26, 26, 46, 0.06)",
            opacity: isSkillsBgLoaded ? 1 : 0.92,
          }}
        >
          <Skills />
          <Education />
        </div>
        <Contact />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
