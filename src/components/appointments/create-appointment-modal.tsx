'use client';

import { useState } from 'react';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, getDay, set } from 'date-fns';
import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/services/patients';
import { Formik, Form, Field, ErrorMessage, FieldProps } from 'formik';
import * as Yup from 'yup';
import { useCreateAppointment } from '@/lib/hooks/use-appointments';
import toast from 'react-hot-toast';
import { CreateAppointmentInput, AppointmentType } from '@/lib/types/appointment';

interface CreateAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const validationSchema = Yup.object({
  patientId: Yup.string().required('Patient is required'),
  clinic: Yup.string().required('Clinic is required'),
  title: Yup.string().required('Appointment type is required'),
  scheduledTime: Yup.date().required('Date and time is required'),
});

const CLINICS = [
  "Accident and Emergency",
  "Neurology",
  "Cardiology",
  "Gastroenterology",
  "Renal"
];

const APPOINTMENT_TYPES: { label: string; value: AppointmentType }[] = [
  { label: 'New (Walk-in)', value: 'New' },
  { label: 'Follow-up', value: 'Follow-up' },
  { label: 'Emergency', value: 'Emergency' },
];

export function CreateAppointmentModal({ isOpen, onClose }: CreateAppointmentModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showPatientResults, setShowPatientResults] = useState(false);
  
  const createAppointmentMutation = useCreateAppointment();

  const { data: searchResults } = useQuery({
    queryKey: ['patients', 'search', searchQuery],
    queryFn: () => patientService.search(searchQuery),
    enabled: searchQuery.length > 2,
  });

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate),
  });

  const startDay = getDay(startOfMonth(currentDate));
  const emptyDays = Array(startDay).fill(null);

  const initialValues: CreateAppointmentInput = {
    patientId: '',
    clinic: '',
    title: '',
    scheduledTime: new Date(),
    appointmentType: 'New',
    doesNotRepeat: true,
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add new appointment"
      className="max-w-[600px]"
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting, resetForm }) => {
            createAppointmentMutation.mutate(values, {
                onSuccess: () => {
                    toast.success('Appointment created successfully');
                    onClose();
                    resetForm();
                    setSearchQuery('');
                },
                onError: (error) => {
                    console.error('Failed to create appointment:', error);
                    toast.error('Failed to create appointment');
                },
                onSettled: () => {
                    setSubmitting(false);
                }
            });
        }}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form className="space-y-6">
            {/* Patient Search */}
            <div className="relative">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Find patient"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowPatientResults(true);
                    if (e.target.value === '') {
                        setFieldValue('patientId', '');
                    }
                  }}
                  className={`w-full pl-10 pr-10 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0B0C7D] ${touched.patientId && errors.patientId ? 'border-red-500' : 'border-gray-200'}`}
                />
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Image src="/images/search.svg" alt="Search" width={20} height={20} className="text-gray-400" />
                </div>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                    <Image src="/images/filter.svg" alt="filter" width={20} height={20} />
                </div>
              </div>
              <ErrorMessage name="patientId" component="div" className="text-red-500 text-xs mt-1" />

              {/* Search Results Dropdown */}
              {showPatientResults && searchResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-100 z-10 max-h-60 overflow-y-auto">
                  {searchResults.map((patient) => (
                    <div
                      key={patient._id}
                      onClick={() => {
                        setFieldValue('patientId', patient._id);
                        setSearchQuery(`${patient.firstName} ${patient.lastName}`);
                        setShowPatientResults(false);
                      }}
                      className="px-4 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0"
                    >
                      <div className="font-medium text-[#051438]">{patient.firstName} {patient.lastName}</div>
                      <div className="text-xs text-gray-500">{patient.hospitalId}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-[#667085]">Clinic</span>
                <Field as="select" name="clinic" className="flex items-center gap-2 font-semibold text-[#051438] bg-transparent border-none focus:ring-0 text-right dir-rtl">
                    <option value="">Select Clinic</option>
                    {CLINICS.map(clinic => (
                        <option key={clinic} value={clinic}>{clinic}</option>
                    ))}
                </Field>
              </div>
              <ErrorMessage name="clinic" component="div" className="text-red-500 text-xs" />
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <span className="text-[#667085]">Title</span>
                <Field as="select" name="title" className="flex items-center gap-2 font-semibold text-[#051438] bg-transparent border-none focus:ring-0 text-right">
                    <option value="">Select Type</option>
                    {APPOINTMENT_TYPES.map(type => (
                        <option key={type.value} value={type.label}>{type.label}</option>
                    ))}
                </Field>
              </div>
              <ErrorMessage name="title" component="div" className="text-red-500 text-xs" />

              <div className="flex items-center justify-between py-3 bg-[#F5F6FA] -mx-8 px-8">
                <span className="text-[#667085]">Time</span>
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-[#051438]">{format(values.scheduledTime, 'd MMM yyyy')}</span>
                    <input
                        id="time-input"
                        type="time"
                        value={format(values.scheduledTime, 'HH:mm')}
                        onChange={(e) => {
                            if (!e.target.value) return;
                            const [hours, minutes] = e.target.value.split(':').map(Number);
                            const newDate = set(values.scheduledTime, { hours, minutes });
                            setFieldValue('scheduledTime', newDate);
                        }}
                        className="bg-transparent border-none focus:ring-0 p-0 font-semibold text-[#051438] cursor-pointer"
                    />
                </div>
              </div>
            </div>

            {/* Calendar */}
            <div className="bg-[#5B6587] rounded-xl p-6 text-white">
              <div className="flex items-center justify-between mb-6">
                <button type="button" className="p-1 hover:bg-white/10 rounded" title="Calendar options">
                  <Image src="/images/list.svg" alt="List" width={20} height={20} />
                </button>
                
                <div className="flex items-center gap-4">
                  <button type="button" onClick={() => setCurrentDate(subMonths(currentDate, 1))} title="Previous month">
                    <Image src="/images/chevron-left.svg" alt="Previous Month" width={20} height={20} />
                  </button>
                  <span className="font-semibold">{format(currentDate, 'MMMM yyyy')}</span>
                  <button type="button" onClick={() => setCurrentDate(addMonths(currentDate, 1))} title="Next month">
                    <Image src="/images/chevron-right.svg" alt="Next Month" width={20} height={20} />
                  </button>
                </div>

                <button 
                    type="button" 
                    className="p-1 hover:bg-white/10 rounded" 
                    title="Set time"
                    onClick={() => (document.getElementById('time-input') as HTMLInputElement)?.showPicker()}
                >
                  <Image src="/images/clock.svg" alt="Clock" width={20} height={20} />
                </button>
              </div>

              <div className="grid grid-cols-7 text-center text-xs mb-4 opacity-70">
                <div>S</div>
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div>S</div>
              </div>

              <div className="grid grid-cols-7 gap-y-4 text-center text-sm">
                {emptyDays.map((_, i) => <div key={`empty-${i}`} />)}
                {daysInMonth.map((day) => (
                  <button
                    key={day.toString()}
                    type="button"
                    onClick={() => {
                        // Preserve the time, just change the date
                        const newDate = set(day, { 
                            hours: values.scheduledTime.getHours(), 
                            minutes: values.scheduledTime.getMinutes() 
                        });
                        setFieldValue('scheduledTime', newDate);
                    }}
                    className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto transition-colors
                      ${isSameDay(day, values.scheduledTime) ? 'bg-[#8B95B5] text-white font-bold' : 'hover:bg-white/10'}
                      ${!isSameMonth(day, currentDate) ? 'opacity-30' : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <span className="text-[#667085] font-medium">Repeat</span>
                <Field name="doesNotRepeat">
                  {({ field, form }: FieldProps) => (
                    <select
                      {...field}
                      value={field.value ? 'true' : 'false'}
                      onChange={e => form.setFieldValue('doesNotRepeat', e.target.value === 'true')}
                      className="flex items-center gap-2 font-semibold text-[#051438] bg-transparent border-none focus:ring-0 text-right cursor-pointer"
                    >
                      <option value="true">Does not repeat</option>
                      <option value="false">Repeats</option>
                    </select>
                  )}
                </Field>
              </div>

              <div className="flex justify-end gap-4 pt-2">
                <Button 
                  type="button"
                  onClick={onClose}
                  variant="outline"
                  className="px-6 py-2.5 rounded-lg"
                >
                  Save & Close
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-lg"
                >
                  {isSubmitting ? 'Creating...' : 'Create Appointment'}
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
