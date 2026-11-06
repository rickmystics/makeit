import React, { useState, useEffect } from 'react';
import { siteConfig } from '../data/mockData';
import { ArrowRight } from 'lucide-react';

interface MobileStickyBarProps {
  onOpenDemoModal: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenDemoModal }) => {
  const [showBar, setShowBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show only when scrolled past the hero section (approx 450px)
      if (window.scrollY > 450) {
        setShowBar(true);
      } else {
        setShowBar(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showBar) return null;

  return (
    <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F1114]/95 backdrop-blur-md border-t border-[#8B8A84]/25 px-4 py-2.5 flex items-center justify-between gap-3 shadow-lg">
      <div className="flex flex-col">
        <span className="text-[10px] font-mono text-[#8B8A84]">EVALUATE CHRONOTERRA</span>
        <span className="text-xs font-semibold text-white font-serif">Pilot on your imagery</span>
      </div>

      {/* Label identical: 'Request a demo' */}
      <button
        onClick={onOpenDemoModal}
        className="px-4 py-2 text-xs font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded transition-colors flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
      >
        <span>{siteConfig.primaryCtaLabel}</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
