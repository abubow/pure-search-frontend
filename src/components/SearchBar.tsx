'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState, useEffect, useRef } from 'react';
import { Search, ArrowDown, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  initialQuery?: string;
  compact?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  initialQuery = '', 
  compact = false 
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock suggestions - replace with actual API call
  useEffect(() => {
    if (searchQuery.length > 2) {
      // Simulate API call
      const mockSuggestions = [
        `${searchQuery} examples`,
        `${searchQuery} definition`,
        `${searchQuery} tutorial`,
        `${searchQuery} guide`
      ];
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      setSearchQuery(suggestions[selectedIndex]);
      setSuggestions([]);
      setSelectedIndex(-1);
    }
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' && selectedIndex < suggestions.length - 1) {
      e.preventDefault();
      setSelectedIndex(prev => prev + 1);
    } else if (e.key === 'ArrowUp' && selectedIndex > 0) {
      e.preventDefault();
      setSelectedIndex(prev => prev - 1);
    } else if (e.key === 'Escape') {
      setSuggestions([]);
      setSelectedIndex(-1);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="w-full max-w-2xl mx-auto relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, type: "spring", stiffness: 400, damping: 20 }}
    >
      <motion.div 
        className={`relative w-full ${
          isFocused ? 'ring-2 ring-sky-500/20' : ''
        } rounded-full overflow-hidden`}
        whileHover={{ scale: 1.01 }}
        animate={isFocused ? { scale: 1.01 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 20, duration: 0.15 }}
      >
        <motion.div 
          className="absolute inset-0 search-bar-gradient opacity-60"
          animate={isFocused ? 
            { opacity: 0.8 } : 
            { opacity: 0.6 }
          }
          transition={{ duration: 0.15 }}
        ></motion.div>
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          onKeyDown={handleKeyDown}
          placeholder="Search the web..."
          className={`relative w-full bg-transparent text-slate-800 placeholder-slate-500 rounded-full focus:outline-none ${
            compact ? 'px-4 py-2 text-base' : 'px-5 py-4 text-lg'
          }`}
        />
        <motion.button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 gradient-primary text-white rounded-full ${
            compact ? 'p-1.5' : 'p-2.5'
          }`}
          aria-label="Search"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 600, damping: 15, duration: 0.1 }}
        >
          <Search className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {suggestions.length > 0 && isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute w-full mt-2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50"
          >
            {suggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                className={`w-full px-4 py-2 text-left text-sm hover:bg-slate-50 flex items-center gap-2 ${
                  index === selectedIndex ? 'bg-slate-50' : ''
                }`}
                whileHover={{ x: 4 }}
                onClick={() => {
                  setSearchQuery(suggestion);
                  setSuggestions([]);
                  setSelectedIndex(-1);
                }}
              >
                <Search className="w-4 h-4 text-slate-400" />
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.form>
  );
};

export default SearchBar; 