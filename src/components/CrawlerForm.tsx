import React, { useState } from 'react';
import useCrawler from '../hooks/useCrawler';
import { motion } from 'framer-motion';
import { Globe, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const CrawlerForm: React.FC = () => {
  const [url, setUrl] = useState('');
  const [depth, setDepth] = useState(1);
  const [requestId, setRequestId] = useState<string | null>(null);
  const { submitUrl, checkStatus, isLoading, isCheckingStatus, error, crawlResponse, statusResponse } = useCrawler();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    
    const response = await submitUrl(url, depth);
    if (response) {
      setRequestId(response.request_id);
    }
  };

  const handleCheckStatus = async () => {
    if (!requestId) return;
    await checkStatus(requestId);
  };

  const getStatusBadge = () => {
    if (!statusResponse) return null;
    
    const { status } = statusResponse;
    
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Pending
          </div>
        );
      case 'in_progress':
        return (
          <div className="flex items-center bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full text-sm">
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            In Progress {statusResponse.crawled_pages && statusResponse.total_pages ? 
              `(${statusResponse.crawled_pages}/${statusResponse.total_pages})` : ''}
          </div>
        );
      case 'completed':
        return (
          <div className="flex items-center bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
            <CheckCircle2 className="w-4 h-4 mr-2" />
            Completed {statusResponse.crawled_pages ? `(${statusResponse.crawled_pages} pages)` : ''}
          </div>
        );
      case 'failed':
        return (
          <div className="flex items-center bg-red-50 text-red-700 px-3 py-1 rounded-full text-sm">
            <AlertCircle className="w-4 h-4 mr-2" />
            Failed {statusResponse.message ? `- ${statusResponse.message}` : ''}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="glass-card p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-slate-800 mb-4 flex items-center">
        <Globe className="mr-2 text-sky-600" />
        Submit URL for Crawling
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="url" className="block text-sm font-medium text-slate-700 mb-1">
            Website URL
          </label>
          <input
            type="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
            required
          />
        </div>
        
        <div>
          <label htmlFor="depth" className="block text-sm font-medium text-slate-700 mb-1">
            Crawl Depth
          </label>
          <select
            id="depth"
            value={depth}
            onChange={(e) => setDepth(Number(e.target.value))}
            className="w-full px-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
          >
            <option value={1}>Shallow (1 level)</option>
            <option value={2}>Medium (2 levels)</option>
            <option value={3}>Deep (3 levels)</option>
          </select>
          <p className="mt-1 text-xs text-slate-500">
            Deeper crawls take longer but index more content
          </p>
        </div>
        
        <motion.button
          type="submit"
          className="w-full py-2 px-4 bg-gradient-to-r from-sky-500 to-cyan-500 text-white font-medium rounded-md shadow-md hover:shadow-lg flex justify-center items-center"
          whileHover={{ y: -2 }}
          whileTap={{ y: 1 }}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit URL for Crawling'
          )}
        </motion.button>
      </form>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          <AlertCircle className="inline-block w-4 h-4 mr-1" />
          {error.message}
        </div>
      )}
      
      {crawlResponse && (
        <div className="mt-4 p-4 bg-slate-50 rounded-md">
          <h4 className="font-medium text-slate-800 mb-2">Crawl Request Submitted</h4>
          <p className="text-sm text-slate-600 mb-2">
            Request ID: <span className="font-mono">{crawlResponse.request_id}</span>
          </p>
          
          <div className="flex justify-between items-center">
            {getStatusBadge()}
            
            <motion.button
              type="button"
              onClick={handleCheckStatus}
              className="py-1 px-3 bg-white border border-slate-300 text-slate-700 text-sm rounded-md shadow-sm flex items-center"
              whileHover={{ y: -1 }}
              whileTap={{ y: 1 }}
              disabled={isCheckingStatus}
            >
              {isCheckingStatus ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Checking...
                </>
              ) : (
                'Check Status'
              )}
            </motion.button>
          </div>
          
          {statusResponse?.message && (
            <p className="mt-2 text-sm text-slate-600">
              {statusResponse.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default CrawlerForm; 