import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 border-t border-[var(--t-footer-border)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[0.8rem] text-[var(--t-text-muted)]">
            &copy; {new Date().getFullYear()} Nikolai Grigorev. Built with love and creativity.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/nikolai-gr"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6366f1] transition-colors text-[var(--t-text-muted)]"
            >
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/nikolai-gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#6366f1] transition-colors text-[var(--t-text-muted)]"
            >
              <Linkedin size={16} />
            </a>
            <a
              href="mailto:nikolaig.dev@gmail.com"
              className="hover:text-[#6366f1] transition-colors text-[var(--t-text-muted)]"
            >
              <Mail size={16} />
            </a>
          </div>

          <p className="[font-family:JetBrains_Mono,monospace] text-[0.7rem] text-[var(--t-text-dim)]">
            {"<NG />"}
          </p>
        </div>
      </div>
    </footer>
  );
}
