import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { GraduationCap, Calendar, MapPin, ExternalLink } from "lucide-react";
import cuBoulderLogo from "@/assets/cu-boulder-logo.png";
import cityTechLogo from "@/assets/city-tech-logo.png";

const education = [
  {
    school: "University of Colorado Boulder",
    degree: "M.S. in Artificial Intelligence",
    period: "Jun 2026 – Expected May 2028",
    location: "Boulder, CO",
    logo: cuBoulderLogo,
    icon: <GraduationCap size={22} />,
    details: [],
  },
  {
    school: "New York City College of Technology, CUNY",
    degree: "A.A.S. in Computer Information Systems",
    period: "Sep 2024 – May 2026",
    location: "Brooklyn, NY",
    gpa: "3.62",
    logo: cityTechLogo,
    icon: <GraduationCap size={22} />,
    details: [
      "Data Structures, Algorithms, Object-Oriented Programming",
      "Applied Machine Learning, Artificial Intelligence",
    ],
  },
];

const certifications = [
  {
    title: "Meta iOS Developer Professional Certificate",
    issuer: "Coursera",
    id: "1WCQA9QXHV0G",
    date: "Jan 2026",
    link: "https://www.coursera.org/account/accomplishments/specialization/1WCQA9QXHV0G",
    details: [
      "Completed 12-course curriculum covering Swift fundamentals, SwiftUI layouts, and mobile UI/UX principles.",
      "Mastered mobile architecture patterns (MVVM) and integrated complex data using CoreData and APIs.",
    ],
  },
];

export function Education() {
  const { ref, isInView } = useInView();

  return (
    <section id="education" className="mt-40 md:mt-56 py-12 md:py-16 relative z-10" ref={ref}>
      <div className="relative z-20 max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p
            className="text-[#6366f1] mb-2"
            style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem" }}
          >
            05. Education
          </p>
          <h2
            className="mb-16 education-title"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            Education & Certifications
          </h2>
        </motion.div>

        {/* Education */}
        <div className="space-y-6 mb-6">
          {education.map((edu, i) => (
            <motion.div
              key={edu.school}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
              className="p-6 md:p-8 rounded-xl transition-all"
              style={{
                backgroundColor: "var(--t-bg-surface)",
                border: "1px solid var(--t-border)",
                boxShadow: "var(--t-shadow)",
              }}
            >
              <div className="flex items-start gap-4">
                {edu.logo ? (
                  <div className="shrink-0 mt-0.5 rounded-lg overflow-hidden">
                    <img src={edu.logo} alt="" width={48} height={48} className="rounded-md object-contain" />
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-[#6366f1]/10 text-[#6366f1] shrink-0">
                    {edu.icon}
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--t-text)" }}>
                        {edu.school}
                      </h3>
                      <p className="text-[#6366f1]" style={{ fontSize: "0.9rem" }}>
                        {edu.degree}
                      </p>
                    </div>
                    <div className="flex flex-col items-start sm:items-end gap-1 shrink-0">
                      <span
                        className="flex items-center gap-1.5"
                        style={{ fontSize: "0.8rem", color: "var(--t-text-muted)" }}
                      >
                        <Calendar size={12} />
                        {edu.period}
                      </span>
                      <span
                        className="flex items-center gap-1.5"
                        style={{ fontSize: "0.8rem", color: "var(--t-text-muted)" }}
                      >
                        <MapPin size={12} />
                        {edu.location}
                      </span>
                    </div>
                  </div>

                  {edu.gpa && (
                    <p style={{ fontSize: "0.85rem", color: "var(--t-text-body)" }} className="mb-2">
                      GPA: <span style={{ color: "var(--t-text)" }}>{edu.gpa}</span>
                    </p>
                  )}

                  {edu.details.length > 0 && (
                    <div className="mt-3">
                      <p
                        className="mb-1"
                        style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--t-text-muted)" }}
                      >
                        Relevant Coursework:
                      </p>
                      <p style={{ fontSize: "0.85rem", color: "var(--t-text-body)" }}>
                        {edu.details.join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          {certifications.map((cert) => (
            <div
              key={cert.title}
              className="p-6 md:p-8 rounded-xl"
              style={{
                backgroundColor: "var(--t-bg-surface)",
                border: "1px solid var(--t-border)",
                boxShadow: "var(--t-shadow)",
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                <div>
                  <h4 style={{ fontSize: "1rem", fontWeight: 600, color: "var(--t-text)" }}>
                    {cert.title}
                  </h4>
                  <p style={{ fontSize: "0.85rem", color: "var(--t-text-body)" }}>
                    {cert.issuer}{" "}
                    <span style={{ color: "var(--t-text-muted)" }}>({cert.id})</span>
                  </p>
                </div>
                <span
                  className="shrink-0"
                  style={{ fontSize: "0.8rem", color: "var(--t-text-muted)" }}
                >
                  {cert.date}
                </span>
              </div>

              <ul className="space-y-2">
                {cert.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                    style={{ fontSize: "0.85rem", lineHeight: 1.7, color: "var(--t-text-body)" }}
                  >
                    <span className="text-[#6366f1] mt-0.5 shrink-0">▹</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>

              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass-primary inline-flex items-center gap-1.5 mt-4 px-5 py-2 rounded-full text-white"
                  style={{ fontSize: "0.85rem", fontWeight: 500 }}
                >
                  View Certificate <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
