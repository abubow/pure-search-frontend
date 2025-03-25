'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react';
import Script from 'next/script';
import useSearch, { SearchResult as SearchResultType } from '../hooks/useSearch';

// Staggered animation variants for list items
const listVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05 // Reduced from 0.1 for faster staggering
    }
  }
};

interface SearchPageProps {
  initialQuery?: string;
}

export function SearchPage({ initialQuery = '' }: SearchPageProps) {
  const searchParams = useSearchParams();
  const query = initialQuery || searchParams.get('q') || '';
  const [mounted, setMounted] = useState(false);
  const { search, isLoading, error, data } = useSearch();

  useEffect(() => {
    setMounted(true);
    
    if (query) {
      // Perform search when query changes
      search(query);
    }
  }, [query, search]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
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
            className="lg:w-60 p-4 lg:border-r border-slate-200/70"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1, type: "spring", stiffness: 400 }}
          >
            <div className="hidden lg:block">
              <motion.h3 
                className="font-medium text-slate-800 mb-3 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2, delay: 0.15 }}
              >
                <Filter className="h-4 w-4 mr-2 text-sky-600" />
                Filters
              </motion.h3>
              <motion.div 
                className="space-y-3"
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
                  <label className="flex items-center text-sm cursor-pointer text-slate-700">
                    <input type="checkbox" className="mr-2 accent-sky-500" defaultChecked />
                    <span>Articles</span>
                  </label>
                  <label className="flex items-center text-sm cursor-pointer text-slate-700">
                    <input type="checkbox" className="mr-2 accent-sky-500" defaultChecked />
                    <span>Blogs</span>
                  </label>
                  <label className="flex items-center text-sm cursor-pointer text-slate-700">
                    <input type="checkbox" className="mr-2 accent-sky-500" defaultChecked />
                    <span>Academic</span>
                  </label>
                </motion.div>
                
                <motion.div 
                  className="space-y-2 glass-card p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.25, type: "spring", stiffness: 400 }}
                  whileHover={{ y: -3, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <h4 className="text-sm text-slate-600 font-medium">Human Confidence</h4>
                  <label className="flex items-center text-sm cursor-pointer text-slate-700">
                    <input type="checkbox" className="mr-2 accent-sky-500" defaultChecked />
                    <span>High (90%+)</span>
                  </label>
                  <label className="flex items-center text-sm cursor-pointer text-slate-700">
                    <input type="checkbox" className="mr-2 accent-sky-500" defaultChecked />
                    <span>Medium (70%+)</span>
                  </label>
                  <label className="flex items-center text-sm cursor-pointer text-slate-700">
                    <input type="checkbox" className="mr-2 accent-sky-500" />
                    <span>Low (50%+)</span>
                  </label>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.button 
              className="lg:hidden flex items-center text-sm gap-2 glass rounded-lg p-2 w-full justify-center hover:shadow-md transition-shadow text-slate-700"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filter Results
            </motion.button>
          </motion.aside>

          <main className="flex-grow p-4">
            {query ? (
              <>
                <motion.div 
                  className="mb-4 text-slate-600"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  Found {data?.total || 0} results for <span className="font-medium text-slate-800">&quot;{query}&quot;</span>
                </motion.div>

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
                ) : data?.results && data.results.length > 0 ? (
                  <motion.div
                    className="space-y-4"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence>
                      {data.results.map((result, i) => (
                        <SearchResult 
                          key={result.id} 
                          result={result} 
                          delay={i * 0.05} 
                        />
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