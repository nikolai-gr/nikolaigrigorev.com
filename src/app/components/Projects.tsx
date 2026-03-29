import { ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const projects = [
    {
      title: 'Little Lemon App',
      description: 'A production-ready restaurant booking application following the MVVM architectural pattern for scalable code. Features CoreData for local persistence, enabling offline menu access and profile management. Integrated URLSession to fetch menu data, utilizing @Published properties for real-time UI updates.',
      technologies: ['Swift', 'SwiftUI', 'CoreData', 'JSON API', 'MVVM'],
      link: 'https://github.com/nikolai-gr/Little-Lemon-iOS',
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base md:text-sm uppercase tracking-wider text-gray-500 mb-12 md:mb-16">Selected Work</h2>

          <div className="space-y-16 md:space-y-20">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="group"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                    <div className="md:col-span-2 space-y-4">
                      <div className="flex items-start justify-between">
                        <h3 className="text-3xl md:text-2xl lg:text-3xl text-black group-hover:text-gray-600 transition-colors">
                          {project.title}
                        </h3>
                        <ExternalLink className="size-6 md:size-5 text-gray-400 group-hover:text-black transition-colors" />
                      </div>
                      <p className="text-lg md:text-base text-gray-600 leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 items-start">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-sm md:text-xs text-gray-500"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
                
                <div className="mt-8 h-px bg-gray-200" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}