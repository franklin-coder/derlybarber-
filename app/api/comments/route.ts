
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { author, email, website, content, postId } = body

    if (!author || !email || !content || !postId) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Verify the post exists
    const post = await prisma.blogPost.findUnique({
      where: { id: postId }
    })

    if (!post) {
      return NextResponse.json(
        { message: 'Blog post not found' },
        { status: 404 }
      )
    }

    // Create comment (requires approval by default)
    const comment = await prisma.comment.create({
      data: {
        author,
        email,
        website: website || null,
        content,
        postId,
        approved: false // Comments require moderation
      }
    })

    return NextResponse.json(
      { message: 'Comment submitted successfully. It will appear after approval.', id: comment.id },
      { status: 201 }
    )
  } catch (error) {
    console.error('Comment submission error:', error)
    return NextResponse.json(
      { message: 'Failed to submit comment' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const comments = await prisma.comment.findMany({
      where: { approved: true },
      include: {
        post: {
          select: {
            title: true,
            slug: true
          }
        },
        user: {
          select: {
            name: true,
            firstName: true,
            lastName: true
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })

    return NextResponse.json(comments)
  } catch (error) {
    console.error('Error fetching comments:', error)
    return NextResponse.json(
      { message: 'Failed to fetch comments' },
      { status: 500 }
    )
  }
}
