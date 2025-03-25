# PureSearch Frontend

A Next.js-based frontend for PureSearch, a search engine focused on human-written content.

## Features

- **Search**: Find human-written content across the web
- **Content Classification**: Analyze text to determine if it was written by a human or AI
- **URL Crawling**: Submit URLs to be crawled and added to the search index
- **Dark/Light Mode**: Toggle between dark and light theme

## Technologies Used

- **Next.js**: React framework for the frontend
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **shadcn/ui**: Component library

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend services running (see backend README)

### Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Copy `.env.example` to `.env.local` and update the variables as needed:

```bash
cp .env.example .env.local
```

The most important environment variable is `NEXT_PUBLIC_API_URL`, which should point to your running backend API gateway.

5. Start the development server:

```bash
npm run dev
# or
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

- `NEXT_PUBLIC_API_URL`: URL of the backend API gateway (default: http://localhost:8080/api/v1)
- `NEXT_PUBLIC_ENABLE_CLASSIFICATION`: Enable content classification feature (true/false)
- `NEXT_PUBLIC_ENABLE_INDEXING`: Enable content indexing feature (true/false)
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NEXT_PUBLIC_APP_DESCRIPTION`: Application description
- `NEXT_PUBLIC_APP_URL`: Application URL

## Available Scripts

- `npm run dev`: Run development server
- `npm run build`: Build the production application
- `npm run start`: Start the production server
- `npm run lint`: Run ESLint
- `npm run format`: Format code with Prettier

## Project Structure

```
frontend/
├── public/          # Static assets
├── src/
│   ├── app/         # Next.js app router
│   ├── components/  # UI components
│   ├── hooks/       # React hooks
│   └── lib/         # Utility functions
├── .env.example     # Example environment variables
├── package.json     # Node.js dependencies
└── tailwind.config.js # Tailwind CSS configuration
```

## Backend Connection

The frontend communicates with the backend via RESTful API calls. The main API functions are defined in `src/lib/api.ts`:

- `searchContent`: Search for human-written content
- `classifyContent`: Classify text as human-written or AI-generated
- `indexContent`: Submit content for indexing
- `crawlUrl`: Submit a URL for crawling
- `getCrawlStatus`: Check the status of a crawl job

## Features Usage

### Search

The search functionality is available on the homepage. Simply enter a query in the search box and press Enter or click the search button.

### Content Classification

To classify content:

1. Navigate to the classification page
2. Enter or paste the text content
3. Click the "Classify" button
4. View the classification results

### URL Crawling

To submit a URL for crawling:

1. Navigate to the crawl page
2. Enter the URL to crawl
3. Select the crawl depth (1-3)
4. Click the "Crawl" button
5. Monitor the crawl status

## License

MIT
