import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Get query parameters
    const title = searchParams.get('title') || 'PureSearch';
    const description = searchParams.get('description') || 'Find authentic, human-written content';
    const isSearch = searchParams.get('search') === 'true';
    const query = searchParams.get('q') || '';
    
    // Use title or query for page title
    const pageTitle = isSearch && query 
      ? `Search results for "${query}"`
      : title;
    
    // Font
    const fontData = await fetch(
      new URL('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap', request.url)
    ).then((res) => res.arrayBuffer());
    
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8fafc', // slate-50
            background: 'linear-gradient(to bottom right, #f8fafc, #f1f5f9)',
            position: 'relative',
            padding: '50px',
          }}
        >
          {/* Radial gradient background */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.2) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(14, 165, 233, 0.2) 0%, transparent 40%)',
              zIndex: 1,
            }}
          />
          
          {/* Logo */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              top: '40px',
              left: '40px',
              zIndex: 10,
            }}
          >
            <div style={{
              background: 'linear-gradient(to right, #0ea5e9, #38bdf8)',
              padding: '12px',
              borderRadius: '12px',
              marginRight: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '32px',
              color: '#1e293b', // slate-800
            }}>
              Pure<span style={{
                background: 'linear-gradient(to right, #0ea5e9, #38bdf8)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}>Search</span>
            </p>
          </div>
          
          {/* Content */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '80%',
            zIndex: 10,
          }}>
            <h1 style={{
              fontFamily: 'Inter',
              fontWeight: 700,
              fontSize: '64px',
              color: '#1e293b', // slate-800
              marginBottom: '20px',
              textAlign: 'center',
              maxWidth: '90%',
            }}>
              {pageTitle}
            </h1>
            <p style={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '32px',
              color: '#475569', // slate-600
              maxWidth: '80%',
              textAlign: 'center',
            }}>
              {description}
            </p>
          </div>
          
          {/* Footer */}
          <div style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}>
            <p style={{
              fontFamily: 'Inter',
              fontWeight: 400,
              fontSize: '24px',
              color: '#64748b', // slate-500
            }}>
              puresearch.example.com
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 400,
          },
          {
            name: 'Inter',
            data: fontData,
            style: 'normal',
            weight: 700,
          },
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
} 