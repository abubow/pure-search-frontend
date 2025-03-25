import { useState, useCallback } from 'react';
import { classifyContent } from '@/lib/api';

// Define types for classification results
export interface ClassificationAnalysis {
  length: number;
  complexity: number;
  patternsDetected: boolean;
  language?: string;
}

export interface ClassificationResult {
  isHuman: boolean;
  confidence: number;
  analysis: ClassificationAnalysis;
}

export interface ClassificationResponse {
  result: ClassificationResult;
  textSample: string;
  url?: string;
}

/**
 * Custom hook for classifying content
 */
export const useClassifier = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<ClassificationResponse | null>(null);

  const classify = useCallback(async (text: string, url?: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const results = await classifyContent(text, url);
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
    classify,
    isLoading,
    error,
    data,
  };
};

export default useClassifier; 