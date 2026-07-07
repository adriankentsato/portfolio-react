'use client';

import ScrollReveal from '@/components/ScrollReveal';
import { 
  FaReact, FaHtml5, FaNodeJs, FaPython, FaGitAlt, FaDocker, FaAws, FaLinux, FaServer,
  FaProjectDiagram, FaSitemap, FaCogs, FaTasks, FaShieldAlt, FaJs, FaCss3, FaPhp, FaJava,
  FaCode, FaTerminal, FaAngular, FaBootstrap, FaVial, FaFlask, FaGithub, FaGitlab,
  FaBitbucket, FaBug, FaCloud, FaKey, FaLock, FaWindows, FaApple, FaTheaterMasks
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
  SiConfluence
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

export default function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">Skills & Technology</h1>
        </ScrollReveal>
        <div className="space-y-6">
          {skills.map((category, categoryIndex) => (
            <ScrollReveal key={categoryIndex} delay={categoryIndex * 150} direction="up">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                  {category.category}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {category.skills.map((skill, skillIndex) => {
                    const IconComponent = iconMap[skill.icon];
                    return (
                      <div
                        key={skillIndex}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {IconComponent && <IconComponent className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
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
