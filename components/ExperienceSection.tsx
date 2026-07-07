'use client';

import ScrollReveal from '@/components/ScrollReveal';

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  points?: string[];
  technologies?: string[];
}

interface ExperienceSectionProps {
  experience: Experience[];
  onExperienceClick: (exp: Experience) => void;
}

export default function ExperienceSection({ experience, onExperienceClick }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-800/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">Experience</h1>
        </ScrollReveal>
        <div className="relative border-l-2 border-blue-600 dark:border-blue-400 ml-4">
          {experience.map((exp, index) => (
            <ScrollReveal key={index} direction="left" delay={index * 100}>
              <div 
                className="relative pl-8 pb-20 last:pb-0 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg p-4 transition-colors"
                onClick={() => onExperienceClick(exp)}
              >
                <div className="absolute -left-[11px] top-0 w-5 h-5 bg-blue-600 dark:bg-blue-400 rounded-full shadow-md" />
                <div className="mb-1 flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {exp.role}
                  </h3>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {exp.duration}
                  </span>
                </div>
                <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mb-4">
                  {exp.company}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4 text-justify">
                  {exp.description}
                </p>
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
