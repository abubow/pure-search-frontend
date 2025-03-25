import { useState, useCallback } from 'react';
import { searchContent } from '@/lib/api';

// Define types for search results
export interface SearchResult {
  id: string;
  title: string;
  url: string;
  description: string;
  confidence: number;
}

export interface SearchResponse {
  query: string;
  results: SearchResult[];
  total: number;
  page: number;
  perPage: number;
}

/**
 * Custom hook for searching content
 */
export const useSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<SearchResponse | null>(null);

  const search = useCallback(async (
    query: string,
    page: number = 1,
    perPage: number = 10
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await searchContent(query, page, perPage);
      setData(results);
      return results;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    search,
    isLoading,
    error,
    data,
  };
};

export default useSearch; 