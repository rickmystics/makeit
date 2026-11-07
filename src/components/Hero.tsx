import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sliders, Play, RotateCcw, Sparkles, ShieldCheck } from 'lucide-react';
import { siteConfig } from '../data/mockData';
import { SatelliteScene } from './canvas/SatelliteScene';

interface HeroProps {
  onOpenDemoModal: () => void;
  onOpenStudioModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenDemoModal,
  onOpenStudioModal
}) => {
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAutoplayed, setHasAutoplayed] = useState(false);
  const [showOutlines, setShowOutlines] = useState(true);
  const [tiltStyle, setTiltStyle] = useState<{ transform: string }>({ transform: 'none' });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderBoxRef = useRef<HTMLDivElement>(null);

  // Auto-play once on load as required by FR-2
  useEffect(() => {
    if (hasAutoplayed) return;

    // Smooth animation from 20% to 75% then settling at 50%
    const duration = 2400;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing curve: out-in sinusoidal motion
      const sineVal = Math.sin(progress * Math.PI);
      const currentPos = 50 + sineVal * 32 * (1 - progress * 0.5);

      setSliderPos(Math.round(currentPos));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSliderPos(50);
        setHasAutoplayed(true);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, 600);

    return () => clearTimeout(timer);
  }, [hasAutoplayed]);

  // Pointer drag handling for slider (mouse and touch)
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    updateSliderFromPointer(e.clientX);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDragging) {
      updateSliderFromPointer(e.clientX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if pointer wasn't captured
    }
  };

  const updateSliderFromPointer = (clientX: number) => {
    if (!sliderBoxRef.current) return;
    const rect = sliderBoxRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSliderPos(Math.round(percentage));
  };

  // Keyboard navigation for slider (FR-2: keyboard arrow keys)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos(prev => Math.max(0, prev - (e.shiftKey ? 10 : 2)));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos(prev => Math.min(100, prev + (e.shiftKey ? 10 : 2)));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(100);
    }
  };

  // Subtle 3D Depth: Desktop pointer-based tilt and layered parallax (FR-2)
  const handleContainerPointerMove = (e: React.PointerEvent) => {
    if (window.innerWidth < 1024) return; // Only desktop
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateX = -y * 6; // Max 3 deg tilt
    const rotateY = x * 8;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`
    });
  };

  const handleContainerPointerLeave = () => {
    setTiltStyle({ transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)' });
  };

  return (
    <section 
      id="hero"
      ref={containerRef}
      onPointerMove={handleContainerPointerMove}
      onPointerLeave={handleContainerPointerLeave}
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Text Stack */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5B2E]" />
            <span>Bi-Temporal Surface Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Sub-Meter Precision</span>
          </div>

          {/* Headline H1 (FR-2: "See exactly what changed between then and now.") */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#0F1114] tracking-tight leading-[1.08] text-balance mb-6">
            {siteConfig.headline}
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#0F1114]/80 leading-relaxed max-w-2xl font-sans mb-8">
            {siteConfig.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <button
              onClick={onOpenDemoModal}
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded-md transition-colors shadow-sm cursor-pointer group"
            >
              <span>{siteConfig.primaryCtaLabel}</span>
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={onOpenStudioModal}
              className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-md border border-[#0F1114] bg-white text-sm font-medium text-[#0F1114] hover:border-[#FF5B2E] hover:text-[#FF5B2E] transition-all cursor-pointer group shadow-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-pulse" />
              <span>Open AI Studio Sandbox (Live Examples & Results)</span>
              <span className="font-mono text-xs transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Draggable Comparison Slider Frame (FR-2) */}
        <div 
          style={tiltStyle}
          className="transition-transform duration-200 ease-out"
        >
          <div 
            ref={sliderBoxRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onKeyDown={handleKeyDown}
            tabIndex={0}
            role="slider"
            aria-label="Before and After Imagery Comparison Slider. Use left and right arrow keys to adjust."
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sliderPos}
            className="relative cursor-ew-resize focus:outline-none focus:ring-2 focus:ring-[#FF5B2E] rounded-lg"
          >
            <SatelliteScene 
              sliderPos={sliderPos} 
              showChangeOutline={showOutlines}
            />
          </div>

          {/* Slider Controls Bar */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#0F1114]/80">
            {/* Labeled Dates (T1 vs T2 as required by FR-2) */}
            <div className="flex items-center gap-3">
              <span className="bg-[#FAF9F5] border border-[#8B8A84]/30 px-2.5 py-1 rounded text-[#0F1114]">
                T1: <strong className="font-semibold">Oct 14, 2024</strong>
              </span>
              <span className="text-[#8B8A84]">vs</span>
              <span className="bg-[#FAF9F5] border border-[#FF5B2E]/40 px-2.5 py-1 rounded text-[#FF5B2E]">
                T2: <strong className="font-semibold">Sep 28, 2026</strong>
              </span>
            </div>

            {/* Quick Filter & Reset Controls */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowOutlines(!showOutlines)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border transition-colors cursor-pointer ${
                  showOutlines 
                    ? 'border-[#FF5B2E] text-[#FF5B2E] bg-[#FF5B2E]/10' 
                    : 'border-[#8B8A84]/30 text-[#8B8A84] hover:text-[#0F1114]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showOutlines ? 'Change Mask: ON' : 'Change Mask: OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSliderPos(50)}
                className="flex items-center gap-1 text-[#8B8A84] hover:text-[#0F1114] transition-colors cursor-pointer px-2 py-1"
                title="Reset slider to 50%"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset (50%)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Trust Row (FR-2: Logos or usage stat) */}
        <div className="mt-16 pt-10 border-t border-[#8B8A84]/20">
          <p className="text-xs font-mono text-[#8B8A84] tracking-wide mb-6">
            {siteConfig.trustStat}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
            {siteConfig.trustPartners.map((partner) => (
              <div 
                key={partner.name}
                className="flex flex-col border-l border-[#8B8A84]/30 pl-3 py-1"
              >
                <span className="text-sm font-semibold text-[#0F1114] tracking-tight">{partner.name}</span>
                <span className="text-[11px] font-mono text-[#8B8A84]">{partner.category}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
