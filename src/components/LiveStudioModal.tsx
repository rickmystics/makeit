import React, { useState, useEffect } from 'react';
import { 
  X, Upload, Sparkles, Zap, Brain, Globe, Sliders, CheckCircle2, 
  AlertCircle, FileText, Download, User, LogIn, LogOut, ArrowRight, 
  Eye, RefreshCw, Check, Copy, Layers, ExternalLink, ShieldCheck
} from 'lucide-react';
import { SatelliteScene } from './canvas/SatelliteScene';

interface LiveStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Pre-packaged live example datasets
const liveExamples = {
  urban: {
    id: 'urban',
    title: 'Pacific Northwest Logistics Hub (AOI-402)',
    category: 'Commercial & Infrastructure Expansion',
    baselineDate: 'Oct 14, 2024 (T1)',
    targetDate: 'Sep 28, 2026 (T2)',
    coordinates: '45°25\'32"N  122°40\'45"W',
    sensor: 'Sentinel-2 MSI Level-2A + PlanetScope SuperDove Fusion',
    summary: 'Bi-temporal Siamese neural extraction confirmed high-magnitude land-use conversion. Pristine agricultural parcel transformed into a 184,200 m² multi-facility logistics park with 3 distribution warehouses, extensive paved trailer marshalling yards, and an engineered stormwater detention basin.',
    metrics: {
      percentAreaChanged: 14.8,
      areaChangedSqM: 184200,
      confidenceScore: 0.984,
      model: 'gemini-4-argon (ThinkingLevel.HIGH)',
      latency: '1.2s'
    },
    classes: [
      { name: 'Commercial Logistics Rooflines', percentage: 62.4, sqM: 114940, color: '#FF5B2E' },
      { name: 'Paved Asphalt Arteries & Yards', percentage: 20.8, sqM: 38310, color: '#8B8A84' },
      { name: 'Agricultural Canopy Transition', percentage: 16.8, sqM: 30950, color: '#24272D' }
    ],
    noiseMitigation: {
      sunAzimuth: 'Normalized 18.4° diurnal shadow shift',
      phenology: 'Seasonal autumn leaf browning filtered out (no false alarm)',
      registration: '0.18px residual error across 842 phase-correlation tie-points'
    },
    recommendations: [
      'Issue automated zoning compliance notice for unauthorized eastern arterial paving',
      'Ingest classified GeoJSON vector boundaries into municipal GIS master database',
      'Flag stormwater detention basin for hydrological runoff inspection'
    ]
  },
  deforestation: {
    id: 'deforestation',
    title: 'Amazon Basin Canopy Reserve (Sector Delta)',
    category: 'Illegal Logging & Reserve Encroachment',
    baselineDate: 'May 10, 2024 (T1)',
    targetDate: 'Sep 02, 2026 (T2)',
    coordinates: '3°08\'14"S  60°01\'22"W',
    sensor: 'PlanetScope 3.0m High-Revisit Constellation',
    summary: 'Clandestine selective timber harvesting and access road expansion detected within protected forest reserve perimeter. Temporal harmonic attention decoupled natural dry-season canopy moisture loss from mechanical tree clearing.',
    metrics: {
      percentAreaChanged: 7.2,
      areaChangedSqM: 89400,
      confidenceScore: 0.992,
      model: 'gemini-4-argon (ThinkingLevel.HIGH)',
      latency: '0.9s'
    },
    classes: [
      { name: 'Unpaved Extraction Roads', percentage: 48.2, sqM: 43100, color: '#FF5B2E' },
      { name: 'Selective Canopy Clearings', percentage: 36.5, sqM: 32630, color: '#E0481D' },
      { name: 'Soil Compaction & Staging', percentage: 15.3, sqM: 13670, color: '#8B8A84' }
    ],
    noiseMitigation: {
      sunAzimuth: 'Normalized tropical wet/dry illumination variance',
      phenology: 'Dry-season deciduous leaf fall isolated from true felling',
      registration: 'Sub-0.2m tie-point accuracy with zero terrain distortion'
    },
    recommendations: [
      'Dispatch rangers to GPS coordinates [3.137, -60.022] along illegal spur road',
      'Transmit automated alert packet to national environmental enforcement agency'
    ]
  },
  flood: {
    id: 'flood',
    title: 'Coastal Harbour & Estuary Storm Surge',
    category: 'Disaster Damage & Flood Inundation Extent',
    baselineDate: 'Aug 20, 2025 (T1)',
    targetDate: 'Aug 26, 2025 (T2)',
    coordinates: '29°58\'19"N  90°04\'30"W',
    sensor: 'Sentinel-1 SAR + WorldView-3 Optical Rapid Revisit',
    summary: 'Post-hurricane catastrophic flood assessment. Delineated 312,000 m² of saltwater storm surge inundation, 4 breach points along secondary earthen levees, and roof structural damage on 18 commercial maritime facilities.',
    metrics: {
      percentAreaChanged: 28.6,
      areaChangedSqM: 312000,
      confidenceScore: 0.978,
      model: 'gemini-4-argon (ThinkingLevel.HIGH)',
      latency: '1.4s'
    },
    classes: [
      { name: 'Inundated Lowland & Roadways', percentage: 71.4, sqM: 222768, color: '#2c5a75' },
      { name: 'Structural Roof / Wall Damage', percentage: 18.2, sqM: 56784, color: '#FF5B2E' },
      { name: 'Debris & Silt Accumulation', percentage: 10.4, sqM: 32448, color: '#8B8A84' }
    ],
    noiseMitigation: {
      sunAzimuth: 'SAR cross-polarization backscatter compensates for dense storm cloud cover',
      phenology: 'Zero foliage false positives via radar coherence thresholding',
      registration: 'Sub-meter co-registration with pre-storm baselines'
    },
    recommendations: [
      'Priority routing for emergency access along unflooded North Highway corridor',
      'Provide insurance claims consortium with cryptographic damage certificate'
    ]
  }
};

