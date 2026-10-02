import React, { useState } from 'react';
import { Appointment, Pet } from '../types';

interface ClientPortalProps {
  onOpenBookingModal: (petName?: string, reason?: string) => void;
  appointments: Appointment[];
  onCancelAppointment: (id: string) => void;
  showToast: (title: string, message: string) => void;
}

export const ClientPortal: React.FC<ClientPortalProps> = ({
  onOpenBookingModal,
  appointments,
  onCancelAppointment,
  showToast,
}) => {
  const [historyFilter, setHistoryFilter] = useState<'all' | 'milo' | 'luna'>('all');

  const pets: Pet[] = [
    {
      id: 'milo',
      name: 'Milo',
      species: 'Canino',
      breed: 'Golden Retriever • 3 años',
      age: '3 años',
      weight: '32.4 kg',
      status: 'Salud Estable',
      temp: '38.6 °C',
      heartRate: '88 bpm',
      bodyCondition: '5 / 9',
      nextVaccineOrCheckup: 'Próxima Vacuna: Sextuple Canina',
      nextDate: '12 de Noviembre, 2024',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDYHQlzAybb2O5qqQlW-wR7Pu9YkueWMMTCSRRH1xySCo_nxWxnTHl_me1L7ktY-L0-GV_O1XBxNrIcKKXyEWQdMq4HU3FMsULas145Yuzd2rXN6hRZ7YON7OhUZHA3L1itq03iHE-QSGjUFNya0VyQQf2olVHyr2Kq-07Pyhqwzx_3qeoYfsSVTKIUyuk5XrrgmBUepfL6jo17jxJ9gXnSfMw6pviKqyMFdGSJVUOyRQe7KRdwYx0',
    },
    {
      id: 'luna',
      name: 'Luna',
      species: 'Felino',
      breed: 'Gato Siamés • 2 años',
      age: '2 años',
      weight: '4.1 kg',
      status: 'Al día',
      temp: '38.2 °C',
      heartRate: '140 bpm',
      bodyCondition: '5 / 9',
      nextVaccineOrCheckup: 'Control anual al día',
      nextDate: 'Próxima revisión: Feb 2025',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAed3d4ihW7CJHfbhSeJO2ruF4BCWIlNyxUZ_uEAOFzDlNUcyIey47H6kLMC_eF3mw4uSOz9J1NIGnzg68er69U2rrfBxY_WQ1GXlJT1s7IinGuSxdyEJ0MOYq7bJQJvJ1zu975Bx0OGSiiUGUQoNrjdbMsojiZ2rDreynWD-HmEXL9r3slcvkenKtHEdcmueJ1Db_k2c-87Z_2CebDrdz6-MtWbaew83mcraS1iKNXsr4IMm3aajc',
    },
  ];

  const handleDownloadPdf = (fileName: string) => {
    showToast(
      'Descarga Iniciada',
      `Generando ${fileName} con firma y timbre digital de VetCura...`
    );
  };

  const handleCancelClick = (id: string, petName: string) => {
    if (confirm(`¿Estás seguro de cancelar la cita para ${petName}? Podrás reagendarla en cualquier momento.`)) {
      onCancelAppointment(id);
      showToast('Cita Cancelada', `El turno para ${petName} ha sido liberado exitosamente.`);
    }
  };

  return (
    <div className="w-full pt-16 min-h-[calc(100vh-4rem)] bg-[#f7faf8] px-4 md:px-6 py-6">
      <div className="relative w-full max-w-7xl mx-auto space-y-6">
        {/* Soft decorative background glows */}
        <div className="absolute -top-10 -right-10 w-96 h-96 rounded-full bg-[#acf0d7]/30 blur-3xl pointer-events-none -z-10" />
        <div className="absolute top-80 -left-10 w-80 h-80 rounded-full bg-[#baeed9]/20 blur-3xl pointer-events-none -z-10" />

        {/* Greeting Hero Banner */}
        <section className="relative w-full bg-white rounded-2xl shadow-xs border border-[#e0ebe3] p-6 md:p-8 overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#a9eed4] text-[#003629]">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span className="text-xs uppercase tracking-wider font-bold">Tutor Verificado</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#003629] tracking-tight">
                ¡Hola, Laura!
              </h1>
              <p className="text-sm md:text-base text-[#404945]">
                Bienvenida al portal de cuidado de tus mascotas en VetCura. Todo su historial clínico,
                esquemas de vacunación y próximas consultas en un solo espacio sereno y claro.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs sm:text-sm text-[#404945]">
                <span className="inline-flex items-center gap-1.5 font-semibold text-[#256956]">
                  <span className="w-2 h-2 rounded-full bg-[#256956]"></span> 2 Mascotas registradas
                </span>
                <span className="text-[#c0c9c3]">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#256956]">
                    calendar_today
                  </span>{' '}
                  {appointments.length} Cita próxima programada
                </span>
                <span className="text-[#c0c9c3]">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#256956]">security</span>{' '}
                  Libre de pulgas y garrapatas
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                type="button"
                onClick={() => onOpenBookingModal()}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
              >
                <span className="material-symbols-outlined text-[18px]">event_available</span>
                <span>Agendar Nueva Cita</span>
              </button>
              <a
                href="#historial-section"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f1f4f2] text-[#003629] hover:bg-[#ebefed] transition-colors text-sm font-bold"
              >
                <span className="material-symbols-outlined text-[18px]">folder_shared</span>
                <span>Ver Expedientes</span>
              </a>
            </div>
          </div>

          {/* Soft background silhouette SVG */}
          <div className="absolute right-0 bottom-0 pointer-events-none opacity-[0.05] text-[#003629]">
            <svg fill="none" height="200" viewBox="0 0 340 200" width="340">
              <circle cx="170" cy="180" fill="currentColor" r="140" />
              <circle cx="60" cy="80" fill="currentColor" r="40" />
              <circle cx="280" cy="90" fill="currentColor" r="50" />
            </svg>
          </div>
        </section>

        {/* Preventative health alert banner */}
        <section className="bg-[#acf0d7]/35 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#cbe6d9]">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#256956] shadow-2xs shrink-0">
              <span className="material-symbols-outlined text-[22px]">pest_control</span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#256956] font-bold block">
                Recordatorio Preventivo
              </span>
              <p className="text-xs sm:text-sm text-[#181c1b]">
                Próxima dosis de desparasitación interna para <strong>Milo</strong> en 8 días
                (NexGard Spectra). Reclámala en farmacia o solicita envío.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => showToast('Desparasitación', 'Solicitud de recambio enviada a Farmacia Central.')}
            className="px-3.5 py-1.5 rounded-lg bg-white text-[#256956] font-bold text-xs hover:bg-[#a9eed4] hover:text-[#003629] transition-colors shrink-0 shadow-2xs"
          >
            Pedir Recambio
          </button>
        </section>

        {/* Bento Grid: Mis Mascotas & Próximas Citas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Mis Mascotas (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#256956] text-[22px]">pets</span>
                <h2 className="text-xl font-bold text-[#003629]">Mis Mascotas</h2>
              </div>
              <button
                type="button"
                onClick={() => showToast('Registro Mascota', 'Abriendo formulario de registro de nueva mascota...')}
                className="inline-flex items-center gap-1 text-xs text-[#256956] hover:text-[#003629] font-bold transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">add_circle</span>
                <span>Registrar Mascota</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pets.map((pet) => (
                <article
                  key={pet.id}
                  className="bg-white rounded-2xl p-4 shadow-xs border border-[#e0ebe3] flex flex-col justify-between hover:shadow-md transition-shadow group"
                >
                  <div>
                    {/* Pet Image with status chips */}
                    <div className="relative w-full h-44 rounded-xl overflow-hidden mb-3 bg-[#ebefed]">
                      <img
                        src={pet.imageUrl}
                        alt={pet.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-xs text-[#003629] text-[11px] font-bold uppercase tracking-wider shadow-2xs">
                          {pet.species}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-[11px] font-bold">
                          {pet.status}
                        </span>
                      </div>
                    </div>

                    {/* Name & Weight */}
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-[#003629]">{pet.name}</h3>
                        <p className="text-xs text-[#404945]">{pet.breed}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-[#f1f4f2] text-[#256956] text-xs font-bold">
                        {pet.weight}
                      </span>
                    </div>

                    {/* Mini Vitals */}
                    <div className="grid grid-cols-3 gap-1 my-3 p-1 rounded-xl bg-[#f1f4f2] text-center">
                      <div className="p-1">
                        <span className="text-[11px] text-[#707974] block">Temp</span>
                        <span className="text-xs font-bold text-[#003629]">{pet.temp}</span>
                      </div>
                      <div className="p-1">
                        <span className="text-[11px] text-[#707974] block">FC</span>
                        <span className="text-xs font-bold text-[#003629]">{pet.heartRate}</span>
                      </div>
                      <div className="p-1">
                        <span className="text-[11px] text-[#707974] block">Cond. C</span>
                        <span className="text-xs font-bold text-[#003629]">{pet.bodyCondition}</span>
                      </div>
                    </div>

                    {/* Key date flag */}
                    <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#acf0d7]/30 text-[#1b4d3e]">
                      <span className="material-symbols-outlined text-[18px] text-[#256956]">
                        {pet.id === 'milo' ? 'vaccines' : 'check_circle'}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold truncate">{pet.nextVaccineOrCheckup}</p>
                        <p className="text-[11px] text-[#256956]">{pet.nextDate}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-[#e0ebe3] flex items-center justify-between">
                    <a
                      href="#historial-section"
                      className="text-xs text-[#256956] hover:text-[#003629] font-bold inline-flex items-center gap-1"
                    >
                      Ver Carnet Completo{' '}
                      <span className="material-symbols-outlined text-[15px]">arrow_forward</span>
                    </a>
                    <button
                      type="button"
                      onClick={() =>
                        onOpenBookingModal(
                          pet.name,
                          pet.id === 'milo' ? 'Vacunación' : 'Odontología'
                        )
                      }
                      className="p-1.5 rounded-lg bg-[#f1f4f2] text-[#003629] hover:bg-[#a9eed4] transition-colors"
                      title={`Agendar turno para ${pet.name}`}
                    >
                      <span className="material-symbols-outlined text-[18px]">add_alarm</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Right Column: Próximas Citas (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#256956] text-[22px]">
                  event_note
                </span>
                <h2 className="text-xl font-bold text-[#003629]">Próximas Citas</h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-xs font-bold">
                {appointments.length} Activa{appointments.length !== 1 ? 's' : ''}
              </span>
            </div>

            {appointments.length === 0 ? (
              <div className="bg-white rounded-2xl p-6 text-center border border-[#e0ebe3] space-y-3">
                <span className="material-symbols-outlined text-4xl text-[#c0c9c3]">event_busy</span>
                <p className="text-sm text-[#404945]">No tienes citas programadas actualmente.</p>
                <button
                  type="button"
                  onClick={() => onOpenBookingModal()}
                  className="px-4 py-2 bg-[#1b4d3e] text-white text-xs font-bold rounded-lg hover:bg-[#003629]"
                >
                  Agendar Cita Ahora
                </button>
              </div>
            ) : (
              appointments.map((appt) => (
                <div
                  key={appt.id}
                  className="bg-white rounded-2xl p-5 shadow-xs border border-[#e0ebe3] space-y-4"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-[#1b4d3e] text-white flex flex-col items-center justify-center">
                        <span className="text-[10px] uppercase font-bold leading-none">
                          {appt.monthStr}
                        </span>
                        <span className="text-base font-extrabold leading-tight">
                          {appt.dayNumber}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm sm:text-base font-bold text-[#003629] block">
                          {appt.service}
                        </span>
                        <span className="text-xs text-[#404945]">
                          Para <strong>{appt.petName}</strong> • {appt.location.split('•')[1] || 'Box'}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-xs font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#256956]"></span>
                      {appt.status}
                    </span>
                  </div>

                  {/* Doctor details */}
                  <div className="p-3 rounded-xl bg-[#f1f4f2] space-y-2">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhl9BUwsM5SJpgwo8fYoOSsJSk6sh-rIllB81mUQrWTZ0-ztYkGEW3C7UC5C2TvLhZJbuvobW5cNv9Ai_ej7T_aWNLq-dBkuMI7kxwY0uu-xxva1W0keT92j2E99no-0NzRlif96HjU7nRxcWxqLGzKY1ew_rUuL4aZThakGq-mXxvyl7SqdjqEaqOGKtNeyZyF6HvRxgbjW-aRAr1H21pMmUTj9yU6xDMUhZ6nEChNzrHA40Lazc"
                        alt={appt.doctorName}
                        className="w-10 h-10 rounded-full object-cover shadow-2xs"
                      />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-bold text-[#003629]">{appt.doctorName}</p>
                        <p className="text-[11px] text-[#404945] truncate">{appt.doctorSpecialty}</p>
                      </div>
                    </div>

                    <div className="pt-1 grid grid-cols-2 gap-2 text-xs text-[#404945]">
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#256956]">
                          schedule
                        </span>
                        <span>{appt.timeStr} ({appt.duration})</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#256956]">
                          location_on
                        </span>
                        <span>{appt.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onOpenBookingModal(appt.petName, appt.service)}
                      className="flex-1 py-2 rounded-lg bg-[#f1f4f2] text-[#003629] text-xs font-bold hover:bg-[#ebefed] transition-colors text-center"
                    >
                      Reprogramar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCancelClick(appt.id, appt.petName)}
                      className="flex-1 py-2 rounded-lg bg-[#ffdad6]/60 text-[#ba1a1a] text-xs font-bold hover:bg-[#ffdad6] transition-colors text-center"
                    >
                      Cancelar
                    </button>
                  </div>

                  {/* Instructions */}
                  <div className="flex items-start gap-1.5 p-2 rounded-xl bg-white border border-[#e0ebe3] text-[#404945] text-[11px]">
                    <span className="material-symbols-outlined text-[15px] text-[#256956] shrink-0">
                      info
                    </span>
                    <span>
                      {appt.instructions ||
                        'Por favor traer a tu mascota con collar y correa o en jaula transportadora.'}
                    </span>
                  </div>
                </div>
              ))
            )}

            {/* Quick Contact Banner */}
            <div className="p-4 rounded-2xl bg-[#f1f4f2] border border-[#e0ebe3] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#256956] text-[24px]">call</span>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#003629]">
                    ¿Dudas antes de la consulta?
                  </p>
                  <p className="text-[11px] text-[#404945]">Atención de triage veterinario vía chat 24/7</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('Triage 24/7', 'Conectando con un asistente veterinario de turno...')}
                className="px-3.5 py-1.5 rounded-lg bg-white text-[#256956] text-xs font-bold hover:bg-[#a9eed4] hover:text-[#003629] transition-colors shadow-2xs"
              >
                Contactar
              </button>
            </div>
          </div>
        </div>

        {/* Sección de Historial Clínico, Vacunas y Recetas Recientes */}
        <section className="space-y-4 pt-4" id="historial-section">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#256956] text-[22px]">
                  clinical_notes
                </span>
                <h2 className="text-xl font-bold text-[#003629]">
                  Historial Clínico & Recetas Recientes
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#404945]">
                Descarga directa de certificados oficiales, carnet de inmunización y prescripciones médicas.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="inline-flex p-1 rounded-xl bg-[#f1f4f2] border border-[#e0ebe3] self-start md:self-auto">
              <button
                type="button"
                onClick={() => setHistoryFilter('all')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  historyFilter === 'all'
                    ? 'bg-white text-[#003629] shadow-2xs'
                    : 'text-[#404945] hover:text-[#003629]'
                }`}
              >
                Todos
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('milo')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  historyFilter === 'milo'
                    ? 'bg-white text-[#003629] shadow-2xs'
                    : 'text-[#404945] hover:text-[#003629]'
                }`}
              >
                Milo
              </button>
              <button
                type="button"
                onClick={() => setHistoryFilter('luna')}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  historyFilter === 'luna'
                    ? 'bg-white text-[#003629] shadow-2xs'
                    : 'text-[#404945] hover:text-[#003629]'
                }`}
              >
                Luna
              </button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Document 1: Milo Carnet */}
            {(historyFilter === 'all' || historyFilter === 'milo') && (
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e0ebe3] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-[11px] font-bold">
                      Carnet Digital
                    </span>
                    <span className="text-[11px] text-[#707974]">Actualizado 15 Oct</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-xl bg-[#f1f4f2] flex items-center justify-center text-[#256956]">
                      <span className="material-symbols-outlined text-[22px]">vaccines</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#003629] truncate">Carnet de Vacunación</h4>
                      <p className="text-[11px] text-[#707974]">Milo • Registro #CAN-8921</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#404945]">
                    Incluye Rabia, Parvovirus, Hepatitis y Leptospirosis con timbres veterinarios vigentes.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf('Carnet_Vacunacion_Milo.pdf')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f1f4f2] text-[#003629] hover:bg-[#a9eed4] transition-colors text-xs font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar PDF (2.4 MB)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Document 2: Luna Informe */}
            {(historyFilter === 'all' || historyFilter === 'luna') && (
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e0ebe3] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#c7eadc] text-[#003629] text-[11px] font-bold">
                      Informe Médico
                    </span>
                    <span className="text-[11px] text-[#707974]">02 Sep, 2024</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-xl bg-[#f1f4f2] flex items-center justify-center text-[#256956]">
                      <span className="material-symbols-outlined text-[22px]">
                        assignment_turned_in
                      </span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#003629] truncate">Revisión Anual Felina</h4>
                      <p className="text-[11px] text-[#707974]">Luna • Registro #FEL-4402</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#404945]">
                    Chequeo renal, ecografía abdominal preventiva y perfil hemático en parámetros normales.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf('Informe_Luna_Sept2024.pdf')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f1f4f2] text-[#003629] hover:bg-[#a9eed4] transition-colors text-xs font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar PDF (1.1 MB)</span>
                  </button>
                </div>
              </div>
            )}

            {/* Document 3: Milo Receta */}
            {(historyFilter === 'all' || historyFilter === 'milo') && (
              <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#e0ebe3] hover:shadow-md transition-shadow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#e6e9e7] text-[#404945] text-[11px] font-bold">
                      Receta Médica
                    </span>
                    <span className="text-[11px] text-[#707974]">20 Ago, 2024</span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <div className="w-10 h-10 rounded-xl bg-[#f1f4f2] flex items-center justify-center text-[#256956]">
                      <span className="material-symbols-outlined text-[22px]">prescriptions</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#003629] truncate">
                        Tratamiento Ótico Suave
                      </h4>
                      <p className="text-[11px] text-[#707974]">Milo • Dra. Jenkins</p>
                    </div>
                  </div>

                  <p className="text-xs text-[#404945]">
                    Gotas antibacterianas de amplio espectro, aplicadas cada 12 horas por 7 días.
                  </p>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => handleDownloadPdf('Receta_Otica_Milo.pdf')}
                    className="w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#f1f4f2] text-[#003629] hover:bg-[#a9eed4] transition-colors text-xs font-bold"
                  >
                    <span className="material-symbols-outlined text-[16px]">download</span>
                    <span>Descargar Fórmula PDF</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Clinical Recommendations */}
        <section className="bg-[#f1f4f2] rounded-2xl p-6 md:p-8 space-y-6 border border-[#e0ebe3]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-wider text-[#256956] font-bold block">
                Cuidado Integral
              </span>
              <h3 className="text-xl md:text-2xl font-bold text-[#003629]">
                Recomendaciones del Equipo Clínico
              </h3>
            </div>
            <button
              type="button"
              onClick={() => showToast('Guía de Bienestar', 'Abriendo la guía digital de nutrición y bienestar...')}
              className="text-xs font-bold text-[#256956] hover:text-[#003629] inline-flex items-center gap-1"
            >
              Ver guía de nutrición y bienestar{' '}
              <span className="material-symbols-outlined text-[15px]">open_in_new</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl space-y-1.5 border border-[#e0ebe3]">
              <div className="w-8 h-8 rounded-full bg-[#a9eed4] text-[#003629] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
              </div>
              <h4 className="text-sm font-bold text-[#003629]">Hidratación en Felinos</h4>
              <p className="text-xs text-[#404945]">
                Luna se beneficia de fuentes de agua corriente para estimular su consumo de líquidos y
                proteger sus riñones a largo plazo.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl space-y-1.5 border border-[#e0ebe3]">
              <div className="w-8 h-8 rounded-full bg-[#a9eed4] text-[#003629] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">dentistry</span>
              </div>
              <h4 className="text-sm font-bold text-[#003629]">Higiene Bucal Periódica</h4>
              <p className="text-xs text-[#404945]">
                El cepillado dental suave 2 a 3 veces por semana en Milo previene la acumulación de sarro y
                enfermedades periodontales complejas.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl space-y-1.5 border border-[#e0ebe3]">
              <div className="w-8 h-8 rounded-full bg-[#a9eed4] text-[#003629] flex items-center justify-center mb-2">
                <span className="material-symbols-outlined text-[18px]">monitor_weight</span>
              </div>
              <h4 className="text-sm font-bold text-[#003629]">Control de Peso Continuo</h4>
              <p className="text-xs text-[#404945]">
                Los 32.4 kg de Milo se mantienen en óptimo rango articular. Recuerda ajustar las porciones
                según la intensidad del paseo diario.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-[#e0ebe3] text-[#707974] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="VetCura Logo"
              className="h-5 w-auto opacity-70"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XYUuanrQRUaeZFswVv5wON06SG-1fKqtOJdZjml43AMp8KSe-hIyqeSMbC8bynqBvh0a6uJSodsQKZ2IXWI3O0oHF8W7LeRIHi0Uw0ClERdJzi51mmvqWn9I0UU1BQYeI8DMcNO_dUgrA0WC1aDdbEuLErPo8ek7GYRIG2t2hDuAGKaC-2Q00vm2OkDBKv37p6QqPn_OP08c-uuJ5CGMe92mxOoRMm7McZFOvevCfJUkufi1qJe2EeDg"
            />
            <span className="font-bold text-[#256956]">VetCura Clinical Suite</span>
          </div>
          <p>© 2024 VetCura Veterinary Care Management. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => showToast('Términos', 'Términos de servicio de VetCura Clínicas.')}
              className="hover:text-[#003629]"
            >
              Términos de Servicio
            </button>
            <button
              type="button"
              onClick={() => showToast('Protocolos', 'Protocolos médicos y bioseguridad.')}
              className="hover:text-[#003629]"
            >
              Protocolos Médicos
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
