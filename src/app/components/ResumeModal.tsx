import { motion, AnimatePresence } from "motion/react";
import { X, Download, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  open: boolean;
  onClose: () => void;
}

const resumePdfPath = "/Nikolai_Grigorev_Resume.pdf";

export function ResumeModal({ open, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[10050] flex items-center justify-center p-4 bg-black/50"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-5xl w-full h-[95dvh] max-h-[95dvh] min-h-0 flex flex-col rounded-2xl p-4 bg-[var(--t-bg-surface)] border border-[var(--t-border-input)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 flex-shrink-0">
              <h3 className="text-[1.1rem] font-semibold text-[var(--t-text)]">
                Resume
              </h3>
              <div className="flex items-center gap-2">
                <a
                  href={resumePdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="liquid-glass p-2.5 rounded-full text-[var(--t-text-body)]"
                  title="Open in new tab"
                >
                  <ExternalLink size={16} />
                </a>
                <a
                  href={resumePdfPath}
                  download="Nikolai_Grigorev_Resume.pdf"
                  className="liquid-glass-primary p-2.5 rounded-full text-white"
                  title="Download PDF"
                >
                  <Download size={16} />
                </a>
                <button
                  onClick={onClose}
                  className="liquid-glass p-2.5 rounded-full cursor-pointer text-[var(--t-text-body)]"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
            <div
              className="flex-1 min-h-0 w-full rounded-lg overflow-hidden border border-[var(--t-border)] bg-[#f5f5f5]"
            >
              <iframe
                src={`${resumePdfPath}#zoom=page-width`}
                title="Resume PDF"
                className="w-full h-full block border-0"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
