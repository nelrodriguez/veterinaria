import React, { useState } from 'react';

interface PatientRecord {
  id: string;
  name: string;
  species: string;
  breedAndAge: string;
  tutorName: string;
  tutorPhone: string;
  reason: string;
  timeSlot: string;
  endTime?: string;
  status: 'Finalizado' | 'En Espera (Box 2)' | 'En Sala Espera' | 'Box 01 Triage' | 'Confirmado';
  tag?: string;
  isUrgent?: boolean;
  microchip: string;
  weight: string;
  temp: string;
  heartRate: string;
  note: string;
  imageUrl: string;
  history: { title: string; date: string; desc: string }[];
}

interface VetDashboardProps {
  onOpenNewAppointment: () => void;
  showToast: (title: string, message: string) => void;
}

export const VetDashboard: React.FC<VetDashboardProps> = ({
  onOpenNewAppointment,
  showToast,
}) => {
  const [activeFilter, setActiveFilter] = useState<'hoy' | 'semana' | 'especialidad' | 'urgencias'>('hoy');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState('max');
  const [activeNav, setActiveNav] = useState('principal');

  const patients: PatientRecord[] = [
    {
      id: 'thor',
      name: 'Thor',
      species: 'Canino',
      breedAndAge: 'Golden Retriever • 4 años 1 mes',
      tutorName: 'Claudia Méndez',
      tutorPhone: '+56 9 7123 4567',
      reason: 'Vacunación anual Séxtuple y Rabia',
      timeSlot: '09:00',
      endTime: '09:35',
      status: 'Finalizado',
      microchip: '981098102377900',
      weight: '34.1',
      temp: '38.4',
      heartRate: '88',
      note: 'Vacunación Séxtuple y Rabia administradas sin incidencias. Propietario consulta sobre cambio a dieta sénior preventiva.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDXkbg1S_yusdf8lDyi_ktYoHObIq_VofZ0EPPVG2pn6oeB9g6tXCqld_9QRDz7ekzuZfryvp1B384FGW4HbW4k11Pry7cUjqIIICiiuFXbFEXigudU5Js_E8Dp0gHuA6C8wQkyqvf4Mq_KD0HxzE01GvZq-eufr9UixMUMfmDLj4JC2NreN-lOVARBpiD2yRE4tM4abizo_l7ODCbSRMIXTelXYsUAk1txpmbHMTI64CclPukDu78',
      history: [
        {
          title: 'Control Preventivo Anual',
          date: '10 Nov 2023',
          desc: 'Dr. Silva • Dentición con desgaste leve, corazón rítmico.',
        },
      ],
    },
    {
      id: 'max',
      name: 'Max',
      species: 'Canino',
      breedAndAge: 'Pastor Alemán • 5 años 2 meses',
      tutorName: 'Carlos Morales',
      tutorPhone: '+56 9 8765 4321',
      reason: 'Claudicación miembro posterior derecho (3 días)',
      timeSlot: '10:00',
      status: 'En Espera (Box 2)',
      tag: 'Dolor Articular',
      microchip: '981098102377461',
      weight: '32.4',
      temp: '38.6',
      heartRate: '94',
      note: 'Displasia de cadera bilateral grado II diagnosticada en 2022. Tratamiento intermitente con condroprotectores. Alérgico a penicilinas.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC8K-HDFMslrucXJmLEW5z3D0yN76vPpqW4wYdEzJVhQH9qxvzeGvy4QOoEGezpPyzJV1jJ3HpqlVW0Kk5N433TxdbDFI6qX4QQ-JYbR5D8zaBJPlH0yLUZNF2K5qJROFwt6trGQSy5KH30dqdkobtZsY6XqnEmG5i9sDM5sQdrVZ2esRNc5TFDiHOjYGLZyzYTWqfYO16oDohEBRtRSTIxmpmv3bThroFNIhUAju7QEv0V5FIegwY',
      history: [
        {
          title: 'Radiografía Coxofemoral',
          date: '15 Ago 2023',
          desc: 'Dra. Jenkins • Sin avance osteoartrítico significativo.',
        },
        {
          title: 'Vacunación Antirrábica Anual',
          date: '12 Ene 2023',
          desc: 'Dr. Silva • Sin reacciones adversas.',
        },
      ],
    },
    {
      id: 'luna',
      name: 'Luna',
      species: 'Felino',
      breedAndAge: 'Gato Siamés • 3 años',
      tutorName: 'Beatriz Silva',
      tutorPhone: '+56 9 6543 2109',
      reason: 'Control post-operatorio esterilización',
      timeSlot: '11:15',
      endTime: '11:45',
      status: 'En Sala Espera',
      microchip: '981098102377112',
      weight: '4.2',
      temp: '38.8',
      heartRate: '140',
      note: 'Control día 10 post-esterilización. Herida quirúrgica con cicatrización de primer grado. Retiro de puntos planificado para hoy.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCL_FPVVrLdMenrwU8NT4hnT6puF75Ob580tieaVZmHqLY1aiwFH_ApYgfo2IIiwSuU8gFG4a_DAABMkP2RWDj56YhXNDmq6NhexOnBW6kSd-hXDR3sqC27Baov-7ZP4zP9jF26RamC2YqPXRMbBe02gOLVbhQZ-6579M3SMDXfAMcW3z6K4Q7iVspIAkzX7uwifkMMq6fjRdZ-I0YJ8qmRkWbsgPsTQi-yPPICByrfSubvqhPlz74',
      history: [
        {
          title: 'Ovariohisterectomía Electiva',
          date: '14 Oct 2024',
          desc: 'Dra. Chen • Procedimiento exitoso sin complicaciones.',
        },
      ],
    },
    {
      id: 'rocky',
      name: 'Rocky',
      species: 'Canino',
      breedAndAge: 'Labrador Retriever • 7 años',
      tutorName: 'Roberto Gómez',
      tutorPhone: '+56 9 9876 1122',
      reason: 'Letargia severa e ingesta accidental de chocolate',
      timeSlot: '12:00',
      status: 'Box 01 Triage',
      tag: 'Triage Amarillo',
      isUrgent: true,
      microchip: '981098102377555',
      weight: '36.8',
      temp: '39.1',
      heartRate: '115',
      note: 'Sospecha de intoxicación con teobromina. Vómito inducido hace 20 minutos con apomorfina. Requiere fluidoterapia de soporte y monitoreo ECG.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBZV-zOwCSovCeyqFjXYOFk8GNurjx5VRO3W0WnmVobtIe5ySzQEPQBNdwGfT3GCe7Mp0CVgW26QIvW0LofYvNy86xsKtjiqVq2AcaUkI0lCJgg-JTDW8OQYLWawHuUmWTkORD52lDb0rv8zxCZxhM6-FFS_L-Boe7HIz_3hOdsWUjwW7_6xTytwk7TPCa33FtyoE3kcJPJfRJ5kb4K9OhjWE-xQV2gDDrrRWN9RF8gsGIVG779qAc',
      history: [
        {
          title: 'Chequeo Geriátrico Preventivo',
          date: '05 May 2024',
          desc: 'Dra. Jenkins • Función renal y hepática en rango normal.',
        },
      ],
    },
    {
      id: 'milo',
      name: 'Milo',
      species: 'Canino',
      breedAndAge: 'Bulldog Francés • 2 años',
      tutorName: 'Andrea Torres',
      tutorPhone: '+56 9 4321 8765',
      reason: 'Evaluación dermatológica por prurito podal',
      timeSlot: '13:30',
      endTime: '14:00',
      status: 'Confirmado',
      microchip: '981098102377888',
      weight: '12.6',
      temp: '38.5',
      heartRate: '102',
      note: 'Prurito interdigital crónico en extremidades anteriores. Citología cutánea sugerida por sospecha de sobrecrecimiento de Malassezia.',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAZC8Uq0I0RmaP9CiIfc04mFol1F8jWotbx-Ze_49Pg86QQjcSBAydL2qUt2Q-paPhpmTmH8zf9t-J5rDCCX2tZtYo2ZsZujnNu4a-YqkO4opJulkoY5TVy5TX4gdhzfwfFLu08J0QgqfLR_JZfNM9tkkRQ-gEpHftW4am8Sfh9awqSp5uLL_ydfXv7uqWxYKdtZIbL118JsCX7mQcdo60Wh37F0LyNvp5ZR6VtJNZhx8pJ3cu3F08',
      history: [
        {
          title: 'Tratamiento Alergia Atópica',
          date: '18 Jul 2024',
          desc: 'Dra. Jenkins • Respuesta favorable a oclacitinib.',
        },
      ],
    },
  ];

  const filteredPatients = patients.filter((p) => {
    if (activeFilter === 'urgencias') return p.isUrgent;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tutorName.toLowerCase().includes(q) ||
        p.microchip.includes(q) ||
        p.reason.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) || patients[1];

  return (
    <div className="flex w-full pt-16 min-h-screen bg-[#f7faf8]">
      {/* Left Clinical Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-60 z-30 bg-[#f1f4f2] border-r border-[#e0ebe3] flex-col justify-between py-4">
        <div className="flex flex-col gap-2 px-3">
          <div className="px-3 py-1">
            <span className="text-[11px] uppercase font-bold text-[#707974] tracking-wider">
              OPERACIÓN CLÍNICA
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            <button
              type="button"
              onClick={() => setActiveNav('principal')}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeNav === 'principal'
                  ? 'bg-[#1b4d3e] text-white shadow-xs'
                  : 'text-[#404945] hover:bg-[#ebefed] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">grid_view</span>
              <span>Panel Principal</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('turnos');
                showToast('Agenda de Turnos', 'Cargando calendario completo de boxes...');
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeNav === 'turnos'
                  ? 'bg-[#1b4d3e] text-white shadow-xs'
                  : 'text-[#404945] hover:bg-[#ebefed] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Agenda de Turnos</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('expedientes');
                showToast('Expedientes', 'Buscando base de datos de pacientes caninos y felinos...');
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeNav === 'expedientes'
                  ? 'bg-[#1b4d3e] text-white shadow-xs'
                  : 'text-[#404945] hover:bg-[#ebefed] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">pets</span>
              <span>Expediente Mascotas</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('triage');
                setActiveFilter('urgencias');
                showToast('Triage & Box', 'Filtrando pacientes con prioridad de atención...');
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeNav === 'triage'
                  ? 'bg-[#1b4d3e] text-white shadow-xs'
                  : 'text-[#404945] hover:bg-[#ebefed] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">medical_services</span>
              <span>Triage y Box</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveNav('farmacos');
                showToast('Fármacos & Dosis', 'Calculadora de dosimetría veterinaria por peso.');
              }}
              className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeNav === 'farmacos'
                  ? 'bg-[#1b4d3e] text-white shadow-xs'
                  : 'text-[#404945] hover:bg-[#ebefed] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">prescriptions</span>
              <span>Fármacos y Dosis</span>
            </button>
          </nav>
        </div>

        {/* Box Availability Widget */}
        <div className="px-3 pt-2">
          <div className="p-3 rounded-2xl bg-[#ebefed] border border-[#e0ebe3] flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#256956]">Box Disponibles</span>
              <span className="text-xs font-extrabold text-[#003629]">3 / 5</span>
            </div>
            <div className="w-full bg-[#e6e9e7] h-2 rounded-full overflow-hidden">
              <div className="bg-[#256956] h-full rounded-full w-3/5 transition-all"></div>
            </div>
            <span className="text-[10px] text-[#707974] pt-0.5">Box 01 y 03 en sanitización</span>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="w-full lg:pl-60 min-h-screen px-4 md:px-6 py-6">
        <div className="flex flex-col w-full gap-6">
          {/* Header Banner & Clinical KPI Ribbon */}
          <section className="relative overflow-hidden rounded-2xl bg-[#f1f4f2] border border-[#e0ebe3] p-6 shadow-xs">
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-[#a9eed4]/25 blur-3xl pointer-events-none" />
            <div className="absolute left-1/3 bottom-0 w-64 h-32 rounded-full bg-[#baeed9]/20 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6">
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-[11px] font-bold uppercase tracking-wide">
                    Turno Matutino / Box 02
                  </span>
                  <span className="flex items-center gap-1 text-xs text-[#256956] font-semibold">
                    <span className="w-2 h-2 rounded-full bg-[#256956] animate-ping"></span>
                    Actualizado en tiempo real
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-[#003629] tracking-tight">
                  Panel de Consulta — Dra. Sofía Jenkins, DVM
                </h1>
                <p className="text-xs sm:text-sm text-[#404945]">
                  Medicina Interna Canina y Felina • Unidad Quirúrgica Veterinaria VetCura
                </p>
              </div>

              {/* Quick Metrics Quartet */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Metric 1 */}
                <div className="flex flex-col p-3 rounded-xl bg-white border border-[#e0ebe3] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#707974]">Citas Hoy</span>
                    <span className="material-symbols-outlined text-[#256956] text-[18px]">
                      calendar_today
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#003629] mt-1 tabular-nums">14</span>
                  <span className="text-[11px] text-[#256956] font-bold flex items-center gap-0.5 mt-0.5">
                    <span className="material-symbols-outlined text-[13px]">trending_up</span> 100% cupo
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col p-3 rounded-xl bg-white border border-[#e0ebe3] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[#707974]">Completadas</span>
                    <span className="material-symbols-outlined text-[#256956] text-[18px]">
                      task_alt
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#003629] mt-1 tabular-nums">08</span>
                  <div className="w-full bg-[#ebefed] h-1.5 rounded-full mt-2 overflow-hidden">
                    <div className="bg-[#256956] h-full rounded-full w-[57%]"></div>
                  </div>
                </div>

                {/* Metric 3 */}
                <div className="flex flex-col p-3 rounded-xl bg-[#acf0d7]/40 border border-[#a9eed4] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#003629]">En Sala</span>
                    <span className="material-symbols-outlined text-[#256956] text-[18px]">
                      airline_seat_recline_normal
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#003629] mt-1 tabular-nums">02</span>
                  <span className="text-[11px] text-[#256956] font-bold mt-0.5 truncate">
                    Max & Luna
                  </span>
                </div>

                {/* Metric 4 */}
                <div className="flex flex-col p-3 rounded-xl bg-[#ffdad6]/40 border border-[#ffdad6] shadow-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#ba1a1a]">Urgencias</span>
                    <span className="material-symbols-outlined text-[#ba1a1a] text-[18px]">
                      emergency
                    </span>
                  </div>
                  <span className="text-2xl font-extrabold text-[#ba1a1a] mt-1 tabular-nums">01</span>
                  <span className="text-[11px] text-[#ba1a1a] font-bold mt-0.5 truncate">
                    Triage Amarillo
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Interactive Controls & Patient Search */}
          <section className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#e0ebe3] shadow-xs">
            {/* View Switcher Filters */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#f1f4f2] overflow-x-auto border border-[#e0ebe3]">
              <button
                type="button"
                onClick={() => setActiveFilter('hoy')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === 'hoy'
                    ? 'bg-[#1b4d3e] text-white shadow-xs'
                    : 'text-[#404945] hover:text-[#003629]'
                }`}
              >
                Hoy (14)
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('semana')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === 'semana'
                    ? 'bg-[#1b4d3e] text-white shadow-xs'
                    : 'text-[#404945] hover:text-[#003629]'
                }`}
              >
                Esta Semana
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('especialidad')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === 'especialidad'
                    ? 'bg-[#1b4d3e] text-white shadow-xs'
                    : 'text-[#404945] hover:text-[#003629]'
                }`}
              >
                Por Especialidad
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter('urgencias')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeFilter === 'urgencias'
                    ? 'bg-[#ba1a1a] text-white shadow-xs'
                    : 'text-[#ba1a1a] hover:bg-[#ffdad6]'
                }`}
              >
                Urgencias (1)
              </button>
            </div>

            {/* Search and Action Bar */}
            <div className="flex items-center gap-2.5 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707974] text-[18px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Buscar por mascota, tutor o microchip..."
                  className="w-full pl-9 pr-3 py-2 bg-[#f1f4f2] focus:bg-white rounded-xl text-xs sm:text-sm text-[#181c1b] border border-[#e0ebe3] focus:border-[#256956] focus:outline-none transition-all placeholder:text-[#707974]"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#707974] hover:text-[#181c1b]"
                  >
                    ×
                  </button>
                )}
              </div>

              <button
                type="button"
                onClick={() => showToast('Filtros Clínicos', 'Filtrando por box, médico asignado y especie.')}
                className="p-2 rounded-xl bg-[#f1f4f2] text-[#256956] hover:bg-[#ebefed] transition-colors border border-[#e0ebe3]"
                title="Filtros avanzados"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
              </button>

              <button
                type="button"
                onClick={onOpenNewAppointment}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#003629] text-white text-xs sm:text-sm font-bold hover:bg-[#1b4d3e] transition-all shadow-xs shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span>Nueva Cita</span>
              </button>
            </div>
          </section>

          {/* Quick Alert Strip */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Lab alert */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#a9eed4]/30 border border-[#cbe6d9] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#256956] text-white flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">biotech</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#256956] uppercase">
                    Resultados de Laboratorio Listos
                  </span>
                  <span className="text-[11px] text-[#707974]">Hace 12 min</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#003629] truncate mt-0.5">
                  Bioquímica Sérica + Panel Renal — Rocky (Labrador, 7a)
                </p>
                <p className="text-xs text-[#404945] line-clamp-1">
                  Creatinina 1.8 mg/dL (Ligera elevación), BUN normal. Requiere ajuste de fluidoterapia.
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedPatientId('rocky');
                      showToast('Panel Renal de Rocky', 'Abriendo informe bioquímico completo...');
                    }}
                    className="text-xs font-bold text-[#256956] hover:underline flex items-center gap-1"
                  >
                    Revisar Informe Completo{' '}
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pharmacy alert */}
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#f1f4f2] border border-[#e0ebe3] shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-[#e6e9e7] text-[#003629] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">vaccines</span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#256956] uppercase">
                    Alerta Farmacológica & Stock
                  </span>
                  <span className="text-[11px] text-[#ba1a1a] font-bold">Stock Crítico</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#003629] truncate mt-0.5">
                  Meloxicam Inyectable 5mg/ml — Quedan 2 ampollas
                </p>
                <p className="text-xs text-[#404945] line-clamp-1">
                  Lote VET-982 vence en 18 días. Sugerir Carprofeno como alternativa autorizada.
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <button
                    type="button"
                    onClick={() => showToast('Farmacia Central', 'Solicitud de reposición urgente enviada.')}
                    className="text-xs font-bold text-[#256956] hover:underline flex items-center gap-1"
                  >
                    Solicitar a Farmacia Central{' '}
                    <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Main Grid: Consultation Timeline + Sticky Patient Rapid Dossier */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
            {/* Left & Center: Consultation Timeline (7 Cols) */}
            <section className="xl:col-span-7 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#003629]">Agenda Quirúrgica y Ambulatoria</h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#f1f4f2] text-xs font-semibold text-[#256956] border border-[#e0ebe3]">
                    Martes, 24 Octubre
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-3 text-xs text-[#707974]">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#256956]"></span> Espera
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#1b4d3e]"></span> En Consulta
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#c0c9c3]"></span> Finalizado
                  </span>
                </div>
              </div>

              {/* Patient Timeline Cards */}
              <div className="flex flex-col gap-3">
                {filteredPatients.map((patient) => {
                  const isSelected = patient.id === selectedPatientId;
                  const isUrgent = patient.isUrgent;

                  return (
                    <div
                      key={patient.id}
                      onClick={() => setSelectedPatientId(patient.id)}
                      className={`group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-2xl transition-all cursor-pointer border ${
                        isSelected
                          ? 'border-2 border-[#256956] bg-white shadow-md'
                          : 'border-[#e0ebe3] bg-white hover:bg-[#f1f4f2]/70 shadow-xs'
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute -left-1 top-3 bottom-3 w-1.5 rounded-full bg-[#256956]"></div>
                      )}

                      <div className="flex items-start sm:items-center gap-3.5 min-w-0">
                        {/* Time slot indicator */}
                        <div
                          className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl font-mono shrink-0 ${
                            isUrgent
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : isSelected
                              ? 'bg-[#a9eed4] text-[#003629]'
                              : 'bg-[#f1f4f2] text-[#404945]'
                          }`}
                        >
                          <span className="text-xs font-bold leading-tight">{patient.timeSlot}</span>
                          <span className="text-[10px] opacity-80 leading-tight">
                            {patient.endTime || (isUrgent ? 'Urgente' : 'Turno')}
                          </span>
                        </div>

                        {/* Pet Photo Thumbnail */}
                        <div className="w-12 h-12 rounded-xl bg-[#ebefed] overflow-hidden shrink-0 relative">
                          <img
                            src={patient.imageUrl}
                            alt={patient.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#256956] border-2 border-white"></span>
                          )}
                        </div>

                        {/* Patient info */}
                        <div className="flex flex-col min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="text-sm sm:text-base font-bold text-[#003629]">
                              {patient.name}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#f1f4f2] text-[11px] font-semibold text-[#256956] border border-[#e0ebe3]">
                              {patient.breedAndAge}
                            </span>
                            {patient.tag && (
                              <span
                                className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${
                                  isUrgent
                                    ? 'bg-[#ffdad6] text-[#ba1a1a]'
                                    : 'bg-[#ffdad6]/50 text-[#ba1a1a]'
                                }`}
                              >
                                {patient.tag}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-[#404945] truncate mt-0.5">
                            Tutor: {patient.tutorName} • {patient.reason}
                          </p>
                        </div>
                      </div>

                      {/* Status indicator pill & action */}
                      <div className="flex items-center gap-3 mt-3 sm:mt-0 shrink-0 self-end sm:self-center">
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${
                            isUrgent
                              ? 'bg-[#ffdad6] text-[#ba1a1a]'
                              : patient.status === 'Finalizado'
                              ? 'bg-[#ebefed] text-[#707974]'
                              : 'bg-[#a9eed4] text-[#003629]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isUrgent
                                ? 'bg-[#ba1a1a]'
                                : patient.status === 'Finalizado'
                                ? 'bg-[#707974]'
                                : 'bg-[#256956] animate-pulse'
                            }`}
                          ></span>
                          {patient.status}
                        </span>
                        <span className="material-symbols-outlined text-[#707974] text-[20px] group-hover:text-[#003629]">
                          chevron_right
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Weekly Efficiency Progress Banner */}
              <div className="p-4 rounded-2xl bg-[#f1f4f2] border border-[#e0ebe3] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#256956] uppercase tracking-wide">
                    Eficiencia Semanal de Box
                  </span>
                  <span className="text-xs text-[#404945]">
                    92% de puntualidad en consultas matutinas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <svg
                    className="w-36 h-8 text-[#256956]"
                    fill="none"
                    viewBox="0 0 144 36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 28L24 20L48 24L72 10L96 16L120 4L142 8"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                    />
                    <circle cx="120" cy="4" r="3.5" fill="#003629" stroke="white" strokeWidth="1.5" />
                  </svg>
                  <span className="text-lg font-bold text-[#003629]">+18%</span>
                </div>
              </div>
            </section>

            {/* Right: Sticky Patient Rapid Dossier (5 Cols) */}
            <aside className="xl:col-span-5 sticky top-20 flex flex-col gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-xs border border-[#e0ebe3] flex flex-col gap-4 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 rounded-bl-full bg-[#a9eed4]/15 pointer-events-none" />

                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] text-[11px] font-bold uppercase tracking-wider">
                    Ficha Rápida Activa
                  </span>
                  <span className="font-mono text-xs text-[#707974]">
                    ID: #{selectedPatient.microchip.slice(-5)}
                  </span>
                </div>

                {/* Patient Header */}
                <div className="flex items-center gap-3.5">
                  <div className="w-16 h-16 rounded-2xl bg-[#a9eed4]/30 overflow-hidden shadow-inner shrink-0 border border-[#cbe6d9]">
                    <img
                      src={selectedPatient.imageUrl}
                      alt={selectedPatient.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-xl font-bold text-[#003629]">{selectedPatient.name}</h3>
                      <span className="px-2 py-0.5 rounded-full bg-[#f1f4f2] text-xs text-[#256956] font-semibold border border-[#e0ebe3]">
                        {selectedPatient.species}
                      </span>
                    </div>
                    <span className="text-xs text-[#404945]">{selectedPatient.breedAndAge}</span>
                    <span className="text-[11px] text-[#707974] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[13px]">fingerprint</span>{' '}
                      Microchip: {selectedPatient.microchip}
                    </span>
                  </div>
                </div>

                {/* Tutor Contact Micro-Banner */}
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#f1f4f2] text-xs border border-[#e0ebe3]">
                  <div className="flex items-center gap-1.5 text-[#181c1b] font-semibold">
                    <span className="material-symbols-outlined text-[#256956] text-[16px]">person</span>
                    <span>{selectedPatient.tutorName}</span>
                  </div>
                  <a
                    href={`tel:${selectedPatient.tutorPhone}`}
                    className="text-[#256956] hover:underline font-bold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">call</span>{' '}
                    {selectedPatient.tutorPhone}
                  </a>
                </div>

                {/* Vitals Metric Ribbon */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#707974] tracking-wider">
                    Signos Vitales en Admisión (Hoy 09:50)
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-[#f1f4f2] text-center border border-[#e0ebe3]">
                      <span className="text-[11px] text-[#707974] block">Peso Corporal</span>
                      <span className="text-base font-extrabold text-[#003629] tabular-nums block mt-0.5">
                        {selectedPatient.weight} <span className="text-xs font-normal">kg</span>
                      </span>
                      <span className="text-[10px] text-[#256956] font-semibold">Estable (-0.2)</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f1f4f2] text-center border border-[#e0ebe3]">
                      <span className="text-[11px] text-[#707974] block">Temperatura</span>
                      <span className="text-base font-extrabold text-[#003629] tabular-nums block mt-0.5">
                        {selectedPatient.temp} <span className="text-xs font-normal">°C</span>
                      </span>
                      <span className="text-[10px] text-[#256956] font-semibold">Normotérmico</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f1f4f2] text-center border border-[#e0ebe3]">
                      <span className="text-[11px] text-[#707974] block">Freq. Cardíaca</span>
                      <span className="text-base font-extrabold text-[#003629] tabular-nums block mt-0.5">
                        {selectedPatient.heartRate} <span className="text-xs font-normal">lpm</span>
                      </span>
                      <span className="text-[10px] text-[#256956] font-semibold">Rítmico</span>
                    </div>
                  </div>
                </div>

                {/* Notes & Precedent */}
                <div className="p-3 rounded-xl bg-[#a9eed4]/30 border border-[#cbe6d9] flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-[#256956] text-[18px] shrink-0 mt-0.5">
                    info
                  </span>
                  <div className="flex flex-col text-xs">
                    <span className="font-bold text-[#003629] uppercase text-[11px]">
                      Nota Previa & Antecedentes
                    </span>
                    <p className="text-[#404945] mt-0.5 leading-relaxed">{selectedPatient.note}</p>
                  </div>
                </div>

                {/* Prior Consultations */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] uppercase font-bold text-[#707974] tracking-wider">
                    Consultas Anteriores
                  </span>
                  <div className="space-y-1.5">
                    {selectedPatient.history.map((hist, idx) => (
                      <div
                        key={idx}
                        className="p-2 rounded-xl bg-[#f1f4f2] hover:bg-[#ebefed] transition-colors border border-[#e0ebe3]"
                      >
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-bold text-[#003629]">{hist.title}</span>
                          <span className="text-[11px] text-[#707974]">{hist.date}</span>
                        </div>
                        <p className="text-[11px] text-[#404945] mt-0.5">{hist.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        'Consulta Iniciada',
                        `Box 02 activo con ${selectedPatient.name}. Registro clínico abierto.`
                      )
                    }
                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#003629] hover:bg-[#1b4d3e] text-white text-xs sm:text-sm font-bold transition-all shadow-xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">stethoscope</span>
                    <span>Iniciar Consulta Box 2</span>
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        'Prescripción Médica',
                        `Generando recetario oficial con código QR para ${selectedPatient.name}.`
                      )
                    }
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-[#f1f4f2] hover:bg-[#ebefed] text-[#003629] text-xs sm:text-sm font-bold transition-all border border-[#e0ebe3]"
                  >
                    <span className="material-symbols-outlined text-[16px]">maps_ugc</span>
                    <span>Emitir Receta</span>
                  </button>
                </div>

                {/* Secondary Links */}
                <div className="flex items-center justify-between pt-2 border-t border-[#e0ebe3] text-xs">
                  <button
                    type="button"
                    onClick={() =>
                      showToast(
                        'Expediente Completo',
                        `Descargando ficha integral de ${selectedPatient.name}...`
                      )
                    }
                    className="text-[#256956] hover:underline font-bold flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">folder_open</span>
                    <span>Abrir Expediente Completo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      showToast('Consentimiento Informado', 'Generando formulario digital de anestesia y cirugía.')
                    }
                    className="text-[#707974] hover:text-[#181c1b] font-medium flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[15px]">print</span>
                    <span>Consentimiento</span>
                  </button>
                </div>
              </div>

              {/* Room Availability Card */}
              <div className="rounded-2xl bg-[#f1f4f2] p-3.5 flex items-center justify-between border border-[#e0ebe3] shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-[#a9eed4] flex items-center justify-center text-[#256956]">
                    <span className="material-symbols-outlined text-[18px]">meeting_room</span>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#003629] block">Box 02 Disponible</span>
                    <span className="text-[11px] text-[#404945]">Sanitizado a las 09:42 por Téc. Gómez</span>
                  </div>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#256956] text-white text-[11px] font-bold">
                  Listo
                </span>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </div>
  );
};
