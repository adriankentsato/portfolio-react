'use client';

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  points?: string[];
}

interface ExperienceModalProps {
  isOpen: boolean;
  experience: Experience | null;
  onClose: () => void;
}

export default function ExperienceModal({ isOpen, experience, onClose }: ExperienceModalProps) {
  if (!isOpen || !experience) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {experience.role}
              </h2>
              <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                {experience.company}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {experience.duration}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Description</h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {experience.description}
            </p>
          </div>
          
          {experience.points && experience.points.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Key Achievements</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                {experience.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
