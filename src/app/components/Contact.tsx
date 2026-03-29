import { Mail, Github, Linkedin, Instagram } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/nikolai-gr',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nikolai-gr/',
    },
    {
      icon: Instagram,
      label: 'Instagram',
      href: 'https://www.instagram.com/grigorev.dev/',
    },
    {
      icon: Mail,
      label: 'Email',
      href: 'mailto:nikolaig.dev@gmail.com',
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-32 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h2 className="text-base md:text-sm uppercase tracking-wider text-gray-500 mb-12">Get in Touch</h2>
          
          <p className="text-3xl md:text-2xl lg:text-3xl text-gray-700 leading-relaxed mb-16">
            I'm always interested in hearing about new projects and opportunities. 
            Feel free to reach out.
          </p>

          <div className="flex flex-wrap gap-8">
            {socialLinks.map((social, index) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors group"
              >
                <social.icon className="size-5 md:size-4" />
                <span className="text-base md:text-sm">{social.label}</span>
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}