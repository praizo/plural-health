export type AppointmentStatus = 
  | 'Processing'
  | 'Not arrived'
  | 'Awaiting vitals'
  | 'Awaiting doctor'
  | 'Admitted to ward'
  | 'Transferred to A&E'
  | 'Seen doctor';

export type AppointmentType = 'New' | 'Follow-up' | 'Emergency';

export interface Appointment {
  _id: string;
  patientId: string;
  patient?: {
    firstName: string;
    lastName: string;
    hospitalId: string;
    gender: string;
    age: string;
  };
  clinic: string;
  title: string;
  scheduledTime: Date;
  appointmentType: AppointmentType;
  status: AppointmentStatus;
  amount: number;
  doesNotRepeat: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateAppointmentInput {
  patientId: string;
  clinic: string;
  title: string;
  scheduledTime: Date;
  appointmentType: AppointmentType;
  doesNotRepeat: boolean;
}