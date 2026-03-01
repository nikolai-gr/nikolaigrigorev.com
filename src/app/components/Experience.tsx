import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import metaLogo from "@/assets/meta-logo.png";
import rampLogo from "@/assets/ramp-logo.png";

const MetaLogo = () => (
  <img src={metaLogo} alt="Meta" width={48} height={48} className="rounded-md" />
);

const RampLogo = () => (
  <img src={rampLogo} alt="Ramp" width={48} height={48} className="rounded-md" />
);

interface Experience {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  logo?: React.ReactNode;
}

const experiences: Experience[] = [
  {
    title: "iOS Developer (Intensive Training)",
    company: "Hacking with Swift — 100 Days of SwiftUI",
    period: "Feb 2026 – Present",
    location: "Remote",
    bullets: [
      "Mastering advanced Swift architecture through an intensive curriculum, focusing on Protocol-Oriented Programming (POP), closures, and memory management.",
      "Architecting and deploying a portfolio of 19+ applications to master State Management, complex Animations, and declarative UI patterns.",
      "Applying Clean Code principles and Apple's Human Interface Guidelines to ensure high scalability and professional-grade user experiences.",
    ],
  },
  {
    title: "Engineering Candidate (Technical Assessment)",
    company: "Ramp",
    period: "Feb 2026",
    location: "New York, NY · Remote",
    logo: <RampLogo />,
    bullets: [
      "Selected as an Engineering Candidate for Ramp's technical track, participating in a high-stakes technical assessment focused on optimizing complex frontend architecture and state management.",
      "Tackled challenges involving identifying performance bottlenecks, resolving UI/UX bugs, and ensuring scalable code quality within a simulated financial dashboard.",
      "Applying architectural logic from this experience to current native iOS Development projects using Swift and SwiftUI.",
    ],
  },
  {
    title: "iOS Developer (Professional Certification Project)",
    company: "Meta",
    period: "Dec 2025 – Jan 2026",
    location: "Remote",
    logo: <MetaLogo />,
    bullets: [
      "Engineered a production-ready restaurant application using SwiftUI and CoreData, implementing persistent storage for offline menu access and user profiles.",
      "Architected networking layers utilizing URLSession and JSON parsing to fetch and synchronize real-time menu data from remote APIs.",
      "Translated high-fidelity Figma wireframes into functional code, ensuring pixel-perfect UI execution and seamless user navigation flows.",
      "Leveraged the MVVM architectural pattern to decouple business logic from UI, improving code maintainability and testability.",
    ],
  },
  {
    title: "Kitchen Staff",
    company: "Pilot Restaurant",
    period: "May 2024 – Aug 2024",
    location: "New York, NY",
    bullets: [
      "Streamlined high-volume kitchen operations during peak service hours, ensuring 100% adherence to quality and presentation standards.",
      "Optimized ingredient management and prep workflows, contributing to a measurable reduction in kitchen preparation time through efficient organization.",
    ],
  },
];

export function Experience() {
  const { ref, isInView } = useInView();

  return (
    <section id="experience" className="py-12 md:py-16 relative" ref={ref}>
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,_rgba(99,102,241,0.04)_0%,_transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[#6366f1] mb-2 [font-family:JetBrains_Mono,monospace] text-[0.875rem]"
          >
            02. Experience
          </p>
          <h2 className="mb-16 text-[2rem] font-semibold tracking-[-0.02em] text-[var(--t-text)]">
            Where I've Worked
          </h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#6366f1]/50 via-[#6366f1]/20 to-transparent" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.title}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                className="relative pl-8 md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 md:left-6 top-1 -translate-x-1/2 w-3 h-3 rounded-full bg-[#6366f1] shadow-[0_0_10px_rgba(99,102,241,0.4)] border-2 border-[var(--t-timeline-dot-border)]"
                />

                <div
                  className="p-6 rounded-xl transition-all bg-[var(--t-bg-card)] border border-[var(--t-border)] [box-shadow:var(--t-shadow)]"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div className="flex items-start gap-3">
                      {exp.logo && (
                        <div className="shrink-0 mt-0.5 rounded-lg overflow-hidden">
                          {exp.logo}
                        </div>
                      )}
                      <div>
                        <h3 className="text-[1.1rem] font-semibold text-[var(--t-text)]">
                          {exp.title}
                        </h3>
                        <p className="text-[#6366f1] text-[0.9rem]">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span className="flex items-center gap-1.5 text-[0.8rem] text-[var(--t-text-muted)]">
                        <Calendar size={12} />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5 text-[0.8rem] text-[var(--t-text-muted)]">
                        <MapPin size={12} />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex gap-3 text-[0.875rem] leading-[1.7] text-[var(--t-text-body)]"
                      >
                        <span className="text-[#6366f1] mt-2 shrink-0">▹</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
