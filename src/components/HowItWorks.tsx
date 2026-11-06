import React, { useState } from 'react';
import { howItWorksSteps, siteConfig } from '../data/mockData';
import { UploadCloud, Compass, Cpu, FileCheck2, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onOpenDemoModal: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenDemoModal }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const stepIcons = [UploadCloud, Compass, Cpu, FileCheck2];

  return (
    <section 
      id="how-it-works"
      className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>The Pipeline</span>
            <span aria-hidden="true">·</span>
            <span>Deterministic Mechanics</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            How Chronoterra resolves temporal change in seconds.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            From raw multispectral tiles to verified GIS vector masks. Four automated stages engineered to eliminate manual review and false alarms.
          </p>
        </div>

        {/* Desktop: Pinned Left Column with Changing Right Visual; Mobile: Stacked Steps (FR-4) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (Interactive Steps Selector) */}
          <div className="lg:col-span-5 space-y-4">
            {howItWorksSteps.map((step, idx) => {
              const Icon = stepIcons[idx];
              const isActive = activeStepIndex === idx;

              return (
                <div
                  key={step.step}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FAF9F5] border-[#0F1114] shadow-sm'
                      : 'bg-transparent border-[#8B8A84]/25 hover:border-[#8B8A84]/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className={`text-xs font-mono font-semibold ${isActive ? 'text-[#FF5B2E]' : 'text-[#8B8A84]'}`}>
                        {step.step}
                      </span>
                      <h3 className="text-lg font-serif font-semibold text-[#0F1114]">
                        {step.name}
                      </h3>
                    </div>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-[#FF5B2E]' : 'text-[#8B8A84]'}`} />
                  </div>

                  <p className="text-xs font-mono text-[#8B8A84] mb-2">
                    {step.tagline}
                  </p>

                  <p className="text-xs sm:text-sm text-[#0F1114]/75 leading-relaxed font-sans mb-3">
                    {step.description}
                  </p>

                  <div className="pt-2 border-t border-[#8B8A84]/15 text-[11px] font-mono text-[#8B8A84]">
                    <span>Engine: {step.technicalDetails}</span>
                  </div>
                </div>
              );
            })}

            {/* Post How It Works Primary CTA as required by Section 7.3 */}
            <div className="pt-4">
              <button
                onClick={onOpenDemoModal}
                className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded-md transition-colors cursor-pointer"
              >
                <span>{siteConfig.primaryCtaLabel}</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </button>
            </div>
          </div>

          {/* Right Column (Dynamic Visual State matching current step) */}
          <div className="lg:col-span-7 sticky top-24">
            <div className="aspect-[4/3] rounded-lg bg-[#0F1114] border border-[#8B8A84]/30 overflow-hidden relative p-6 text-[#F4F1EA] flex flex-col justify-between">
              
              {/* Header HUD */}
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono text-[#8B8A84]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-pulse" />
                  <span className="text-[#F4F1EA]">STAGE {howItWorksSteps[activeStepIndex].step} // {howItWorksSteps[activeStepIndex].name.toUpperCase()}</span>
                </div>
                <span>LATENCY: &lt; 0.4s</span>
              </div>

              {/* Dynamic Center Visual based on active step */}
              <div className="my-auto py-6">
                
                {/* STEP 1: UPLOAD VISUAL */}
                {activeStepIndex === 0 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded border border-white/10 bg-white/5 font-mono text-xs space-y-2">
                        <div className="text-[#8B8A84] text-[10px]">BASELINE EPOCH (T1)</div>
                        <div className="text-white font-semibold">Sentinel-2 MSI Level-2A</div>
                        <div className="text-[#8B8A84]">CRS: EPSG:3857 · 10m GSD</div>
                        <div className="text-emerald-400 text-[11px]">✓ Radiometrically Calibrated</div>
                      </div>

                      <div className="p-4 rounded border border-white/10 bg-white/5 font-mono text-xs space-y-2">
                        <div className="text-[#8B8A84] text-[10px]">TARGET EPOCH (T2)</div>
                        <div className="text-white font-semibold">PlanetScope SuperDove</div>
                        <div className="text-[#8B8A84]">CRS: EPSG:3857 · 3.0m GSD</div>
                        <div className="text-emerald-400 text-[11px]">✓ Orthorectified GeoTIFF</div>
                      </div>
                    </div>

                    <div className="p-3 bg-white/5 rounded border border-white/10 flex items-center justify-between text-xs font-mono text-[#8B8A84]">
                      <span>Coordinate Bounding Box: [45.425, -122.679, 45.438, -122.658]</span>
                      <span className="text-[#FF5B2E]">Ingested (34.2 MB)</span>
                    </div>
                  </div>
                )}

                {/* STEP 2: ALIGN VISUAL */}
                {activeStepIndex === 1 && (
                  <div className="space-y-4">
                    <div className="relative h-44 rounded bg-black/40 border border-white/15 p-4 flex flex-col justify-between overflow-hidden">
                      {/* Grid with Tie-point Crosshairs */}
                      <div className="absolute inset-0 bg-carto-grid opacity-30" />
                      
                      <div className="relative z-10 flex justify-between items-center text-xs font-mono">
                        <span className="text-[#FF5B2E]">Sub-Pixel Tie Points (n=842)</span>
                        <span className="text-emerald-400">Residual RMSE: 0.18 px</span>
                      </div>

                      {/* Animated Alignment Vectors */}
                      <div className="relative z-10 grid grid-cols-3 gap-3 text-center font-mono text-xs">
                        <div className="p-2 bg-white/5 rounded border border-white/10">
                          <div className="text-[#8B8A84] text-[10px]">SUN AZIMUTH</div>
                          <div className="text-[#F4F1EA] font-semibold">-18.4° Corrected</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded border border-white/10">
                          <div className="text-[#8B8A84] text-[10px]">OFF-NADIR TILT</div>
                          <div className="text-[#F4F1EA] font-semibold">4.2° Normalized</div>
                        </div>
                        <div className="p-2 bg-white/5 rounded border border-white/10">
                          <div className="text-[#8B8A84] text-[10px]">PARALLAX RESIDUAL</div>
                          <div className="text-emerald-400 font-semibold">&lt; 0.04m</div>
                        </div>
                      </div>

                      <div className="relative z-10 text-[11px] font-mono text-[#8B8A84]">
                        Homography transformation matrix inverted and locked.
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: DETECT VISUAL */}
                {activeStepIndex === 2 && (
                  <div className="space-y-4">
                    <div className="relative h-44 rounded bg-black/40 border border-[#FF5B2E]/40 p-4 flex flex-col justify-between">
                      <div className="flex justify-between items-center text-xs font-mono">
                        <span className="text-[#FF5B2E] font-semibold">Bi-Temporal Siamese Attention Mask</span>
                        <span className="bg-[#FF5B2E]/20 text-[#FF5B2E] px-2 py-0.5 rounded text-[10px]">PASS 03</span>
                      </div>

                      <div className="space-y-2 font-mono text-xs">
                        <div className="flex justify-between text-[#8B8A84]">
                          <span>Phenological Foliage Shift (Autumn)</span>
                          <span className="text-slate-400">FILTERED OUT (Noise)</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-slate-500 h-full w-[85%]" />
                        </div>

                        <div className="flex justify-between text-[#FF5B2E]">
                          <span>Structural Concrete & Steel Delta</span>
                          <span className="font-semibold text-emerald-400">DETECTED (True Shift)</span>
                        </div>
                        <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-[#FF5B2E] h-full w-[98%]" />
                        </div>
                      </div>

                      <div className="text-[11px] font-mono text-[#8B8A84]">
                        Confidence Score: 0.984 · Temporal false positive mitigation active.
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: REPORT VISUAL */}
                {activeStepIndex === 3 && (
                  <div className="space-y-4">
                    <div className="p-4 rounded bg-white/5 border border-white/10 font-mono text-xs space-y-3">
                      <div className="flex justify-between items-center text-[#8B8A84]">
                        <span>AOI CHANGE REPORT LEDGER</span>
                        <span className="text-[#FF5B2E]">VERIFIED READY</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-left">
                        <div className="p-2.5 bg-black/30 rounded border border-white/10">
                          <span className="text-[#8B8A84] text-[10px] block">TOTAL NET EXPANSION</span>
                          <span className="text-lg font-bold text-white">+184,200 m²</span>
                        </div>
                        <div className="p-2.5 bg-black/30 rounded border border-white/10">
                          <span className="text-[#8B8A84] text-[10px] block">PRIMARY CLASSIFICATION</span>
                          <span className="text-sm font-semibold text-[#FF5B2E]">Industrial Logistics</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-1 text-[11px]">
                        <span className="px-2 py-1 bg-white/10 rounded">.GeoTIFF (32-bit)</span>
                        <span className="px-2 py-1 bg-white/10 rounded">.GeoJSON Vector</span>
                        <span className="px-2 py-1 bg-white/10 rounded">.PDF Summary</span>
                        <span className="px-2 py-1 bg-white/10 rounded">.CSV Ledger</span>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* Bottom Footer HUD */}
              <div className="flex items-center justify-between border-t border-white/10 pt-3 text-[11px] font-mono text-[#8B8A84]">
                <span>EPSG: 3857 · WGS 84 / Pseudo-Mercator</span>
                <span className="text-[#F4F1EA]">Chronoterra Neural Core v4</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
