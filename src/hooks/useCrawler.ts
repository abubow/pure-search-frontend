import { useState, useCallback } from 'react';
import { crawlUrl, getCrawlStatus } from '../lib/api';

export interface CrawlStatus {
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  message?: string;
  crawled_pages?: number;
  total_pages?: number;
}

export interface CrawlResponse {
  request_id: string;
  status: CrawlStatus;
}

export const useCrawler = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [crawlResponse, setCrawlResponse] = useState<CrawlResponse | null>(null);
  const [statusResponse, setStatusResponse] = useState<CrawlStatus | null>(null);
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);

  const submitUrl = useCallback(async (url: string, depth: number = 1) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await crawlUrl(url, depth);
      setCrawlResponse(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const checkStatus = useCallback(async (requestId: string) => {
    setIsCheckingStatus(true);
    setError(null);
    
    try {
      const response = await getCrawlStatus(requestId);
      setStatusResponse(response);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      return null;
    } finally {
      setIsCheckingStatus(false);
    }
  }, []);

  return {
    submitUrl,
    checkStatus,
    isLoading,
    isCheckingStatus,
    error,
    crawlResponse,
    statusResponse
  };
};

export default useCrawler; 