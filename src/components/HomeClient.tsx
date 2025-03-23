'use client';

import SearchBar from "./SearchBar";
import { Search, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";
import Script from "next/script";

export default function HomeClient() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      {/* Add JSON-LD structured data */}
      <Script
        id="schema-webpage"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "PureSearch",
            url: process.env.NEXT_PUBLIC_BASE_URL || "https://puresearch.example.com",
            potentialAction: {
              "@type": "SearchAction",
              target: {
                "@type": "EntryPoint",
                urlTemplate: (process.env.NEXT_PUBLIC_BASE_URL || "https://puresearch.example.com") + "/search?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            },
            description: "Discover authentic, human-written content across the web with PureSearch. Filter out AI-generated content and find reliable information.",
            publisher: {
              "@type": "Organization",
              name: "PureSearch",
              logo: {
                "@type": "ImageObject",
                url: (process.env.NEXT_PUBLIC_BASE_URL || "https://puresearch.example.com") + "/logo.png"
              }
            }
          })
        }}
      />

      <main className="w-full max-w-3xl px-4 mt-24">
        <div className="flex flex-col items-center justify-center">
          <motion.div 
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <motion.div 
                className="absolute -inset-1 rounded-full blur-md gradient-primary opacity-70"
                animate={{ 
                  opacity: [0.5, 0.7, 0.5],
                  scale: [0.98, 1.02, 0.98]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 3,
                  ease: "easeInOut"
                }}
              ></motion.div>
              <motion.div 
                className="relative p-2 rounded-full shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="h-8 w-8 gradient-text" />
              </motion.div>
            </div>
            <h1 className="text-5xl font-bold text-slate-800">
              Pure<motion.span 
                className="gradient-text"
                animate={{ 
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{ backgroundSize: "200% 200%" }}
              >Search</motion.span>
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-slate-700 mb-8 text-center max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Find authentic, non-AI generated content across the web
            <motion.span 
              className="inline-flex items-center ml-2"
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Sparkles className="h-4 w-4 text-amber-500" />
            </motion.span>
          </motion.p>
          
          <motion.div 
            className="w-full relative flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.div 
              className="absolute -inset-0.5 rounded-full search-bar-gradient blur-md"
              animate={{ 
                opacity: [0.6, 0.8, 0.6],
                scale: [0.99, 1.01, 0.99]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 3,
                ease: "easeInOut"
              }}
            ></motion.div>
            <SearchBar />
          </motion.div>
          
          <motion.div 
            className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <FeatureCard 
              title="Human Content" 
              description="Find authentic content created by humans, not AI"
              icon={<Sparkles className="h-5 w-5 text-amber-500" />}
              delay={0}
            />
            <FeatureCard 
              title="Fast Search" 
              description="Get quick results from across the web"
              icon={<Search className="h-5 w-5 text-sky-500" />}
              delay={0.1}
            />
            <FeatureCard 
              title="Reliable" 
              description="Content verification you can trust"
              icon={<Shield className="h-5 w-5 text-emerald-500" />}
              delay={0.2}
            />
          </motion.div>
        </div>
      </main>

      <motion.footer 
        className="mt-auto w-full py-4 text-center glass border-t border-sky-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <p className="text-slate-700 text-sm">© 2024 PureSearch - Find authentic content</p>
        <p className="mt-1 text-slate-500 text-sm">Helping you discover non-AI generated content</p>
      </motion.footer>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay?: number;
};

function FeatureCard({ title, description, icon, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div 
      className="glass-card p-4 transition-all relative overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + delay }}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)"
      }}
    >
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-sky-50/10 to-cyan-50/10 z-0"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            whileHover={{ rotate: 10 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            {icon}
          </motion.div>
          <h3 className="font-medium text-slate-800">{title}</h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </motion.div>
  );
} 