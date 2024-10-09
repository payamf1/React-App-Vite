import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const AppointmentScheduler = () => {
  const [selectedType, setSelectedType] = useState('');

  const appointmentTypes = [
    {
      id: 'initial-consultation',
      title: 'Initial Consultation',
      duration: '30 minutes',
      description: 'An initial conversation to discuss your goals, objectives, and expectations for the project or business. It is an opportunity for all parties involved to get to know each other and establish a rapport that will set the foundation for future collaboration.'
    },
    {
      id: 'project-kickoff',
      title: 'Project Kick-off',
      duration: '1 hour and 30 minutes',
      description: 'A comprehensive meeting to officially start the project, align on project scope, timeline, and deliverables. We\'ll discuss project methodology, team roles, and establish communication channels.'
    },
    {
      id: 'weekly-standup',
      title: 'Weekly Standup',
      duration: '20 minutes',
      description: 'A focused check-in to discuss project progress, address any roadblocks, and align on next steps. Team members share updates on completed tasks, ongoing work, and any challenges requiring attention.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedType) {
      console.log('Selected appointment type:', selectedType);
      // Here you would typically proceed to the next step (e.g., date selection)
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Schedule an Appointment</CardTitle>
          <CardDescription>Select the type of appointment you'd like to schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              <div className="space-y-4">
                {appointmentTypes.map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={type.id} id={type.id} />
                    <Label htmlFor={type.id} className="flex-grow cursor-pointer">
                      <Card className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-semibold">{type.title}</h3>
                          <div className="flex items-center text-gray-500">
                            <Clock className="w-4 h-4 mr-1" />
                            {type.duration}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{type.description}</p>
                      </Card>
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <Button 
              type="submit" 
              className="w-full mt-6"
              disabled={!selectedType}
            >
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentScheduler;