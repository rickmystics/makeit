import React, { useState } from 'react';
import { faqData } from '../data/mockData';
import { Plus, Minus, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleItem = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section 
      id="faq"
      className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>Frequently Asked Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Technical Specifications</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            Everything you need to evaluate Chronoterra.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            Detailed answers regarding sensor constellations, sub-pixel accuracy, data sovereignty, and API architecture.
          </p>
        </div>

        {/* Accordion List (FR-10: One item open at a time, full ARIA support) */}
        <div className="space-y-3">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            const buttonId = `faq-btn-${item.id}`;
            const panelId = `faq-panel-${item.id}`;

            return (
              <div 
                key={item.id}
                className="bg-[#FAF9F5] rounded-lg border border-[#8B8A84]/25 overflow-hidden transition-colors"
              >
                <h3>
                  <button
                    type="button"
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleItem(idx)}
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]/50 group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-[#8B8A84] group-hover:text-[#FF5B2E] transition-colors">
                        0{idx + 1}
                      </span>
                      <span className="text-base sm:text-lg font-serif font-semibold text-[#0F1114] group-hover:text-[#FF5B2E] transition-colors">
                        {item.question}
                      </span>
                    </div>

                    <div className="w-7 h-7 rounded-full bg-white border border-[#8B8A84]/30 flex items-center justify-center shrink-0 text-[#0F1114] group-hover:border-[#FF5B2E]">
                      {isOpen ? (
                        <Minus className="w-3.5 h-3.5 text-[#FF5B2E]" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-[#0F1114]" />
                      )}
                    </div>
                  </button>
                </h3>

                {/* Animated Accordion Panel */}
                {isOpen && (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#0F1114]/80 leading-relaxed font-sans border-t border-[#8B8A84]/15"
                  >
                    <div className="pt-2">
                      <span className="inline-block text-[11px] font-mono text-[#FF5B2E] uppercase tracking-wider mb-2">
                        {item.category}
                      </span>
                      <p>{item.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
