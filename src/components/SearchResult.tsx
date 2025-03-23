import React from 'react';
import { ExternalLink, UserCheck, Bot, HelpCircle } from 'lucide-react';

interface SearchResultProps {
  title: string;
  url: string;
  description: string;
  confidence: number; // Confidence that the content is non-AI (0-100%)
}

const SearchResult: React.FC<SearchResultProps> = ({
  title,
  url,
  description,
  confidence,
}) => {
  // Format the URL for display (remove https://, truncate if too long)
  const displayUrl = url
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .split('/')
    .slice(0, 2)
    .join('/');

  // Define confidence level display
  const getConfidenceLevel = () => {
    if (confidence >= 90) return { 
      text: 'Very Likely Human', 
      color: 'bg-emerald-50 backdrop-blur-sm text-emerald-700',
      icon: <UserCheck size={14} className="mr-1" />
    };
    if (confidence >= 70) return { 
      text: 'Likely Human', 
      color: 'bg-green-50 backdrop-blur-sm text-green-700',
      icon: <UserCheck size={14} className="mr-1" />
    };
    if (confidence >= 50) return { 
      text: 'Possibly Human', 
      color: 'bg-amber-50 backdrop-blur-sm text-amber-700',
      icon: <HelpCircle size={14} className="mr-1" />
    };
    return { 
      text: 'Uncertain', 
      color: 'bg-slate-100 backdrop-blur-sm text-slate-700',
      icon: <HelpCircle size={14} className="mr-1" />
    };
  };

  const confidenceLevel = getConfidenceLevel();

  return (
    <div className="glass-card mb-4 p-4 hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-100/10 to-cyan-100/10 z-0 opacity-50 group-hover:opacity-80 transition-opacity"></div>
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex-1 min-w-0">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xl font-medium text-sky-600 hover:underline mb-1 block flex items-center gap-1"
          >
            {title}
            <ExternalLink size={16} className="inline opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
          <div className="text-emerald-600 text-sm mb-2 truncate">{displayUrl}</div>
          <p className="text-slate-700 line-clamp-2">{description}</p>
        </div>
        <div className={`flex items-center whitespace-nowrap text-xs px-2.5 py-1.5 rounded-full ${confidenceLevel.color} shadow-sm`}>
          {confidenceLevel.icon}
          {confidenceLevel.text}
        </div>
      </div>
    </div>
  );
};

export default SearchResult; 