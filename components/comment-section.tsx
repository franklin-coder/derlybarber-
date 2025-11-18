
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { useSafeLanguage } from '@/lib/safe-language-context';
import { MessageCircle, Send, User, Calendar, Check, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

interface Comment {
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
}

interface CommentSectionProps {
  postId: string;
  comments: Comment[];
}

export function CommentSection({ postId, comments }: CommentSectionProps) {
  const { t, currentLanguage } = useSafeLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    author: '',
    email: '',
    website: '',
    content: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          postId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      setSubmitted(true);
      setFormData({
        author: '',
        email: '',
        website: '',
        content: ''
      });
    } catch (err) {
      setError('Failed to submit comment. Please try again.');
      console.error('Comment submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString(currentLanguage, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCommenterName = (comment: Comment) => {
    if (comment.user?.name) return comment.user.name;
    if (comment.user?.firstName || comment.user?.lastName) {
      return `${comment.user.firstName || ''} ${comment.user.lastName || ''}`.trim();
    }
    return comment.author;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Comments Header */}
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-6 h-6 text-derly-brown-dark" />
          <h3 className="text-2xl font-bold text-gray-900 font-playfair">
            {t('comments')} ({comments?.length || 0})
          </h3>
        </div>

        {/* Existing Comments */}
        <div className="space-y-6 mb-12">
          {comments && comments.length > 0 ? (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white shadow-sm border-l-4 border-l-derly-beige-light">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-derly-beige rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-derly-brown-dark" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {getCommenterName(comment)}
                          </h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {formatDate(comment.createdAt)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center text-green-600">
                        <Check className="w-4 h-4 mr-1" />
                        <span className="text-xs font-medium">Approved</span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {comment.content}
                    </p>

                    {comment.website && (
                      <div className="mt-3">
                        <a 
                          href={comment.website.startsWith('http') ? comment.website : `https://${comment.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-derly-brown-dark hover:text-derly-brown transition-colors"
                        >
                          Visit website
                        </a>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-12 bg-white rounded-lg shadow-sm"
            >
              <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-600 mb-2">No comments yet</h4>
              <p className="text-gray-500">Be the first to share your thoughts!</p>
            </motion.div>
          )}
        </div>

        {/* Comment Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="bg-white shadow-md">
            <CardContent className="p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6 font-playfair">
                {t('leaveComment')}
              </h3>

              {submitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-derly-beige rounded-full flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-derly-brown-dark" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Comment Submitted!</h4>
                  <p className="text-gray-600 mb-4">
                    Thank you for your comment. It's now pending moderation and will appear once approved.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline">
                    Leave Another Comment
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="author" className="text-sm font-medium text-gray-700 mb-2 block">
                        {t('yourName')} *
                      </Label>
                      <Input
                        id="author"
                        name="author"
                        type="text"
                        required
                        value={formData.author}
                        onChange={handleInputChange}
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
                        {t('yourEmail')} *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-sm font-medium text-gray-700 mb-2 block">
                      {t('yourWebsite')}
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleInputChange}
                      placeholder="https://yourwebsite.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content" className="text-sm font-medium text-gray-700 mb-2 block">
                      Your Comment *
                    </Label>
                    <Textarea
                      id="content"
                      name="content"
                      required
                      value={formData.content}
                      onChange={handleInputChange}
                      className="h-32 resize-none"
                      placeholder="Share your thoughts, questions, or experiences..."
                    />
                  </div>

                  <div className="bg-derly-beige-light rounded-lg p-4">
                    <p className="text-sm text-orange-800">
                      <strong>Note:</strong> Comments are moderated and will be reviewed before appearing on the site. 
                      Please keep discussions respectful and relevant to the topic.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-derly-brown-dark hover:bg-derly-brown text-white py-3"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Submitting...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        {t('postComment')}
                      </div>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
