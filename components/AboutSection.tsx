'use client';

import ScrollReveal from '@/components/ScrollReveal';

interface AboutSectionProps {
  description: string;
  about: {
    journey: string;
    whatIDo: string[];
  };
}

export default function AboutSection({ description, about }: AboutSectionProps) {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">About Me</h1>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {description}
            </p>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">My Journey</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {about.journey}
              </p>
            </div>
            <div className="mt-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What I Do</h2>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                {about.whatIDo.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
