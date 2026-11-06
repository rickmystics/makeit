import React, { useState, useEffect } from 'react';
import { testimonialsData } from '../data/mockData';
import { Pause, Play, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const SocialProof: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Slow fade carousel auto-advance with pause control (FR-9)
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
    }, 7000); // 7s dwell time per PRD

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const current = testimonialsData[currentIndex];

  return (
    <section 
      id="social-proof"
      className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-2 mb-2 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
              <span>Operational Testimonials</span>
              <span aria-hidden="true">·</span>
              <span>Field Validation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
              Trusted by leaders overseeing critical land assets.
            </h2>
          </div>

          {/* Carousel Pause/Play & Stepper Controls (FR-9) */}
          <div className="flex items-center gap-3 bg-[#F4F1EA] p-1.5 rounded-md border border-[#8B8A84]/30">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause testimonial carousel' : 'Play testimonial carousel'}
              className="p-1.5 rounded hover:bg-white transition-colors text-[#0F1114] cursor-pointer"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#FF5B2E]" />}
            </button>

            <span className="w-px h-4 bg-[#8B8A84]/30" />

            <div className="flex items-center gap-1 font-mono text-xs text-[#8B8A84] px-1">
              <span className="text-[#0F1114] font-semibold">{currentIndex + 1}</span>
              <span>/</span>
              <span>{testimonialsData.length}</span>
            </div>

            <button
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="p-1.5 rounded hover:bg-white transition-colors text-[#0F1114] cursor-pointer"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleNext}
              aria-label="Next testimonial"
              className="p-1.5 rounded hover:bg-white transition-colors text-[#0F1114] cursor-pointer"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Testimonial Active Card */}
        <div className="relative min-h-[260px] bg-white rounded-lg border border-[#8B8A84]/25 p-8 sm:p-12 shadow-sm flex flex-col justify-between">
          <Quote className="w-10 h-10 text-[#FF5B2E]/25 mb-4" />

          {/* Quote Body with smooth transition */}
          <blockquote className="text-xl sm:text-2xl font-serif text-[#0F1114] leading-relaxed mb-8 transition-opacity duration-500 ease-cinematic">
            "{current.quote}"
          </blockquote>

          {/* Testimonial Author & Metric Highlight */}
          <div className="pt-6 border-t border-[#8B8A84]/20 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-base font-semibold text-[#0F1114] font-serif">
                {current.name}
              </div>
              <div className="text-xs font-mono text-[#8B8A84]">
                {current.role} · <strong className="font-medium text-[#0F1114]">{current.organization}</strong>
              </div>
            </div>

            <div className="bg-[#FAF9F5] border border-[#8B8A84]/30 px-3.5 py-1.5 rounded text-xs font-mono text-[#FF5B2E] font-semibold">
              ★ {current.metricHighlight}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
