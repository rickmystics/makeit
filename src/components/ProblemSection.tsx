import React from 'react';
import { problemStatements } from '../data/mockData';

export const ProblemSection: React.FC = () => {
  return (
    <section 
      id="problem" 
      className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#8B8A84]/20 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 sm:mb-20">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>The Observation Dilemma</span>
            <span aria-hidden="true">·</span>
            <span>Current Industry Reality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            Manual imagery comparison is failing technical teams.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            Planners, insurers, agritech operators, and environmental stewards inspect multi-temporal imagery daily. Without automated geometric and phenological normalization, the status quo produces critical blind spots.
          </p>
        </div>

        {/* Three Numbered Statements (FR-3: Revealed line by line) */}
        <div className="space-y-12 sm:space-y-16">
          {problemStatements.map((item) => (
            <div 
              key={item.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-8 border-t border-[#8B8A84]/25 items-start group"
            >
              {/* Number Index */}
              <div className="md:col-span-2">
                <span className="font-mono text-2xl sm:text-3xl font-semibold text-[#8B8A84] group-hover:text-[#FF5B2E] transition-colors">
                  {item.number}
                </span>
              </div>

              {/* Headline */}
              <div className="md:col-span-5">
                <h3 className="text-xl sm:text-2xl font-serif font-semibold text-[#0F1114] leading-snug">
                  {item.headline}
                </h3>
              </div>

              {/* Concrete Detail */}
              <div className="md:col-span-5">
                <p className="text-sm sm:text-base text-[#0F1114]/70 leading-relaxed font-sans">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
