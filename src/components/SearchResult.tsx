import React from 'react';
import { ExternalLink, UserCheck, HelpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <motion.div 
      className="glass-card mb-4 p-4 transition-all relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ type: "spring", stiffness: 500, damping: 25, duration: 0.15 }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-sky-100/10 to-cyan-100/10 z-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.8 }}
        transition={{ duration: 0.15 }}
      ></motion.div>
      <div className="flex items-start justify-between gap-4 relative z-10">
        <div className="flex-1 min-w-0">
          <motion.a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-xl font-medium text-sky-600 hover:underline mb-1 block flex items-center gap-1"
            whileHover={{ x: 3 }}
            transition={{ type: "spring", stiffness: 600, damping: 20, duration: 0.1 }}
          >
            {title}
            <motion.div
              initial={{ opacity: 0, x: -5 }}
              whileHover={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
            >
              <ExternalLink size={16} className="inline" />
            </motion.div>
          </motion.a>
          <div className="text-emerald-600 text-sm mb-2 truncate">{displayUrl}</div>
          <p className="text-slate-700 line-clamp-2">{description}</p>
        </div>
        <motion.div 
          className={`flex items-center whitespace-nowrap text-xs px-2.5 py-1.5 rounded-full ${confidenceLevel.color} shadow-sm`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 600, damping: 15, duration: 0.1 }}
        >
          {confidenceLevel.icon}
          {confidenceLevel.text}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SearchResult; 