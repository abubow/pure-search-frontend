'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import SearchBar from '../../components/SearchBar';
import SearchResult from '../../components/SearchResult';
import { ArrowLeft, Filter, Search, SlidersHorizontal } from 'lucide-react';

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

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
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
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-white">
      <header className="glass sticky top-0 z-10 border-b border-sky-100">
        <div className="container mx-auto px-4 py-3 flex items-center">
          <Link 
            href="/" 
            className="group text-2xl font-bold text-slate-800 mr-6 flex items-center gap-1"
          >
            <div className="gradient-primary p-1 rounded-lg mr-1 shadow-md">
              <Search className="h-5 w-5 text-white" />
            </div>
            Pure<span className="gradient-text font-bold">Search</span>
          </Link>
          <div className="flex-grow">
            <SearchBar initialQuery={query} compact={true} />
          </div>
        </div>
      </header>

      <div className="container mx-auto">
        <div className="lg:flex">
          <aside className="lg:w-60 p-4 lg:border-r border-slate-200/70">
            <div className="hidden lg:block">
              <h3 className="font-medium text-slate-800 mb-3 flex items-center">
                <Filter className="h-4 w-4 mr-2 text-sky-600" />
                Filters
              </h3>
              <div className="space-y-3">
                <div className="space-y-2 glass-card p-3">
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
                </div>
                
                <div className="space-y-2 glass-card p-3">
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
                </div>
              </div>
            </div>
            
            <button className="lg:hidden flex items-center text-sm gap-2 glass rounded-lg p-2 w-full justify-center hover:shadow-md transition-shadow text-slate-700">
              <SlidersHorizontal className="h-4 w-4" />
              Show Filters
            </button>
          </aside>
          
          <main className="flex-1 px-4 py-6">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sky-600"></div>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-700">
                      About {results.length} results for <span className="gradient-text font-medium">"{query}"</span>
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Showing only content that appears to be non-AI generated
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {results.map((result) => (
                    <SearchResult
                      key={result.id}
                      title={result.title}
                      url={result.url}
                      description={result.description}
                      confidence={result.confidence}
                    />
                  ))}
                </div>

                {results.length > 0 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="inline-flex items-center gap-1 glass rounded-lg p-1 shadow-md" aria-label="Pagination">
                      <span className="px-3 py-2 text-sm font-medium gradient-text bg-white/50 rounded-md shadow-sm">1</span>
                      <a href="#" className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm">2</a>
                      <a href="#" className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm">3</a>
                      <a href="#" className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm">4</a>
                      <a href="#" className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm">5</a>
                      <a href="#" className="px-3 py-2 text-sm text-slate-700 hover:bg-white/50 rounded-md transition-all hover:shadow-sm flex items-center">
                        Next <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                      </a>
                    </nav>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>

      <footer className="mt-auto py-4 glass border-t border-sky-100">
        <div className="container mx-auto px-4 text-center text-slate-600 text-sm">
          <p>© 2024 PureSearch - Finding authentic, non-AI generated content</p>
        </div>
      </footer>
    </div>
  );
} 