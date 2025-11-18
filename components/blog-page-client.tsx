
"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { BlogGrid } from '@/components/blog-grid';

interface BlogPost {
  id: string;
  title: any;
  slug: string;
  excerpt: any;
  image: string | null;
  featured: boolean;
  publishedAt: Date | null;
  author: {
    name: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  commentCount: number;
}

interface BlogPageClientProps {
  posts: BlogPost[];
}

export function BlogPageClient({ posts }: BlogPageClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-derly-brown-dark to-derly-brown text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-playfair">Tips & Stories</h1>
            <p className="text-xl text-derly-beige max-w-3xl mx-auto">
              Professional grooming tips, client transformations, and stories from the chair
            </p>
          </div>
        </section>

        <BlogGrid posts={posts} />
      </main>
      <Footer />
    </div>
  );
}
