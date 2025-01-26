import { client } from './fetchClient/fetchClient';
import { PeriodicData } from '../types/schemaTypes';

const periodicsService = {
  getUserPeriodics: () => client.get<PeriodicData[]>('/periodics'),
  getPeriodic: (id: string) => client.get<PeriodicData>(`/periodics/${id}`),
  createPeriodic: (periodicData: Partial<PeriodicData>) =>
    client.post<PeriodicData>('/periodics', periodicData),
  updatePeriodic: (periodicData: Partial<PeriodicData>, periodicId: string) =>
    client.patch<PeriodicData>(`/periodics/${periodicId}`, periodicData),
  deletePeriodic: (id: string) =>
    client.delete<PeriodicData>(`/periodics/${id}`),
};

export default periodicsService;
