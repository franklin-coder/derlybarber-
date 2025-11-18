
"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useSafeLanguage } from '@/lib/safe-language-context';
import { Calendar, User, MessageCircle, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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

interface BlogGridProps {
  posts: BlogPost[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  const { currentLanguage, t } = useSafeLanguage();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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

  const featuredPosts = posts.filter(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-3xl font-bold text-gray-900 mb-8 font-playfair"
            >
              Featured Stories
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredPosts.slice(0, 2).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-white overflow-hidden">
                      <div className="relative">
                        <div className="aspect-video relative bg-gradient-to-br from-derly-beige to-derly-beige-light">
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={getLocalizedContent(post.title)}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <Badge className="absolute top-4 left-4 bg-derly-brown-dark text-white">
                            Featured
                          </Badge>
                        </div>
                        
                        <CardContent className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-derly-brown-dark transition-colors leading-tight">
                            {getLocalizedContent(post.title)}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {getLocalizedContent(post.excerpt)}
                          </p>
                          
                          <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <User className="w-4 h-4 mr-1" />
                                {getAuthorName(post.author)}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(post.publishedAt)}
                              </div>
                            </div>
                            <div className="flex items-center">
                              <MessageCircle className="w-4 h-4 mr-1" />
                              {post.commentCount}
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl font-bold text-gray-900 mb-8 font-playfair"
            >
              Latest Posts
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-md bg-white overflow-hidden h-full">
                      <div className="relative">
                        <div className="aspect-video relative bg-gradient-to-br from-derly-beige to-derly-beige-light">
                          {post.image && (
                            <Image
                              src={post.image}
                              alt={getLocalizedContent(post.title)}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>
                        
                        <CardContent className="p-6 flex flex-col h-full">
                          <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-derly-brown-dark transition-colors leading-tight">
                            {getLocalizedContent(post.title)}
                          </h3>
                          
                          <p className="text-gray-600 mb-4 leading-relaxed text-sm flex-grow">
                            {getLocalizedContent(post.excerpt)}
                          </p>
                          
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {formatDate(post.publishedAt)}
                            </div>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                5 min read
                              </div>
                              <div className="flex items-center">
                                <MessageCircle className="w-3 h-3 mr-1" />
                                {post.commentCount}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* No Posts Message */}
        {posts.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 bg-derly-beige rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-derly-brown-dark" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Coming Soon</h3>
            <p className="text-gray-600">
              Derly is preparing amazing content for you. Check back soon for tips, stories, and professional advice!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
