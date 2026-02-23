import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { ExternalLink, Github, Smartphone } from "lucide-react";

const projects = [
  {
    title: "Little Lemon App",
    description:
      "A production-ready restaurant booking application built with Swift and SwiftUI, following the MVVM architectural pattern for scalable, maintainable code.",
    tech: ["Swift", "SwiftUI", "CoreData", "JSON API", "URLSession"],
    highlights: [
      "CoreData for local persistence — offline menu access & profile management",
      "URLSession networking with @Published properties for real-time UI updates",
      "MVVM architecture ensuring clean separation of concerns",
    ],
    github: "https://github.com/nikolai-gr/Little-Lemon-iOS",
    icon: <Smartphone size={24} />,
  },
  {
    title: "100 Days of SwiftUI Portfolio",
    description:
      "A comprehensive collection of 19+ iOS applications built through the Hacking with Swift intensive program, covering the full spectrum of SwiftUI capabilities.",
    tech: ["Swift", "SwiftUI", "Animations", "State Management", "POP"],
    highlights: [
      "Advanced state management patterns and complex animations",
      "Protocol-Oriented Programming and memory management",
      "Pixel-perfect UI following Apple's Human Interface Guidelines",
    ],
    github: "https://github.com/nikolai-gr",
    icon: <Smartphone size={24} />,
  },
];

export function Projects() {
  const { ref, isInView } = useInView();

  return (
    <section id="projects" className="py-12 md:py-16 relative" ref={ref}>
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
            03. Projects
          </p>
          <h2
            className="mb-16"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            What I've Built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="group relative p-6 md:p-8 rounded-2xl hover:border-[#6366f1]/30 transition-all"
              style={{
                backgroundColor: "var(--t-bg-card)",
                border: "1px solid var(--t-border)",
                boxShadow: "var(--t-shadow)",
              }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_50%_0%,_rgba(99,102,241,0.06)_0%,_transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#6366f1]/10 text-[#6366f1]">
                    {project.icon}
                  </div>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#6366f1] transition-colors"
                    style={{ color: "var(--t-text-muted)" }}
                  >
                    <Github size={20} />
                  </a>
                </div>

                <h3
                  className="mb-3"
                  style={{ fontSize: "1.25rem", fontWeight: 600, color: "var(--t-text)" }}
                >
                  {project.title}
                </h3>

                <p
                  className="mb-5"
                  style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--t-text-body)" }}
                >
                  {project.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {project.highlights.map((h, j) => (
                    <li
                      key={j}
                      className="flex gap-2"
                      style={{ fontSize: "0.8rem", lineHeight: 1.6, color: "var(--t-text-muted)" }}
                    >
                      <span className="text-[#6366f1] mt-0.5 shrink-0">▹</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-full bg-[#6366f1]/10 text-[#6366f1]"
                      style={{
                        fontFamily: "JetBrains Mono, monospace",
                        fontSize: "0.7rem",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 text-center"
        >
          <a
            href="https://github.com/nikolai-gr"
            target="_blank"
            rel="noopener noreferrer"
            className="liquid-glass inline-flex items-center gap-2 px-6 py-3 rounded-full"
            style={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: "var(--t-text-body)",
            }}
          >
            <Github size={16} />
            See more on GitHub
            <ExternalLink size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}