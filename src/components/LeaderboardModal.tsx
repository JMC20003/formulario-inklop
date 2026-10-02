import React from 'react';
import { X, Trophy, Flame } from 'lucide-react';
import { Creator } from '../data/creators';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  creators: Creator[];
  userVotedCreatorId?: string;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  creators,
  userVotedCreatorId,
}) => {
  if (!isOpen) return null;

  // Sort descending by votes
  const sorted = [...creators].sort((a, b) => b.votes - a.votes);
  const totalVotes = creators.reduce((acc, c) => acc + c.votes, 0);
  const maxVotes = sorted[0]?.votes || 1;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border border-purple-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5914F2] via-[#8516F5] to-[#D900F3] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold tracking-tight">
                Ranking de Creadores
              </h2>
              <p className="text-xs text-purple-100">
                {totalVotes.toLocaleString()} votos computados en tiempo real
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-full hover:bg-white/10 transition cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Podium for top 3 */}
        <div className="bg-gradient-to-b from-[#F7F2FF] to-white px-5 pt-4 pb-2 border-b border-purple-50">
          <div className="flex items-end justify-center gap-2 pt-2">
            {/* 2nd place */}
            {sorted[1] && (
              <div className="flex flex-col items-center flex-1 max-w-[95px]">
                <div className="relative mb-1">
                  <img
                    src={sorted[1].avatar}
                    alt={sorted[1].name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-slate-300 shadow-sm"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-slate-200 text-slate-700 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">
                    2
                  </span>
                </div>
                <span className="text-[11px] font-bold text-gray-800 truncate w-full text-center">
                  {sorted[1].name}
                </span>
                <span className="text-[10px] text-purple-600 font-semibold">
                  {sorted[1].votes.toLocaleString()}
                </span>
              </div>
            )}

            {/* 1st place */}
            {sorted[0] && (
              <div className="flex flex-col items-center flex-1 max-w-[110px] -mt-3">
                <div className="relative mb-1">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</span>
                  <img
                    src={sorted[0].avatar}
                    alt={sorted[0].name}
                    className="w-16 h-16 rounded-full object-cover ring-3 ring-amber-400 shadow-md"
                  />
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-amber-400 text-amber-950 rounded-full text-xs font-black flex items-center justify-center border-2 border-white shadow-xs">
                    1
                  </span>
                </div>
                <span className="text-xs font-black text-gray-900 truncate w-full text-center">
                  {sorted[0].name}
                </span>
                <span className="text-[11px] text-[#8A16F5] font-black">
                  {sorted[0].votes.toLocaleString()} votos
                </span>
              </div>
            )}

            {/* 3rd place */}
            {sorted[2] && (
              <div className="flex flex-col items-center flex-1 max-w-[95px]">
                <div className="relative mb-1">
                  <img
                    src={sorted[2].avatar}
                    alt={sorted[2].name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-amber-700/40 shadow-sm"
                  />
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-700/20 text-amber-900 rounded-full text-[10px] font-black flex items-center justify-center border-2 border-white">
                    3
                  </span>
                </div>
                <span className="text-[11px] font-bold text-gray-800 truncate w-full text-center">
                  {sorted[2].name}
                </span>
                <span className="text-[10px] text-purple-600 font-semibold">
                  {sorted[2].votes.toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* List of all creators */}
        <div className="overflow-y-auto p-4 space-y-2 flex-1 divide-y divide-gray-50">
          {sorted.map((creator, index) => {
            const isUserVote = creator.id === userVotedCreatorId;
            const percentage = Math.round((creator.votes / maxVotes) * 100);

            return (
              <div
                key={creator.id}
                className={`pt-2 flex items-center gap-3 p-2 rounded-2xl transition ${
                  isUserVote ? 'bg-purple-50/80 border border-purple-200' : 'hover:bg-gray-50'
                }`}
              >
                <span className="w-5 text-center font-bold text-xs text-gray-400">
                  #{index + 1}
                </span>
                <img
                  src={creator.avatar}
                  alt={creator.name}
                  className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-gray-900 truncate flex items-center gap-1.5">
                      {creator.name}
                      {isUserVote && (
                        <span className="text-[9px] bg-[#8A16F5] text-white px-1.5 py-0.5 rounded-full font-bold">
                          Tu voto
                        </span>
                      )}
                    </span>
                    <span className="text-xs font-bold text-gray-700 font-mono">
                      {creator.votes.toLocaleString()}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#5914F2] to-[#D900F3] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50 text-center flex items-center justify-center gap-1.5 text-xs text-gray-500 font-medium">
          <Flame className="w-3.5 h-3.5 text-orange-500" />
          Las votaciones se actualizan automáticamente cada 60 segundos
        </div>
      </div>
    </div>
  );
};
