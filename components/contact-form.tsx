
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSafeLanguage } from '@/lib/safe-language-context';
import { Send, Check, AlertCircle } from 'lucide-react';

export function ContactForm() {
  const { t, currentLanguage } = useSafeLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
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
      // Send message via API (automatically sends email)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          language: currentLanguage
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || 'Failed to send message');
      }

      // Show success even if email wasn't sent (message saved to database)
      if (!data.emailSent) {
        console.warn('Email not sent:', data.emailMessage);
      }

      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to send message';
      setError(errorMsg);
      console.error('Contact form error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">¡Mensaje Enviado!</h3>
        <p className="text-gray-600 mb-6">
          Tu mensaje ha sido enviado exitosamente. Recibirás una respuesta lo antes posible.
        </p>
        <Button onClick={() => setSubmitted(false)} variant="outline">
          Enviar Otro Mensaje
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('name')} *
          </Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            value={formData.name}
            onChange={handleInputChange}
            className="w-full"
            placeholder="Your full name"
          />
        </div>
        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('email')} *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            value={formData.email}
            onChange={handleInputChange}
            className="w-full"
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('phone')}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full"
            placeholder="+1 (555) 123-4567"
          />
        </div>
        <div>
          <Label htmlFor="subject" className="text-sm font-medium text-gray-700 mb-2 block">
            {t('subject')}
          </Label>
          <Input
            id="subject"
            name="subject"
            type="text"
            value={formData.subject}
            onChange={handleInputChange}
            className="w-full"
            placeholder="Appointment booking, question, etc."
          />
        </div>
      </div>

      <div>
        <Label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2 block">
          {t('message')} *
        </Label>
        <Textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleInputChange}
          className="w-full h-32 resize-none"
          placeholder="Tell me about your hair goals, preferred appointment times, or any questions you have..."
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-derly-brown-dark hover:bg-derly-brown text-white py-3"
      >
        {isSubmitting ? (
          <div className="flex items-center">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
            Sending...
          </div>
        ) : (
          <div className="flex items-center">
            <Send className="w-4 h-4 mr-2" />
            {t('send')}
          </div>
        )}
      </Button>

      <p className="text-sm text-gray-500 text-center">
        Tu mensaje será enviado directamente a Derly y recibirás una respuesta pronto.
      </p>
    </form>
  );
}
