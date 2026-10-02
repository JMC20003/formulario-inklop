import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, Check, Sparkles } from 'lucide-react';
import { Creator } from '../data/creators';

interface CreatorSelectorProps {
  creators: Creator[];
  selectedCreatorId: string;
  onSelect: (creatorId: string) => void;
  error?: string;
}

export const CreatorSelector: React.FC<CreatorSelectorProps> = ({
  creators,
  selectedCreatorId,
  onSelect,
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedCreator = creators.find((c) => c.id === selectedCreatorId);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCreators = creators.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl bg-white border text-left transition-all duration-200 shadow-xs cursor-pointer ${
          error
            ? 'border-red-400 ring-2 ring-red-100'
            : isOpen
            ? 'border-[#8A16F5] ring-2 ring-purple-100 shadow-sm'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        {selectedCreator ? (
          <div className="flex items-center gap-3 overflow-hidden">
            <img
              src={selectedCreator.avatar}
              alt={selectedCreator.name}
              className="w-7 h-7 rounded-full object-cover ring-2 ring-purple-100 flex-shrink-0"
            />
            <div className="truncate">
              <span className="font-semibold text-gray-900 text-sm block truncate">
                {selectedCreator.name}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                {selectedCreator.handle}
              </span>
            </div>
          </div>
        ) : (
          <span className="text-gray-400 text-sm font-medium">
            Selecciona una opción
          </span>
        )}
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-200 flex-shrink-0 ml-2 ${
            isOpen ? 'rotate-180 text-[#8A16F5]' : ''
          }`}
        />
      </button>

      {/* Floating Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl border border-gray-100 shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Search bar inside dropdown */}
          <div className="p-2.5 border-b border-gray-100 bg-gray-50/70">
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar influencer..."
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-[#8A16F5] focus:ring-1 focus:ring-purple-200 transition"
                autoFocus
              />
            </div>
          </div>

          {/* List of creators */}
          <div className="max-h-60 overflow-y-auto divide-y divide-gray-50 p-1">
            {filteredCreators.length === 0 ? (
              <div className="p-4 text-center text-xs text-gray-400">
                No se encontraron creadores con "{searchQuery}"
              </div>
            ) : (
              filteredCreators.map((creator) => {
                const isSelected = creator.id === selectedCreatorId;
                return (
                  <button
                    key={creator.id}
                    type="button"
                    onClick={() => {
                      onSelect(creator.id);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl transition-colors text-left cursor-pointer ${
                      isSelected
                        ? 'bg-purple-50/80 text-[#8A16F5]'
                        : 'hover:bg-gray-50 text-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200 flex-shrink-0"
                      />
                      <div className="truncate">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-xs sm:text-sm text-gray-900 truncate">
                            {creator.name}
                          </span>
                          {creator.verified && (
                            <span className="w-3.5 h-3.5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[8px] font-bold flex-shrink-0">
                              ✓
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-gray-400 block truncate">
                          {creator.category} • {creator.handle}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-[#8A16F5] text-white flex items-center justify-center flex-shrink-0 ml-2">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="p-2 border-t border-gray-100 bg-purple-50/40 text-center">
            <span className="text-[11px] text-purple-700 font-medium inline-flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> {creators.length} creadores postulados
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
