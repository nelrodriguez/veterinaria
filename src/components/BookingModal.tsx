import React, { useState } from 'react';
import { Appointment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookingConfirmed: (newAppt: Appointment) => void;
  presetPetName?: string;
  presetReason?: string;
  showToast: (title: string, message: string) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onBookingConfirmed,
  presetPetName = 'Milo',
  presetReason = 'Medicina General / Control Preventivo',
  showToast,
}) => {
  const [selectedPet, setSelectedPet] = useState<'Milo' | 'Luna'>(
    presetPetName === 'Luna' ? 'Luna' : 'Milo'
  );
  const [modality, setModality] = useState<'presencial' | 'telemedicina'>('presencial');
  const [selectedDoctor, setSelectedDoctor] = useState<'jenkins' | 'silva'>('jenkins');
  const [selectedDay, setSelectedDay] = useState<{ dayName: string; dayNum: string; label: string }>({
    dayName: 'Mié',
    dayNum: '25',
    label: 'Miércoles 25 Oct',
  });
  const [selectedTime, setSelectedTime] = useState<string>('10:15 AM');
  const [notes, setNotes] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const doctorObj =
      selectedDoctor === 'jenkins'
        ? {
            name: 'Dra. Sofía Jenkins',
            specialty: 'Especialista en Medicina Preventiva Canina',
            box: 'Sede Norte • Box 02',
          }
        : {
            name: 'Dr. Andrés Silva',
            specialty: 'Cirugía & Traumatología',
            box: 'Sede Central • Box 05',
          };

    const newAppointment: Appointment = {
      id: `APPT-${Date.now()}`,
      petName: selectedPet,
      service: presetReason || 'Control Preventivo',
      doctorName: doctorObj.name,
      doctorSpecialty: doctorObj.specialty,
      dateStr: `${selectedDay.label}, 2024`,
      dayNumber: selectedDay.dayNum,
      monthStr: 'OCT',
      timeStr: selectedTime,
      duration: '30 min',
      location: doctorObj.box,
      status: 'Confirmada',
      notes: notes || undefined,
      instructions:
        selectedPet === 'Milo'
          ? 'Por favor traer con collar y correa. Ayuno líquido de al menos 1 hora.'
          : 'Traer en jaula transportadora cubierta con una toalla ligera.',
    };

    onBookingConfirmed(newAppointment);
    showToast(
      '¡Cita Agendada con Éxito!',
      `Reserva confirmada para ${selectedPet} el ${selectedDay.label} a las ${selectedTime} con ${doctorObj.name}.`
    );
    onClose();
  };

  const daysList = [
    { dayName: 'Lun', dayNum: '23', label: 'Lunes 23 Oct', cupos: '3 cupos' },
    { dayName: 'Mar', dayNum: '24', label: 'Martes 24 Oct', cupos: '2 cupos' },
    { dayName: 'Mié', dayNum: '25', label: 'Miércoles 25 Oct', cupos: '6 cupos' },
    { dayName: 'Jue', dayNum: '26', label: 'Jueves 26 Oct', cupos: '4 cupos' },
    { dayName: 'Vie', dayNum: '27', label: 'Viernes 27 Oct', cupos: '5 cupos' },
  ];

  const morningSlots = ['09:00 AM', '09:30 AM', '10:15 AM', '11:00 AM', '11:45 AM'];
  const afternoonSlots = ['03:00 PM', '03:30 PM', '04:15 PM', '05:00 PM', '05:30 PM', '06:15 PM'];

  const currentDoctorName = selectedDoctor === 'jenkins' ? 'Dra. Jenkins' : 'Dr. Silva';
  const currentBoxName = selectedDoctor === 'jenkins' ? 'Box 02' : 'Box 05';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#003629]/40 backdrop-blur-sm transition-opacity duration-200 overflow-y-auto">
      <div 
        className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-[#e0ebe3] flex flex-col relative my-auto max-h-[92vh] overflow-hidden animate-fade-in"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 border-b border-[#e0ebe3] bg-white relative">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-xs font-bold">
                  <span className="material-symbols-outlined text-[14px]">calendar_month</span>
                  Paso 2 de 3: Selección de Especialista y Horario
                </span>
                <span className="text-[#256956] text-xs font-semibold">
                  • Sala y Box Clínico
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#003629] tracking-tight">
                Agendar Nueva Cita
              </h2>
              <p className="text-xs sm:text-sm text-[#404945]">
                Selecciona la mascota, motivo de consulta y horario disponible.
              </p>
            </div>
            
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-full text-[#404945] hover:text-[#181c1b] hover:bg-[#ebefed] transition-colors"
              title="Cerrar ventana"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          {/* Stepper Horizontal */}
          <div className="grid grid-cols-4 gap-2 pt-4 mt-2">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#256956] text-white flex items-center justify-center text-xs font-bold shrink-0">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
              <span className="text-xs font-bold text-[#256956] hidden sm:block truncate">
                1. Mascota & Motivo
              </span>
              <div className="h-0.5 bg-[#256956] flex-1 mx-1 hidden md:block"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#1b4d3e] text-white flex items-center justify-center text-xs font-bold shrink-0 ring-2 ring-[#a9eed4] ring-offset-1">
                2
              </div>
              <span className="text-xs font-bold text-[#003629] hidden sm:block truncate">
                2. Especialista & Sede
              </span>
              <div className="h-0.5 bg-[#c0c9c3] flex-1 mx-1 hidden md:block"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ebefed] text-[#707974] flex items-center justify-center text-xs font-semibold shrink-0">
                3
              </div>
              <span className="text-xs text-[#707974] hidden sm:block truncate">
                3. Fecha & Turno
              </span>
              <div className="h-0.5 bg-[#c0c9c3] flex-1 mx-1 hidden md:block"></div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-[#ebefed] text-[#707974] flex items-center justify-center text-xs font-semibold shrink-0">
                4
              </div>
              <span className="text-xs text-[#707974] hidden sm:block truncate">
                4. Confirmación
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Selected Patient & Modality Box */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center p-3 rounded-xl bg-[#f1f4f2] border border-[#e0ebe3]">
            <div className="md:col-span-7 flex items-center gap-3">
              <img
                alt={selectedPet}
                className="w-12 h-12 rounded-lg object-cover border border-[#c0c9c3] shadow-xs shrink-0"
                src={
                  selectedPet === 'Milo'
                    ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHQlzAybb2O5qqQlW-wR7Pu9YkueWMMTCSRRH1xySCo_nxWxnTHl_me1L7ktY-L0-GV_O1XBxNrIcKKXyEWQdMq4HU3FMsULas145Yuzd2rXN6hRZ7YON7OhUZHA3L1itq03iHE-QSGjUFNya0VyQQf2olVHyr2Kq-07Pyhqwzx_3qeoYfsSVTKIUyuk5XrrgmBUepfL6jo17jxJ9gXnSfMw6pviKqyMFdGSJVUOyRQe7KRdwYx0'
                    : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAed3d4ihW7CJHfbhSeJO2ruF4BCWIlNyxUZ_uEAOFzDlNUcyIey47H6kLMC_eF3mw4uSOz9J1NIGnzg68er69U2rrfBxY_WQ1GXlJT1s7IinGuSxdyEJ0MOYq7bJQJvJ1zu975Bx0OGSiiUGUQoNrjdbMsojiZ2rDreynWD-HmEXL9r3slcvkenKtHEdcmueJ1Db_k2c-87Z_2CebDrdz6-MtWbaew83mcraS1iKNXsr4IMm3aajc'
                }
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#003629] text-base">{selectedPet}</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-[11px] font-bold">
                    {selectedPet === 'Milo' ? 'Canino • 3 años' : 'Felino • 2 años'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedPet(selectedPet === 'Milo' ? 'Luna' : 'Milo')}
                    className="text-[11px] text-[#256956] hover:underline font-bold"
                  >
                    Cambiar
                  </button>
                </div>
                <p className="text-xs text-[#404945] truncate">
                  Motivo:{' '}
                  <strong className="text-[#256956]">
                    {presetReason || 'Medicina General / Control Preventivo'}
                  </strong>
                </p>
              </div>
            </div>

            {/* Presencial vs Telemedicina switcher */}
            <div className="md:col-span-5 flex justify-end">
              <div className="inline-flex p-1 rounded-lg bg-white border border-[#c0c9c3] w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setModality('presencial')}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    modality === 'presencial'
                      ? 'bg-[#1b4d3e] text-white shadow-xs'
                      : 'text-[#404945] hover:text-[#003629]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">domain</span>
                  <span>Presencial (Central)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setModality('telemedicina')}
                  className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                    modality === 'telemedicina'
                      ? 'bg-[#1b4d3e] text-white shadow-xs'
                      : 'text-[#404945] hover:text-[#003629]'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">videocam</span>
                  <span>Telemedicina 24/7</span>
                </button>
              </div>
            </div>
          </div>

          {/* Veterinarian Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#003629] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#256956] text-[18px]">
                  stethoscope
                </span>
                <span>Selecciona el Médico Veterinario</span>
              </label>
              <span className="text-xs text-[#256956] font-semibold">
                Especialistas disponibles hoy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Doctor 1: Dra. Jenkins */}
              <div
                onClick={() => setSelectedDoctor('jenkins')}
                className={`relative cursor-pointer rounded-xl p-3 border-2 transition-all flex items-center justify-between group ${
                  selectedDoctor === 'jenkins'
                    ? 'border-[#003629] bg-[#acf0d7]/20 shadow-sm'
                    : 'border-[#e0ebe3] bg-white hover:border-[#256956]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img
                      alt="Dra. Sofía Jenkins"
                      className="w-12 h-12 rounded-full object-cover ring-2 ring-[#256956]"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhl9BUwsM5SJpgwo8fYoOSsJSk6sh-rIllB81mUQrWTZ0-ztYkGEW3C7UC5C2TvLhZJbuvobW5cNv9Ai_ej7T_aWNLq-dBkuMI7kxwY0uu-xxva1W0keT92j2E99no-0NzRlif96HjU7nRxcWxqLGzKY1ew_rUuL4aZThakGq-mXxvyl7SqdjqEaqOGKtNeyZyF6HvRxgbjW-aRAr1H21pMmUTj9yU6xDMUhZ6nEChNzrHA40Lazc"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#256956] rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-[#003629]">Dra. Sofía Jenkins</h4>
                      <span className="text-[11px] font-bold text-[#256956] bg-white px-1.5 py-0.5 rounded border border-[#a9eed4]">
                        ★ 4.9
                      </span>
                    </div>
                    <p className="text-xs text-[#404945]">Medicina Preventiva & Caninos</p>
                    <p className="text-xs font-semibold text-[#256956] mt-0.5">
                      $24.000 CLP <span className="text-[#707974] font-normal">($30 USD)</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    selectedDoctor === 'jenkins'
                      ? 'bg-[#003629] text-white shadow-xs'
                      : 'border border-[#c0c9c3] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                </div>
              </div>

              {/* Doctor 2: Dr. Andrés Silva */}
              <div
                onClick={() => setSelectedDoctor('silva')}
                className={`relative cursor-pointer rounded-xl p-3 border-2 transition-all flex items-center justify-between group ${
                  selectedDoctor === 'silva'
                    ? 'border-[#003629] bg-[#acf0d7]/20 shadow-sm'
                    : 'border-[#e0ebe3] bg-white hover:border-[#256956]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-[#a9eed4] text-[#003629] flex items-center justify-center font-bold text-base shadow-xs ring-1 ring-[#256956]">
                      AS
                    </div>
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-[#256956] rounded-full border-2 border-white"></span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-sm text-[#003629]">Dr. Andrés Silva</h4>
                      <span className="text-[11px] font-bold text-[#256956] bg-[#f1f4f2] px-1.5 py-0.5 rounded">
                        ★ 4.8
                      </span>
                    </div>
                    <p className="text-xs text-[#404945]">Cirugía & Traumatología</p>
                    <p className="text-xs font-semibold text-[#256956] mt-0.5">
                      $28.000 CLP <span className="text-[#707974] font-normal">($35 USD)</span>
                    </p>
                  </div>
                </div>

                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                    selectedDoctor === 'silva'
                      ? 'bg-[#003629] text-white shadow-xs'
                      : 'border border-[#c0c9c3] text-transparent'
                  }`}
                >
                  <span className="material-symbols-outlined text-[15px] font-bold">check</span>
                </div>
              </div>
            </div>
          </div>

          {/* Date & Time Slot Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-[#003629] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#256956] text-[18px]">
                  calendar_today
                </span>
                <span>Fecha & Horarios Disponibles</span>
              </label>
              <span className="text-xs text-[#707974]">Octubre 2024</span>
            </div>

            {/* Days row */}
            <div className="grid grid-cols-5 gap-2">
              {daysList.map((d) => {
                const isActive = selectedDay.dayNum === d.dayNum;
                return (
                  <button
                    key={d.dayNum}
                    type="button"
                    onClick={() => setSelectedDay(d)}
                    className={`p-2 sm:p-2.5 rounded-xl border text-center transition-all ${
                      isActive
                        ? 'border-2 border-[#003629] bg-[#1b4d3e] text-white shadow-sm'
                        : 'border-[#e0ebe3] bg-white hover:border-[#256956]'
                    }`}
                  >
                    <span
                      className={`block text-xs uppercase font-medium ${
                        isActive ? 'text-[#a9eed4]' : 'text-[#707974]'
                      }`}
                    >
                      {d.dayName}
                    </span>
                    <span
                      className={`block text-base sm:text-lg font-bold ${
                        isActive ? 'text-white' : 'text-[#003629]'
                      }`}
                    >
                      {d.dayNum}
                    </span>
                    <span
                      className={`block text-[10px] font-semibold ${
                        isActive ? 'text-[#acf0d7]' : 'text-[#256956]'
                      }`}
                    >
                      {d.cupos}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Morning slots */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-bold text-[#256956] tracking-wider">
                  Turno Mañana
                </span>
                <div className="h-px bg-[#e0ebe3] flex-1"></div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {morningSlots.map((time) => {
                  const isActive = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'border-2 border-[#003629] bg-[#1b4d3e] text-white shadow-sm'
                          : 'border border-[#e0ebe3] bg-white text-[#003629] hover:border-[#256956]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
                <button
                  type="button"
                  disabled
                  className="py-2 px-1 text-center rounded-lg text-xs font-medium bg-[#ebefed] text-[#707974] opacity-50 cursor-not-allowed"
                >
                  12:15 PM
                </button>
              </div>
            </div>

            {/* Afternoon slots */}
            <div className="space-y-1.5 pt-1">
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase font-bold text-[#256956] tracking-wider">
                  Turno Tarde
                </span>
                <div className="h-px bg-[#e0ebe3] flex-1"></div>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {afternoonSlots.map((time) => {
                  const isActive = selectedTime === time;
                  return (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-1 text-center rounded-lg text-xs font-semibold transition-all ${
                        isActive
                          ? 'border-2 border-[#003629] bg-[#1b4d3e] text-white shadow-sm'
                          : 'border border-[#e0ebe3] bg-white text-[#003629] hover:border-[#256956]'
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Observations / Notes */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#003629] block" htmlFor="bookingNotes">
              Motivo o síntomas observados <span className="font-normal text-[#707974]">(Opcional)</span>
            </label>
            <div className="relative">
              <textarea
                id="bookingNotes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe brevemente si tu mascota presenta decaimiento, dudas específicas o antecedentes..."
                className="w-full bg-[#f1f4f2] focus:bg-white rounded-xl p-3 text-xs sm:text-sm text-[#181c1b] border border-[#e0ebe3] focus:border-[#256956] focus:outline-none focus:ring-1 focus:ring-[#256956] transition-colors placeholder:text-[#707974]"
              />
              <span className="material-symbols-outlined text-[18px] text-[#707974] absolute right-3 bottom-3 pointer-events-none">
                edit_note
              </span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-[#f1f4f2] border-t border-[#e0ebe3] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <div className="w-10 h-10 rounded-lg bg-[#a9eed4] text-[#003629] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">event_available</span>
            </div>
            <div>
              <p className="text-[11px] uppercase text-[#256956] font-bold tracking-wider">
                Resumen de Turno
              </p>
              <p className="text-xs sm:text-sm font-bold text-[#003629]">
                {selectedDay.label} • {selectedTime} • {currentBoxName} con {currentDoctorName}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-lg border border-[#c0c9c3] bg-white text-[#181c1b] text-xs sm:text-sm font-semibold hover:bg-[#ebefed] transition-colors"
            >
              Cancelar / Volver
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-lg bg-[#1b4d3e] hover:bg-[#003629] text-white text-xs sm:text-sm font-semibold transition-all shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Confirmar y Agendar Cita</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
