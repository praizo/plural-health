import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Appointment, CreateAppointmentInput } from '@/lib/types/appointment';

const API_BASE = '/api';

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async (): Promise<Appointment[]> => {
      const response = await fetch(`${API_BASE}/appointments`);
      if (!response.ok) throw new Error('Failed to fetch appointments');
      return response.json();
    },
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (appointmentData: CreateAppointmentInput): Promise<Appointment> => {
      const response = await fetch(`${API_BASE}/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(appointmentData),
      });
      if (!response.ok) throw new Error('Failed to create appointment');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });
};