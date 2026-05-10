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
              I'm an iOS Developer at Accenture and a CIS graduate from City Tech (CUNY), driven by a
              "lifting while climbing" philosophy. My focus is bridging the gap between robust backend
              logic and elegant, user-centric interfaces. With a foundation in Computer Information
              Systems and an upcoming Master's in Artificial Intelligence at CU Boulder, I'm dedicated
              to becoming a leading AI-Enhanced iOS Developer.
            </p>
            <p>
              I'm currently deep-diving into the iOS ecosystem, specifically modern mobile architecture
              and the integration of Large Language Models (LLMs) into native applications. Whether
              building with SwiftUI or exploring the latest in mobile AI, I aim to create seamless
              digital experiences.
            </p>
            <p className="text-gray-600">
              Based in New York City. Always excited to connect with developers and engineers
              passionate about the future of iOS and AI innovation.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}