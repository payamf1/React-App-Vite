import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Clock } from 'lucide-react';

// Configuration options (can be adjusted by developers)
const CONFIG = {
  advanceNoticeHours: 24,
  maxDaysInFuture: 30,
  availableTimeSlots: [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00'
  ]
};

const AppointmentDateTimeSelector = ({ appointmentType = null, onBack }) => {
  const [date, setDate] = useState(null);
  const [time, setTime] = useState('');

  const dateRange = useMemo(() => {
    const now = new Date();
    const minDate = new Date(now.getTime() + (CONFIG.advanceNoticeHours * 60 * 60 * 1000));
    const maxDate = new Date(now.setDate(now.getDate() + CONFIG.maxDaysInFuture));
    return { minDate, maxDate };
  }, []);

  const getAvailableTimeSlots = (selectedDate) => {
    if (!selectedDate) return [];
    
    const isToday = new Date().toDateString() === selectedDate.toDateString();
    const currentHour = new Date().getHours();
    
    return CONFIG.availableTimeSlots.filter(slot => {
      const slotHour = parseInt(slot.split(':')[0]);
      return !isToday || (slotHour > currentHour + CONFIG.advanceNoticeHours);
    });
  };

  const availableSlots = useMemo(() => getAvailableTimeSlots(date), [date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (date && time) {
      console.log('Selected date and time:', { date, time, appointmentType });
      // Here you would typically proceed to the next step
    }
  };

  if (!appointmentType) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">No appointment type selected.</p>
            <Button onClick={onBack} className="w-full mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <CardTitle>Select Date & Time</CardTitle>
              <CardDescription>Choose when you'd like to schedule your {appointmentType.title.toLowerCase()}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(date) => 
                    date < dateRange.minDate || 
                    date > dateRange.maxDate ||
                    date.getDay() === 0 ||
                    date.getDay() === 6
                  }
                  className="rounded-md border"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {date ? (
                      availableSlots.length > 0 ? (
                        availableSlots.map(slot => (
                          <SelectItem key={slot} value={slot}>
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2" />
                              {slot}
                            </div>
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-slots" disabled>
                          No available slots
                        </SelectItem>
                      )
                    ) : (
                      <SelectItem value="select-date" disabled>
                        Please select a date first
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">Appointment Summary</h4>
                  <p className="text-sm text-gray-600">Type: {appointmentType.title}</p>
                  <p className="text-sm text-gray-600">Duration: {appointmentType.duration}</p>
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={!date || !time}
            >
              Confirm Appointment
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentDateTimeSelector;