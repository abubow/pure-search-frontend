import { Metadata } from "next";
import HomeClient from "../components/HomeClient";

export const metadata: Metadata = {
  title: "PureSearch - Find Human-Written, Non-AI Generated Content",
  description: "Discover authentic, human-written content across the web with PureSearch. Filter out AI-generated content and find reliable information.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent('PureSearch')}&description=${encodeURIComponent('Find authentic, human-written content')}`,
        width: 1200,
        height: 630,
        alt: 'PureSearch Home',
      },
    ],
  },
  twitter: {
    images: [`/api/og?title=${encodeURIComponent('PureSearch')}&description=${encodeURIComponent('Find authentic, human-written content')}`],
  },
};

export default function Home() {
  return <HomeClient />;
} 