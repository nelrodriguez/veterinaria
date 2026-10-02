export type ScreenType = 'login' | 'portal-clientes' | 'panel-veterinario';

export interface Pet {
  id: string;
  name: string;
  species: 'Canino' | 'Felino';
  breed: string;
  age: string;
  weight: string;
  status: string;
  temp: string;
  heartRate: string;
  bodyCondition: string;
  nextVaccineOrCheckup: string;
  nextDate: string;
  imageUrl: string;
}

export interface Appointment {
  id: string;
  petName: string;
  service: string;
  doctorName: string;
  doctorSpecialty: string;
  dateStr: string;
  dayNumber: string;
  monthStr: string;
  timeStr: string;
  duration: string;
  location: string;
  status: 'Confirmada' | 'En Espera' | 'En Consulta' | 'Finalizado' | 'Urgente';
  notes?: string;
  instructions?: string;
}

export interface Doctor {
  id: string;
  name: string;
  initials?: string;
  specialty: string;
  rating: string;
  price: string;
  usdPrice: string;
  box: string;
  avatarUrl?: string;
}
