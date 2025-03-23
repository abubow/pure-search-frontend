'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { Search } from 'lucide-react';

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`w-full relative p-0.5 rounded-full shadow-lg ${compact ? 'max-w-4xl' : 'max-w-2xl'}`}
    >
      <div 
        className={`relative w-full glass transition-all duration-300 ${
          isFocused 
            ? 'ring-2 ring-sky-500/70 shadow-lg' 
            : 'ring-1 ring-sky-200/50 shadow-md'
        } rounded-full overflow-hidden`}
      >
        <div className="absolute inset-0 search-bar-gradient opacity-60"></div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search the web..."
          className={`relative w-full bg-transparent text-slate-800 placeholder-slate-500 rounded-full focus:outline-none ${
            compact ? 'px-4 py-2 text-base' : 'px-5 py-4 text-lg'
          }`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 gradient-primary text-white rounded-full transition-all hover:shadow-lg active:scale-95 ${
            compact ? 'p-1.5' : 'p-2.5'
          }`}
          aria-label="Search"
        >
          <Search className={compact ? 'w-4 h-4' : 'w-5 h-5'} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar; 