import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { CheckCircle2, Share2, Ticket, Award, X, Sparkles, Copy, Check } from 'lucide-react';
import { InklopLogo } from './InklopLogo';
import { Creator } from '../data/creators';

interface VoteRecord {
  fullName: string;
  email: string;
  creatorId: string;
  attendWithCreator: boolean;
  timestamp: string;
  voteCode: string;
}

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  voteRecord: VoteRecord | null;
  creator: Creator | undefined;
  onViewLeaderboard: () => void;
}

export const SuccessModal: React.FC<SuccessModalProps> = ({
  isOpen,
  onClose,
  voteRecord,
  creator,
  onViewLeaderboard,
}) => {
  const [copied, setCopied] = React.useState(false);

  useEffect(() => {
    if (isOpen) {
      // Fire confetti cannons
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#FF5A1F', '#F51E78', '#8A16F5', '#3B82F6', '#10B981'],
        });
        setTimeout(() => {
          confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#8A16F5', '#F51E78', '#FF5A1F'],
          });
          confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#8A16F5', '#3B82F6', '#10B981'],
          });
        }, 250);
      } catch (e) {
        console.error(e);
      }
    }
  }, [isOpen]);

  if (!isOpen || !voteRecord) return null;

  const handleShare = async () => {
    const text = `¡Acabo de votar por ${creator?.name || 'mi creador favorito'} en los premios INKLOP! 🔥 Vota tú también:`;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'INKLOP - Votación de Creadores',
          text,
          url,
        });
      } catch {
        // Fallback
      }
    } else {
      navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(voteRecord.voteCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 flex flex-col">
        {/* Header decoration */}
        <div className="bg-gradient-to-r from-[#5914F2] via-[#8516F5] to-[#D900F3] p-5 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-xs">
              <CheckCircle2 className="w-4 h-4 text-white stroke-[2.5]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-purple-100">
              Voto Registrado con Éxito
            </span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            ¡Gracias por tu apoyo!
          </h2>
          <p className="text-xs text-purple-100 mt-1">
            Tu voto ha sido contabilizado y verificado para esta edición.
          </p>
        </div>

        {/* Digital Ticket / Pass */}
        <div className="p-5 space-y-4">
          <div className="bg-gradient-to-b from-[#FAF7FF] to-[#FFF5FB] border border-purple-100 rounded-2xl p-4 relative overflow-hidden shadow-inner">
            {/* Cutout notch illusion */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-r border-purple-100" />
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-white border-l border-purple-100" />

            <div className="flex items-center justify-between border-b border-dashed border-purple-200 pb-3 mb-3">
              <InklopLogo size="sm" />
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-full">
                <Ticket className="w-3 h-3" /> PASE DIGITAL
              </div>
            </div>

            {/* Creator badge */}
            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-purple-50 shadow-xs">
              <img
                src={creator?.avatar}
                alt={creator?.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-purple-400"
              />
              <div className="min-w-0 flex-1">
                <span className="text-[10px] uppercase font-bold text-purple-600 block">
                  Creador Votado
                </span>
                <p className="font-extrabold text-gray-900 text-base leading-tight truncate">
                  {creator?.name}
                </p>
                <span className="text-xs text-gray-500 font-medium">
                  {creator?.handle}
                </span>
              </div>
              <div className="w-9 h-9 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
                <Award className="w-5 h-5" />
              </div>
            </div>

            {/* Voter info & Sweepstakes status */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-left">
              <div className="bg-white/70 p-2.5 rounded-xl">
                <span className="text-[10px] text-gray-400 font-medium block">Votante</span>
                <p className="text-xs font-bold text-gray-800 truncate">{voteRecord.fullName}</p>
                <p className="text-[10px] text-gray-400 truncate">{voteRecord.email}</p>
              </div>
              <div className="bg-white/70 p-2.5 rounded-xl">
                <span className="text-[10px] text-gray-400 font-medium block">¿Asistir con el creador?</span>
                <span
                  className={`inline-block mt-0.5 text-xs font-bold px-2 py-0.5 rounded-full ${
                    voteRecord.attendWithCreator
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {voteRecord.attendWithCreator ? '✓ Sí, en el sorteo' : '— No desea asistir'}
                </span>
              </div>
            </div>

            {/* Code identifier */}
            <div className="mt-3 pt-2.5 border-t border-dashed border-purple-200 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block">Código Único de Voto</span>
                <span className="text-xs font-mono font-bold text-gray-700 tracking-wider">
                  {voteRecord.voteCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="text-xs text-[#8A16F5] hover:text-purple-700 font-semibold inline-flex items-center gap-1 cursor-pointer bg-purple-50 px-2 py-1 rounded-lg"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#5914F2] via-[#8516F5] to-[#D900F3] text-white font-bold text-sm shadow-md hover:shadow-lg transition-transform active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              Compartir y pedir votos
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onViewLeaderboard();
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#8A16F5] font-bold text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              Ver Tabla de Posiciones en Vivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
