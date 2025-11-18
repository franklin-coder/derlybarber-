
import { BlogPostPageClient } from '@/components/blog-post-page-client';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export const dynamic = "force-dynamic";

async function getBlogPost(slug: string) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug, published: true },
      include: {
        author: {
          select: {
            name: true,
            firstName: true,
            lastName: true
          }
        },
        comments: {
          where: { approved: true },
          orderBy: { createdAt: 'desc' },
          include: {
            user: {
              select: {
                name: true,
                firstName: true,
                lastName: true
              }
            }
          }
        }
      }
    });

    return post;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageClient post={post} />;
}
