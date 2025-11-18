
import { NextResponse } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://derly-barbershop.com';
  
  const robots = `User-agent: *
Allow: /

# High priority pages
Allow: /
Allow: /booking
Allow: /contact
Allow: /blog

# Disallow admin and API routes
Disallow: /api/
Disallow: /admin/
Disallow: /auth/

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
