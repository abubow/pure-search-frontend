// API client for communicating with the PureSearch backend

// Base URL for API requests
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// Common fetch options for all requests
const fetchOptions = {
  credentials: 'same-origin' as RequestCredentials,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

/**
 * Search for human-written content
 * @param query The search query
 * @param page Page number (default: 1)
 * @param perPage Results per page (default: 10)
 * @returns Search results
 */
export const searchContent = async (
  query: string,
  page: number = 1,
  perPage: number = 10
) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`,
      fetchOptions
    );
    
    if (!response.ok) {
      throw new Error(`Search request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Search API error:', error);
    throw error;
  }
};

/**
 * Classify content as human-written or AI-generated
 * @param text The text content to classify
 * @param url Optional URL of the content
 * @returns Classification results
 */
export const classifyContent = async (text: string, url?: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/classify`, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify({ text, url }),
    });
    
    if (!response.ok) {
      throw new Error(`Classification request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Classification API error:', error);
    throw error;
  }
};

/**
 * Submit content for indexing
 * @param url The URL of the content
 * @param title The title of the content
 * @param description A brief description of the content
 * @param content The full text content
 * @returns Indexing results
 */
export const indexContent = async (
  url: string,
  title: string,
  description: string,
  content: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/index`, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify({ url, title, description, content }),
    });
    
    if (!response.ok) {
      throw new Error(`Indexing request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Indexing API error:', error);
    throw error;
  }
};

/**
 * Submit a URL for crawling
 * @param url The URL to crawl
 * @param depth The crawl depth (1-3)
 * @returns Crawling results
 */
export const crawlUrl = async (url: string, depth: number = 1) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crawl`, {
      method: 'POST',
      ...fetchOptions,
      body: JSON.stringify({ url, depth }),
    });
    
    if (!response.ok) {
      throw new Error(`Crawl request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Crawl API error:', error);
    throw error;
  }
};

/**
 * Check the status of a crawl job
 * @param id The crawl job ID
 * @returns Crawl status
 */
export const getCrawlStatus = async (id: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/crawl/status/${id}`, fetchOptions);
    
    if (!response.ok) {
      throw new Error(`Crawl status request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Crawl status API error:', error);
    throw error;
  }
}; 