import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { format } from 'date-fns';

const AppointmentUserDetails = ({ appointmentType, selectedDate, selectedTime, onBack }) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Get form data
    const formData = new FormData(e.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      notes: formData.get('notes'),
      appointment: {
        type: appointmentType.title,
        date: selectedDate,
        time: selectedTime,
        duration: appointmentType.duration
      }
    };

    try {
      // Simulate API call
      console.log('Submitting appointment:', userData);
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      
      // Here you would typically make an API call to save the appointment
      // await saveAppointment(userData);
      
      alert('Appointment scheduled successfully!');
    } catch (error) {
      console.error('Error scheduling appointment:', error);
      alert('There was an error scheduling your appointment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack} disabled={isSubmitting}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Your Details</CardTitle>
              <CardDescription>Please provide your information to complete the booking</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6 p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Appointment Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-gray-500" />
                {format(selectedDate, 'MMMM d, yyyy')}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                {selectedTime}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Type:</span> {appointmentType.title}
              </div>
              <div className="col-span-2">
                <span className="font-medium">Duration:</span> {appointmentType.duration}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" name="name" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input id="email" name="email" type="email" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input id="phone" name="phone" type="tel" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" name="company" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea 
                id="notes" 
                name="notes" 
                placeholder="Any specific topics you'd like to discuss or additional information we should know?"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentUserDetails;