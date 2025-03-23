'use client';

import SearchBar from "../components/SearchBar";
import { Search, Sparkles, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <main className="w-full max-w-3xl px-4 mt-24">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute -inset-1 rounded-full blur-md gradient-primary opacity-70"></div>
              <div className="relative p-2 rounded-full shadow-lg">
                <Search className="h-8 w-8 gradient-text" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-slate-800">
              Pure<span className="gradient-text">Search</span>
            </h1>
          </div>
          
          <p className="text-slate-700 mb-8 text-center max-w-md">
            Find authentic, non-AI generated content across the web
            <span className="inline-flex items-center ml-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
            </span>
          </p>
          
          <div className="w-full relative flex justify-center">
            <div className="absolute -inset-0.5 rounded-full search-bar-gradient blur-md"></div>
              <SearchBar />
          </div>
          
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-xl mx-auto">
            <FeatureCard 
              title="Human Content" 
              description="Find authentic content created by humans, not AI"
              icon={<Sparkles className="h-5 w-5 text-amber-500" />}
            />
            <FeatureCard 
              title="Fast Search" 
              description="Get quick results from across the web"
              icon={<Search className="h-5 w-5 text-sky-500" />}
            />
            <FeatureCard 
              title="Reliable" 
              description="Content verification you can trust"
              icon={<Shield className="h-5 w-5 text-emerald-500" />}
            />
          </div>
        </div>
      </main>

      <footer className="mt-auto w-full py-4 text-center glass border-t border-sky-100">
        <p className="text-slate-700 text-sm">© 2024 PureSearch - Find authentic content</p>
        <p className="mt-1 text-slate-500 text-sm">Helping you discover non-AI generated content</p>
      </footer>
    </div>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

function FeatureCard({ title, description, icon }: FeatureCardProps) {
  return (
    <div className="glass-card p-4 transition-all hover:shadow-xl relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-50/10 to-cyan-50/10 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          {icon}
          <h3 className="font-medium text-slate-800">{title}</h3>
        </div>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </div>
  );
}
