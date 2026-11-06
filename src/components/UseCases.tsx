import React, { useState } from 'react';
import { useCasesData } from '../data/mockData';
import { UseCaseItem } from '../types';
import { ArrowUpRight, Split, Eye } from 'lucide-react';

export const UseCases: React.FC = () => {
  const [activeReveals, setActiveReveals] = useState<{ [key: string]: boolean }>({});

  const toggleReveal = (id: string) => {
    setActiveReveals(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section 
      id="use-cases"
      className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>Operational Domains</span>
            <span aria-hidden="true">·</span>
            <span>Verified Outcomes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            Built for decisions that carry multi-million dollar consequences.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            From municipal zoning enforcement to catastrophe reinsurance payouts. Hover or tap each domain card to reveal the underlying bi-temporal delta.
          </p>
        </div>

        {/* 6 Use Case Cards (FR-6: Horizontal scroll on mobile, mini before/after reveal) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {useCasesData.map((item) => {
            const isRevealed = !!activeReveals[item.id];

            return (
              <div
                key={item.id}
                onMouseEnter={() => setActiveReveals(prev => ({ ...prev, [item.id]: true }))}
                onMouseLeave={() => setActiveReveals(prev => ({ ...prev, [item.id]: false }))}
                onClick={() => toggleReveal(item.id)}
                className="group relative bg-[#FAF9F5] rounded-lg border border-[#8B8A84]/25 p-6 flex flex-col justify-between transition-all duration-300 hover:border-[#0F1114] hover:shadow-sm cursor-pointer select-none"
              >
                <div>
                  {/* Zero-Pill Unboxed Metadata Header (frontend design discipline) */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#8B8A84] mb-3">
                    <span className="uppercase tracking-wider">{item.tag}</span>
                    <span>{item.metrics.value}</span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl font-serif font-bold text-[#0F1114] mb-2 group-hover:text-[#FF5B2E] transition-colors">
                    {item.title}
                  </h3>

                  {/* One-Line Outcome (FR-6) */}
                  <p className="text-xs font-semibold text-[#FF5B2E] font-mono mb-3">
                    Outcome: {item.outcome}
                  </p>

                  {/* Body description */}
                  <p className="text-xs sm:text-sm text-[#0F1114]/70 leading-relaxed font-sans mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Mini Before / After Interactive Visual Sandbox */}
                <div className="relative aspect-[16/9] rounded bg-[#0F1114] border border-[#8B8A84]/30 overflow-hidden mt-2">
                  
                  {/* Epoch T1 State */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isRevealed ? 'opacity-0' : 'opacity-100'}`}>
                    <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
                      {item.sceneType === 'urban' && (
                        <g>
                          <rect width="320" height="180" fill="#4d5a3f" />
                          <path d="M 0 80 Q 150 90, 320 70" stroke="#777" strokeWidth="4" fill="none" />
                          <circle cx="80" cy="110" r="6" fill="#888" />
                          <circle cx="210" cy="130" r="7" fill="#888" />
                        </g>
                      )}
                      {item.sceneType === 'forestry' && (
                        <g>
                          <rect width="320" height="180" fill="#2d4a22" />
                          <path d="M 160 0 C 140 60, 180 120, 150 180" stroke="#1d3016" strokeWidth="12" fill="none" />
                        </g>
                      )}
                      {item.sceneType === 'flood' && (
                        <g>
                          <rect width="320" height="180" fill="#586747" />
                          <path d="M 240 0 C 230 60, 250 120, 240 180" stroke="#334d5c" strokeWidth="16" fill="none" />
                          <rect x="60" y="40" width="30" height="20" fill="#888" />
                          <rect x="110" y="70" width="35" height="24" fill="#888" />
                        </g>
                      )}
                      {item.sceneType === 'agriculture' && (
                        <g>
                          <rect width="320" height="180" fill="#7a8c4f" />
                          <circle cx="80" cy="80" r="50" fill="#5d7039" />
                          <circle cx="220" cy="90" r="55" fill="#5d7039" />
                        </g>
                      )}
                      {item.sceneType === 'infrastructure' && (
                        <g>
                          <rect width="320" height="180" fill="#4a5240" />
                          <path d="M 0 120 L 320 60" stroke="#666" strokeWidth="5" fill="none" />
                        </g>
                      )}
                      {item.sceneType === 'insurance' && (
                        <g>
                          <rect width="320" height="180" fill="#3a4035" />
                          <rect x="70" y="50" width="50" height="35" fill="#aaa" />
                          <rect x="170" y="60" width="60" height="40" fill="#aaa" />
                        </g>
                      )}
                    </svg>
                    <div className="absolute top-2 left-2 bg-black/75 px-2 py-0.5 rounded text-[10px] font-mono text-[#F4F1EA]">
                      T1: Baseline ({item.t1Date})
                    </div>
                  </div>

                  {/* Epoch T2 State (Revealed on hover/tap) */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${isRevealed ? 'opacity-100' : 'opacity-0'}`}>
                    <svg viewBox="0 0 320 180" className="w-full h-full object-cover">
                      {item.sceneType === 'urban' && (
                        <g>
                          <rect width="320" height="180" fill="#4d5a3f" />
                          <path d="M 0 80 Q 150 90, 320 70" stroke="#222" strokeWidth="8" fill="none" />
                          <rect x="60" y="90" width="80" height="45" fill="#e0e0e0" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                          <rect x="180" y="80" width="90" height="50" fill="#e0e0e0" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                        </g>
                      )}
                      {item.sceneType === 'forestry' && (
                        <g>
                          <rect width="320" height="180" fill="#2d4a22" />
                          {/* Deforestation logging scars */}
                          <path d="M 40 80 L 280 110" stroke="#8b7355" strokeWidth="6" strokeDasharray="4 2" />
                          <polygon points="120,40 220,50 190,120 90,100" fill="#8b7355" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                        </g>
                      )}
                      {item.sceneType === 'flood' && (
                        <g>
                          <rect width="320" height="180" fill="#586747" />
                          {/* Inundation surge mask */}
                          <path d="M 150 0 C 80 50, 90 140, 20 180 L 320 180 L 320 0 Z" fill="#2c5a75" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                        </g>
                      )}
                      {item.sceneType === 'agriculture' && (
                        <g>
                          <rect width="320" height="180" fill="#7a8c4f" />
                          <circle cx="80" cy="80" r="50" fill="#5d7039" />
                          <circle cx="220" cy="90" r="55" fill="#a07a4a" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                        </g>
                      )}
                      {item.sceneType === 'infrastructure' && (
                        <g>
                          <rect width="320" height="180" fill="#4a5240" />
                          <path d="M 0 120 L 320 60" stroke="#111" strokeWidth="12" fill="none" />
                          <rect x="140" y="70" width="40" height="30" fill="#f0b429" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                        </g>
                      )}
                      {item.sceneType === 'insurance' && (
                        <g>
                          <rect width="320" height="180" fill="#3a4035" />
                          <rect x="70" y="50" width="50" height="35" fill="#aaa" />
                          {/* Collapsed Roof / Structure Delta */}
                          <polygon points="170,60 230,60 210,100 160,85" fill="#884433" stroke="#FF5B2E" strokeWidth="2" className="animate-signal-pulse" />
                        </g>
                      )}
                    </svg>
                    <div className="absolute top-2 left-2 bg-[#FF5B2E] px-2 py-0.5 rounded text-[10px] font-mono text-white font-semibold">
                      T2: Delta Detected ({item.t2Date})
                    </div>
                  </div>

                  {/* Micro Hint */}
                  <div className="absolute bottom-2 right-2 bg-black/60 px-2 py-0.5 rounded text-[10px] font-mono text-[#8B8A84] flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#FF5B2E]" />
                    <span>{isRevealed ? 'Revealing Shift' : 'Hover / Tap to Reveal'}</span>
                  </div>
                </div>

                {/* Footer Metric Strip */}
                <div className="pt-4 mt-4 border-t border-[#8B8A84]/20 flex items-center justify-between text-xs font-mono">
                  <span className="text-[#8B8A84]">{item.metrics.label}</span>
                  <span className="font-semibold text-[#0F1114] flex items-center gap-1 group-hover:text-[#FF5B2E]">
                    <span>{item.metrics.value}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
