import React, { useState } from 'react';
import { ScreenType } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (targetScreen: ScreenType) => void;
  showToast: (title: string, message: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, showToast }) => {
  const [profileType, setProfileType] = useState<'owner' | 'vet'>('owner');
  const [email, setEmail] = useState('laura.dominguez@vetcura.cl');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSelectProfile = (type: 'owner' | 'vet') => {
    setProfileType(type);
    if (type === 'owner') {
      setEmail('laura.dominguez@vetcura.cl');
    } else {
      setEmail('dra.jenkins@vetcura.cl');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (profileType === 'owner') {
      showToast('Bienvenida, Laura', 'Iniciando sesión en tu Portal de Clientes...');
      setTimeout(() => onLoginSuccess('portal-clientes'), 300);
    } else {
      showToast('Sesión Médica Iniciada', 'Ingresando al Panel de Consulta — Dra. Jenkins...');
      setTimeout(() => onLoginSuccess('panel-veterinario'), 300);
    }
  };

  const handleQuickDemo = (type: 'owner' | 'vet') => {
    setProfileType(type);
    if (type === 'owner') {
      setEmail('laura.dominguez@vetcura.cl');
      showToast('Modo Demo Activado', 'Accediendo como Dueño de Mascota (Laura Domínguez)');
      setTimeout(() => onLoginSuccess('portal-clientes'), 300);
    } else {
      setEmail('dra.jenkins@vetcura.cl');
      showToast('Modo Demo Activado', 'Accediendo como Médico Veterinario (Dra. Jenkins)');
      setTimeout(() => onLoginSuccess('panel-veterinario'), 300);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] pt-16 flex items-center justify-center px-4 py-12 bg-[#f7faf8]">
      {/* Decorative ambient blurred circles */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#acf0d7]/30 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-[#baeed9]/25 blur-3xl pointer-events-none -z-10" />

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#e0ebe3] p-6 sm:p-8 space-y-6">
        {/* Header Profile Switcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-[#707974] tracking-wider uppercase text-[11px]">
              TIPO DE PERFIL
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-[#a9eed4] text-[#003629] font-bold text-[11px]">
              {profileType === 'owner' ? 'Portal Familiar' : 'Área Médica'}
            </span>
          </div>

          {/* Profile Selector Buttons */}
          <div className="grid grid-cols-2 gap-1.5 p-1 rounded-xl bg-[#ebefed]">
            <button
              type="button"
              onClick={() => handleSelectProfile('owner')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                profileType === 'owner'
                  ? 'bg-white text-[#003629] shadow-sm'
                  : 'text-[#404945] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">pets</span>
              <span>Dueño de Mascota</span>
            </button>
            <button
              type="button"
              onClick={() => handleSelectProfile('vet')}
              className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                profileType === 'vet'
                  ? 'bg-white text-[#003629] shadow-sm'
                  : 'text-[#404945] hover:text-[#181c1b]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">stethoscope</span>
              <span>Médico Veterinario</span>
            </button>
          </div>
        </div>

        {/* Title & Introduction */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#003629] tracking-tight">
            Bienvenido a tu Espacio
          </h1>
          <p className="text-xs sm:text-sm text-[#404945]">
            {profileType === 'owner'
              ? 'Ingresa tus credenciales personales para revisar la salud de tus compañeros de vida.'
              : 'Accede a la agenda de turnos, expedientes clínicos y administración de boxes.'}
          </p>
        </div>

        {/* Quick Demo Access Strip */}
        <div className="p-3 rounded-xl bg-[#f1f4f2] border border-[#e0ebe3] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-xs text-[#256956] font-semibold">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Prueba interactiva inmediata:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('owner')}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white border border-[#c0c9c3] hover:border-[#256956] text-[#003629] hover:bg-[#a9eed4]/30 transition-colors shadow-2xs"
            >
              Demo Cliente
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('vet')}
              className="px-2.5 py-1 text-xs font-semibold rounded-md bg-white border border-[#c0c9c3] hover:border-[#256956] text-[#003629] hover:bg-[#a9eed4]/30 transition-colors shadow-2xs"
            >
              Demo Veterinario
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email input */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-[#003629]" htmlFor="loginEmail">
              {profileType === 'owner' ? 'Correo Electrónico Personal' : 'Correo Institucional / Colegio Médico'}
            </label>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707974] text-[18px]">
                mail
              </span>
              <input
                id="loginEmail"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full pl-10 pr-3 py-2.5 bg-[#f1f4f2] focus:bg-white rounded-lg text-sm text-[#181c1b] border border-transparent focus:border-[#256956] focus:outline-none focus:ring-1 focus:ring-[#256956] transition-all"
              />
            </div>
          </div>

          {/* Password input */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold text-[#003629]" htmlFor="loginPassword">
                Contraseña
              </label>
              <button
                type="button"
                onClick={() => showToast('Recuperación de Clave', 'Se ha enviado un correo con instrucciones de restablecimiento.')}
                className="text-[#256956] hover:underline font-medium"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#707974] text-[18px]">
                lock
              </span>
              <input
                id="loginPassword"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-[#f1f4f2] focus:bg-white rounded-lg text-sm text-[#181c1b] border border-transparent focus:border-[#256956] focus:outline-none focus:ring-1 focus:ring-[#256956] transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#707974] hover:text-[#181c1b]"
                title={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showPassword ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>
          </div>

          {/* Checkbox and security badge */}
          <div className="flex items-center justify-between text-xs text-[#404945] pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[#c0c9c3] text-[#1b4d3e] focus:ring-[#256956]"
              />
              <span>Recordar sesión durante 30 días</span>
            </label>
            <div className="flex items-center gap-1 text-[#256956] font-medium">
              <span className="material-symbols-outlined text-[15px]">encrypted</span>
              <span>Cifrado SSL</span>
            </div>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#1b4d3e] hover:bg-[#003629] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            <span>Iniciar Sesión en VetCura</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        {/* Footer info */}
        <div className="text-center pt-2 border-t border-[#e0ebe3]">
          <p className="text-xs text-[#707974]">
            ¿No tienes cuenta aún?{' '}
            <button
              type="button"
              onClick={() => showToast('Registro Nuevo', 'El alta de tutores se realiza en recepción o vía tu veterinario tratante.')}
              className="font-bold text-[#256956] hover:underline"
            >
              Registrarme como nuevo tutor
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
