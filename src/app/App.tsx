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
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-500 bg-[var(--t-bg)] text-[var(--t-text-default)] [font-family:Inter,sans-serif]">
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <div
          className="relative bg-cover bg-top bg-no-repeat"
          style={{ backgroundImage: `url(${skillsBg})` }}
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
