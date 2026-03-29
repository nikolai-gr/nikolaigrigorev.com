import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { GraduationCap } from 'lucide-react';

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const education = [
    {
      degree: 'M.S. in Artificial Intelligence',
      institution: 'University of Colorado Boulder',
      period: 'Jun. 2026 - Expected May 2028',
      location: 'Boulder, CO',
      details: '',
    },
    {
      degree: 'A.A.S. in Computer Information Systems',
      institution: 'New York City College of Technology, The City University of New York',
      period: 'Sep. 2024 - May 2026',
      location: 'Brooklyn, NY',
      details: 'GPA: 3.62 | Coursework: Data Structures, Algorithms, Object-Oriented Programming, Applied Machine Learning, Artificial Intelligence',
    },
  ];

  return (
    <section id="education" className="py-16 md:py-32 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-base md:text-sm uppercase tracking-wider text-gray-500 mb-12 md:mb-16">Education</h2>

          <div className="space-y-12 md:space-y-16">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="grid md:grid-cols-4 gap-6 md:gap-8 group"
              >
                <div className="md:col-span-1">
                  <p className="text-base md:text-sm text-gray-400">{edu.period}</p>
                </div>
                
                <div className="md:col-span-3 space-y-3">
                  <div className="flex items-start gap-3">
                    <GraduationCap className="size-6 md:size-5 text-gray-400 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-2xl md:text-xl text-black mb-1">{edu.degree}</h3>
                      <p className="text-lg md:text-base text-gray-600 mb-2">{edu.institution}</p>
                      <p className="text-lg md:text-base text-gray-500">{edu.details}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}