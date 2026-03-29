import { motion, useInView } from 'motion/react';
import { useRef } from 'react';

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const skillCategories = [
    {
      category: 'Languages',
      skills: ['Swift (SwiftUI)', 'Python', 'SQL', 'HTML/CSS'],
    },
    {
      category: 'Tools',
      skills: ['Xcode', 'Git', 'Figma', 'CoreData', 'Unix'],
    },
    {
      category: 'ML/AI',
      skills: ['PyTorch', 'Prompt Engineering'],
    },
    {
      category: 'Practices',
      skills: ['MVVM', 'Protocol-Oriented Programming', 'State Management', 'UI/UX Design', 'RESTful APIs'],
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-32 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base md:text-sm uppercase tracking-wider text-gray-500 mb-12 md:mb-16">Skills</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-sm md:text-xs uppercase tracking-wider text-gray-400 mb-6">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.skills.map((skill) => (
                    <div
                      key={skill}
                      className="text-lg md:text-base text-gray-700"
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}