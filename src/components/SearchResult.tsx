import React from 'react';
import { ExternalLink, Clock, ThumbsUp, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { SearchResult as SearchResultType } from '../hooks/useSearch';

interface SearchResultProps {
  result: {
    id: string;
    title: string;
    url: string;
    description: string;
    confidence: number;
    publishedDate?: string;
  };
  delay?: number;
  isSelected?: boolean;
  onSelect?: () => void;
}

const SearchResult: React.FC<SearchResultProps> = ({
  result,
  delay = 0,
  isSelected = false,
  onSelect
}) => {
  const { title, url, description, confidence, publishedDate } = result;
  const displayUrl = new URL(url).hostname.replace('www.', '');
  
  const confidenceLevel = {
    high: {
      text: 'High Confidence',
      color: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
      icon: <ThumbsUp className="w-3.5 h-3.5 mr-1" />
    },
    medium: {
      text: 'Medium Confidence',
      color: 'bg-amber-50 text-amber-700 border border-amber-200',
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />
    },
    low: {
      text: 'Low Confidence',
      color: 'bg-red-50 text-red-700 border border-red-200',
      icon: <AlertCircle className="w-3.5 h-3.5 mr-1" />
    }
  }[confidence >= 90 ? 'high' : confidence >= 70 ? 'medium' : 'low'];

  return (
    <motion.article 
      className={`glass-card mb-4 p-4 transition-all relative overflow-hidden group ${
        isSelected ? 'ring-2 ring-sky-500' : ''
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
      transition={{ 
        type: "spring", 
        stiffness: 500, 
        damping: 25, 
        duration: 0.15, 
        delay,
        layout: true
      }}
      layout
      onClick={onSelect}
      role="article"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          window.open(url, '_blank');
        }
      }}
      aria-selected={isSelected}
      aria-label={`${title} - ${confidenceLevel.text}`}
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
            aria-label={`${title} (opens in new tab)`}
            onClick={(e) => e.stopPropagation()}
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
          {publishedDate && (
            <div className="flex items-center text-xs text-slate-500 mt-2">
              <Clock className="w-3.5 h-3.5 mr-1" />
              {new Date(publishedDate).toLocaleDateString()}
            </div>
          )}
        </div>
        <motion.div 
          className={`flex items-center whitespace-nowrap text-xs px-2.5 py-1.5 rounded-full ${confidenceLevel.color} shadow-sm`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 600, damping: 15, duration: 0.1 }}
          role="status"
          aria-label={`Confidence level: ${confidenceLevel.text}`}
        >
          {confidenceLevel.icon}
          {confidenceLevel.text}
        </motion.div>
      </div>
    </motion.article>
  );
};

export default SearchResult; 