import { Metadata } from 'next';
import { SearchPage } from '../../../components/SearchPage';

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

interface PageParams {
  query: string[];
}

export function generateMetadata({ 
  params, 
  searchParams 
}: { 
  params: PageParams;
  searchParams: SearchParams;
}): Metadata {
  const query = params.query.join('/') || searchParams.q as string || '';
  
  return {
    title: `Search results for "${query}" | PureSearch`,
    description: `View search results for "${query}" - Find authentic, human-written content related to ${query} with PureSearch.`,
    alternates: {
      canonical: `/search/${encodeURIComponent(query)}`,
    },
    openGraph: {
      images: [
        {
          url: `/api/og?search=true&q=${encodeURIComponent(query)}&title=${encodeURIComponent('Search Results')}&description=${encodeURIComponent(`Results for "${query}"`)}`,
          width: 1200,
          height: 630,
          alt: `PureSearch results for ${query}`,
        },
      ],
    },
    twitter: {
      images: [`/api/og?search=true&q=${encodeURIComponent(query)}&title=${encodeURIComponent('Search Results')}&description=${encodeURIComponent(`Results for "${query}"`)}`]
    },
  };
}

export default function QuerySearchPage({ 
  params,
  searchParams
}: {
  params: PageParams;
  searchParams: SearchParams;
}) {
  const query = params.query.join('/') || searchParams.q as string || '';
  return <SearchPage initialQuery={query} />;
} 