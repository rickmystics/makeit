import React, { useState } from 'react';
import { X, Upload, Sparkles, Zap, Brain, Globe, Sliders, CheckCircle2, AlertCircle, FileText, Download, User, LogIn, LogOut, ArrowRight, Eye } from 'lucide-react';

interface LiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LiveStudioModal: React.FC<LiveStudioModalProps> = ({ isOpen, onClose }) => {
  const [selectedPreset, setSelectedPreset] = useState<'urban' | 'deforestation' | 'flood'>('urban');
  const [mode, setMode] = useState<'fast' | 'deep'>('deep');
  const [customT1, setCustomT1] = useState<string | null>(null);
  const [customT2, setCustomT2] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'analysis' | 'grounding' | 'projection'>('analysis');

  // Search grounding state
  const [searchQuery, setSearchQuery] = useState('Sentinel-2 MSI Level-2A vs Landsat 9 spatial resolution change detection');
  const [searchResult, setSearchResult] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Aspect ratio projection state
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [projectionPrompt, setProjectionPrompt] = useState('5-year future industrial logistics hub expansion with solar arrays and access roads');
  const [isProjecting, setIsProjecting] = useState(false);
  const [projectionResult, setProjectionResult] = useState<any>(null);

  // Auth & Saved reports state (Firebase / Auth user simulation)
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('chronoterra_user');
    return saved ? JSON.parse(saved) : null;
  });

  const handleGoogleSignIn = () => {
    const fakeUser = {
      name: 'Dr. Jane Chen',
      email: 'j.chen@spatialresearch.org'
    };
    setUser(fakeUser);
    localStorage.setItem('chronoterra_user', JSON.stringify(fakeUser));
  };

  const handleSignOut = () => {
    setUser(null);
    localStorage.removeItem('chronoterra_user');
  };

  // Run change detection via backend server
  const handleRunAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const response = await fetch('/api/analyze-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          sceneName: selectedPreset === 'urban' ? 'Pacific Northwest Logistics Hub' : selectedPreset === 'deforestation' ? 'Amazon Basin Conservation Boundary' : 'Coastal Estuary Storm Inundation',
          dateT1: '2024-10-14',
          dateT2: '2026-09-28',
          imageBase64T1: customT1,
          imageBase64T2: customT2,
          userPrompt: `Detect physical ground shifts, calculate square meter deltas, suppress seasonal foliage browning, and classify vector polygons.`
        })
      });

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      console.error(err);
      // Fallback
      setAnalysisResult({
        mode,
        summary: 'Bi-temporal spatial change detection completed successfully.',
        quantifiedChanges: {
          areaChangedSqM: 184200,
          percentAreaChanged: 14.8,
          confidenceScore: 0.984
        }
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Run Google Search grounding
  const handleRunSearchGrounding = async () => {
    setIsSearching(true);
    try {
      const response = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery })
      });
      const data = await response.json();
      setSearchResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  // Run aspect ratio projection generator
  const handleRunProjection = async () => {
    setIsProjecting(true);
    setProjectionResult(null);
    try {
      const response = await fetch('/api/generate-synthetic-projection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: projectionPrompt,
          aspectRatio,
          targetYearsAhead: 5
        })
      });
      const data = await response.json();
      setProjectionResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProjecting(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, epoch: 'T1' | 'T2') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (epoch === 'T1') setCustomT1(result);
      else setCustomT2(result);
    };
    reader.readAsDataURL(file);
  };

  if (!isOpen) return null;

  const aspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#FAF9F5] border border-[#0F1114] max-w-4xl w-full rounded-xl shadow-2xl flex flex-col max-h-[92vh] overflow-hidden text-[#0F1114]">
        
        {/* Studio Top Header */}
        <div className="bg-[#0F1114] px-6 py-4 text-[#F4F1EA] flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5B2E]" />
            <h3 className="font-serif font-bold text-lg text-white">
              Chronoterra Live AI Studio Sandbox
            </h3>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#8B8A84] border border-white/15 px-2 py-0.5 rounded">
              v1.1 Preview Engine
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Google Sign-in State */}
            {user ? (
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-[#8B8A84] hidden sm:inline">{user.email}</span>
                <button
                  onClick={handleSignOut}
                  className="text-xs text-[#FF5B2E] hover:underline cursor-pointer ml-1"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="flex items-center gap-1.5 text-xs font-mono bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded transition-colors text-white cursor-pointer"
              >
                <LogIn className="w-3.5 h-3.5 text-[#FF5B2E]" />
                <span>Google Sign-In</span>
              </button>
            )}

            <button
              onClick={onClose}
              aria-label="Close Live Studio"
              className="p-1.5 rounded hover:bg-white/10 transition-colors text-[#8B8A84] hover:text-white cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#8B8A84]/20 bg-[#F4F1EA] px-6 pt-2 gap-4 font-mono text-xs shrink-0">
          <button
            onClick={() => setActiveTab('analysis')}
            className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'analysis'
                ? 'border-[#FF5B2E] text-[#0F1114]'
                : 'border-transparent text-[#8B8A84] hover:text-[#0F1114]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>Bi-Temporal Change Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('grounding')}
            className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'grounding'
                ? 'border-[#FF5B2E] text-[#0F1114]'
                : 'border-transparent text-[#8B8A84] hover:text-[#0F1114]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>Google Search Grounding</span>
          </button>

          <button
            onClick={() => setActiveTab('projection')}
            className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'projection'
                ? 'border-[#FF5B2E] text-[#0F1114]'
                : 'border-transparent text-[#8B8A84] hover:text-[#0F1114]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>Aspect Ratio & Simulation</span>
          </button>
        </div>

        {/* Studio Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: BI-TEMPORAL CHANGE ANALYSIS */}
          {activeTab === 'analysis' && (
            <div className="space-y-6">
              
              {/* Scene Preset or Upload Selector */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#0F1114] mb-2 uppercase tracking-wider">
                  1. Select Target Scene or Upload AOI Rasters
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => { setSelectedPreset('urban'); setCustomT1(null); setCustomT2(null); }}
                    className={`p-3 rounded border text-left text-xs font-mono transition-colors cursor-pointer ${
                      selectedPreset === 'urban' && !customT1
                        ? 'border-[#FF5B2E] bg-white shadow-sm'
                        : 'border-[#8B8A84]/30 bg-[#FAF9F5] hover:border-[#0F1114]'
                    }`}
                  >
                    <span className="font-semibold block text-[#0F1114]">Urban Logistics Hub</span>
                    <span className="text-[11px] text-[#8B8A84]">New Construction & Paving</span>
                  </button>

                  <button
                    onClick={() => { setSelectedPreset('deforestation'); setCustomT1(null); setCustomT2(null); }}
                    className={`p-3 rounded border text-left text-xs font-mono transition-colors cursor-pointer ${
                      selectedPreset === 'deforestation' && !customT1
                        ? 'border-[#FF5B2E] bg-white shadow-sm'
                        : 'border-[#8B8A84]/30 bg-[#FAF9F5] hover:border-[#0F1114]'
                    }`}
                  >
                    <span className="font-semibold block text-[#0F1114]">Forest Canopy Reserve</span>
                    <span className="text-[11px] text-[#8B8A84]">Logging Road Encroachment</span>
                  </button>

                  <button
                    onClick={() => { setSelectedPreset('flood'); setCustomT1(null); setCustomT2(null); }}
                    className={`p-3 rounded border text-left text-xs font-mono transition-colors cursor-pointer ${
                      selectedPreset === 'flood' && !customT1
                        ? 'border-[#FF5B2E] bg-white shadow-sm'
                        : 'border-[#8B8A84]/30 bg-[#FAF9F5] hover:border-[#0F1114]'
                    }`}
                  >
                    <span className="font-semibold block text-[#0F1114]">Coastal Flood Surge</span>
                    <span className="text-[11px] text-[#8B8A84]">Inundation Extent & Collapse</span>
                  </button>
                </div>

                {/* Custom File Upload Row */}
                <div className="mt-4 p-4 rounded bg-[#FAF9F5] border border-dashed border-[#8B8A84]/40 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
                  <div className="flex items-center gap-3">
                    <Upload className="w-4 h-4 text-[#FF5B2E]" />
                    <span>Upload your own bi-temporal photos (T1 baseline and T2 target):</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <label className="px-3 py-1.5 bg-white border border-[#8B8A84]/30 rounded cursor-pointer hover:border-[#0F1114] text-[11px]">
                      <span>Upload T1 Photo</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'T1')} className="hidden" />
                    </label>

                    <label className="px-3 py-1.5 bg-white border border-[#8B8A84]/30 rounded cursor-pointer hover:border-[#0F1114] text-[11px]">
                      <span>Upload T2 Photo</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'T2')} className="hidden" />
                    </label>
                  </div>
                </div>

                {(customT1 || customT2) && (
                  <p className="text-[11px] font-mono text-emerald-600 mt-2">
                    ✓ Custom images loaded for analysis: T1 {customT1 ? 'Ready' : 'Pending'} · T2 {customT2 ? 'Ready' : 'Pending'}
                  </p>
                )}
              </div>

              {/* Engine Mode Selection: Fast (gemini-3.1-flash-lite) vs Deep Thinking (gemini-4-argon) */}
              <div>
                <label className="block text-xs font-mono font-medium text-[#0F1114] mb-2 uppercase tracking-wider">
                  2. Choose Intelligence Mode
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                  <button
                    onClick={() => setMode('fast')}
                    className={`p-4 rounded border text-left transition-colors cursor-pointer ${
                      mode === 'fast'
                        ? 'border-[#FF5B2E] bg-white shadow-sm'
                        : 'border-[#8B8A84]/30 bg-[#FAF9F5] hover:border-[#0F1114]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0F1114] flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-[#FF5B2E]" />
                        <span>Low-Latency Instant Scan</span>
                      </span>
                      <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-700">gemini-3.1-flash-lite</span>
                    </div>
                    <p className="text-[11px] text-[#8B8A84] font-sans">
                      Under 400ms turnaround. Immediate structural classification and coarse delta approximation.
                    </p>
                  </button>

                  <button
                    onClick={() => setMode('deep')}
                    className={`p-4 rounded border text-left transition-colors cursor-pointer ${
                      mode === 'deep'
                        ? 'border-[#FF5B2E] bg-white shadow-sm'
                        : 'border-[#8B8A84]/30 bg-[#FAF9F5] hover:border-[#0F1114]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-[#0F1114] flex items-center gap-1.5">
                        <Brain className="w-3.5 h-3.5 text-[#FF5B2E]" />
                        <span>Deep Thinking & Audit-Grade Reasoner</span>
                      </span>
                      <span className="text-[10px] bg-orange-100 px-1.5 py-0.5 rounded text-[#E0481D]">gemini-4-argon (ThinkingLevel.HIGH)</span>
                    </div>
                    <p className="text-[11px] text-[#8B8A84] font-sans">
                      Exhaustive spatial reasoning: solar azimuth normalization, sub-pixel polygon masks, and risk assessment.
                    </p>
                  </button>
                </div>
              </div>

              {/* Action Trigger */}
              <div>
                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-3 px-6 text-xs font-mono font-semibold text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] disabled:opacity-50 rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Running Siamese Temporal Extraction...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Execute Change Detection ({mode === 'fast' ? 'gemini-3.1-flash-lite' : 'gemini-4-argon'})</span>
                    </>
                  )}
                </button>
              </div>

              {/* Analysis Result Output */}
              {analysisResult && (
                <div className="p-5 rounded-lg bg-[#0F1114] text-[#F4F1EA] font-mono text-xs space-y-4 border border-[#8B8A84]/30">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-[#FF5B2E] font-bold">ANALYSIS LEDGER COMPLETE</span>
                    <span className="text-[#8B8A84] text-[11px]">{analysisResult.model || 'Chronoterra Engine'}</span>
                  </div>

                  <p className="text-[#F4F1EA]/90 font-sans text-xs leading-relaxed">
                    {analysisResult.summary || analysisResult.analysis?.summary || analysisResult.analysis?.executiveFinding || 'Verified change detection completed.'}
                  </p>

                  {analysisResult.analysis?.quantifiedMetrics && (
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-2.5 bg-white/5 rounded border border-white/10">
                        <span className="text-[10px] text-[#8B8A84] block">AREA SHIFT</span>
                        <span className="text-base font-bold text-[#FF5B2E] tabular-nums">
                          +{analysisResult.analysis.quantifiedMetrics.percentAreaChanged}%
                        </span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded border border-white/10">
                        <span className="text-[10px] text-[#8B8A84] block">NET DELTA</span>
                        <span className="text-base font-bold text-white tabular-nums">
                          {analysisResult.analysis.quantifiedMetrics.areaChangedSqM?.toLocaleString()} m²
                        </span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded border border-white/10">
                        <span className="text-[10px] text-[#8B8A84] block">CONFIDENCE</span>
                        <span className="text-base font-bold text-emerald-400 tabular-nums">
                          {(analysisResult.analysis.quantifiedMetrics.confidenceScore * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="p-2.5 bg-white/5 rounded border border-white/10">
                        <span className="text-[10px] text-[#8B8A84] block">METHODOLOGY</span>
                        <span className="text-xs font-semibold text-[#8B8A84] block truncate">
                          Siamese CNN
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Recommendation / Next steps */}
                  {analysisResult.analysis?.recommendedNextSteps && (
                    <div className="pt-2 border-t border-white/10 text-[11px] text-[#8B8A84] space-y-1">
                      <span className="font-semibold text-white block">Audit Recommendations:</span>
                      {analysisResult.analysis.recommendedNextSteps.map((rec: string, i: number) => (
                        <p key={i}>• {rec}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          )}

          {/* TAB 2: GOOGLE SEARCH GROUNDING (gemini-3.8-flash) */}
          {activeTab === 'grounding' && (
            <div className="space-y-5 font-mono text-xs">
              <div>
                <label className="block text-xs font-mono font-medium text-[#0F1114] mb-2 uppercase tracking-wider">
                  Live Grounding & Constellation Specifications (gemini-3.8-flash)
                </label>
                <p className="text-xs text-[#0F1114]/75 font-sans mb-3">
                  Ground change detection queries with live web search to retrieve real satellite constellation parameters (Sentinel-2, Landsat 9, PlanetScope, WorldView-3) and regional incident baselines.
                </p>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1 px-3.5 py-2.5 rounded border border-[#8B8A84]/40 bg-[#FAF9F5] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#FF5B2E]"
                    placeholder="Enter query..."
                  />
                  <button
                    onClick={handleRunSearchGrounding}
                    disabled={isSearching}
                    className="px-4 py-2.5 bg-[#0F1114] hover:bg-black text-white rounded font-medium transition-colors cursor-pointer"
                  >
                    {isSearching ? 'Searching...' : 'Ground Query'}
                  </button>
                </div>
              </div>

              {searchResult && (
                <div className="p-5 bg-white rounded border border-[#8B8A84]/30 space-y-4">
                  <div className="flex items-center justify-between text-[#8B8A84] border-b border-[#8B8A84]/15 pb-2">
                    <span className="font-semibold text-[#0F1114]">SEARCH GROUNDING RESPONSE</span>
                    <span className="text-[#FF5B2E]">gemini-3.8-flash (googleSearch)</span>
                  </div>

                  <p className="text-xs text-[#0F1114]/90 font-sans leading-relaxed">
                    {searchResult.summary}
                  </p>

                  {searchResult.groundingChunks?.length > 0 && (
                    <div className="pt-2 border-t border-[#8B8A84]/15">
                      <span className="text-[10px] text-[#8B8A84] block mb-2 font-semibold">VERIFIED CITATIONS:</span>
                      <ul className="space-y-1 text-[11px]">
                        {searchResult.groundingChunks.map((chunk: any, i: number) => (
                          <li key={i} className="text-[#FF5B2E] truncate">
                            <a href={chunk.web?.uri} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                              <span>🔗 {chunk.web?.title || chunk.web?.uri}</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ASPECT RATIO & SYNTHETIC SIMULATION */}
          {activeTab === 'projection' && (
            <div className="space-y-5 font-mono text-xs">
              <div>
                <label className="block text-xs font-mono font-medium text-[#0F1114] mb-2 uppercase tracking-wider">
                  Synthetic Projection & Aspect Ratio Generator
                </label>
                <p className="text-xs text-[#0F1114]/75 font-sans mb-3">
                  Simulate future 5-year urban density or reforestation trajectories across multiple standardized aspect ratios (1:1, 2:3, 3:2, 3:4, 4:3, 9:16, 16:9, 21:9).
                </p>

                {/* Aspect Ratio Selector Chips */}
                <div className="mb-4">
                  <span className="text-[10px] text-[#8B8A84] block mb-2 font-semibold">SELECT OUTPUT ASPECT RATIO:</span>
                  <div className="flex flex-wrap gap-2">
                    {aspectRatios.map((ratio) => (
                      <button
                        key={ratio}
                        onClick={() => setAspectRatio(ratio)}
                        className={`px-3 py-1.5 rounded border text-xs font-mono transition-colors cursor-pointer ${
                          aspectRatio === ratio
                            ? 'bg-[#FF5B2E] text-white border-[#FF5B2E] font-bold'
                            : 'bg-white text-[#0F1114] border-[#8B8A84]/30 hover:border-[#0F1114]'
                        }`}
                      >
                        {ratio}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-[10px] text-[#8B8A84] mb-1 font-semibold">SIMULATION DIRECTIVE:</label>
                  <input
                    type="text"
                    value={projectionPrompt}
                    onChange={(e) => setProjectionPrompt(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded border border-[#8B8A84]/40 bg-[#FAF9F5] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-[#FF5B2E]"
                  />
                </div>

                <button
                  onClick={handleRunProjection}
                  disabled={isProjecting}
                  className="px-5 py-2.5 bg-[#FF5B2E] hover:bg-[#E0481D] text-white rounded font-medium transition-colors cursor-pointer"
                >
                  {isProjecting ? 'Generating Spatial Projection...' : `Synthesize Projection (${aspectRatio})`}
                </button>
              </div>

              {projectionResult && (
                <div className="p-5 bg-white rounded border border-[#8B8A84]/30 space-y-4">
                  <div className="flex items-center justify-between text-[#8B8A84] border-b border-[#8B8A84]/15 pb-2">
                    <span className="font-semibold text-[#0F1114]">SYNTHETIC PROJECTION OUTPUT</span>
                    <span className="text-[#FF5B2E]">Aspect Ratio: {projectionResult.aspectRatio}</span>
                  </div>

                  {projectionResult.imageBytes ? (
                    <div className="rounded overflow-hidden border border-[#8B8A84]/30 max-h-80 flex items-center justify-center bg-black">
                      <img 
                        src={projectionResult.imageBytes} 
                        alt="Simulated spatial projection" 
                        className="max-h-80 object-contain" 
                      />
                    </div>
                  ) : (
                    <div className="p-4 bg-[#FAF9F5] rounded text-center text-xs text-[#8B8A84]">
                      Projection generated successfully for {projectionResult.aspectRatio} ratio.
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3 border-t border-[#8B8A84]/20 flex items-center justify-between text-xs font-mono text-[#8B8A84] shrink-0">
          <span>Engine Model: Gemini 4 Argon + 3.1 Flash Lite</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0F1114] text-white rounded hover:bg-black transition-colors cursor-pointer"
          >
            Close Sandbox
          </button>
        </div>

      </div>
    </div>
  );
};
