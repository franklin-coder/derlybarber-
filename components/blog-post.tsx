
"use client";

import { useSafeLanguage } from '@/lib/safe-language-context';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Share2, ArrowLeft, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface BlogPostProps {
  post: {
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
  };
}

export function BlogPost({ post }: BlogPostProps) {
  const { currentLanguage } = useSafeLanguage();

  const getLocalizedContent = (content: any) => {
    if (!content || typeof content !== 'object') return content;
    return content[currentLanguage] || content.en || content.es || Object.values(content)[0] || '';
  };

  const getAuthorName = (author: any) => {
    if (author?.name) return author.name;
    if (author?.firstName || author?.lastName) {
      return `${author.firstName || ''} ${author.lastName || ''}`.trim();
    }
    return 'Derly Cruz';
  };

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString(currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getLocalizedContent(post.title),
          text: 'Check out this article from Derly Barbería Latina',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const content = getLocalizedContent(post.content);
  const paragraphs = content.split('\n').filter((p: string) => p.trim());

  return (
    <article className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link href="/blog">
            <Button variant="ghost" className="gap-2 text-derly-brown-dark hover:text-derly-brown hover:bg-derly-beige-light p-0">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </motion.div>

        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          {post.featured && (
            <Badge className="mb-4 bg-derly-brown-dark text-white">
              Featured Article
            </Badge>
          )}
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight font-playfair">
            {getLocalizedContent(post.title)}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
            <div className="flex items-center">
              <User className="w-5 h-5 mr-2 text-derly-brown-dark" />
              <span className="font-medium">{getAuthorName(post.author)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-derly-brown-dark" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-derly-brown-dark" />
              <span>5 min read</span>
            </div>
            <Button
              onClick={handleShare}
              variant="outline"
              size="sm"
              className="gap-2 border-derly-beige text-derly-brown-dark hover:bg-derly-beige-light"
            >
              <Share2 className="w-4 h-4" />
              Share
            </Button>
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-12"
          >
            <div className="aspect-video relative rounded-xl overflow-hidden shadow-xl">
              <Image
                src={post.image}
                alt={getLocalizedContent(post.title)}
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        )}

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="prose prose-lg max-w-none prose-headings:font-playfair prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-strong:text-gray-900 prose-a:text-derly-brown-dark prose-a:no-underline hover:prose-a:underline"
        >
          {paragraphs.map((paragraph: string, index: number) => {
            // Handle headings
            if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
              const heading = paragraph.replace(/\*\*/g, '');
              return (
                <h3 key={index} className="text-2xl font-bold text-gray-900 mt-8 mb-4 font-playfair">
                  {heading}
                </h3>
              );
            }
            
            // Handle regular paragraphs
            return (
              <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
                {paragraph.split('**').map((part, i) => 
                  i % 2 === 0 ? part : <strong key={i} className="text-gray-900 font-semibold">{part}</strong>
                )}
              </p>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 p-8 bg-gradient-to-br from-derly-beige-light to-derly-beige rounded-2xl text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-4 font-playfair">
            Ready for Professional Grooming?
          </h3>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Experience the difference of professional barbering with Latin warmth. 
            Book your appointment today and get personalized advice for your hair goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking">
              <Button className="bg-derly-brown-dark hover:bg-derly-brown text-white px-8 py-3">
                Book Appointment
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-derly-brown-dark text-derly-brown-dark hover:bg-derly-beige-light px-8 py-3">
                Ask a Question
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </article>
  );
}
