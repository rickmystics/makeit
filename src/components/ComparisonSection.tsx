import React from 'react';
import { comparisonData, siteConfig } from '../data/mockData';
import { Check, X, ArrowRight } from 'lucide-react';

export const ComparisonSection: React.FC = () => {
  return (
    <section 
      id="comparison"
      className="py-20 sm:py-28 bg-[#F4F1EA] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>Rigorous Benchmarks</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Contrast</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            Manual visual inspection vs. Chronoterra.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            Comparing conventional GIS analyst review workflows with our automated bi-temporal neural co-registration engine.
          </p>
        </div>

        {/* Two-Column Comparison Table (FR-8) */}
        <div className="border border-[#8B8A84]/25 rounded-lg bg-[#FAF9F5] overflow-hidden shadow-sm">
          
          {/* Header Row */}
          <div className="grid grid-cols-12 bg-[#0F1114] text-[#F4F1EA] px-6 py-4 font-mono text-xs border-b border-[#8B8A84]/30">
            <div className="col-span-3 sm:col-span-3 text-[#8B8A84] uppercase tracking-wider">
              Dimension
            </div>
            <div className="col-span-4 sm:col-span-4 text-[#8B8A84] uppercase tracking-wider">
              Manual Review Workflow
            </div>
            <div className="col-span-5 sm:col-span-5 text-[#FF5B2E] font-semibold uppercase tracking-wider flex items-center justify-between">
              <span>{siteConfig.brandName} Engine</span>
              <span className="hidden sm:inline text-[10px] text-emerald-400">BENCHMARKED DELTA</span>
            </div>
          </div>

          {/* Table Data Rows */}
          <div className="divide-y divide-[#8B8A84]/20">
            {comparisonData.map((row) => (
              <div 
                key={row.dimension}
                className="grid grid-cols-12 px-6 py-5 items-center gap-4 hover:bg-white transition-colors"
              >
                {/* Column 1: Dimension */}
                <div className="col-span-12 sm:col-span-3 font-serif font-semibold text-[#0F1114] text-base">
                  {row.dimension}
                </div>

                {/* Column 2: Manual Review */}
                <div className="col-span-12 sm:col-span-4 text-xs sm:text-sm text-[#0F1114]/70 font-sans flex items-start gap-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.manualReview}</span>
                </div>

                {/* Column 3: Chronoterra Advantage */}
                <div className="col-span-12 sm:col-span-5 text-xs sm:text-sm text-[#0F1114] font-sans flex items-start justify-between gap-3 bg-[#FAF9F5] sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-[#8B8A84]/20">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF5B2E] shrink-0 mt-0.5" />
                    <span className="font-medium">{row.chronoterra}</span>
                  </div>
                  <span className="text-[11px] font-mono font-bold text-[#FF5B2E] whitespace-nowrap shrink-0 hidden md:inline">
                    {row.advantageRatio}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
