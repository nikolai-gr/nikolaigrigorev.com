import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100"
    >
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.a
            href="#"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-lg tracking-tight text-black hover:text-gray-600 transition-colors"
          >
            Nikolai Grigorev
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-12 items-center">
            {navItems.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={(e) => scrollToSection(e, item.href)}
                className="text-sm text-gray-600 hover:text-black transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-black transition-all group-hover:w-full" />
              </motion.a>
            ))}
            <motion.a
              href="/resume.pdf"
              download="Nikolai_Grigorev_Resume.pdf"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * navItems.length }}
              className="text-sm px-4 py-2 border border-black text-black hover:bg-black hover:text-white transition-colors"
            >
              Resume
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="size-5 text-black" />
            ) : (
              <Menu className="size-5 text-black" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-6 space-y-6 overflow-hidden"
            >
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => scrollToSection(e, item.href)}
                  className="block text-sm text-gray-600 hover:text-black transition-colors"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="/resume.pdf"
                download="Nikolai_Grigorev_Resume.pdf"
                className="block text-sm text-black border border-black px-4 py-2 text-center hover:bg-black hover:text-white transition-colors"
              >
                Resume
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}