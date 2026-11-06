import React, { useState } from 'react';
import { outputReportData, siteConfig } from '../data/mockData';
import { Download, FileText, Layers, MapPin, Table, Code, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface OutputsSectionProps {
  onOpenDemoModal: () => void;
}

export const OutputsSection: React.FC<OutputsSectionProps> = ({ onOpenDemoModal }) => {
  const [copiedFormat, setCopiedFormat] = useState<string | null>(null);

  const handleExportClick = (format: string, filename: string) => {
    if (format === 'API') {
      navigator.clipboard.writeText('curl -X POST https://api.chronoterra.ai/v1/detect -H "Authorization: Bearer ct_live_9f82..." -d \'{"aoi_id": "AOI-402"}\'');
      setCopiedFormat('API');
      setTimeout(() => setCopiedFormat(null), 2500);
    } else {
      // Simulate file download
      setCopiedFormat(format);
      setTimeout(() => setCopiedFormat(null), 2500);
    }
  };

  return (
    <section 
      id="outputs"
      className="py-20 sm:py-28 bg-[#FAF9F5] border-b border-[#8B8A84]/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-16">
          <div className="flex items-center gap-2 mb-3 text-xs font-mono tracking-widest text-[#8B8A84] uppercase">
            <span>Evidence-Grade Deliverables</span>
            <span aria-hidden="true">·</span>
            <span>Auditable Formats</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#0F1114] tracking-tight">
            Not just an eye-test. Concrete mathematical proof.
          </h2>
          <p className="mt-4 text-base text-[#0F1114]/75 font-sans leading-relaxed">
            Every run yields an audit-grade ledger: classified spatial polygons, exact square-meter surface deltas, and multi-format exports built for legal compliance and enterprise GIS pipelines.
          </p>
        </div>

        {/* Mock Report Card (FR-7) */}
        <div className="bg-white rounded-lg border border-[#0F1114] shadow-sm overflow-hidden mb-12">
          
          {/* Report Card Header Ribbon */}
          <div className="bg-[#0F1114] px-6 py-4 text-[#F4F1EA] flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5B2E]" />
              <span className="font-semibold text-white tracking-wider">{outputReportData.aoiName}</span>
              <span className="text-[#8B8A84]">·</span>
              <span className="text-[#8B8A84]">{outputReportData.coordinates}</span>
            </div>

            <div className="flex items-center gap-4 text-[#8B8A84]">
              <span>Sensor: {outputReportData.sensorType}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Signed Audit Trail</span>
              </span>
            </div>
          </div>

          {/* Metric Dashboard Columns */}
          <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left 4 cols: Big Headline KPI Numbers with Tabular Figures (frontend design rule) */}
            <div className="md:col-span-5 space-y-6 border-b md:border-b-0 md:border-r border-[#8B8A84]/20 pb-6 md:pb-0 md:pr-8">
              <div>
                <span className="text-xs font-mono text-[#8B8A84] block mb-1">TOTAL AOI SURFACE SHIFT</span>
                <div className="text-4xl sm:text-5xl font-mono font-bold text-[#FF5B2E] tracking-tight tabular-nums">
                  +{outputReportData.percentAreaChanged}%
                </div>
                <p className="text-xs font-mono text-[#0F1114] mt-1">
                  {outputReportData.totalAreaChangedSqM.toLocaleString()} m² verified ground delta
                </p>
              </div>

              <div>
                <span className="text-xs font-mono text-[#8B8A84] block mb-1">CONFIDENCE METRIC</span>
                <div className="text-3xl font-mono font-bold text-[#0F1114] tabular-nums">
                  {outputReportData.confidenceScore}%
                </div>
                <p className="text-xs font-mono text-[#8B8A84] mt-1">
                  Residual error &lt; 0.05m · Sub-pixel registered
                </p>
              </div>

              <div className="pt-4 border-t border-[#8B8A84]/20 text-xs font-mono text-[#8B8A84]">
                <span>Analysis Interval: {outputReportData.baselineDate} → {outputReportData.targetDate}</span>
              </div>
            </div>

            {/* Right 7 cols: Land Classification Breakdown & Polygon Mask Preview */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h4 className="text-xs font-mono font-semibold text-[#0F1114] uppercase tracking-wider mb-4">
                  Classified Surface Breakdown
                </h4>
                
                {/* Visual Stacked Progress Bar */}
                <div className="h-4 w-full rounded bg-[#FAF9F5] border border-[#8B8A84]/30 overflow-hidden flex mb-4">
                  {outputReportData.classes.map((cls) => (
                    <div 
                      key={cls.label}
                      style={{ width: `${cls.percentage}%`, backgroundColor: cls.color }}
                      title={`${cls.label}: ${cls.percentage}%`}
                    />
                  ))}
                </div>

                {/* Class Ledger Rows */}
                <div className="space-y-3 font-mono text-xs">
                  {outputReportData.classes.map((cls) => (
                    <div key={cls.label} className="flex items-center justify-between p-2.5 rounded bg-[#FAF9F5] border border-[#8B8A84]/15">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: cls.color }} />
                        <span className="font-medium text-[#0F1114]">{cls.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-[#0F1114] mr-3 tabular-nums">{cls.percentage}%</span>
                        <span className="text-[#8B8A84] tabular-nums">{cls.areaSqM.toLocaleString()} m²</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Instant Export Triggers (FR-7: PDF, GeoTIFF, CSV, API) */}
              <div className="pt-4 border-t border-[#8B8A84]/20">
                <span className="text-xs font-mono text-[#8B8A84] block mb-3">
                  INTERACTIVE EXPORT SUITE
                </span>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {outputReportData.exportFormats.map((exp) => {
                    const isCopied = copiedFormat === exp.format;

                    return (
                      <button
                        key={exp.format}
                        onClick={() => handleExportClick(exp.format, exp.filename)}
                        className={`p-2.5 rounded border text-left text-xs font-mono transition-colors flex items-center justify-between cursor-pointer ${
                          isCopied 
                            ? 'bg-[#0F1114] text-[#F4F1EA] border-[#0F1114]' 
                            : 'bg-white text-[#0F1114] border-[#8B8A84]/30 hover:border-[#0F1114]'
                        }`}
                      >
                        <div>
                          <span className="font-bold block text-[11px] text-[#FF5B2E]">{exp.format}</span>
                          <span className="text-[10px] text-[#8B8A84] truncate block max-w-[110px]">{exp.label}</span>
                        </div>
                        {isCopied ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        ) : (
                          <Download className="w-3.5 h-3.5 text-[#8B8A84] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Primary CTA after Outputs (FR-7.3) */}
        <div className="text-center pt-2">
          <button
            onClick={onOpenDemoModal}
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded-md transition-colors shadow-sm cursor-pointer group"
          >
            <span>{siteConfig.primaryCtaLabel}</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-2 text-xs font-mono text-[#8B8A84]">
            Test with your own imagery or sample AOI scenes · Confidential SLA
          </p>
        </div>

      </div>
    </section>
  );
};
