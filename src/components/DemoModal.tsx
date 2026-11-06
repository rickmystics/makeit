import React from 'react';
import { X, Calendar, Shield, Clock } from 'lucide-react';
import { siteConfig } from '../data/mockData';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScrollToForm: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ isOpen, onClose, onScrollToForm }) => {
  if (!isOpen) return null;

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
    >
      <div className="bg-[#FAF9F5] border border-[#0F1114] max-w-lg w-full rounded-lg shadow-2xl p-6 sm:p-8 text-[#0F1114] relative">
        <button
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 p-1.5 rounded hover:bg-[#8B8A84]/20 transition-colors text-[#0F1114] cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2 text-xs font-mono text-[#FF5B2E] uppercase tracking-wider font-semibold">
          <Calendar className="w-3.5 h-3.5" />
          <span>Priority Technical Demonstration</span>
        </div>

        <h3 className="text-2xl font-serif font-bold text-[#0F1114] mb-3">
          {siteConfig.primaryCtaLabel}
        </h3>

        <p className="text-xs sm:text-sm text-[#0F1114]/75 font-sans leading-relaxed mb-6">
          Connect with a senior geospatial engineer to test Chronoterra on your specific sensor constellation, area of interest, or custom drone orthomosaics.
        </p>

        <div className="space-y-3 font-mono text-xs text-[#0F1114]/80 p-4 bg-white rounded border border-[#8B8A84]/20 mb-6">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#FF5B2E]" />
            <span>30-minute tailored screen share with live AOI processing</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#FF5B2E]" />
            <span>Strict NDA coverage · Zero raw imagery retention</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => {
              onClose();
              onScrollToForm();
            }}
            className="flex-1 py-3 px-4 text-xs font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded transition-colors text-center cursor-pointer font-sans"
          >
            Complete Lead Form Below ↓
          </button>
          <button
            onClick={onClose}
            className="py-3 px-4 text-xs font-mono text-[#8B8A84] hover:text-[#0F1114] border border-[#8B8A84]/30 rounded text-center cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
