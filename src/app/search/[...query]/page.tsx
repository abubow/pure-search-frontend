import { Metadata } from 'next';
import { SearchPage } from '../../../components/SearchPage';

type Props = {
  params: { query: string[] };
  searchParams: { [key: string]: string | string[] | undefined };
};

export function generateMetadata({ params, searchParams }: Props): Metadata {
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
      images: [`/api/og?search=true&q=${encodeURIComponent(query)}&title=${encodeURIComponent('Search Results')}&description=${encodeURIComponent(`Results for "${query}"`)}`,]
    },
  };
}

export default function QuerySearchPage({ params, searchParams }: Props) {
  const query = params.query.join('/') || searchParams.q as string || '';
  return <SearchPage initialQuery={query} />;
} 