'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ArrowLeft } from 'lucide-react';
import CrawlerForm from '@/components/CrawlerForm';
import Link from 'next/link';

export default function CrawlerPage() {
  return (
    <div className="min-h-screen bg-white">
      <motion.header 
        className="glass sticky top-0 z-10 border-b border-sky-100"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 20, duration: 0.2 }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.15, type: "spring", stiffness: 500 }}
          >
            <Link 
              href="/" 
              className="group text-2xl font-bold text-slate-800 mr-6 flex items-center gap-1"
              aria-label="Return to PureSearch home page"
            >
              <motion.div 
                className="gradient-primary p-1 rounded-lg mr-1 shadow-md"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 500, damping: 10 }}
              >
                <Globe className="h-5 w-5 text-white" />
              </motion.div>
              Pure
              <motion.span 
                className="gradient-text font-bold"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >
                Search
              </motion.span>
            </Link>
          </motion.div>
          <div className="flex-grow">
            <Link href="/" className="text-slate-600 hover:text-slate-800 transition flex items-center">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Search
            </Link>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <h1 className="text-3xl font-bold text-center mb-2 gradient-text">
            Website Crawler
          </h1>
          <p className="text-slate-600 text-center mb-8">
            Submit a website URL to be crawled and indexed for searching
          </p>
          
          <CrawlerForm />
          
          <div className="mt-8 glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-slate-800 mb-4">
              How Crawling Works
            </h3>
            <div className="space-y-3 text-slate-600">
              <p>
                When you submit a URL, our crawler will:
              </p>
              <ol className="list-decimal pl-5 space-y-2">
                <li>Visit the provided URL and extract content</li>
                <li>Analyze the content to determine if it's human-written</li>
                <li>Index high-quality content for search</li>
                <li>Follow links to other pages (based on crawl depth)</li>
              </ol>
              <p className="text-sm bg-blue-50 p-3 rounded-md mt-4">
                Please only submit URLs that you own or have permission to crawl. Respect robots.txt rules and website terms of service.
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
} 