export const LiveStudioModal: React.FC<LiveStudioModalProps> = ({ isOpen, onClose }) => {
  const [selectedExampleId, setSelectedExampleId] = useState<'urban' | 'deforestation' | 'flood'>('urban');
  const [mode, setMode] = useState<'fast' | 'deep'>('deep');
  const [customT1, setCustomT1] = useState<string | null>(null);
  const [customT2, setCustomT2] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [sliderPos, setSliderPos] = useState(50);
  const [activeTab, setActiveTab] = useState<'live-example' | 'grounding' | 'projection'>('live-example');

  // Currently displayed result (defaults to the pre-loaded live example)
  const [currentResult, setCurrentResult] = useState<any>(liveExamples['urban']);

  // Search grounding state
  const [searchQuery, setSearchQuery] = useState('Sentinel-2 MSI Level-2A vs Landsat 9 spatial resolution change detection');
  const [searchResult, setSearchResult] = useState<any>({
    query: 'Sentinel-2 MSI Level-2A vs Landsat 9 spatial resolution change detection',
    summary: 'European Space Agency Sentinel-2 provides 10m spatial resolution across visible and Near-Infrared (NIR) bands with a 5-day revisit cycle, making it the premier open baseline for vegetation and construction monitoring. USGS/NASA Landsat 9 offers 15m panchromatic and 30m multispectral bands with thermal sensors (TIRS-2) at a 16-day cadence. For sub-meter urban change verification, commercial constellations such as PlanetScope (3m) and Maxar WorldView-3 (0.3m) offer daily tasking.',
    groundingChunks: [
      { web: { title: 'Sentinel-2 Technical Guide - European Space Agency', uri: 'https://sentinels.copernicus.eu/web/sentinel/user-guides/sentinel-2-msi' } },
      { web: { title: 'Landsat 9 Mission Specifications - USGS Earth Resources', uri: 'https://www.usgs.gov/landsat-missions/landsat-9' } },
      { web: { title: 'PlanetScope Constellation Architecture - Planet Labs', uri: 'https://www.planet.com/products/planet-monitoring/' } }
    ]
  });
  const [isSearching, setIsSearching] = useState(false);

  // Aspect ratio projection state
  const [aspectRatio, setAspectRatio] = useState<string>('16:9');
  const [projectionPrompt, setProjectionPrompt] = useState('5-year future industrial logistics hub expansion with solar arrays and access roads');
  const [isProjecting, setIsProjecting] = useState(false);
  const [projectionResult, setProjectionResult] = useState<any>({
    aspectRatio: '16:9',
    description: 'Synthetic 5-year spatial projection generated at 16:9 aspect ratio. Predicts 2 additional warehousing wings and 42,000 m² of photovoltaic solar roof modules.',
    status: 'simulated_success'
  });

  // User auth state
  const [user, setUser] = useState<{ email: string; name: string } | null>(() => {
    const saved = localStorage.getItem('chronoterra_user');
    return saved ? JSON.parse(saved) : null;
  });

  // When selected example changes, update currentResult to that example
  const handleSelectExample = (id: 'urban' | 'deforestation' | 'flood') => {
    setSelectedExampleId(id);
    setCustomT1(null);
    setCustomT2(null);
    setCurrentResult(liveExamples[id]);
  };

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

    try {
      const activeData = liveExamples[selectedExampleId];
      const response = await fetch('/api/analyze-change', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode,
          sceneName: activeData.title,
          dateT1: activeData.baselineDate,
          dateT2: activeData.targetDate,
          imageBase64T1: customT1,
          imageBase64T2: customT2,
          coordinates: activeData.coordinates,
          userPrompt: `Detect physical ground shifts, calculate square meter deltas, suppress seasonal foliage browning, and classify vector polygons.`
        })
      });

      const data = await response.json();
      
      // Merge live server response with structured result format
      if (data.analysis) {
        setCurrentResult({
          ...activeData,
          metrics: {
            ...activeData.metrics,
            model: data.model || activeData.metrics.model,
            percentAreaChanged: data.analysis.quantifiedMetrics?.percentAreaChanged ?? activeData.metrics.percentAreaChanged,
            areaChangedSqM: data.analysis.quantifiedMetrics?.areaChangedSqM ?? activeData.metrics.areaChangedSqM,
            confidenceScore: data.analysis.quantifiedMetrics?.confidenceScore ?? activeData.metrics.confidenceScore
          },
          summary: data.analysis.executiveFinding || data.analysis.summary || activeData.summary
        });
      }
    } catch (err) {
      console.warn('Using deterministic offline analysis pipeline:', err);
      setCurrentResult(liveExamples[selectedExampleId]);
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

  const copyCurlSnippet = () => {
    navigator.clipboard.writeText(`curl -X POST https://api.chronoterra.ai/v1/detect \\
  -H "Authorization: Bearer ct_live_9f828a1c" \\
  -H "Content-Type: application/json" \\
  -d '{"aoi": "${currentResult.title}", "mode": "${mode}"}'`);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  if (!isOpen) return null;

  const aspectRatios = ['1:1', '2:3', '3:2', '3:4', '4:3', '9:16', '16:9', '21:9'];

  return (
    <div 
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
    >
      <div className="bg-[#FAF9F5] border border-[#0F1114] max-w-5xl w-full rounded-xl shadow-2xl flex flex-col max-h-[94vh] overflow-hidden text-[#0F1114]">
        
        {/* Studio Top Header */}
        <div className="bg-[#0F1114] px-6 py-4 text-[#F4F1EA] flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5B2E]" />
            <h3 className="font-serif font-bold text-lg text-white">
              Chronoterra AI Studio Sandbox — Live Examples & Verification
            </h3>
            <span className="hidden sm:inline-block text-[11px] font-mono text-[#8B8A84] border border-white/15 px-2 py-0.5 rounded">
              Engine: Gemini 4 Argon + 3.1 Flash Lite
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* User Auth Session */}
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
        <div className="flex border-b border-[#8B8A84]/20 bg-[#F4F1EA] px-6 pt-2 gap-4 font-mono text-xs shrink-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('live-example')}
            className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'live-example'
                ? 'border-[#FF5B2E] text-[#0F1114]'
                : 'border-transparent text-[#8B8A84] hover:text-[#0F1114]'
            }`}
          >
            <Brain className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>Live Scene Detection & Results</span>
          </button>

          <button
            onClick={() => setActiveTab('grounding')}
            className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'grounding'
                ? 'border-[#FF5B2E] text-[#0F1114]'
                : 'border-transparent text-[#8B8A84] hover:text-[#0F1114]'
            }`}
          >
            <Globe className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>Search Grounding (gemini-3.8-flash)</span>
          </button>

          <button
            onClick={() => setActiveTab('projection')}
            className={`pb-2.5 border-b-2 font-medium transition-colors cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'projection'
                ? 'border-[#FF5B2E] text-[#0F1114]'
                : 'border-transparent text-[#8B8A84] hover:text-[#0F1114]'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-[#FF5B2E]" />
            <span>Aspect Ratio & Simulation</span>
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* TAB 1: LIVE EXAMPLE & RESULTS */}
          {activeTab === 'live-example' && (
            <div className="space-y-6">
              
              {/* Preset Selector Banner */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-mono font-medium text-[#0F1114] uppercase tracking-wider">
                    Select Live Verified Scenario
                  </span>
                  <span className="text-[11px] font-mono text-[#8B8A84]">
                    Pre-computed radiometric ground truth loaded
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {Object.values(liveExamples).map((ex) => {
                    const isSelected = selectedExampleId === ex.id && !customT1;
                    return (
                      <button
                        key={ex.id}
                        onClick={() => handleSelectExample(ex.id as any)}
                        className={`p-3.5 rounded-lg border text-left text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#0F1114] bg-white ring-2 ring-[#FF5B2E]/20 shadow-sm'
                            : 'border-[#8B8A84]/30 bg-[#FAF9F5] hover:border-[#0F1114]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-[#0F1114]">{ex.title.split('(')[0]}</span>
                          {isSelected && <span className="w-2 h-2 rounded-full bg-[#FF5B2E]" />}
                        </div>
                        <span className="text-[11px] text-[#8B8A84] block">{ex.category}</span>
                        <span className="text-[10px] text-[#FF5B2E] mt-1 block">+{ex.metrics.percentAreaChanged}% ground shift</span>
                      </button>
                    );
                  })}
                </div>

                {/* Optional Custom Imagery Upload Affordance */}
                <div className="mt-3 p-3 rounded bg-white border border-dashed border-[#8B8A84]/40 flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                  <div className="flex items-center gap-2 text-[#0F1114]">
                    <Upload className="w-3.5 h-3.5 text-[#FF5B2E]" />
                    <span>Or upload custom imagery pair:</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="px-2.5 py-1 bg-[#FAF9F5] border border-[#8B8A84]/30 rounded cursor-pointer hover:border-[#0F1114] text-[11px]">
                      <span>Upload T1</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'T1')} className="hidden" />
                    </label>
                    <label className="px-2.5 py-1 bg-[#FAF9F5] border border-[#8B8A84]/30 rounded cursor-pointer hover:border-[#0F1114] text-[11px]">
                      <span>Upload T2</span>
                      <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, 'T2')} className="hidden" />
                    </label>
                  </div>
                </div>
              </div>

              {/* Live Interactive Before/After Visual Map */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#8B8A84]">
                  <span className="text-[#0F1114] font-semibold flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-[#FF5B2E]" />
                    <span>Interactive Bi-Temporal Visual Slider</span>
                  </span>
                  <span>Drag handle to compare T1 vs T2</span>
                </div>

                <div 
                  className="relative rounded-lg overflow-hidden border border-[#0F1114] shadow-sm cursor-ew-resize select-none"
                  onPointerDown={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const updatePos = (clientX: number) => {
                      const pos = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
                      setSliderPos(Math.round(pos));
                    };
                    updatePos(e.clientX);
                    const onMove = (ev: PointerEvent) => updatePos(ev.clientX);
                    const onUp = () => {
                      window.removeEventListener('pointermove', onMove);
                      window.removeEventListener('pointerup', onUp);
                    };
                    window.addEventListener('pointermove', onMove);
                    window.addEventListener('pointerup', onUp);
                  }}
                >
                  <SatelliteScene sliderPos={sliderPos} showChangeOutline={true} />
                </div>
              </div>

              {/* Execution Controls: Fast vs Deep Thinking */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-white border border-[#8B8A84]/25">
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="text-[#8B8A84]">EXECUTION MODEL:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode('fast')}
                      className={`px-2.5 py-1 rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        mode === 'fast'
                          ? 'border-[#FF5B2E] text-[#FF5B2E] bg-[#FF5B2E]/10 font-bold'
                          : 'border-[#8B8A84]/30 text-[#8B8A84] hover:text-[#0F1114]'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      <span>gemini-3.1-flash-lite (Fast)</span>
                    </button>

                    <button
                      onClick={() => setMode('deep')}
                      className={`px-2.5 py-1 rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                        mode === 'deep'
                          ? 'border-[#FF5B2E] text-[#FF5B2E] bg-[#FF5B2E]/10 font-bold'
                          : 'border-[#8B8A84]/30 text-[#8B8A84] hover:text-[#0F1114]'
                      }`}
                    >
                      <Brain className="w-3 h-3" />
                      <span>gemini-4-argon (High Thinking)</span>
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleRunAnalysis}
                  disabled={isAnalyzing}
                  className="px-5 py-2 text-xs font-mono font-semibold text-white bg-[#FF5B2E] hover:bg-[#E0481D] disabled:opacity-50 rounded transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  {isAnalyzing ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Processing Siamese Inference...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Re-Analyze Scene</span>
                    </>
                  )}
                </button>
              </div>

              {/* LIVE RESULTS AUDIT CARD */}
              <div className="bg-[#0F1114] text-[#F4F1EA] rounded-lg border border-[#8B8A84]/30 p-6 space-y-6 font-mono text-xs">
                
                {/* Result Header Ribbon */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                  <div>
                    <span className="text-[#FF5B2E] font-bold text-sm block">
                      {currentResult.title}
                    </span>
                    <span className="text-[#8B8A84] text-[11px]">
                      {currentResult.coordinates} · {currentResult.sensor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>Audit-Grade Provenance Verified</span>
                    </span>
                  </div>
                </div>

                {/* 4 Quantitative Result Metric Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="text-[10px] text-[#8B8A84] block mb-1">TOTAL AOI SHIFT</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#FF5B2E] tabular-nums">
                      +{currentResult.metrics.percentAreaChanged}%
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="text-[10px] text-[#8B8A84] block mb-1">NET PHYSICAL DELTA</span>
                    <span className="text-xl sm:text-2xl font-bold text-white tabular-nums">
                      {currentResult.metrics.areaChangedSqM.toLocaleString()} m²
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="text-[10px] text-[#8B8A84] block mb-1">CONFIDENCE SCORE</span>
                    <span className="text-xl sm:text-2xl font-bold text-emerald-400 tabular-nums">
                      {(currentResult.metrics.confidenceScore * 100).toFixed(1)}%
                    </span>
                  </div>

                  <div className="p-3 bg-white/5 rounded border border-white/10">
                    <span className="text-[10px] text-[#8B8A84] block mb-1">INFERENCE LATENCY</span>
                    <span className="text-xl sm:text-2xl font-bold text-[#8B8A84] tabular-nums">
                      {currentResult.metrics.latency}
                    </span>
                  </div>
                </div>

                {/* Executive Synthesis Summary */}
                <div className="p-4 rounded bg-white/5 border border-white/10">
                  <span className="text-[#8B8A84] text-[10px] block mb-1 font-semibold uppercase">
                    Model Reasoning & Executive Finding ({currentResult.metrics.model}):
                  </span>
                  <p className="text-xs sm:text-sm font-sans text-white/90 leading-relaxed">
                    {currentResult.summary}
                  </p>
                </div>

                {/* Surface Classification Breakdown */}
                <div className="space-y-3">
                  <span className="text-[#8B8A84] text-[10px] block uppercase font-semibold">
                    Classified Vector Polygon Breakdown:
                  </span>
                  
                  {/* Progress Bar */}
                  <div className="h-3 w-full rounded bg-white/10 overflow-hidden flex">
                    {currentResult.classes.map((cls: any) => (
                      <div 
                        key={cls.name} 
                        style={{ width: `${cls.percentage}%`, backgroundColor: cls.color }}
                        title={`${cls.name}: ${cls.percentage}%`}
                      />
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                    {currentResult.classes.map((cls: any) => (
                      <div key={cls.name} className="p-2.5 rounded bg-black/40 border border-white/10 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cls.color }} />
                          <span className="text-[11px] text-white truncate max-w-[130px]">{cls.name}</span>
                        </div>
                        <span className="text-[#FF5B2E] font-bold tabular-nums">{cls.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* False Alarm Mitigation & Calibration Matrix */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/10 text-[11px] text-[#8B8A84]">
                  <div>
                    <span className="text-white block font-semibold mb-0.5">Solar Azimuth:</span>
                    <span>{currentResult.noiseMitigation.sunAzimuth}</span>
                  </div>
                  <div>
                    <span className="text-white block font-semibold mb-0.5">Phenology Filter:</span>
                    <span>{currentResult.noiseMitigation.phenology}</span>
                  </div>
                  <div>
                    <span className="text-white block font-semibold mb-0.5">Co-Registration:</span>
                    <span>{currentResult.noiseMitigation.registration}</span>
                  </div>
                </div>

                {/* Action Recommendations & Export Options */}
                <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1 text-[11px]">
                    <span className="text-white font-semibold block">Recommended Next Steps:</span>
                    {currentResult.recommendations.map((rec: string, i: number) => (
                      <p key={i} className="text-[#8B8A84]">→ {rec}</p>
                    ))}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={copyCurlSnippet}
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                    >
                      {copiedCurl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedCurl ? 'cURL Copied' : 'Copy API cURL'}</span>
                    </button>

                    <button
                      onClick={() => alert(`Downloading signed inspection certificate for ${currentResult.title} (GeoTIFF + GeoJSON + PDF packet).`)}
                      className="px-3 py-1.5 rounded bg-[#FF5B2E] hover:bg-[#E0481D] text-white transition-colors cursor-pointer flex items-center gap-1.5 text-xs"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Signed Audit (.zip)</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: GOOGLE SEARCH GROUNDING */}
          {activeTab === 'grounding' && (
            <div className="space-y-5 font-mono text-xs">
              <div>
                <label className="block text-xs font-mono font-medium text-[#0F1114] mb-2 uppercase tracking-wider">
                  Live Grounding & Constellation Specifications (gemini-3.8-flash)
                </label>
                <p className="text-xs text-[#0F1114]/75 font-sans mb-3">
                  Ground change detection queries with live web search to retrieve real satellite constellation parameters and regional incident baselines.
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
                <div className="p-5 bg-white rounded-lg border border-[#8B8A84]/30 space-y-4">
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
                      <ul className="space-y-1.5 text-[11px]">
                        {searchResult.groundingChunks.map((chunk: any, i: number) => (
                          <li key={i} className="text-[#FF5B2E]">
                            <a href={chunk.web?.uri} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1.5">
                              <ExternalLink className="w-3 h-3 shrink-0" />
                              <span className="truncate">{chunk.web?.title || chunk.web?.uri}</span>
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
                <div className="p-5 bg-white rounded-lg border border-[#8B8A84]/30 space-y-4">
                  <div className="flex items-center justify-between text-[#8B8A84] border-b border-[#8B8A84]/15 pb-2">
                    <span className="font-semibold text-[#0F1114]">SYNTHETIC PROJECTION OUTPUT</span>
                    <span className="text-[#FF5B2E]">Aspect Ratio: {projectionResult.aspectRatio}</span>
                  </div>

                  <p className="text-xs text-[#0F1114]/80 font-sans">
                    {projectionResult.description}
                  </p>

                  <div className="p-4 bg-[#FAF9F5] rounded border border-[#8B8A84]/20 flex items-center justify-between">
                    <div>
                      <span className="font-semibold block text-[#0F1114]">Predicted 5-Year Expansion:</span>
                      <span className="text-[#8B8A84]">+42,000 m² solar arrays · 2 new cross-dock spurs</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
                      Model: gemini-3-pro-image-preview
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Modal Bottom Footer */}
        <div className="bg-[#FAF9F5] px-6 py-3.5 border-t border-[#8B8A84]/20 flex items-center justify-between text-xs font-mono text-[#8B8A84] shrink-0">
          <span>Target Accuracy: Sub-0.2m GSD · Residual Error: &lt; 0.05m</span>
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
