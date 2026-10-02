import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LoginScreen } from './components/LoginScreen';
import { ClientPortal } from './components/ClientPortal';
import { VetDashboard } from './components/VetDashboard';
import { BookingModal } from './components/BookingModal';
import { Toast } from './components/Toast';
import { ScreenType, Appointment } from './types';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('portal-clientes');
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [presetPetName, setPresetPetName] = useState<string>('Milo');
  const [presetReason, setPresetReason] = useState<string>('Medicina General / Control Preventivo');
  const [toast, setToast] = useState<{ title: string; message: string } | null>(null);

  // Initial appointment matching Image 3
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 'appt-initial-milo',
      petName: 'Milo',
      service: 'Vacunación Sextuple',
      doctorName: 'Dra. Jenkins',
      doctorSpecialty: 'Especialista en Medicina Preventiva Canina',
      dateStr: '12 de Noviembre, 2024',
      dayNumber: '12',
      monthStr: 'NOV',
      timeStr: '10:30 AM',
      duration: '30 min',
      location: 'Sede Norte • Box 3',
      status: 'Confirmada',
      instructions:
        'Por favor traer a Milo con collar y correa. Ayuno líquido de al menos 1 hora antes de la inmunización.',
    },
  ]);

  const showToast = (title: string, message: string) => {
    setToast({ title, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const handleOpenBookingModal = (petName?: string, reason?: string) => {
    if (petName) setPresetPetName(petName);
    if (reason) setPresetReason(reason);
    setIsBookingOpen(true);
  };

  const handleBookingConfirmed = (newAppt: Appointment) => {
    setAppointments((prev) => [newAppt, ...prev]);
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7faf8] text-[#181c1b] flex flex-col font-sans selection:bg-[#a9eed4] selection:text-[#003629]">
      {/* Global Top Navbar */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={(screen) => setCurrentScreen(screen)}
      />

      {/* Screen Views */}
      <div className="flex-1 w-full">
        {currentScreen === 'login' && (
          <LoginScreen
            onLoginSuccess={(screen) => setCurrentScreen(screen)}
            showToast={showToast}
          />
        )}

        {currentScreen === 'portal-clientes' && (
          <ClientPortal
            onOpenBookingModal={handleOpenBookingModal}
            appointments={appointments}
            onCancelAppointment={handleCancelAppointment}
            showToast={showToast}
          />
        )}

        {currentScreen === 'panel-veterinario' && (
          <VetDashboard
            onOpenNewAppointment={() => handleOpenBookingModal('Milo', 'Consulta Veterinaria')}
            showToast={showToast}
          />
        )}
      </div>

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onBookingConfirmed={handleBookingConfirmed}
        presetPetName={presetPetName}
        presetReason={presetReason}
        showToast={showToast}
      />

      {/* Micro-Notification Toast */}
      <Toast toast={toast} onDismiss={() => setToast(null)} />

      {/* Quick Prototype Navigation Dock (Bottom bar for instant switching) */}
      <aside 
        aria-label="Barra de Navegación del Prototipo"
        className="fixed bottom-3 left-1/2 -translate-x-1/2 z-40 bg-[#003629]/95 text-white backdrop-blur-md px-3 py-2 rounded-2xl shadow-2xl border border-[#256956] flex items-center gap-1.5 sm:gap-3 text-xs"
      >
        <span className="hidden sm:inline-flex items-center gap-1 text-[#a9eed4] font-bold uppercase tracking-wider text-[10px] pl-1">
          <span className="material-symbols-outlined text-[14px]">visibility</span>
          Pantallas:
        </span>

        <button
          type="button"
          onClick={() => setCurrentScreen('login')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
            currentScreen === 'login'
              ? 'bg-[#a9eed4] text-[#003629]'
              : 'hover:bg-white/10 text-white/90'
          }`}
        >
          1. Login
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('portal-clientes')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
            currentScreen === 'portal-clientes'
              ? 'bg-[#a9eed4] text-[#003629]'
              : 'hover:bg-white/10 text-white/90'
          }`}
        >
          2. Portal Clientes
        </button>

        <button
          type="button"
          onClick={() => handleOpenBookingModal()}
          className="px-2.5 py-1 rounded-lg font-bold hover:bg-white/10 text-white/90 transition-all flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[14px]">event</span>
          <span>Modal Agendar</span>
        </button>

        <button
          type="button"
          onClick={() => setCurrentScreen('panel-veterinario')}
          className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
            currentScreen === 'panel-veterinario'
              ? 'bg-[#a9eed4] text-[#003629]'
              : 'hover:bg-white/10 text-white/90'
          }`}
        >
          3. Panel Veterinario
        </button>
      </aside>
    </div>
  );
}
