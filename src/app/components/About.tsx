import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-16 md:py-32 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h2 className="text-base md:text-sm uppercase tracking-wider text-gray-500 mb-8">About</h2>
          
          <div className="space-y-6 text-xl md:text-xl text-gray-700 leading-relaxed">
            <p>
              I'm a software engineer specializing in iOS development and Python-based solutions, 
              currently pursuing my M.S. in Artificial Intelligence at the University of Colorado Boulder. 
              With a foundation in Computer Information Systems from NYC College of Technology, I build 
              scalable applications across mobile and AI platforms.
            </p>
            <p>
              My expertise spans creating intuitive iOS applications with Swift and SwiftUI, developing 
              machine learning models with PyTorch, and architecting clean, maintainable code following 
              industry best practices. I'm passionate about leveraging technology to solve complex problems 
              and create seamless user experiences.
            </p>
            <p className="text-gray-600">
              Currently advancing my skills in advanced iOS development and AI technologies, 
              bridging the gap between mobile engineering and artificial intelligence.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}