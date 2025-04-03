'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import Script from 'next/script';
import useSearch, { SearchResult as SearchResultType } from '../hooks/useSearch';

// Staggered animation variants for list items
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

interface SearchPageProps {
  initialQuery?: string;
}

interface FilterState {
  contentTypes: {
    articles: boolean;
    blogs: boolean;
    academic: boolean;
  };
  confidence: {
    high: boolean;
    medium: boolean;
    low: boolean;
  };
}

export default function SearchPage({ initialQuery }: SearchPageProps) {
  const searchParams = useSearchParams();
  const query = initialQuery || searchParams.get('q') || '';
  const [selectedResultIndex, setSelectedResultIndex] = useState(-1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    contentTypes: {
      articles: true,
      blogs: true,
      academic: true
    },
    confidence: {
      high: true,
      medium: true,
      low: false
    }
  });
  const resultsRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, error } = useSearch(query);

  // Filter results based on selected filters
  const filteredResults = data?.results.filter(result => {
    const confidenceLevel = result.confidence >= 90 ? 'high' : 
                           result.confidence >= 70 ? 'medium' : 'low';
    return filters.confidence[confidenceLevel];
  }) || [];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!filteredResults.length) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedResultIndex(prev => 
            prev < filteredResults.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedResultIndex(prev => 
            prev > 0 ? prev - 1 : filteredResults.length - 1
          );
          break;
        case 'Enter':
          if (selectedResultIndex >= 0) {
            window.open(filteredResults[selectedResultIndex].url, '_blank');
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredResults, selectedResultIndex]);

  const toggleFilter = (category: keyof FilterState, key: string) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: !prev[category][key as keyof typeof prev[typeof category]]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Add structured data for SearchResultsPage */}
      <Script
        id="schema-search"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SearchResultsPage",
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": data?.results ? data.results.map((result, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": result.url,
                "name": result.title,
                "description": result.description
              })) : []
            },
            "about": {
              "@type": "Thing",
              "name": query ? `Search results for ${query}` : "Search Results"
            }
          })
        }}
      />

      <motion.header 
        className="glass sticky top-0 z-10 border-b border-sky-100"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, type: "spring", stiffness: 500 }}
          >
            <Link 
              href="/" 
              className="group text-2xl font-bold text-slate-800 mr-6 flex items-center gap-1"
              aria-label="Return to PureSearch home page"
            >
              <motion.div 
                className="gradient-primary p-1 rounded-lg mr-1 shadow-md"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                <Search className="h-5 w-5 text-white" />
              </motion.div>
              Pure
              <motion.span 
                className="gradient-text font-bold"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Search
              </motion.span>
            </Link>
          </motion.div>
          <div className="flex-grow">
            <SearchBar initialQuery={query} compact={true} />
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto">
        <div className="lg:flex">
          <motion.aside 
            className={`fixed inset-0 z-40 lg:relative lg:z-0 lg:w-60 lg:block ${
              showFilters ? 'block' : 'hidden'
            }`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 400 }}
          >
            <div className="h-full bg-white lg:bg-transparent p-4 lg:p-0">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="font-medium text-slate-800">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-slate-100 rounded-full"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <motion.div 
                className="space-y-4"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="space-y-2 glass-card p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.2, type: "spring", stiffness: 400 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="text-sm text-slate-600 font-medium">Content Type</h4>
                  {Object.entries(filters.contentTypes).map(([key, value]) => (
                    <label key={key} className="flex items-center text-sm cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => toggleFilter('contentTypes', key)}
                        className="mr-2 accent-sky-500"
                      />
                      <span className="capitalize">{key}</span>
                    </label>
                  ))}
                </motion.div>
                
                <motion.div 
                  className="space-y-2 glass-card p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.25, type: "spring", stiffness: 400 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="text-sm text-slate-600 font-medium">Human Confidence</h4>
                  {Object.entries(filters.confidence).map(([key, value]) => (
                    <label key={key} className="flex items-center text-sm cursor-pointer text-slate-700">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={() => toggleFilter('confidence', key)}
                        className="mr-2 accent-sky-500"
                      />
                      <span className="capitalize">{key}</span>
                    </label>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.aside>

          <main className="flex-grow p-4">
            {query ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <motion.div 
                    className="text-slate-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    Found {filteredResults.length} results for <span className="font-medium text-slate-800">&quot;{query}&quot;</span>
                  </motion.div>
                  <motion.button 
                    className="lg:hidden flex items-center text-sm gap-2 glass rounded-lg p-2 hover:shadow-md transition-shadow text-slate-700"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setShowFilters(true)}
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    Filter Results
                  </motion.button>
                </div>

                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(5)].map((_, i) => (
                      <motion.div 
                        key={i}
                        className="bg-slate-100 rounded-lg h-32 animate-pulse"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      />
                    ))}
                  </div>
                ) : error ? (
                  <motion.div 
                    className="p-4 bg-red-50 text-red-600 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Error loading search results: {error.message}
                  </motion.div>
                ) : filteredResults.length > 0 ? (
                  <motion.div
                    ref={resultsRef}
                    className="space-y-4"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {filteredResults.map((result, i) => (
                        <motion.div
                          key={result.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.2 }}
                        >
                          <SearchResult 
                            result={result} 
                            delay={i * 0.05}
                            isSelected={i === selectedResultIndex}
                            onSelect={() => setSelectedResultIndex(i)}
                          />
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="text-center py-12 text-slate-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    No results found for &quot;{query}&quot;
                  </motion.div>
                )}
              </>
            ) : (
              <motion.div 
                className="text-center py-12 text-slate-500"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Enter a search query to find authentic, human-written content
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
} 