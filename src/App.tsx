import React, { useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'

import AppointmentScheduler from './components/AppointmentScheduler';
import AppointmentDateTimeSelector from './components/AppointmentDateTimeSelector';
import AppointmentUserDetails from './components/AppointmentUserDetails';

const AppointmentFlow = () => {
  const [step, setStep] = useState(1);
  const [appointmentType, setAppointmentType] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const handleTypeSelection = (type) => {
    setAppointmentType(type);
    setStep(2);
  };

  const handleDateTimeSelection = (date, time) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setStep(3);
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 1:
      return <AppointmentScheduler onContinue={handleTypeSelection} />;
    case 2:
      return (
        <AppointmentDateTimeSelector
          appointmentType={appointmentType}
          onBack={handleBack}
          onContinue={handleDateTimeSelection}
        />
      );
    case 3:
      return (
        <AppointmentUserDetails
          appointmentType={appointmentType}
          selectedDate={selectedDate}
          selectedTime={selectedTime}
          onBack={handleBack}
        />
      );
    default:
      return null;
  }
};

const App = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Sayen Solutions Appointment Scheduling</h1>
      <AppointmentFlow />
    </div>
  );
};

export default App;

/*
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR!!!
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
*/