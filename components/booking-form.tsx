
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSafeLanguage } from '@/lib/safe-language-context';
import { Calendar as CalendarIcon, Clock, Check, AlertCircle, User, Scissors } from 'lucide-react';

const services = [
  { id: 'haircut', name: 'Haircut', duration: 45, price: 45 },
  { id: 'beard-shaping', name: 'Beard Shaping', duration: 30, price: 25 },
  { id: 'haircut-beard', name: 'Haircut + Beard Shaping', duration: 75, price: 65 },
  { id: 'hot-towel', name: 'Hot Towel & Grooming', duration: 45, price: 35 },
  { id: 'event-styling', name: 'Event Styling', duration: 60, price: 65 },
  { id: 'consultation', name: 'Look Consultation', duration: 30, price: 30 }
];

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00'
];

export function BookingForm() {
  const { t, currentLanguage } = useSafeLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [bookingData, setBookingData] = useState({
    service: '',
    date: null as Date | null,
    time: '',
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    notes: ''
  });

  const selectedService = services.find(s => s.id === bookingData.service);
  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today || date.getDay() === 0; // Disable past dates and Sundays
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...bookingData,
          service: selectedService?.name || bookingData.service,
          duration: selectedService?.duration || 60,
          language: currentLanguage
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show specific error message from the API
        setError(data.message || 'Failed to book appointment. Please try again.');
        // If time slot is taken, go back to step 3 to select another time
        if (data.error === 'TIME_SLOT_TAKEN') {
          setCurrentStep(3);
        }
        return;
      }

      setSubmitted(true);
    } catch (err) {
      setError('Error al procesar la reserva. Por favor, intenta nuevamente.');
      console.error('Booking error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return bookingData.service;
      case 2: return bookingData.date;
      case 3: return bookingData.time;
      case 4: return bookingData.clientName && bookingData.clientEmail;
      default: return false;
    }
  };

  if (submitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="text-center py-12">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment has been successfully booked. You'll receive a confirmation shortly.
          </p>
          <div className="bg-derly-beige-light rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-derly-brown mb-2">Appointment Details:</h3>
            <ul className="space-y-1 text-orange-800">
              <li><strong>Service:</strong> {selectedService?.name}</li>
              <li><strong>Date:</strong> {bookingData.date?.toLocaleDateString()}</li>
              <li><strong>Time:</strong> {bookingData.time}</li>
              <li><strong>Duration:</strong> {selectedService?.duration} minutes</li>
              <li><strong>Price:</strong> ${selectedService?.price}</li>
            </ul>
          </div>
          <Button onClick={() => {
            setSubmitted(false);
            setCurrentStep(1);
            setBookingData({
              service: '',
              date: null,
              time: '',
              clientName: '',
              clientEmail: '',
              clientPhone: '',
              notes: ''
            });
          }}>
            Book Another Appointment
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl font-bold text-gray-900 font-playfair">
          {t('bookingTitle')}
        </CardTitle>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((step) => (
              <div
                key={step}
                className={`w-3 h-3 rounded-full ${
                  currentStep >= step ? 'bg-derly-brown-dark' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-8">
        {error && (
          <div className="bg-red-50 border-2 border-red-400 text-red-800 px-6 py-4 rounded-lg mb-6 shadow-md">
            <div className="flex items-start">
              <AlertCircle className="w-6 h-6 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Horario No Disponible</h4>
                <p className="text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Select Service */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Scissors className="w-12 h-12 text-derly-brown-dark mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('selectService')}
              </h3>
              <p className="text-gray-600">Choose the service you'd like to book</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setBookingData(prev => ({ ...prev, service: service.id }))}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    bookingData.service === service.id
                      ? 'border-derly-brown-dark bg-derly-beige-light'
                      : 'border-gray-200 hover:border-derly-beige'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900">{service.name}</h4>
                    <span className="text-derly-brown-dark font-bold">${service.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{service.duration} minutes</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Date */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <CalendarIcon className="w-12 h-12 text-derly-brown-dark mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('selectDate')}
              </h3>
              <p className="text-gray-600">Pick your preferred date</p>
            </div>

            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={bookingData.date || undefined}
                onSelect={(date) => setBookingData(prev => ({ ...prev, date: date || null }))}
                disabled={isDateDisabled}
                className="rounded-md border shadow-md"
              />
            </div>

            {bookingData.date && (
              <div className="bg-derly-beige-light rounded-lg p-4 text-center">
                <p className="text-orange-800">
                  <strong>Selected:</strong> {bookingData.date.toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Select Time */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <Clock className="w-12 h-12 text-derly-brown-dark mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('selectTime')}
              </h3>
              <p className="text-gray-600">Choose your preferred time slot</p>
            </div>

            <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setBookingData(prev => ({ ...prev, time }))}
                  className={`p-3 rounded-lg border-2 text-center transition-all ${
                    bookingData.time === time
                      ? 'border-derly-brown-dark bg-derly-beige-light text-derly-brown'
                      : 'border-gray-200 hover:border-derly-beige'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>

            {bookingData.time && (
              <div className="bg-derly-beige-light rounded-lg p-4 text-center">
                <p className="text-orange-800">
                  <strong>Selected:</strong> {bookingData.time} 
                  {selectedService && ` (${selectedService.duration} minutes)`}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Client Information */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <User className="w-12 h-12 text-derly-brown-dark mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t('clientInfo')}
              </h3>
              <p className="text-gray-600">Tell us about yourself</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="clientName" className="text-sm font-medium text-gray-700 mb-2 block">
                  Full Name *
                </Label>
                <Input
                  id="clientName"
                  type="text"
                  required
                  value={bookingData.clientName}
                  onChange={(e) => setBookingData(prev => ({ ...prev, clientName: e.target.value }))}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <Label htmlFor="clientEmail" className="text-sm font-medium text-gray-700 mb-2 block">
                  Email Address *
                </Label>
                <Input
                  id="clientEmail"
                  type="email"
                  required
                  value={bookingData.clientEmail}
                  onChange={(e) => setBookingData(prev => ({ ...prev, clientEmail: e.target.value }))}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <Label htmlFor="clientPhone" className="text-sm font-medium text-gray-700 mb-2 block">
                  Phone Number
                </Label>
                <Input
                  id="clientPhone"
                  type="tel"
                  value={bookingData.clientPhone}
                  onChange={(e) => setBookingData(prev => ({ ...prev, clientPhone: e.target.value }))}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-gray-700 mb-2 block">
                  Special Requests or Notes
                </Label>
                <Textarea
                  id="notes"
                  value={bookingData.notes}
                  onChange={(e) => setBookingData(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any specific requests, hair concerns, or preferred language for communication..."
                  className="h-24"
                />
              </div>
            </div>

            {/* Booking Summary */}
            <div className="bg-gray-50 rounded-lg p-6 mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">Appointment Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Service:</span>
                  <span className="font-medium">{selectedService?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date:</span>
                  <span className="font-medium">{bookingData.date?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time:</span>
                  <span className="font-medium">{bookingData.time}</span>
                </div>
                <div className="flex justify-between">
                  <span>Duration:</span>
                  <span className="font-medium">{selectedService?.duration} minutes</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span className="text-derly-brown-dark">${selectedService?.price}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 1}
          >
            Back
          </Button>

          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="bg-derly-brown-dark hover:bg-derly-brown"
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="bg-derly-brown-dark hover:bg-derly-brown"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Booking...
                </div>
              ) : (
                t('confirmBooking')
              )}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
