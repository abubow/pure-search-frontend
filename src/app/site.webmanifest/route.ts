import { NextResponse } from 'next/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://puresearch.example.com';

export async function GET() {
  return NextResponse.json(
    {
      name: 'PureSearch',
      short_name: 'PureSearch',
      description: 'Find authentic, human-written content',
      start_url: '/',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: '#0ea5e9',
      icons: [
        {
          src: '/api/favicon',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any maskable'
        },
        {
          src: '/api/favicon',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ],
      related_applications: [],
      shortcuts: [
        {
          name: 'Search',
          short_name: 'Search',
          description: 'Start a new search',
          url: '/search',
          icons: [{ src: '/api/favicon', sizes: '192x192' }]
        }
      ],
      categories: ['search', 'utilities', 'productivity'],
      screenshots: [
        {
          src: `${baseUrl}/api/og?title=${encodeURIComponent('PureSearch Home')}&description=${encodeURIComponent('Search home page')}`,
          type: 'image/png',
          sizes: '1200x630',
          form_factor: 'wide'
        },
        {
          src: `${baseUrl}/api/og?title=${encodeURIComponent('PureSearch Results')}&description=${encodeURIComponent('Search results')}&search=true`,
          type: 'image/png',
          sizes: '1200x630',
          form_factor: 'wide'
        }
      ],
      orientation: 'portrait-primary',
      prefer_related_applications: false,
      scope: '/',
      id: '/'
    },
    {
      status: 200,
      headers: {
        'Content-Type': 'application/manifest+json',
        'Cache-Control': 'public, max-age=3600'
      }
    }
  );
} 