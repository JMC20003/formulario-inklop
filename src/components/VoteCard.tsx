import React, { useState } from 'react';
import { Globe, Star, AlertCircle } from 'lucide-react';
import { InklopLogo } from './InklopLogo';
import { CreatorSelector } from './CreatorSelector';
import { Creator } from '../data/creators';

export interface VoteFormData {
  fullName: string;
  email: string;
  creatorId: string;
  attendWithCreator: boolean;
  termsAccepted: boolean;
}

interface VoteCardProps {
  creators: Creator[];
  onSubmitVote: (data: VoteFormData) => void;
  isSubmitting?: boolean;
}

export const VoteCard: React.FC<VoteCardProps> = ({
  creators,
  onSubmitVote,
  isSubmitting = false,
}) => {
  const [formData, setFormData] = useState<VoteFormData>({
    fullName: '',
    email: '',
    creatorId: '',
    attendWithCreator: true,
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{
    fullName?: string;
    email?: string;
    creatorId?: string;
    termsAccepted?: string;
  }>({});

  const [lang, setLang] = useState<'ES' | 'EN'>('ES');

  const validate = (): boolean => {
    const newErrors: typeof errors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Por favor ingresa tu nombre y apellido.';
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Por favor ingresa tu correo electrónico.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = 'Ingresa un correo electrónico válido.';
      }
    }

    if (!formData.creatorId) {
      newErrors.creatorId = 'Selecciona un creador para emitir tu voto.';
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = 'Debes aceptar que solo se permite 1 voto por persona.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmitVote(formData);
    }
  };

  const selectedCreator = creators.find((c) => c.id === formData.creatorId);

  return (
    <div className="w-full max-w-[420px] mx-auto">
      {/* Phone-styled Card Container matching image 1 */}
      <div className="relative bg-white rounded-[32px] sm:rounded-[36px] shadow-[0_20px_50px_rgba(89,20,242,0.12),0_4px_16px_rgba(0,0,0,0.06)] border-[3px] border-slate-900/10 p-5 sm:p-7 backdrop-blur-sm transition-all duration-300">
        {/* Top bar inside the card: INKLOP logo + Globe icon */}
        <div className="flex items-center justify-between mb-5">
          <InklopLogo size="md" />
          <button
            type="button"
            onClick={() => setLang((prev) => (prev === 'ES' ? 'EN' : 'ES'))}
            title="Cambiar idioma"
            className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-600 transition-colors border border-gray-200/80 cursor-pointer shadow-xs active:scale-95"
            aria-label="Idioma"
          >
            <Globe className="w-5 h-5 text-gray-700 stroke-[1.75]" />
          </button>
        </div>

        {/* Headline: "Tu voto cuenta" */}
        <div className="mb-6">
          <h1 className="text-[28px] sm:text-[32px] font-black tracking-tight text-gray-950 leading-tight">
            Tu voto{' '}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#E114E5] bg-clip-text text-transparent">
              cuenta
            </span>
          </h1>
          <p className="text-gray-500 text-sm font-medium mt-1 leading-snug">
            {lang === 'ES'
              ? 'Completa el formulario para apoyar a tu creador favorito.'
              : 'Complete the form to support your favorite creator.'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Field 1: Nombre y apellido */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              Nombre y apellido
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: undefined });
              }}
              placeholder="Ej. Ana Torres"
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-xs ${
                errors.fullName
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-gray-200 focus:border-[#8A16F5] focus:ring-2 focus:ring-purple-100'
              }`}
            />
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
              </p>
            )}
          </div>

          {/* Field 2: Correo electrónico */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              Correo electrónico
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="Ej. ana@email.com"
              className={`w-full px-4 py-3 rounded-2xl bg-white border text-sm font-medium text-gray-900 placeholder:text-gray-400 focus:outline-none transition-all shadow-xs ${
                errors.email
                  ? 'border-red-400 ring-2 ring-red-100'
                  : 'border-gray-200 focus:border-[#8A16F5] focus:ring-2 focus:ring-purple-100'
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
              </p>
            )}
          </div>

          {/* Field 3: Selecciona tu creador favorito */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs sm:text-sm font-bold text-gray-900">
                Selecciona tu creador favorito
              </label>
              {selectedCreator && (
                <span className="text-[11px] font-bold text-[#8A16F5] bg-purple-50 px-2 py-0.5 rounded-full">
                  {selectedCreator.handle}
                </span>
              )}
            </div>
            <CreatorSelector
              creators={creators}
              selectedCreatorId={formData.creatorId}
              onSelect={(id) => {
                setFormData({ ...formData, creatorId: id });
                if (errors.creatorId) setErrors({ ...errors, creatorId: undefined });
              }}
              error={errors.creatorId}
            />
            {errors.creatorId && (
              <p className="mt-1 text-xs text-red-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.creatorId}
              </p>
            )}
          </div>

          {/* Field 4: ¿Quieres asistir con tu creador si gana? */}
          <div>
            <label className="block text-xs sm:text-sm font-bold text-gray-900 mb-1.5">
              ¿Quieres asistir con tu creador si gana?
            </label>
            {/* Segmented radio control matching screenshot style */}
            <div className="grid grid-cols-2 rounded-2xl border border-gray-200 bg-white p-1 gap-1 shadow-xs">
              {/* Option: Sí */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attendWithCreator: true })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  formData.attendWithCreator
                    ? 'bg-purple-50/80 text-gray-950 font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {/* Radio bullet */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    formData.attendWithCreator
                      ? 'border-[#8A16F5] bg-white'
                      : 'border-gray-300'
                  }`}
                >
                  {formData.attendWithCreator && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8A16F5]" />
                  )}
                </div>
                <span>Sí</span>
              </button>

              {/* Option: No */}
              <button
                type="button"
                onClick={() => setFormData({ ...formData, attendWithCreator: false })}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  !formData.attendWithCreator
                    ? 'bg-purple-50/80 text-gray-950 font-bold'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {/* Radio bullet */}
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    !formData.attendWithCreator
                      ? 'border-[#8A16F5] bg-white'
                      : 'border-gray-300'
                  }`}
                >
                  {!formData.attendWithCreator && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#8A16F5]" />
                  )}
                </div>
                <span>No</span>
              </button>
            </div>
          </div>

          {/* Field 5: Checkbox "Acepto que solo se me permite 1 voto por persona" */}
          <div className="pt-1">
            <label className="flex items-start gap-3 cursor-pointer select-none group">
              <div className="relative flex items-center mt-0.5">
                <input
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={(e) => {
                    setFormData({ ...formData, termsAccepted: e.target.checked });
                    if (errors.termsAccepted) setErrors({ ...errors, termsAccepted: undefined });
                  }}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-lg border-2 transition-all flex items-center justify-center ${
                    formData.termsAccepted
                      ? 'bg-[#8A16F5] border-[#8A16F5]'
                      : errors.termsAccepted
                      ? 'border-red-400 bg-red-50/30'
                      : 'border-gray-300 group-hover:border-gray-400 bg-white'
                  }`}
                >
                  {formData.termsAccepted && (
                    <svg
                      className="w-3.5 h-3.5 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
              <span className="text-xs sm:text-[13px] text-gray-600 font-medium leading-snug">
                Acepto que solo se permite{' '}
                <strong className="text-gray-900 font-bold">1 voto</strong> por persona.
              </span>
            </label>
            {errors.termsAccepted && (
              <p className="mt-1 ml-8 text-xs text-red-500 font-semibold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" /> {errors.termsAccepted}
              </p>
            )}
          </div>

          {/* Field 6: ENVIAR VOTO button with decorative rays */}
          <div className="relative pt-3">
            {/* Sparkle decorative lines around button matching screenshot */}
            <div className="absolute -top-1 -right-1 w-3 h-1 bg-[#D946EF] rounded-full rotate-45 pointer-events-none" />
            <div className="absolute top-1 -right-2 w-3.5 h-1 bg-[#8A16F5] rounded-full -rotate-12 pointer-events-none" />

            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full py-4 px-6 rounded-full bg-gradient-to-r from-[#5914F2] via-[#8516F5] to-[#D900F3] text-white font-black text-base sm:text-[17px] tracking-wide uppercase shadow-[0_8px_25px_rgba(138,22,245,0.45)] hover:shadow-[0_12px_32px_rgba(138,22,245,0.6)] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed overflow-hidden group"
            >
              {/* Button shimmer reflection */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              <span className="relative flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>REGISTRANDO VOTO...</span>
                  </>
                ) : (
                  'ENVIAR VOTO'
                )}
              </span>
            </button>
          </div>
        </form>
      </div>

      {/* Floating Pill Badge below the card matching Image 1: "★ 1 voto por persona" */}
      <div className="relative mt-4 flex items-center justify-center">
        {/* Little decorative spark ticks beside badge */}
        <div className="absolute right-12 top-1.5 w-3 h-0.5 bg-[#8A16F5] rounded-full rotate-45" />
        <div className="absolute right-10 top-3.5 w-3.5 h-0.5 bg-[#D946EF] rounded-full -rotate-12" />

        <div className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#F3EBFF] border border-purple-200/70 shadow-xs text-[#7A1BF2] text-xs sm:text-sm font-extrabold select-none">
          <Star className="w-4 h-4 fill-[#7A1BF2] text-[#7A1BF2]" />
          <span>1 voto por persona</span>
        </div>
      </div>
    </div>
  );
};
