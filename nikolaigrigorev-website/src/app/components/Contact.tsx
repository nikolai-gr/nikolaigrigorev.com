import { motion } from "motion/react";
import { useInView } from "./hooks/useInView";
import { Mail, Github, Linkedin, MapPin, Send } from "lucide-react";

const contactLinks = [
  {
    icon: <Mail size={20} />,
    label: "nikolaig.dev@gmail.com",
    href: "mailto:nikolaig.dev@gmail.com",
  },
  {
    icon: <Github size={20} />,
    label: "github.com/nikolai-gr",
    href: "https://github.com/nikolai-gr",
  },
  {
    icon: <Linkedin size={20} />,
    label: "linkedin.com/in/nikolai-gr",
    href: "https://www.linkedin.com/in/nikolai-gr/",
  },
  {
    icon: <MapPin size={20} />,
    label: "New York City, NY",
    href: "#",
  },
];

export function Contact() {
  const { ref, isInView } = useInView();

  return (
    <section id="contact" className="py-12 md:py-16 relative" ref={ref}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,_rgba(99,102,241,0.06)_0%,_transparent_50%)]" />

      <div className="relative max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p
            className="text-[#6366f1] mb-2"
            style={{ fontFamily: "JetBrains Mono, monospace", fontSize: "0.875rem" }}
          >
            06. Contact
          </p>
          <h2
            className="mb-4"
            style={{
              fontSize: "2rem",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "var(--t-text)",
            }}
          >
            Get In Touch
          </h2>
          <p
            className="max-w-lg mx-auto"
            style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--t-text-body)" }}
          >
            I'm currently open to iOS development opportunities and collaborations.
            Whether you have a question or just want to say hello, feel free to reach out!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Links */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl hover:border-[#6366f1]/30 hover:bg-[#6366f1]/5 transition-all group"
                style={{
                  backgroundColor: "var(--t-bg-card)",
                  border: "1px solid var(--t-border)",
                  boxShadow: "var(--t-shadow)",
                }}
              >
                <div className="text-[#6366f1] group-hover:scale-110 transition-transform">
                  {link.icon}
                </div>
                <span
                  className="gradient-underline-text group-hover:opacity-100 transition-colors"
                  style={{ fontSize: "0.9rem", color: "var(--t-text-body)" }}
                >
                  {link.label}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form (frontend-only) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="p-6 rounded-xl"
            style={{
              backgroundColor: "var(--t-bg-card)",
              border: "1px solid var(--t-border)",
              boxShadow: "var(--t-shadow)",
            }}
          >
            <h3
              className="mb-5"
              style={{ fontSize: "1.1rem", fontWeight: 600, color: "var(--t-text)" }}
            >
              Send a Message
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const email = formData.get("email");
                const message = formData.get("message");
                window.location.href = `mailto:nikolaig.dev@gmail.com?subject=Hello from Portfolio&body=${encodeURIComponent(String(message))}&from=${email}`;
              }}
              className="space-y-4"
            >
              <div>
                <label
                  className="block mb-1.5"
                  style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--t-text-muted)" }}
                >
                  Your Name
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="contact-input w-full px-4 py-3 rounded-lg focus:border-[#6366f1]/50 focus:outline-none transition-colors"
                  style={{
                    fontSize: "0.9rem",
                    backgroundColor: "var(--t-bg-input)",
                    border: "1px solid var(--t-border-input)",
                    color: "var(--t-text)",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1.5"
                  style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--t-text-muted)" }}
                >
                  Your Email
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="contact-input w-full px-4 py-3 rounded-lg focus:border-[#6366f1]/50 focus:outline-none transition-colors"
                  style={{
                    fontSize: "0.9rem",
                    backgroundColor: "var(--t-bg-input)",
                    border: "1px solid var(--t-border-input)",
                    color: "var(--t-text)",
                  }}
                />
              </div>
              <div>
                <label
                  className="block mb-1.5"
                  style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--t-text-muted)" }}
                >
                  Message
                </label>
                <textarea
                  name="message"
                  rows={4}
                  placeholder="Hi Nikolai, I'd love to chat about..."
                  className="contact-input w-full px-4 py-3 rounded-lg focus:border-[#6366f1]/50 focus:outline-none transition-colors resize-none"
                  style={{
                    fontSize: "0.9rem",
                    backgroundColor: "var(--t-bg-input)",
                    border: "1px solid var(--t-border-input)",
                    color: "var(--t-text)",
                  }}
                />
              </div>
              <button
                type="submit"
                className="liquid-glass-primary w-full flex items-center justify-center gap-2 px-6 py-3 text-white rounded-full cursor-pointer"
                style={{ fontSize: "0.9rem", fontWeight: 500 }}
              >
                <Send size={16} />
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
