
import { BlogPageClient } from '@/components/blog-page-client';
import { prisma } from '@/lib/db';

export const dynamic = "force-dynamic";

async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { published: true },
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
          select: { id: true }
        }
      },
      orderBy: [
        { featured: 'desc' },
        { publishedAt: 'desc' }
      ]
    });

    return posts.map(post => ({
      ...post,
      commentCount: post.comments?.length || 0,
      comments: undefined // Remove comments from response for performance
    }));
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return <BlogPageClient posts={posts} />;
}
