import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CreatePatientInput, Patient } from '@/lib/types/patient';

const API_BASE = '/api';

export const usePatients = () => {
  return useQuery({
    queryKey: ['patients'],
    queryFn: async (): Promise<Patient[]> => {
      const response = await fetch(`${API_BASE}/patients`);
      if (!response.ok) throw new Error('Failed to fetch patients');
      return response.json();
    },
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: ['patient', id],
    queryFn: async (): Promise<Patient> => {
      const response = await fetch(`${API_BASE}/patients/${id}`);
      if (!response.ok) throw new Error('Failed to fetch patient');
      return response.json();
    },
    enabled: !!id,
  });
};

export const useCreatePatient = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (patientData: CreatePatientInput): Promise<Patient> => {
      const response = await fetch(`${API_BASE}/patients`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patientData),
      });
      if (!response.ok) throw new Error('Failed to create patient');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] });
    },
  });
};

export const useSearchPatients = (query: string) => {
  return useQuery({
    queryKey: ['patients', 'search', query],
    queryFn: async (): Promise<Patient[]> => {
      const response = await fetch(`${API_BASE}/patients/search?q=${encodeURIComponent(query)}`);
      if (!response.ok) throw new Error('Failed to search patients');
      return response.json();
    },
    enabled: query.length > 2,
  });
};