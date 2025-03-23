'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import SearchResult from './SearchResult';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react';
import Script from 'next/script';

// Mock search results data (in a real app, this would come from an API)
const MOCK_RESULTS = [
  {
    id: '1',
    title: 'The History of Classical Music - Authentic Analysis',
    url: 'https://example.com/classical-music-history',
    description: 'An in-depth exploration of classical music through the ages, with authentic analysis from leading music historians.',
    confidence: 95,
  },
  {
    id: '2',
    title: 'Traditional Cooking Methods from Around the World',
    url: 'https://example.com/traditional-cooking-methods',
    description: 'Explore authentic cooking techniques passed down through generations across different cultures and regions.',
    confidence: 88,
  },
  {
    id: '3',
    title: 'Personal Travel Journal: Exploring Remote Villages in Asia',
    url: 'https://example.com/travel-asia-villages',
    description: 'A personal account of travels through remote villages in Southeast Asia, with first-hand observations and cultural insights.',
    confidence: 92,
  },
  {
    id: '4',
    title: 'Handcrafted Furniture: Techniques and Materials',
    url: 'https://example.com/handcrafted-furniture',
    description: 'Learn about traditional woodworking techniques and materials used in creating handcrafted furniture.',
    confidence: 76,
  },
  {
    id: '5',
    title: 'Local Wildlife Conservation Efforts in the Amazon',
    url: 'https://example.com/amazon-conservation',
    description: 'Documenting local efforts to preserve biodiversity in the Amazon rainforest, with reports from field researchers.',
    confidence: 85,
  },
  {
    id: '6',
    title: 'Historical Weather Patterns and Climate Change',
    url: 'https://example.com/historical-weather-patterns',
    description: 'Analysis of historical weather data and how it relates to current climate change patterns.',
    confidence: 68,
  },
  {
    id: '7',
    title: 'Family Recipes: Mediterranean Cuisine',
    url: 'https://example.com/mediterranean-family-recipes',
    description: 'Collection of authentic family recipes from the Mediterranean region, passed down through generations.',
    confidence: 93,
  }
];

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
  const [results, setResults] = useState<typeof MOCK_RESULTS>([]);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Simulate API call with a short delay
    setLoading(true);
    const timer = setTimeout(() => {
      // In a real app, this would be an API call with the query
      setResults(MOCK_RESULTS);
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [query]);

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
              "itemListElement": results.map((result, index) => ({
                "@type": "ListItem",
                "position": index + 1,
                "url": result.url,
                "name": result.title,
                "description": result.description
              }))
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
              transition={{ duration: 0.1, type: "spring", stiffness: 500 }}
              aria-label="Show filters"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Show Filters
            </motion.button>
          </motion.aside>
          
          <motion.main 
            className="flex-1 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.15 }}
          >
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  className="flex justify-center items-center py-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  aria-live="polite"
                  aria-busy="true"
                >
                  <motion.div 
                    className="rounded-full h-10 w-10 border-4 border-sky-200 border-b-sky-600"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="sr-only">Loading search results</span>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.25, type: "spring", stiffness: 400 }}
                >
                  <motion.div 
                    className="mb-6 flex items-center justify-between"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  >
                    <div>
                      <motion.p 
                        className="text-sm text-slate-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: 0.15, type: "spring", stiffness: 400 }}
                      >
                        About {results.length} results for{" "}
                        <motion.span 
                          className="gradient-text font-medium"
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
                          &quot;{query}&quot;
                        </motion.span>
                      </motion.p>
                      <motion.p 
                        className="text-xs text-slate-500 mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2, delay: 0.2 }}
                      >
                        Showing only content that appears to be non-AI generated
                      </motion.p>
                    </div>
                  </motion.div>

                  <motion.div 
                    className="space-y-3"
                    variants={listVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {results.map((result, index) => (
                      <motion.div
                        key={result.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: 0.1 + (index * 0.05), type: "spring", stiffness: 400 }}
                      >
                        <SearchResult
                          title={result.title}
                          url={result.url}
                          description={result.description}
                          confidence={result.confidence}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  {results.length > 0 && (
                    <motion.div 
                      className="mt-8 flex justify-center"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: 0.3, type: "spring", stiffness: 400 }}
                    >
                      <motion.nav 
                        className="inline-flex items-center gap-1 glass rounded-lg p-1 shadow-md" 
                        aria-label="Pagination"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 500, damping: 17, duration: 0.15 }}
                      >
                        <motion.span 
                          className="px-3 py-2 text-sm font-medium gradient-text bg-white/50 rounded-md shadow-sm"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 500, duration: 0.1 }}
                          aria-current="page"
                        >
                          1
                        </motion.span>
                        {[2, 3, 4, 5].map(page => (
                          <motion.a 
                            key={page}
                            href="#" 
                            className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm"
                            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 500, duration: 0.1 }}
                            aria-label={`Go to page ${page}`}
                          >
                            {page}
                          </motion.a>
                        ))}
                        <motion.a 
                          href="#" 
                          className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm flex items-center"
                          whileHover={{ scale: 1.05, x: 3, backgroundColor: "rgba(255, 255, 255, 0.5)" }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: "spring", stiffness: 500, duration: 0.1 }}
                          aria-label="Go to next page"
                        >
                          Next <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                        </motion.a>
                      </motion.nav>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>
      </div>

      <motion.footer 
        className="mt-auto py-4 glass border-t border-sky-100"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© 2024 PureSearch - Finding authentic, non-AI generated content</p>
        </div>
      </motion.footer>
    </div>
  );
} 