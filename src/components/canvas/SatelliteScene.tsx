import React, { useState, useEffect, useRef } from 'react';
import { Layers, Crosshair, ZoomIn, Eye, Sparkles } from 'lucide-react';

interface SatelliteSceneProps {
  sliderPos: number; // 0 to 100
  showChangeOutline?: boolean;
  activeFilter?: 'all' | 'buildings' | 'roads' | 'clearing';
  interactiveHover?: boolean;
}

export const SatelliteScene: React.FC<SatelliteSceneProps> = ({
  sliderPos,
  showChangeOutline = true,
  activeFilter = 'all',
  interactiveHover = true
}) => {
  const [hoveredPolygon, setHoveredPolygon] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'standard' | 'ndvi' | 'edge'>('standard');
  const containerRef = useRef<HTMLDivElement>(null);

  // SVG dimensions: viewBox 0 0 1000 640
  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-[#8B8A84]/20 bg-[#0F1114] select-none shadow-sm"
    >
      {/* T1 Baseline Layer (Visible when sliderPos is less than 100) */}
      <div className="absolute inset-0 w-full h-full">
        <svg 
          viewBox="0 0 1000 640" 
          className="w-full h-full object-cover" 
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Satellite Imagery Epoch T1 - October 14, 2024"
        >
          <defs>
            {/* Field textures */}
            <pattern id="cropRows" width="16" height="16" patternTransform="rotate(25)" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="0" y2="16" stroke="#48533c" strokeWidth="1.2" opacity="0.4" />
              <line x1="8" y1="0" x2="8" y2="16" stroke="#5d6b4c" strokeWidth="1.5" opacity="0.3" />
            </pattern>
            <pattern id="orchardDots" width="12" height="12" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="2.2" fill="#3f4a33" opacity="0.6" />
            </pattern>
            <linearGradient id="t1RiverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3d505a" />
              <stop offset="100%" stopColor="#2c3b44" />
            </linearGradient>
            <linearGradient id="t1SoilGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7a6e55" />
              <stop offset="50%" stopColor="#877a60" />
              <stop offset="100%" stopColor="#6e624b" />
            </linearGradient>
          </defs>

          {/* Background Terrain Matrix */}
          <rect width="1000" height="640" fill="#4d5a3f" />

          {/* Agricultural Parcels (T1 2024) */}
          <path d="M 0 0 L 420 0 L 380 280 L 0 240 Z" fill="#586747" />
          <path d="M 0 0 L 420 0 L 380 280 L 0 240 Z" fill="url(#cropRows)" />

          <path d="M 420 0 L 820 0 L 760 210 L 380 280 Z" fill="#6a7752" />
          <path d="M 420 0 L 820 0 L 760 210 L 380 280 Z" fill="url(#orchardDots)" />

          {/* Open Valley Field (Future Logistics Site) */}
          <path d="M 120 270 L 680 230 L 720 540 L 80 580 Z" fill="url(#t1SoilGrad)" />

          {/* Riparian buffer & dry seasonal wash */}
          <path d="M 820 0 C 800 150, 750 300, 840 450 C 880 520, 890 640, 890 640 L 1000 640 L 1000 0 Z" fill="#3d4934" />
          <path d="M 825 0 C 805 150, 755 300, 845 450 C 885 520, 895 640, 895 640" fill="none" stroke="url(#t1RiverGrad)" strokeWidth="18" strokeLinecap="round" />

          {/* Rural Two-Lane County Road */}
          <path d="M 0 250 Q 300 280, 600 240 T 1000 220" fill="none" stroke="#686358" strokeWidth="6" />
          <path d="M 0 250 Q 300 280, 600 240 T 1000 220" fill="none" stroke="#a69f91" strokeWidth="1" strokeDasharray="6 8" />

          {/* Minor dirt track */}
          <path d="M 380 270 L 410 490 L 590 510" fill="none" stroke="#7a705a" strokeWidth="3.5" strokeDasharray="3 4" opacity="0.7" />

          {/* Small Farm Outpost & Silos at T1 */}
          <rect x="360" y="470" width="28" height="18" fill="#8f897d" rx="1" />
          <circle cx="398" cy="478" r="5" fill="#a8a398" />
          <circle cx="408" cy="478" r="4.5" fill="#a8a398" />

          {/* Sparse tree clusters */}
          <g fill="#2e3825" opacity="0.8">
            <circle cx="150" cy="310" r="9" />
            <circle cx="162" cy="315" r="7.5" />
            <circle cx="145" cy="324" r="6" />
            <circle cx="520" cy="270" r="11" />
            <circle cx="534" cy="280" r="8" />
            <circle cx="610" cy="440" r="12" />
            <circle cx="626" cy="448" r="9" />
          </g>

          {/* Coordinate grid overlay */}
          <g stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08">
            <line x1="250" y1="0" x2="250" y2="640" />
            <line x1="500" y1="0" x2="500" y2="640" />
            <line x1="750" y1="0" x2="750" y2="640" />
            <line x1="0" y1="160" x2="1000" y2="160" />
            <line x1="0" y1="320" x2="1000" y2="320" />
            <line x1="0" y1="480" x2="1000" y2="480" />
          </g>

          {/* T1 Watermark Label */}
          <g className="font-mono text-[11px] fill-[#F4F1EA]/70">
            <rect x="24" y="24" width="136" height="26" fill="#0F1114" fillOpacity="0.75" rx="3" />
            <text x="34" y="41" fill="#F4F1EA" fontWeight="500">T1: 2024-10-14</text>
          </g>
        </svg>
      </div>

      {/* T2 Target Layer (Clipped to slider position from the right) */}
      <div 
        className="absolute inset-0 w-full h-full overflow-hidden transition-none"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <svg 
          viewBox="0 0 1000 640" 
          className="w-full h-full object-cover" 
          preserveAspectRatio="xMidYMid slice"
          role="img"
          aria-label="Satellite Imagery Epoch T2 - September 28, 2026"
        >
          <defs>
            {/* Asphalt texture */}
            <linearGradient id="asphaltGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#23262a" />
              <stop offset="100%" stopColor="#1a1c1f" />
            </linearGradient>

            {/* Warehouse Roof Gradient */}
            <linearGradient id="roofGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e3e5e8" />
              <stop offset="100%" stopColor="#d0d4d9" />
            </linearGradient>
            <linearGradient id="solarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#19324d" />
              <stop offset="100%" stopColor="#112236" />
            </linearGradient>

            {/* Signal Pulse Glow Filter for Change Polygons */}
            <filter id="signalGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base terrain matching T1 */}
          <rect width="1000" height="640" fill="#4a553c" />

          {/* Surrounding unchanged agricultural parcels */}
          <path d="M 0 0 L 420 0 L 380 280 L 0 240 Z" fill="#525f43" />
          <path d="M 420 0 L 820 0 L 760 210 L 380 280 Z" fill="#626e4c" />

          {/* Riparian buffer */}
          <path d="M 820 0 C 800 150, 750 300, 840 450 C 880 520, 890 640, 890 640 L 1000 640 L 1000 0 Z" fill="#3d4934" />
          <path d="M 825 0 C 805 150, 755 300, 845 450 C 885 520, 895 640, 895 640" fill="none" stroke="#2c3b44" strokeWidth="18" strokeLinecap="round" />

          {/* Widened Arterial Highway with dual carriage */}
          <path d="M 0 250 Q 300 280, 600 240 T 1000 220" fill="none" stroke="#26292d" strokeWidth="16" />
          <path d="M 0 250 Q 300 280, 600 240 T 1000 220" fill="none" stroke="#f0b429" strokeWidth="1" strokeDasharray="8 6" />

          {/* Heavy Logistics Parcel Envelope (Graded Asphalt Sub-base) */}
          <polygon 
            points="140,280 670,240 730,550 90,590" 
            fill="url(#asphaltGrad)"
            stroke="#3a3d42"
            strokeWidth="2"
          />

          {/* Internal Access Boulevard and Circulation Loop */}
          <path d="M 380 268 L 380 560" stroke="#373b40" strokeWidth="22" strokeLinecap="square" />
          <path d="M 200 420 L 640 400" stroke="#373b40" strokeWidth="16" strokeLinecap="square" />
          <path d="M 120 570 L 690 535" stroke="#373b40" strokeWidth="14" strokeLinecap="square" />

          {/* Trailer Parking Marshalling Bays */}
          <g stroke="#ffffff" strokeWidth="0.8" strokeOpacity="0.4" strokeDasharray="3 4">
            <line x1="160" y1="360" x2="350" y2="350" />
            <line x1="160" y1="375" x2="350" y2="365" />
            <line x1="160" y1="390" x2="350" y2="380" />
            <line x1="410" y1="340" x2="600" y2="330" />
            <line x1="410" y1="355" x2="600" y2="345" />
            <line x1="410" y1="370" x2="600" y2="360" />
          </g>

          {/* Parked semi-trailers (dots & rectangles) */}
          <g fill="#d8dce2">
            <rect x="170" y="358" width="18" height="6" rx="0.5" />
            <rect x="195" y="357" width="18" height="6" rx="0.5" />
            <rect x="220" y="355" width="18" height="6" rx="0.5" />
            <rect x="260" y="353" width="18" height="6" rx="0.5" />
            <rect x="420" y="338" width="18" height="6" rx="0.5" />
            <rect x="445" y="337" width="18" height="6" rx="0.5" />
            <rect x="480" y="335" width="18" height="6" rx="0.5" />
          </g>

          {/* STRUCTURE 1: Logistics Hub Alpha (Large Central Warehouse) */}
          <g 
            onMouseEnter={() => setHoveredPolygon('hub-alpha')}
            onMouseLeave={() => setHoveredPolygon(null)}
            className="cursor-pointer transition-opacity"
          >
            <rect 
              x="170" y="440" width="190" height="110" 
              fill="url(#roofGrad1)" 
              stroke="#2c3035" 
              strokeWidth="2" 
              rx="2" 
            />
            {/* Skylights & HVAC */}
            <rect x="185" y="455" width="160" height="12" fill="#bac0c7" />
            <rect x="185" y="475" width="160" height="12" fill="#bac0c7" />
            <rect x="185" y="495" width="160" height="12" fill="#bac0c7" />
            <rect x="185" y="515" width="160" height="12" fill="#bac0c7" />
          </g>

          {/* STRUCTURE 2: Logistics Hub Beta with Rooftop Solar (East Sector) */}
          <g 
            onMouseEnter={() => setHoveredPolygon('hub-beta')}
            onMouseLeave={() => setHoveredPolygon(null)}
            className="cursor-pointer"
          >
            <rect 
              x="410" y="420" width="220" height="100" 
              fill="url(#roofGrad1)" 
              stroke="#2c3035" 
              strokeWidth="2" 
              rx="2" 
            />
            {/* Rooftop Solar Panels Array */}
            <rect x="425" y="432" width="190" height="76" fill="url(#solarGrad)" rx="1" />
            <g stroke="#3a6088" strokeWidth="0.8" opacity="0.6">
              <line x1="425" y1="450" x2="615" y2="450" />
              <line x1="425" y1="470" x2="615" y2="470" />
              <line x1="425" y1="490" x2="615" y2="490" />
              <line x1="470" y1="432" x2="470" y2="508" />
              <line x1="520" y1="432" x2="520" y2="508" />
              <line x1="570" y1="432" x2="570" y2="508" />
            </g>
          </g>

          {/* STRUCTURE 3: Ancillary Cross-Dock Facility (North Sector) */}
          <g 
            onMouseEnter={() => setHoveredPolygon('cross-dock')}
            onMouseLeave={() => setHoveredPolygon(null)}
            className="cursor-pointer"
          >
            <rect 
              x="220" y="295" width="140" height="48" 
              fill="url(#roofGrad1)" 
              stroke="#2c3035" 
              strokeWidth="1.5" 
              rx="1.5" 
            />
          </g>

          {/* Excavated Stormwater Retention Basin (Engineered Pond) */}
          <polygon 
            points="650,270 710,265 730,340 660,350" 
            fill="#1e3a47" 
            stroke="#455447" 
            strokeWidth="3" 
          />
          <polygon points="658,278 702,274 718,332 668,340" fill="#142c38" />

          {/* CHANGE DETECTION VECTOR OVERLAYS - SIGNAL COLOR #FF5B2E */}
          {showChangeOutline && (
            <g className="animate-signal-pulse" filter="url(#signalGlow)">
              {/* Outer Envelope Boundary Vector */}
              {(activeFilter === 'all' || activeFilter === 'clearing') && (
                <polygon 
                  points="140,280 670,240 730,550 90,590" 
                  fill="rgba(255, 91, 46, 0.08)"
                  stroke="#FF5B2E"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />
              )}

              {/* Building Alpha Change Vector */}
              {(activeFilter === 'all' || activeFilter === 'buildings') && (
                <g>
                  <rect 
                    x="166" y="436" width="198" height="118" 
                    fill="rgba(255, 91, 46, 0.16)" 
                    stroke="#FF5B2E" 
                    strokeWidth="3" 
                    rx="3" 
                  />
                  {/* Vertex Crosshairs */}
                  <circle cx="166" cy="436" r="3" fill="#FF5B2E" />
                  <circle cx="364" cy="436" r="3" fill="#FF5B2E" />
                  <circle cx="166" cy="554" r="3" fill="#FF5B2E" />
                  <circle cx="364" cy="554" r="3" fill="#FF5B2E" />
                </g>
              )}

              {/* Building Beta Change Vector */}
              {(activeFilter === 'all' || activeFilter === 'buildings') && (
                <g>
                  <rect 
                    x="406" y="416" width="228" height="108" 
                    fill="rgba(255, 91, 46, 0.16)" 
                    stroke="#FF5B2E" 
                    strokeWidth="3" 
                    rx="3" 
                  />
                  <circle cx="406" cy="416" r="3" fill="#FF5B2E" />
                  <circle cx="634" cy="416" r="3" fill="#FF5B2E" />
                  <circle cx="406" cy="524" r="3" fill="#FF5B2E" />
                  <circle cx="634" cy="524" r="3" fill="#FF5B2E" />
                </g>
              )}

              {/* Cross Dock Change Vector */}
              {(activeFilter === 'all' || activeFilter === 'buildings') && (
                <rect 
                  x="217" y="292" width="146" height="54" 
                  fill="rgba(255, 91, 46, 0.18)" 
                  stroke="#FF5B2E" 
                  strokeWidth="2.5" 
                />
              )}

              {/* Retention Basin Change Vector */}
              {(activeFilter === 'all' || activeFilter === 'clearing') && (
                <polygon 
                  points="648,266 714,261 734,344 656,354" 
                  fill="rgba(255, 91, 46, 0.12)"
                  stroke="#FF5B2E"
                  strokeWidth="2.5"
                />
              )}

              {/* Arterial Paving Vector */}
              {(activeFilter === 'all' || activeFilter === 'roads') && (
                <path 
                  d="M 370 268 L 370 560 M 190 420 L 650 400" 
                  stroke="#FF5B2E" 
                  strokeWidth="2" 
                  strokeDasharray="4 4" 
                />
              )}
            </g>
          )}

          {/* Coordinate grid overlay on T2 */}
          <g stroke="#ffffff" strokeWidth="0.5" strokeOpacity="0.08">
            <line x1="250" y1="0" x2="250" y2="640" />
            <line x1="500" y1="0" x2="500" y2="640" />
            <line x1="750" y1="0" x2="750" y2="640" />
            <line x1="0" y1="160" x2="1000" y2="160" />
            <line x1="0" y1="320" x2="1000" y2="320" />
            <line x1="0" y1="480" x2="1000" y2="480" />
          </g>

          {/* T2 Watermark Label */}
          <g className="font-mono text-[11px] fill-[#F4F1EA]">
            <rect x="840" y="24" width="136" height="26" fill="#0F1114" fillOpacity="0.85" rx="3" />
            <text x="850" y="41" fill="#FF5B2E" fontWeight="600">T2: 2026-09-28</text>
          </g>
        </svg>
      </div>

      {/* Slider Split Line & Handle */}
      <div 
        className="absolute top-0 bottom-0 pointer-events-none transition-none z-20"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Vertical divider line */}
        <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-[#F4F1EA] shadow-[0_0_8px_rgba(0,0,0,0.6)]" />

        {/* Central Circular Drag Handle */}
        <div className="absolute top-1/2 -left-5 -translate-y-1/2 w-10 h-10 rounded-full bg-[#0F1114] border-2 border-[#F4F1EA] shadow-lg flex items-center justify-center text-[#F4F1EA]">
          <div className="flex items-center gap-1">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M5 1L1 5L5 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none">
              <path d="M1 1L5 5L1 9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Top HUD: Spatial Coordinates, Scale Bar, Sensor */}
      <div className="absolute top-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between pointer-events-none z-10 text-[11px] font-mono text-[#F4F1EA]/90">
        <div className="flex items-center gap-2 sm:gap-3 bg-[#0F1114]/80 backdrop-blur-md px-2.5 py-1.5 rounded border border-[#8B8A84]/20">
          <Crosshair className="w-3.5 h-3.5 text-[#FF5B2E]" />
          <span>45°25'32"N 122°40'45"W</span>
          <span className="hidden md:inline text-[#8B8A84]">·</span>
          <span className="hidden md:inline text-[#8B8A84]">CRS: EPSG:3857</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0F1114]/80 backdrop-blur-md px-2.5 py-1.5 rounded border border-[#8B8A84]/20 flex items-center gap-2">
            <span className="w-8 h-1 bg-[#F4F1EA]/80 inline-block border-l border-r border-[#F4F1EA]" />
            <span>250 m</span>
          </div>

          <div className="bg-[#0F1114]/80 backdrop-blur-md w-7 h-7 rounded border border-[#8B8A84]/20 flex items-center justify-center font-bold text-[#FF5B2E]">
            N
          </div>
        </div>
      </div>

      {/* Bottom Floating Stats Badge */}
      <div className="absolute bottom-3 left-3 sm:left-4 z-10 pointer-events-none">
        <div className="bg-[#0F1114]/90 backdrop-blur-md px-3 py-2 rounded border border-[#FF5B2E]/40 text-xs font-mono text-[#F4F1EA] flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#FF5B2E] animate-ping" />
          <div>
            <span className="text-[#8B8A84] block text-[10px]">VERIFIED SHIFT</span>
            <span className="font-semibold text-[#FF5B2E]">+184,200 m²</span>
            <span className="text-[#8B8A84] ml-1.5 text-[11px]">(14.8% AOI)</span>
          </div>
        </div>
      </div>

      {/* Interactive Hover Tooltip for Polygons */}
      {hoveredPolygon && (
        <div className="absolute bottom-3 right-3 sm:right-4 z-10 pointer-events-none bg-[#0F1114]/95 border border-[#8B8A84]/40 p-2.5 rounded text-xs font-mono text-[#F4F1EA]">
          {hoveredPolygon === 'hub-alpha' && (
            <div>
              <p className="font-semibold text-[#FF5B2E]">Logistics Hub Alpha</p>
              <p className="text-[#8B8A84] text-[11px]">Area: 45,200 m² · Class: Impervious Structure</p>
            </div>
          )}
          {hoveredPolygon === 'hub-beta' && (
            <div>
              <p className="font-semibold text-[#FF5B2E]">Logistics Hub Beta + Solar</p>
              <p className="text-[#8B8A84] text-[11px]">Area: 52,800 m² · Photovoltaic Array</p>
            </div>
          )}
          {hoveredPolygon === 'cross-dock' && (
            <div>
              <p className="font-semibold text-[#FF5B2E]">Intermodal Cross-Dock</p>
              <p className="text-[#8B8A84] text-[11px]">Area: 14,800 m² · Loading Bays</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
