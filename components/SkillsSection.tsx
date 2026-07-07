'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { Code2 } from 'lucide-react';
import { 
  FaReact, FaHtml5, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaLinux, FaServer,
  FaProjectDiagram, FaSitemap, FaCogs, FaTasks, FaShieldAlt, FaJs, FaCss3, FaPhp, FaJava,
  FaCode, FaTerminal, FaAngular, FaBootstrap, FaVial, FaFlask, FaGithub, FaGitlab,
  FaBitbucket, FaBug, FaCloud, FaKey, FaLock, FaWindows, FaApple, FaTheaterMasks,
  FaFigma
} from 'react-icons/fa';
import { 
  SiTypescript, SiNextdotjs, SiTailwindcss, SiPostgresql, SiGraphql, SiGithubactions,
  SiSymfony, SiApache, SiJquery, SiVagrant, SiVirtualbox, SiNginx, SiMysql,
  SiRedis, SiJest, SiPuppeteer, SiPostman, SiJira, SiAirtable, SiConfluence
} from 'react-icons/si';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FaReact,
  FaHtml5,
  FaNodeJs,
  FaPython,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaLinux,
  FaServer,
  FaProjectDiagram,
  FaSitemap,
  FaCogs,
  FaTasks,
  FaShieldAlt,
  FaJs,
  FaCss3,
  FaPhp,
  FaJava,
  FaCode,
  FaTerminal,
  FaAngular,
  FaBootstrap,
  FaVial,
  FaFlask,
  FaGithub,
  FaGitlab,
  FaBitbucket,
  FaBug,
  FaCloud,
  FaKey,
  FaLock,
  FaWindows,
  FaApple,
  FaTheaterMasks,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiGraphql,
  SiGithubactions,
  SiSymfony,
  SiApache,
  SiJquery,
  SiVagrant,
  SiVirtualbox,
  SiNginx,
  SiMysql,
  SiRedis,
  SiJest,
  SiPuppeteer,
  SiPostman,
  SiJira,
  SiAirtable,
  SiConfluence,
  FaFigma,
  Code2,
};

interface Skill {
  name: string;
  icon: string;
}

interface SkillCategory {
  category: string;
  skills: Skill[];
}

interface SkillsSectionProps {
  skills: SkillCategory[];
}

// Function to calculate optimal grid columns based on item count
function calculateGridColumns(itemCount: number): number {
  if (itemCount <= 6) return 2;
  if (itemCount <= 12) return 3;
  if (itemCount <= 18) return 4;
  if (itemCount <= 24) return 5;
  return 6;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Skills & Tech Stacks</h1>
        </ScrollReveal>
        <div className="space-y-8">
          {skills.map((category, categoryIndex) => (
            <ScrollReveal key={categoryIndex} delay={categoryIndex * 150} direction="up">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  {category.category}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = iconMap[skill.icon];
                    return (
                      <div
                        key={skillIndex}
                        className="w-[calc(12.5%-12px)] min-w-[100px] bg-gray-50 dark:bg-gray-700 rounded-lg shadow-sm p-3 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300"
                      >
                        {IconComponent && (
                          <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400 mb-2" />
                        )}
                        <span className="text-xs font-medium text-gray-700 dark:text-gray-300 text-center">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
