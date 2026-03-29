import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const experiences = [
    {
      title: 'iOS Developer (Intensive Training)',
      company: 'Hacking with Swift (100 Days of SwiftUI)',
      period: 'Feb. 2026 - Present',
      location: 'Remote',
      description: [
        'Mastering advanced Swift architecture through an intensive curriculum, focusing on Protocol-Oriented Programming (POP), closures, and memory management',
        'Architecting and deploying a portfolio of 19+ applications to master State Management, complex Animations, and declarative UI patterns',
        'Applying Clean Code principles and Apple\'s Human Interface Guidelines to ensure high scalability and professional-grade user experiences',
      ],
    },
    {
      title: 'iOS Developer (Professional Certification Project)',
      company: 'Meta',
      period: 'Dec. 2025 - Jan. 2026',
      location: 'Remote',
      description: [
        'Engineered a production-ready restaurant application using SwiftUI and CoreData, implementing persistent storage for offline menu access and user profiles',
        'Architected networking layers utilizing URLSession and JSON parsing to fetch and synchronize real-time menu data from remote APIs',
        'Translated high-fidelity Figma wireframes into functional code, ensuring pixel-perfect UI execution and seamless user navigation flows',
        'Leveraged the MVVM architectural pattern to decouple business logic from UI, improving code maintainability and testability',
      ],
    },
    {
      title: 'Kitchen Staff',
      company: 'Pilot Restaurant',
      period: 'May 2024 - Aug. 2024',
      location: 'New York, NY',
      description: [
        'Streamlined high-volume kitchen operations during peak service hours, ensuring 100% adherence to quality and presentation standards',
        'Optimized ingredient management and prep workflows, contributing to a measurable reduction in kitchen preparation time through efficient organization',
      ],
    },
  ];

  return (
    <section id="experience" className="py-16 md:py-32 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base md:text-sm uppercase tracking-wider text-gray-500 mb-12 md:mb-16">Experience</h2>

          <div className="space-y-12 md:space-y-16">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid md:grid-cols-4 gap-6 md:gap-8 group"
              >
                <div className="md:col-span-1">
                  <p className="text-base md:text-sm text-gray-400">{exp.period}</p>
                </div>
                
                <div className="md:col-span-3 space-y-4">
                  <div>
                    <h3 className="text-2xl md:text-xl text-black mb-1">{exp.title}</h3>
                    <p className="text-lg md:text-base text-gray-600">{exp.company}</p>
                    <p className="text-sm md:text-xs text-gray-500">{exp.location}</p>
                  </div>
                  
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-lg md:text-base text-gray-600 leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}