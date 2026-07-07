'use client';

import Image from 'next/image';
import SocialLinks from '@/components/SocialLinks';
import ScrollReveal from '@/components/ScrollReveal';

interface HeroSectionProps {
  name: string;
  title: string;
  description: string;
  profileImage: string;
  socialLinks: {
    github?: string;
    facebook?: string;
    linkedin?: string;
    website?: string;
  };
}

export default function HeroSection({ name, title, description, profileImage, socialLinks }: HeroSectionProps) {
  return (
    <div className="flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="up" threshold={0} delay={100} className="w-full">
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                  Hello, I'm{' '}
                  <span className="text-blue-600 dark:text-blue-400">{name}</span>
                </h1>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-6">
                  {title}
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl leading-relaxed">
                  {description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-200"
                >
                  Contact Me
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                <button className="inline-flex items-center justify-center px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 rounded-full font-medium hover:bg-blue-600 hover:text-white dark:hover:bg-blue-400 dark:hover:text-gray-900 transition-all duration-200">
                  Download Resume
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="fade" threshold={0} delay={300} className="w-full flex justify-center">
            <div className="flex flex-col items-center space-y-8">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-full border-8 border-blue-600 dark:border-blue-400 flex items-center justify-center bg-linear-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800">
                  <div className="w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden">
                    {profileImage ? (
                      <Image
                        src={profileImage}
                        alt={name}
                        width={288}
                        height={288}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                    ) : (
                      <svg className="w-full h-full text-gray-400 dark:text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
              <SocialLinks links={socialLinks} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
