
"use client";

import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { BlogPost } from '@/components/blog-post';
import { CommentSection } from '@/components/comment-section';

interface BlogPostData {
  id: string;
  title: any;
  content: any;
  image: string | null;
  featured: boolean;
  publishedAt: Date | null;
  author: {
    name: string | null;
    firstName: string | null;
    lastName: string | null;
  };
  comments: Array<{
    id: string;
    content: string;
    author: string;
    email: string;
    website?: string | null;
    approved: boolean;
    createdAt: Date;
    user?: {
      name: string | null;
      firstName: string | null;
      lastName: string | null;
    } | null;
  }>;
}

interface BlogPostPageClientProps {
  post: BlogPostData;
}

export function BlogPostPageClient({ post }: BlogPostPageClientProps) {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <main className="pt-16">
        <BlogPost post={post} />
        <CommentSection postId={post.id} comments={post.comments} />
      </main>
      <Footer />
    </div>
  );
}
