import { Github, Linkedin, Mail, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import profileImage from '../../assets/1bc86e099666fed799065900797812fc00de7bba.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white pt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 md:order-1"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
              <ImageWithFallback
                src={profileImage}
                alt="Nikolai Grigorev"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8 order-1 md:order-2"
          >
            <div className="space-y-6">
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm uppercase tracking-wider text-gray-500"
              >
                Software Engineer
              </motion.p>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="text-5xl md:text-6xl lg:text-7xl tracking-tight text-black"
              >
                Nikolai Grigorev
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="text-lg md:text-xl text-gray-600 leading-relaxed"
            >
              I build exceptional digital experiences with clean code and thoughtful design.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="flex gap-6 pt-4"
            >
              <a
                href="https://github.com/nikolai-gr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="GitHub"
              >
                <Github className="size-5" />
              </a>
              <a
                href="https://www.linkedin.com/in/nikolai-gr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="size-5" />
              </a>
              <a
                href="https://www.instagram.com/grigorev.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="size-5" />
              </a>
              <a
                href="mailto:nikolaig.dev@gmail.com"
                className="text-gray-600 hover:text-black transition-colors"
                aria-label="Email"
              >
                <Mail className="size-5" />
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3 }}
              className="pt-8"
            >
              <button
                onClick={scrollToAbout}
                className="group inline-flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
              >
                Scroll to explore
                <span className="inline-block group-hover:translate-y-1 transition-transform">↓</span>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}