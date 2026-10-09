import { useState, useEffect } from 'react';
import {
  Trophy,
  CheckCircle2,
  Calendar,
  MapPin,
  RefreshCw,
  Vote,
  ExternalLink,
  Flame,
} from 'lucide-react';
import { InklopLogo } from './components/InklopLogo';
import { MascotBanner } from './components/MascotBanner';
import { VoteCard, VoteFormData } from './components/VoteCard';
import { SuccessModal } from './components/SuccessModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { INITIAL_CREATORS, Creator } from './data/creators';

interface StoredVote {
  fullName: string;
  email: string;
  creatorId: string;
  interest: string;
  attendWithCreator: boolean;
  timestamp: string;
  voteCode: string;
}

export default function App() {
  const [creators, setCreators] = useState<Creator[]>(() => {
    const saved = localStorage.getItem('inklop_creators_votes');
    return saved ? JSON.parse(saved) : INITIAL_CREATORS;
  });

  const [votes, setVotes] = useState<StoredVote[]>(() => {
    const saved = localStorage.getItem('inklop_user_votes');
    return saved ? JSON.parse(saved) : [];
  });

  const [lastVote, setLastVote] = useState<StoredVote | null>(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'warning' | 'info' | 'success';
    message: string;
  } | null>(null);

  // Sync creators in localStorage
  useEffect(() => {
    localStorage.setItem('inklop_creators_votes', JSON.stringify(creators));
  }, [creators]);

  // Sync user votes
  useEffect(() => {
    localStorage.setItem('inklop_user_votes', JSON.stringify(votes));
  }, [votes]);

  const handleVoteSubmit = (formData: VoteFormData) => {
    setIsSubmitting(true);

    setTimeout(() => {
      const emailLower = formData.email.trim().toLowerCase();
      // Check for duplicate vote per email
      const existingVote = votes.find((v) => v.email.toLowerCase() === emailLower);

      if (existingVote) {
        const votedCreator = creators.find((c) => c.id === existingVote.creatorId);
        setNotification({
          type: 'warning',
          message: `El correo "${formData.email}" ya emitió un voto por ${
            votedCreator ? votedCreator.name : 'un creador'
          }. Solo se permite 1 voto por persona.`,
        });
        setIsSubmitting(false);
        setLastVote(existingVote);
        return;
      }

      // Generate unique vote verification code
      const voteCode = `INK-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;

      const newVote: StoredVote = {
        fullName: formData.fullName.trim(),
        email: emailLower,
        creatorId: formData.creatorId,
        interest: formData.interest,
        attendWithCreator: formData.attendWithCreator,
        timestamp: new Date().toISOString(),
        voteCode,
      };

      // Increment creator's vote count
      setCreators((prev) =>
        prev.map((c) => (c.id === formData.creatorId ? { ...c, votes: c.votes + 1 } : c))
      );

      setVotes((prev) => [...prev, newVote]);
      setLastVote(newVote);
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
      setNotification(null);
    }, 700);
  };

  const handleResetVotes = () => {
    if (window.confirm('¿Quieres reiniciar los votos de prueba?')) {
      localStorage.removeItem('inklop_user_votes');
      localStorage.removeItem('inklop_creators_votes');
      setVotes([]);
      setCreators(INITIAL_CREATORS);
      setLastVote(null);
      setNotification({
        type: 'info',
        message: 'Se han restablecido los votos para pruebas.',
      });
      setTimeout(() => setNotification(null), 3000);
    }
  };

  const totalVotesCount = creators.reduce((acc, c) => acc + c.votes, 0);
  const selectedCreatorForModal = creators.find((c) => c.id === lastVote?.creatorId);

  return (
    <div className="min-h-screen bg-[#FFF8F2] text-slate-800 flex flex-col font-['Plus_Jakarta_Sans',sans-serif] selection:bg-purple-200 selection:text-purple-900 relative overflow-x-hidden">
      {/* Background festive decorative blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-gradient-to-br from-purple-200/40 to-pink-200/30 blur-3xl" />
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-gradient-to-bl from-orange-200/35 to-rose-200/25 blur-3xl" />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-purple-100/50 to-pink-100/30 blur-3xl" />
      </div>

      {/* Global Top Navbar */}
      <header className="sticky top-0 z-30 bg-white/85 backdrop-blur-md border-b border-purple-100/70 py-3 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <InklopLogo size="md" />
            <span className="hidden sm:inline-block text-xs font-bold bg-purple-100 text-[#8A16F5] px-2.5 py-1 rounded-full uppercase tracking-wider">
              Premios 2026
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Real-time votes indicator */}
            <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-gray-600 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>{totalVotesCount.toLocaleString()} votos registrados</span>
            </div>

            {/* Leaderboard button */}
            <button
              onClick={() => setIsLeaderboardOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-purple-50 hover:bg-purple-100 text-[#8A16F5] border border-purple-200 text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Ver Ranking</span>
            </button>

            {/* Test Reset helper */}
            <button
              onClick={handleResetVotes}
              title="Reiniciar datos de prueba"
              className="p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition cursor-pointer"
              aria-label="Reiniciar votos"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Alert banner for notifications / duplicate votes */}
      {notification && (
        <div className="max-w-2xl mx-auto mt-4 px-4 w-full z-20 animate-in fade-in slide-in-from-top-3">
          <div
            className={`p-4 rounded-2xl border flex items-start justify-between gap-3 shadow-md ${
              notification.type === 'warning'
                ? 'bg-amber-50 border-amber-200 text-amber-900'
                : notification.type === 'info'
                ? 'bg-blue-50 border-blue-200 text-blue-900'
                : 'bg-emerald-50 border-emerald-200 text-emerald-900'
            }`}
          >
            <div className="text-xs sm:text-sm font-medium">
              <p className="font-bold mb-0.5">Aviso de votación</p>
              <p>{notification.message}</p>
              {lastVote && notification.type === 'warning' && (
                <button
                  onClick={() => setIsSuccessModalOpen(true)}
                  className="mt-2 text-xs font-bold text-[#8A16F5] underline hover:opacity-80 block cursor-pointer"
                >
                  Ver tu comprobante de voto previo →
                </button>
              )}
            </div>
            <button
              onClick={() => setNotification(null)}
              className="text-gray-400 hover:text-gray-700 text-lg leading-none cursor-pointer"
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 max-w-6xl mx-auto w-full px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column (Desktop Hero & Info) */}
          <div className="lg:col-span-6 space-y-6 pt-2 lg:pt-6">
            {/* Event highlight tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-100 to-pink-100 text-pink-900 border border-pink-200/60 text-xs font-bold shadow-xs">
              <Flame className="w-4 h-4 text-orange-600 animate-bounce" />
              <span>VOTACIÓN OFICIAL INKLOP AWARDS</span>
            </div>

            {/* Big Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-gray-950 tracking-tight leading-[1.15]">
                ¡Haz que tu creador{' '}
                <span className="bg-gradient-to-r from-[#2563EB] via-[#7C3AED] to-[#E114E5] bg-clip-text text-transparent">
                  sea el ganador!
                </span>
              </h1>
              <p className="mt-3 text-base sm:text-lg text-gray-600 font-normal leading-relaxed">
                Vota por tu influencer favorito en INKLOP. Si resulta ganador y marcaste la
                opción de asistir, entrarás automáticamente al sorteo para acompañarlo en la
                alfombra roja y la gala exclusiva.
              </p>
            </div>

            {/* Sweepstakes Box */}
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-5 border border-purple-100 shadow-sm space-y-3">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-2">
                <Vote className="w-4 h-4 text-[#8A16F5]" />
                ¿Qué incluye asistir con tu creador?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Entrada VIP Doble</h3>
                    <p className="text-[11px] text-gray-500">Acceso a la mesa principal del creador.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Alfombra Roja</h3>
                    <p className="text-[11px] text-gray-500">Fotos oficiales y mención especial.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Backstage Exclusivo</h3>
                    <p className="text-[11px] text-gray-500">Conoce a todos los nominados en persona.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                    ✓
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Kit INKLOP VIP</h3>
                    <p className="text-[11px] text-gray-500">Merchandising exclusivo edición limitada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick stats & event schedule */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-600 pt-1">
              <span className="inline-flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-gray-200">
                <Calendar className="w-3.5 h-3.5 text-[#8A16F5]" /> Cierre de votación: 31 de Octubre
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-gray-200">
                <MapPin className="w-3.5 h-3.5 text-[#8A16F5]" /> Gran Gala Presencial
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/70 px-3 py-1.5 rounded-full border border-gray-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> 1 Voto por persona auditado
              </span>
            </div>

            {/* Top 3 Creators pill carousel */}
            <div className="pt-2">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                  Creadores destacados en el ranking:
                </span>
                <button
                  onClick={() => setIsLeaderboardOpen(true)}
                  className="text-xs font-bold text-[#8A16F5] hover:underline inline-flex items-center gap-1 cursor-pointer"
                >
                  Ver todos ({creators.length}) <ExternalLink className="w-3 h-3" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {creators.slice(0, 3).map((creator, i) => (
                  <div
                    key={creator.id}
                    onClick={() => setIsLeaderboardOpen(true)}
                    className="bg-white/90 p-3 rounded-2xl border border-purple-50 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col items-center text-center group"
                  >
                    <div className="relative mb-1.5">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-purple-200 group-hover:ring-[#8A16F5] transition"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#8A16F5] text-white rounded-full text-[9px] font-black flex items-center justify-center">
                        #{i + 1}
                      </span>
                    </div>
                    <span className="font-extrabold text-xs text-gray-900 truncate w-full">
                      {creator.name}
                    </span>
                    <span className="text-[10px] text-[#8A16F5] font-bold">
                      {creator.votes.toLocaleString()} votos
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: The Phone / Card Experience matching Image 1 */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Top Mascot Banner with Megaphone matching Image 1 */}
            <div className="w-full max-w-[420px]">
              <MascotBanner />
            </div>

            {/* The Form Card */}
            <VoteCard
              creators={creators}
              onSubmitVote={handleVoteSubmit}
              isSubmitting={isSubmitting}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-purple-100 bg-white/60 backdrop-blur-xs py-6 px-4 text-center text-xs text-gray-500 space-y-2">
        <div className="flex items-center justify-center gap-2">
          <InklopLogo size="sm" />
        </div>
        <p>
          © 2026 INKLOP Inc. Todos los derechos reservados. Sistema oficial de votación para creadores de contenido.
        </p>
        <p className="text-[11px] text-gray-400">
          Términos de servicio • Política de Privacidad • 1 voto por usuario registrado
        </p>
      </footer>

      {/* Success Modal / Digital Ticket */}
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        voteRecord={lastVote}
        creator={selectedCreatorForModal}
        onViewLeaderboard={() => setIsLeaderboardOpen(true)}
      />

      {/* Leaderboard Modal */}
      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        creators={creators}
        userVotedCreatorId={lastVote?.creatorId}
      />
    </div>
  );
}
