import { Appointment, CreateAppointmentInput } from '@/lib/types/appointment';

const API_BASE = '/api';

export const appointmentService = {
  getAll: async (): Promise<Appointment[]> => {
    const response = await fetch(`${API_BASE}/appointments`);
    if (!response.ok) throw new Error('Failed to fetch appointments');
    return response.json();
  },

  create: async (data: CreateAppointmentInput): Promise<Appointment> => {
    const response = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to create appointment');
    return response.json();
  }
};
