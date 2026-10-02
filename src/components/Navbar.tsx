import React from 'react';
import { ScreenType } from '../types';

interface NavbarProps {
  currentScreen: ScreenType;
  onNavigate: (screen: ScreenType) => void;
  onOpenNotifications?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentScreen, onNavigate }) => {
  const isVet = currentScreen === 'panel-veterinario';

  return (
    <header className="fixed top-0 left-0 right-0 h-16 z-40 bg-[#f7faf8]/90 backdrop-blur-md shadow-[0_1px_8px_rgba(27,77,62,0.06)] border-b border-[#e0ebe3]">
      <div className="w-full h-16 px-4 md:px-6 flex items-center justify-between">
        {/* Brand & Subtitle */}
        <div className="flex items-center gap-3 md:gap-4">
          <button 
            onClick={() => onNavigate('portal-clientes')}
            className="flex items-center gap-2.5 focus:outline-none hover:opacity-90 transition-opacity"
            title="VetCura - Ir a Inicio"
          >
            <img
              alt="VetCura Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XYUuanrQRUaeZFswVv5wON06SG-1fKqtOJdZjml43AMp8KSe-hIyqeSMbC8bynqBvh0a6uJSodsQKZ2IXWI3O0oHF8W7LeRIHi0Uw0ClERdJzi51mmvqWn9I0UU1BQYeI8DMcNO_dUgrA0WC1aDdbEuLErPo8ek7GYRIG2t2hDuAGKaC-2Q00vm2OkDBKv37p6QqPn_OP08c-uuJ5CGMe92mxOoRMm7McZFOvevCfJUkufi1qJe2EeDg"
            />
            <span className="font-semibold text-lg md:text-xl text-[#003629] tracking-tight">VetCura</span>
          </button>

          {isVet ? (
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#2a6e5a]">
              <span className="w-2 h-2 rounded-full bg-[#256956] animate-pulse"></span>
              <span className="text-[11px] uppercase font-bold tracking-wider">Clínica Central</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#2a6e5a]">
              <span className="w-2 h-2 rounded-full bg-[#256956]"></span>
              <span className="text-[11px] uppercase font-bold tracking-wider">Portal Clínico</span>
            </div>
          )}
        </div>

        {/* Center Navigation Links */}
        <nav className="flex items-center gap-1 md:gap-2">
          <button
            type="button"
            onClick={() => onNavigate('login')}
            className={`px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              currentScreen === 'login'
                ? 'bg-[#1b4d3e] text-white shadow-sm'
                : 'text-[#404945] hover:text-[#181c1b] hover:bg-[#ebefed]'
            }`}
          >
            Inicio / Login
          </button>
          <button
            type="button"
            onClick={() => onNavigate('portal-clientes')}
            className={`px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              currentScreen === 'portal-clientes'
                ? 'bg-[#1b4d3e] text-white shadow-sm'
                : 'text-[#404945] hover:text-[#181c1b] hover:bg-[#ebefed]'
            }`}
          >
            Portal Clientes
          </button>
          <button
            type="button"
            onClick={() => onNavigate('panel-veterinario')}
            className={`px-3 md:px-4 py-1.5 rounded-lg text-xs md:text-sm font-semibold transition-all ${
              currentScreen === 'panel-veterinario'
                ? 'bg-[#1b4d3e] text-white shadow-sm'
                : 'text-[#404945] hover:text-[#181c1b] hover:bg-[#ebefed]'
            }`}
          >
            Panel Veterinario
          </button>
        </nav>

        {/* Right User Actions */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Notificaciones"
            className="relative p-2 text-[#404945] hover:text-[#181c1b] transition-colors rounded-full hover:bg-[#ebefed]"
            type="button"
            title="Notificaciones de turnos y alertas"
          >
            <span className="material-symbols-outlined text-[22px]">notifications</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 pl-1">
            {isVet ? (
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[#181c1b] leading-tight">Dra. Marcela Vidal</span>
                <span className="text-[11px] text-[#256956] font-medium">Médico Veterinario</span>
              </div>
            ) : (
              <div className="hidden md:flex flex-col text-right">
                <span className="text-xs font-bold text-[#181c1b] leading-tight">Laura Domínguez</span>
                <span className="text-[11px] text-[#256956] font-medium">Tutor Verificado</span>
              </div>
            )}
            <img
              alt="Avatar de Usuario"
              className="w-8 h-8 rounded-full object-cover shadow-[0_0_0_2px_#c7eadc]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQx6bWiQ9sA1pqjWqktU9CVNIDTIwE_J6aHu2gKpcYiOpnZ6JVTkq-nk6pS8jjALctU8dVHkw4dgjUym6i5ulmRyG55RjIlDLuOfQzWjFo71adTPsEVQ1hsR9pdjglFeELuaguTURIwSPLCuccl4jPBy1aRePpNUvVHnvE-gQEdovugx3wmqu34XSUu-ArwHezV3d9N3Sif2EH_f-odpRyjZNnh1c0oAUWdRUVCNwZE_fEaKH95hw"
            />
          </div>
        </div>
      </div>
    </header>
  );
};
