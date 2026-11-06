import React, { useState } from 'react';
import { timelineDemoData } from '../data/mockData';
import { Calendar, ChevronLeft, ChevronRight, Activity, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

export const TimelineDemo: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(4); // Default to latest epoch (Sep 2026)

  const activePoint = timelineDemoData[activeIndex];

  const handlePrev = () => {
    setActiveIndex(prev => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setActiveIndex(prev => Math.min(timelineDemoData.length - 1, prev + 1));
  };

  return (
    <section 
      id="timeline-demo"
      className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>Multi-Temporal Progression</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Scrubber</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            Scrub across time. Watch landscape transformation unfold.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            Drag the chronological scrubber to inspect five distinct satellite passes over an intermodal industrial corridor. Changed geometries glow in Signal accent as real-time area counters update.
          </p>
        </div>

        {/* Scrubber Timeline Bar Controls (FR-5: Touch drag and keyboard support) */}
        <div className="bg-[#F4F1EA] p-4 sm:p-6 rounded-lg border border-[#8B8A84]/25 mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <span className="text-xs font-mono text-[#8B8A84] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#FF5B2E]" />
              <span>TIMELINE EPOCH SELECTOR (2023 — 2026)</span>
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIndex === 0}
                aria-label="Previous date epoch"
                className="p-1.5 rounded border border-[#8B8A84]/30 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4 text-[#0F1114]" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIndex === timelineDemoData.length - 1}
                aria-label="Next date epoch"
                className="p-1.5 rounded border border-[#8B8A84]/30 bg-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#FAF9F5] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4 text-[#0F1114]" />
              </button>
            </div>
          </div>

          {/* Stepper Buttons Row */}
          <div className="relative">
            {/* Connecting Track Line */}
            <div className="absolute top-5 left-4 right-4 h-0.5 bg-[#8B8A84]/25" />
            
            {/* Active Progress Fill */}
            <div 
              className="absolute top-5 left-4 h-0.5 bg-[#FF5B2E] transition-all duration-300"
              style={{ width: `${(activeIndex / (timelineDemoData.length - 1)) * 95}%` }}
            />

            <div className="relative flex justify-between">
              {timelineDemoData.map((point, idx) => {
                const isActive = activeIndex === idx;
                const isPast = activeIndex >= idx;

                return (
                  <button
                    key={point.id}
                    onClick={() => setActiveIndex(idx)}
                    className="flex flex-col items-center group cursor-pointer focus:outline-none"
                    aria-label={`Select date ${point.dateLabel}`}
                  >
                    <div 
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs transition-all ${
                        isActive
                          ? 'bg-[#FF5B2E] text-white ring-4 ring-[#FF5B2E]/20 scale-110 font-bold'
                          : isPast
                          ? 'bg-[#0F1114] text-white'
                          : 'bg-white border border-[#8B8A84]/40 text-[#8B8A84] group-hover:border-[#0F1114]'
                      }`}
                    >
                      {idx + 1}
                    </div>
                    <span className={`mt-2 text-xs font-mono whitespace-nowrap hidden sm:block ${
                      isActive ? 'font-semibold text-[#0F1114]' : 'text-[#8B8A84]'
                    }`}>
                      {point.dateLabel}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Active Scene Display & Dynamic Counters Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Visual Scene for Selected Epoch */}
          <div className="lg:col-span-8 bg-[#0F1114] rounded-lg border border-[#8B8A84]/30 overflow-hidden relative p-4 sm:p-6 text-[#F4F1EA]">
            
            {/* HUD Header */}
            <div className="flex items-center justify-between text-xs font-mono text-[#8B8A84] pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-ping" />
                <span className="text-[#F4F1EA] font-semibold">{activePoint.dateLabel}</span>
              </div>
              <span className="text-emerald-400">Radiometric Score: {(activePoint.confidenceScore * 100).toFixed(1)}%</span>
            </div>

            {/* Dynamic Multi-Epoch Vector Canvas Representation */}
            <div className="relative aspect-[16/10] rounded bg-slate-950 border border-white/10 overflow-hidden">
              <svg 
                viewBox="0 0 800 500" 
                className="w-full h-full object-cover"
                role="img"
                aria-label={`Map state at ${activePoint.dateLabel}: ${activePoint.title}`}
              >
                {/* Background Terrain */}
                <rect width="800" height="500" fill="#3a4531" />

                {/* Base Creek Watercourse */}
                <path d="M 680 0 C 650 150, 600 300, 670 500" fill="none" stroke="#25353d" strokeWidth="18" strokeLinecap="round" />

                {/* Two-lane rural road (present across all) */}
                <path d="M 0 200 Q 250 220, 500 190 T 800 180" fill="none" stroke="#504c44" strokeWidth="6" />

                {/* Initial Agricultural parcels (shrink as industrial hub grows) */}
                <polygon points="20,20 300,20 280,180 20,180" fill="#4d5c3b" opacity={activeIndex === 0 ? 0.9 : 0.6} />

                {/* EPOCH 1 (Nov 2023+): Earthmoving & Corridor Clearing */}
                {activeIndex >= 1 && (
                  <g>
                    {/* Graded soil footprint */}
                    <polygon 
                      points="120,220 540,190 590,450 80,470" 
                      fill="#5c5341" 
                      stroke={activeIndex === 1 ? '#FF5B2E' : '#333'} 
                      strokeWidth={activeIndex === 1 ? '2.5' : '1'}
                      className={activeIndex === 1 ? 'animate-signal-pulse' : ''}
                    />
                    {/* Graded Road Axis */}
                    <path d="M 310 205 L 310 460" stroke="#45423c" strokeWidth="16" />
                  </g>
                )}

                {/* EPOCH 2 (Jun 2024+): Primary Warehouse Alpha & Retention Basin */}
                {activeIndex >= 2 && (
                  <g>
                    {/* Warehouse Alpha Structure */}
                    <rect 
                      x="140" y="350" width="160" height="90" 
                      fill="#e0e3e8" 
                      stroke={activeIndex === 2 ? '#FF5B2E' : '#222'} 
                      strokeWidth={activeIndex === 2 ? '3' : '1.5'}
                      rx="2"
                      className={activeIndex === 2 ? 'animate-signal-pulse' : ''}
                    />
                    {/* Retention Basin */}
                    <polygon points="530,220 580,215 595,280 540,290" fill="#1b323d" stroke="#FF5B2E" strokeWidth={activeIndex === 2 ? '2' : '0'} />
                  </g>
                )}

                {/* EPOCH 3 (Jan 2025+): Warehouse Beta & Dual-lane Asphalt */}
                {activeIndex >= 3 && (
                  <g>
                    {/* Asphalt paving */}
                    <polygon points="120,220 540,190 590,450 80,470" fill="#202226" opacity="0.8" />
                    {/* Warehouse Beta */}
                    <rect 
                      x="340" y="330" width="180" height="85" 
                      fill="#d8dce2" 
                      stroke={activeIndex === 3 ? '#FF5B2E' : '#222'} 
                      strokeWidth={activeIndex === 3 ? '3' : '1.5'}
                      rx="2"
                      className={activeIndex === 3 ? 'animate-signal-pulse' : ''}
                    />
                  </g>
                )}

                {/* EPOCH 4 (Sep 2026): Full Commissioned Hub + Rooftop Solar + Cross-dock */}
                {activeIndex >= 4 && (
                  <g>
                    {/* Warehouse Beta Solar Panels */}
                    <rect x="355" y="340" width="150" height="65" fill="#152b42" rx="1" />
                    {/* Cross-dock Facility */}
                    <rect 
                      x="180" y="235" width="120" height="42" 
                      fill="#e0e3e8" 
                      stroke="#FF5B2E" 
                      strokeWidth="2.5" 
                      className="animate-signal-pulse"
                    />
                    {/* Trailer Fleet Parking Rows */}
                    <g fill="#d8dce2">
                      <rect x="140" y="290" width="14" height="5" />
                      <rect x="160" y="290" width="14" height="5" />
                      <rect x="180" y="290" width="14" height="5" />
                      <rect x="340" y="270" width="14" height="5" />
                      <rect x="360" y="270" width="14" height="5" />
                      <rect x="380" y="270" width="14" height="5" />
                    </g>
                  </g>
                )}

                {/* Grid Overlay */}
                <g stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08">
                  <line x1="200" y1="0" x2="200" y2="500" />
                  <line x1="400" y1="0" x2="400" y2="500" />
                  <line x1="600" y1="0" x2="600" y2="500" />
                  <line x1="0" y1="250" x2="800" y2="250" />
                </g>
              </svg>

              {/* In-Scene Floating Label */}
              <div className="absolute bottom-3 left-3 bg-[#0F1114]/85 px-3 py-1.5 rounded border border-white/10 text-xs font-mono">
                <span className="text-[#8B8A84]">STATUS: </span>
                <span className="text-white font-medium">{activePoint.title}</span>
              </div>
            </div>

            {/* Epoch Narrative Description */}
            <p className="mt-4 text-xs sm:text-sm font-sans text-[#F4F1EA]/80 leading-relaxed">
              {activePoint.description}
            </p>
          </div>

          {/* Right Column: Dynamic Area Counters & Asset Breakdown (FR-5) */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Built-up Gained Counter Card */}
            <div className="p-5 bg-white rounded-lg border border-[#8B8A84]/25 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[#8B8A84] mb-1">
                <span>BUILT-UP AREA GAINED</span>
                <TrendingUp className="w-3.5 h-3.5 text-[#FF5B2E]" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#FF5B2E] tracking-tight">
                {activePoint.builtUpGainedSqM > 0 ? `+${activePoint.builtUpGainedSqM.toLocaleString()} m²` : '0 m²'}
              </div>
              <p className="text-[11px] font-mono text-[#8B8A84] mt-1">
                Cumulative impervious envelope expansion
              </p>
            </div>

            {/* Vegetation Shift Counter Card */}
            <div className="p-5 bg-white rounded-lg border border-[#8B8A84]/25 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[#8B8A84] mb-1">
                <span>VEGETATION / CANOPY DELTA</span>
                <Layers className="w-3.5 h-3.5 text-[#8B8A84]" />
              </div>
              <div className="text-2xl sm:text-3xl font-mono font-bold text-[#0F1114] tracking-tight">
                {activePoint.vegetationDeltaSqM !== 0 ? `${activePoint.vegetationDeltaSqM.toLocaleString()} m²` : 'Baseline (0)'}
              </div>
              <p className="text-[11px] font-mono text-[#8B8A84] mt-1">
                Filtered for seasonal moisture variation
              </p>
            </div>

            {/* Physical Asset Extent */}
            <div className="p-5 bg-[#FAF9F5] rounded-lg border border-[#8B8A84]/25">
              <h4 className="text-xs font-mono font-semibold text-[#0F1114] mb-3 uppercase tracking-wider">
                Physical Asset Ledger
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-[#8B8A84]/15">
                  <span className="text-[#8B8A84]">Logistics Warehouses</span>
                  <span className="font-semibold text-[#0F1114]">{activePoint.features.warehouses} units</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#8B8A84]/15">
                  <span className="text-[#8B8A84]">Arterial Road Network</span>
                  <span className="font-semibold text-[#0F1114]">{activePoint.features.arterialRoadKm} km</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[#8B8A84]/15">
                  <span className="text-[#8B8A84]">Detention Basins</span>
                  <span className="font-semibold text-[#0F1114]">{activePoint.features.retentionBasins} units</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#8B8A84]">Photovoltaic Array</span>
                  <span className="font-semibold text-[#0F1114]">{activePoint.features.solarPanelsSqM.toLocaleString()} m²</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
