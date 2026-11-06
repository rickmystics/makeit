import React, { useState } from 'react';
import { siteConfig } from '../data/mockData';
import { Shield, ExternalLink, X } from 'lucide-react';

export const Footer: React.FC = () => {
  const [legalModalOpen, setLegalModalOpen] = useState<'privacy' | 'terms' | null>(null);

  return (
    <footer className="bg-[#0F1114] text-[#F4F1EA] py-16 border-t border-[#8B8A84]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Description (4 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5B2E]" />
              <span className="text-xl font-bold font-serif tracking-tight text-white">
                {siteConfig.brandName}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-[#8B8A84] font-sans leading-relaxed max-w-sm">
              Precision temporal image change detection for satellite, aerial, and drone imagery. Eliminating seasonal false alarms and manual analyst bottlenecks down to the square meter.
            </p>

            <div className="pt-2 text-xs font-mono text-[#8B8A84]">
              <span>Inquiries: </span>
              <a href="mailto:solutions@chronoterra.ai" className="text-white hover:text-[#FF5B2E] transition-colors">
                solutions@chronoterra.ai
              </a>
            </div>
          </div>

          {/* Site Navigation Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 font-mono text-xs">
            <div className="text-[#8B8A84] uppercase tracking-wider font-semibold mb-2">
              Navigation
            </div>
            <ul className="space-y-2">
              <li><a href="#how-it-works" className="hover:text-[#FF5B2E] transition-colors">01. How it works</a></li>
              <li><a href="#timeline-demo" className="hover:text-[#FF5B2E] transition-colors">02. Timeline Scrubber</a></li>
              <li><a href="#use-cases" className="hover:text-[#FF5B2E] transition-colors">03. Use Cases</a></li>
              <li><a href="#outputs" className="hover:text-[#FF5B2E] transition-colors">04. Deliverables & Output</a></li>
              <li><a href="#comparison" className="hover:text-[#FF5B2E] transition-colors">05. Manual vs Chronoterra</a></li>
              <li><a href="#faq" className="hover:text-[#FF5B2E] transition-colors">06. FAQ & Architecture</a></li>
            </ul>
          </div>

          {/* Compliance & Standards (4 cols) */}
          <div className="md:col-span-4 space-y-3 font-mono text-xs">
            <div className="text-[#8B8A84] uppercase tracking-wider font-semibold mb-2">
              Compliance & Security
            </div>
            <p className="text-[#8B8A84] font-sans text-xs leading-relaxed">
              Engineered for defense, reinsurance, and municipal sovereignty. Imagery is processed in ephemeral sandboxes with zero client data retention unless requested.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-[#F4F1EA]">SOC 2 Type II</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-[#F4F1EA]">GDPR / DPDP</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-[#F4F1EA]">ITAR Option</span>
              <span className="px-2 py-1 rounded bg-white/5 border border-white/10 text-[11px] text-[#F4F1EA]">OGC Compliant</span>
            </div>
          </div>

        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#8B8A84]">
          <div>
            © {new Date().getFullYear()} Chronoterra Geospatial Inc. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setLegalModalOpen('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button 
              onClick={() => setLegalModalOpen('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <span>API Specs</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

      {/* Legal Dialog Modal */}
      {legalModalOpen && (
        <div 
          role="dialog" 
          aria-modal="true" 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-[#0F1114] border border-[#8B8A84]/40 max-w-lg w-full p-6 sm:p-8 rounded-lg text-[#F4F1EA] space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-serif font-bold">
                {legalModalOpen === 'privacy' ? 'Chronoterra Privacy Policy' : 'Terms of Service'}
              </h3>
              <button 
                onClick={() => setLegalModalOpen(null)}
                className="p-1 hover:bg-white/10 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs font-sans text-[#8B8A84] space-y-3 leading-relaxed max-h-72 overflow-y-auto pr-2">
              <p>
                <strong>1. Data Minimization:</strong> Chronoterra processes uploaded satellite, aerial, and drone imagery strictly for bi-temporal delta calculations. Unless enterprise persistence is provisioned, raw raster tiles are purged immediately following report export.
              </p>
              <p>
                <strong>2. Geographic Sovereignty:</strong> Customer-designated compute regions ensure imagery stays within jurisdictional boundaries (US-East, EU-Central, or on-premises edge nodes).
              </p>
              <p>
                <strong>3. Service Guarantee:</strong> SLA ensures 99.9% API uptime for automated ingest and less than 1.5s latency per 1,000 hectares for standard sub-pixel inference.
              </p>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setLegalModalOpen(null)}
                className="px-4 py-2 bg-[#FF5B2E] text-white text-xs font-mono rounded cursor-pointer"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
