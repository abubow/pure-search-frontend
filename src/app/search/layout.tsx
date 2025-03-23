import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search | PureSearch',
  description: 'Search for authentic, human-written content across the web with PureSearch. Filter out AI-generated content.',
  alternates: {
    canonical: '/search',
  },
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('Search PureSearch')}&description=${encodeURIComponent('Find authentic, human-written content')}`,
        width: 1200,
        height: 630,
        alt: 'PureSearch Search',
      },
    ],
  },
  twitter: {
    images: [`/api/og?title=${encodeURIComponent('Search PureSearch')}&description=${encodeURIComponent('Find authentic, human-written content')}`],
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 