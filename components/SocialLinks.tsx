import React from 'react';
import { FaGithub, FaFacebook, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

interface SocialLink {
  url: string;
  icon: React.ReactNode;
}

interface SocialLinksProps {
  links: {
    github?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
  className?: string;
  iconSize?: string;
  containerSize?: string;
}

export default function SocialLinks({ links, className = "", iconSize = "w-6 h-6", containerSize = "w-12 h-12" }: SocialLinksProps) {
  const socialConfigs: Record<string, { icon: React.ReactNode }> = {
    github: {
      icon: <FaGithub className={`${iconSize} text-gray-900 dark:text-white`} />,
    },
    facebook: {
      icon: <FaFacebook className={`${iconSize} text-gray-900 dark:text-white`} />,
    },
    linkedin: {
      icon: <FaLinkedin className={`${iconSize} text-gray-900 dark:text-white`} />,
    },
    email: {
      icon: <MdEmail className={`${iconSize} text-gray-900 dark:text-white`} />,
    },
    website: {
      icon: <FaGlobe className={`${iconSize} text-gray-900 dark:text-white`} />,
    },
  };

  return (
    <div className={`flex space-x-4 ${className}`}>
      {(Object.keys(socialConfigs) as Array<keyof typeof socialConfigs>).map((key) => {
        const url = links[key as keyof typeof links];
        if (!url) return null;

        return (
          <a
            key={key}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${containerSize} rounded-full bg-white dark:bg-gray-800 shadow-lg flex items-center justify-center hover:shadow-xl transition-shadow`}
          >
            {socialConfigs[key].icon}
          </a>
        );
      })}
    </div>
  );
}
