'use client';

import { useState } from 'react';
import personalInfo from '@/data/personal-info.json';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ExperienceSection from '@/components/ExperienceSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import ExperienceModal from '@/components/ExperienceModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<typeof personalInfo.experience[0] | null>(null);

  const handleExperienceClick = (exp: any) => {
    setSelectedExperience(exp);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <HeroSection
        name={personalInfo.name}
        title={personalInfo.title}
        description={personalInfo.description}
        profileImage={personalInfo.profileImage}
        socialLinks={personalInfo.socialLinks}
      />
      <AboutSection
        description={personalInfo.description}
        about={personalInfo.about}
      />
      <SkillsSection skills={personalInfo.skills} />
      <ExperienceSection
        experience={personalInfo.experience}
        onExperienceClick={handleExperienceClick}
      />
      <ProjectsSection projects={personalInfo.projects} />
      <ContactSection
        email={personalInfo.email}
        location={personalInfo.location}
        responseTime={personalInfo.responseTime}
      />
      <ExperienceModal
        isOpen={isModalOpen}
        experience={selectedExperience}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
