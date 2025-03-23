import { Suspense } from 'react';
import { SearchPage } from '../../components/SearchPage';

export default function SearchResults() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading search results...</div>}>
      <SearchPage />
    </Suspense>
  );
} 