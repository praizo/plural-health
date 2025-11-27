'use client';

import { useState } from 'react';
import { Header } from '@/components/dashboard/header';
import { AppointmentList } from '@/components/dashboard/appointment-list';
import { SearchBar } from '@/components/ui/search-bar';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { AddPatientModal } from '@/components/patients/add-patient-modal';
import { CreateAppointmentModal } from '@/components/appointments/create-appointment-modal';

export default function DashboardPage() {
  const [isAddPatientOpen, setIsAddPatientOpen] = useState(false);
  const [isCreateAppointmentOpen, setIsCreateAppointmentOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <SearchBar  />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => setIsAddPatientOpen(true)}>
            Add new patient
            <Image src="/images/plus-circle.svg" alt="Add Icon" width={20} height={20} />
          </Button>

          <Button onClick={() => setIsCreateAppointmentOpen(true)}>
            Create appointment
            <Image src="/images/hospital-appointment.svg" alt="Calendar Icon" width={20} height={20} />
          </Button>
        </div>

        {/* Appointment List */}
        <AppointmentList />

        {/* Modals */}
        <AddPatientModal 
          isOpen={isAddPatientOpen} 
          onClose={() => setIsAddPatientOpen(false)} 
        />
        <CreateAppointmentModal 
          isOpen={isCreateAppointmentOpen} 
          onClose={() => setIsCreateAppointmentOpen(false)} 
        />
      </main>
    </div>
  );
}
