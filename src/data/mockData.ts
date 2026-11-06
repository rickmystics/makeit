import { TimelineDatePoint, UseCaseItem, TestimonialItem, FAQItem, ComparisonRow } from '../types';

export const siteConfig = {
  brandName: 'Chronoterra',
  headline: 'See exactly what changed between then and now.',
  subheading: 'Time made visible. Precision change detection for satellite, aerial, and drone imagery. Filter seasonal noise, align mismatched angles, and quantify shifts down to the square meter.',
  primaryCtaLabel: 'Request a demo',
  secondaryCtaLabel: 'Launch live studio',
  trustStat: 'Monitoring 42,000,000+ hectares across municipal planning, forestry, and infrastructure.',
  trustPartners: [
    { name: 'Metropolitan Spatial Authority', category: 'Municipal Planning' },
    { name: 'Nordic Canopy Alliance', category: 'Environmental Forestry' },
    { name: 'Global Reinsurance Assessor', category: 'Risk & Claims' },
    { name: 'Trans-Alpine Corridor Project', category: 'Infrastructure Ops' },
    { name: 'GeoScience R&D Consortium', category: 'Academic Research' }
  ]
};

export const problemStatements = [
  {
    number: '01',
    headline: 'Manual image comparison takes days and burns out technical analysts.',
    detail: 'Human reviewers flipping between multi-temporal rasters inevitably miss subtle land shifts, boundary encroachments, and progressive degradation. Analyst fatigue leads to undetected non-compliance and expensive delayed interventions.'
  },
  {
    number: '02',
    headline: 'Sun angle, seasonal foliage, and cloud shadows trigger false positive fatigue.',
    detail: 'Naïve pixel differencing flags autumn leaf loss, shifting diurnal shadows, and off-nadir camera perspectives as physical change. Technical teams waste hundreds of hours filtering noise instead of acting on real ground truth.'
  },
  {
    number: '03',
    headline: 'Subtle infrastructure creep and gradual deforestation stay invisible until it is too late.',
    detail: 'Incremental clearing of 0.2 hectares per week or unauthorized foundation work escapes standard threshold alerts. Without sub-pixel radiometric normalization and Siamese feature tracking, cumulative irreversible loss occurs unnoticed.'
  }
];

export const howItWorksSteps = [
  {
    step: '01',
    name: 'Upload',
    tagline: 'Multi-Temporal Raster Ingestion',
    description: 'Ingest optical, multispectral, or SAR rasters from any sensor constellation (Sentinel-2, Landsat, PlanetScope, Maxar, or aerial drone orthomosaics). Chronoterra automatically parses coordinate reference systems (CRS), spatial resolution, and timestamp metadata.',
    technicalDetails: 'Supports GeoTIFF, Cloud-Optimized GeoTIFF (COG), JP2, and drone orthophotos up to 0.05m GSD.'
  },
  {
    step: '02',
    name: 'Align',
    tagline: 'Sub-Pixel Co-Registration & Solar Normalization',
    description: 'Eliminate false alarms before detection begins. Our proprietary spatial alignment algorithm registers mismatched baselines down to 0.2 sub-pixel accuracy, cancelling out terrain parallax, sensor tilt, and seasonal sun azimuth discrepancy.',
    technicalDetails: 'Phase-correlation tie-point matching paired with bidirectional surface reflectance correction.'
  },
  {
    step: '03',
    name: 'Detect',
    tagline: 'Bi-Temporal Siamese Neural Extraction',
    description: 'Our deep neural architecture decouples true structural delta from phenological fluctuations. It pinpoints newly erected structures, earthmoving operations, deforestation corridors, and flood boundaries while discarding harmless seasonal variation.',
    technicalDetails: 'Temporal attention transformers trained on over 250 million verified bi-temporal hectares.'
  },
  {
    step: '04',
    name: 'Report',
    tagline: 'Quantified Vector Mask & Audit-Grade Export',
    description: 'Receive instant, mathematically rigorous outputs: classified polygon boundaries, net change percentages, square-meter area measurements, and statistical confidence scores ready for legal compliance and municipal action.',
    technicalDetails: 'One-click export to GeoTIFF change raster, GeoJSON vector layers, tabular CSV, and signed PDF summaries.'
  }
];

export const timelineDemoData: TimelineDatePoint[] = [
  {
    id: 'epoch-1',
    dateLabel: 'Apr 18, 2023',
    yearMonth: '2023-04',
    title: 'Baseline Agricultural Valley',
    builtUpGainedSqM: 0,
    vegetationDeltaSqM: 0,
    confidenceScore: 0.998,
    description: 'Pristine agricultural valley with seasonal wheat parcels, riparian vegetative buffer, and standard two-lane county road.',
    features: {
      warehouses: 0,
      arterialRoadKm: 0,
      retentionBasins: 0,
      solarPanelsSqM: 0
    }
  },
  {
    id: 'epoch-2',
    dateLabel: 'Nov 04, 2023',
    yearMonth: '2023-11',
    title: 'Initial Earthmoving & Corridor Grading',
    builtUpGainedSqM: 32400,
    vegetationDeltaSqM: -38200,
    confidenceScore: 0.994,
    description: 'Early ground clearance detected in southwest sector. Soil disturbance and sub-base grading for primary arterial transit corridor.',
    features: {
      warehouses: 0,
      arterialRoadKm: 1.8,
      retentionBasins: 1,
      solarPanelsSqM: 0
    }
  },
  {
    id: 'epoch-3',
    dateLabel: 'Jun 22, 2024',
    yearMonth: '2024-06',
    title: 'Primary Structural Erection (Building A)',
    builtUpGainedSqM: 86500,
    vegetationDeltaSqM: -81000,
    confidenceScore: 0.991,
    description: '45,000 m² steel frame erected for Logistics Hub Alpha. Perimeter stormwater retention basin excavated with high radiometric fidelity.',
    features: {
      warehouses: 1,
      arterialRoadKm: 3.4,
      retentionBasins: 1,
      solarPanelsSqM: 12000
    }
  },
  {
    id: 'epoch-4',
    dateLabel: 'Jan 15, 2025',
    yearMonth: '2025-01',
    title: 'Secondary Warehouse & Heavy Paving',
    builtUpGainedSqM: 142000,
    vegetationDeltaSqM: -118500,
    confidenceScore: 0.989,
    description: 'Logistics Hub Beta roof enclosed. Dual-lane heavy transport roadway completed with asphalt paving detected across central spine.',
    features: {
      warehouses: 2,
      arterialRoadKm: 5.2,
      retentionBasins: 2,
      solarPanelsSqM: 28000
    }
  },
  {
    id: 'epoch-5',
    dateLabel: 'Sep 28, 2026',
    yearMonth: '2026-09',
    title: 'Full Industrial Campus & Distribution Hub',
    builtUpGainedSqM: 184200,
    vegetationDeltaSqM: -142800,
    confidenceScore: 0.984,
    description: 'Fully commissioned intermodal logistics facility: 3 large-span distribution hubs, 28,000 m² rooftop photovoltaic arrays, and sealed trailer marshalling yards.',
    features: {
      warehouses: 3,
      arterialRoadKm: 6.8,
      retentionBasins: 2,
      solarPanelsSqM: 46500
    }
  }
];

export const useCasesData: UseCaseItem[] = [
  {
    id: 'urban-growth',
    tag: 'Municipal Governance',
    title: 'Urban Growth & Unplanned Development',
    outcome: 'Identify unauthorized construction and zoning permit violations within 24 hours of satellite pass.',
    description: 'Municipal planning authorities monitor sprawl across expanding suburban fringes. Automatically detect structural footprints that lack approved building permits, complete with perimeter coordinates and area calculations.',
    metrics: { label: 'Permit Enforcement Speed', value: '12x Faster' },
    t1Date: '2024-03-12',
    t2Date: '2026-08-19',
    sceneType: 'urban'
  },
  {
    id: 'deforestation',
    tag: 'Environmental & Forestry',
    title: 'Deforestation & Protected Canopy Monitoring',
    outcome: 'Catch clandestine logging roads and selective canopy felling before clear-cutting takes hold.',
    description: 'Conservation NGOs and forestry agencies track protected reserve perimeters. Siamese temporal attention filters out dry-season foliage browning to pinpoint mechanical canopy disturbance and access roads.',
    metrics: { label: 'False Alarm Reduction', value: '94.2%' },
    t1Date: '2024-05-10',
    t2Date: '2026-09-02',
    sceneType: 'forestry'
  },
  {
    id: 'disaster-damage',
    tag: 'Emergency & Claims',
    title: 'Catastrophe Damage & Flood Inundation',
    outcome: 'Generate rapid-response damage assessment maps within minutes of post-event image acquisition.',
    description: 'First responders, civil protection agencies, and catastrophic risk insurers rapidly delineate high-water extents, collapsed bridge infrastructure, and roof damage across disaster corridors.',
    metrics: { label: 'Time to First Map', value: '< 90 Seconds' },
    t1Date: '2025-08-20',
    t2Date: '2025-08-26',
    sceneType: 'flood'
  },
  {
    id: 'crop-health',
    tag: 'Agritech & Yield',
    title: 'Crop Health & Irrigation Failures',
    outcome: 'Isolate crop vigor anomalies and center-pivot irrigation breaches across hundreds of thousands of hectares.',
    description: 'Agronomists and commodity analysts track vegetative vigor over critical phenological stages. Isolate localized water stress, hail damage, or nitrogen depletion without confusing seasonal growth curves.',
    metrics: { label: 'Spatial Resolution', value: 'Sub-0.5m GSD' },
    t1Date: '2025-05-01',
    t2Date: '2025-07-15',
    sceneType: 'agriculture'
  },
  {
    id: 'infrastructure-progress',
    tag: 'Civil Engineering',
    title: 'Infrastructure & Linear Corridor Auditing',
    outcome: 'Audit contractor milestone progress across hundreds of linear kilometers of transmission and rail.',
    description: 'EPC contractors and asset managers automatically verify earthwork grading, pylon installation, track laying, and right-of-way easement encroachments from regular drone or aerial captures.',
    metrics: { label: 'Inspection Cost Savings', value: '68%' },
    t1Date: '2024-01-10',
    t2Date: '2026-06-30',
    sceneType: 'infrastructure'
  },
  {
    id: 'insurance-verification',
    tag: 'Risk & Underwriting',
    title: 'Pre/Post Claim Evidence Verification',
    outcome: 'Produce cryptographically verifiable change reports for commercial and agricultural underwriting.',
    description: 'Insurance underwriters eliminate fraudulent claims and accelerate legitimate payouts with timestamped, immutable bi-temporal change assessments backed by verifiable satellite provenance.',
    metrics: { label: 'Claim Adjudication Cycle', value: '-80% Days' },
    t1Date: '2025-02-14',
    t2Date: '2025-10-18',
    sceneType: 'insurance'
  }
];

export const outputReportData = {
  aoiName: 'AOI-Pacific-Northwest-Hub-402',
  coordinates: '45°25\'32"N  122°40\'45"W',
  baselineDate: 'Oct 14, 2024',
  targetDate: 'Sep 28, 2026',
  sensorType: 'PlanetScope + Sentinel-2 Fusion',
  spatialResolution: '3.0m Multispectral',
  percentAreaChanged: 14.8,
  totalAreaChangedSqM: 184200,
  confidenceScore: 98.4,
  classes: [
    { label: 'New Impervious Building Footprints', percentage: 62.4, areaSqM: 114940, color: '#FF5B2E' },
    { label: 'Paved Transit & Marshalling Arteries', percentage: 20.8, areaSqM: 38310, color: '#8B8A84' },
    { label: 'Vegetative Canopy Transition', percentage: 16.8, areaSqM: 30950, color: '#24272D' }
  ],
  exportFormats: [
    { format: 'PDF', label: 'Executive Summary Report', icon: 'file-text', filename: 'Chronoterra_AOI_402_Audit.pdf' },
    { format: 'GeoTIFF', label: 'Orthorectified Change Raster', icon: 'layers', filename: 'AOI_402_Change_Mask_32bit.tif' },
    { format: 'GeoJSON', label: 'Vectorized Polygons with CRS', icon: 'map-pin', filename: 'AOI_402_Classified_Polygons.geojson' },
    { format: 'CSV', label: 'Tabular Metric Ledger', icon: 'table', filename: 'AOI_402_Area_Calculations.csv' },
    { format: 'API', label: 'REST cURL Endpoint', icon: 'code', filename: 'curl https://api.chronoterra.ai/v1/detect' }
  ]
};

export const comparisonData: ComparisonRow[] = [
  {
    dimension: 'Processing Speed',
    manualReview: '2 to 5 days per satellite scene tile; high backlog and delayed decision turnaround',
    chronoterra: 'Under 10 seconds per 10,000 hectares with instant vector polygon generation',
    advantageRatio: '300x faster'
  },
  {
    dimension: 'Detection Consistency',
    manualReview: 'Subjective to individual analyst fatigue, experience level, and eye strain',
    chronoterra: 'Deterministic, mathematically repeatable Siamese neural weights with verified audit trail',
    advantageRatio: '100% reproducible'
  },
  {
    dimension: 'False Alarm Mitigation',
    manualReview: 'Over 40% false positives triggered by sun azimuth, shadow angle, and seasonal leaves',
    chronoterra: 'Sub-pixel co-registration and phenological harmonic filtering suppress over 94% of noise',
    advantageRatio: '94.2% noise reduction'
  },
  {
    dimension: 'Scale & Concurrency',
    manualReview: 'Strict linear human bottleneck; scaling requires hiring and training dozens of analysts',
    chronoterra: 'Cloud-native parallel processing capable of ingesting nationwide satellite strips simultaneously',
    advantageRatio: 'Infinite cloud scale'
  },
  {
    dimension: 'Audit Trail & Compliance',
    manualReview: 'Disorganized screenshots, hand-drawn GIS annotations, and subjective spreadsheets',
    chronoterra: 'Evidence-grade PDF and GeoTIFF reports with cryptographically signed timestamp provenance',
    advantageRatio: 'Court-admissible standard'
  }
];

export const testimonialsData: TestimonialItem[] = [
  {
    id: 'test-1',
    name: 'Dr. Elena Vance',
    role: 'Lead Geospatial Architect',
    organization: 'Metropolitan Spatial Authority',
    quote: 'Chronoterra turned our monthly municipal compliance workflow from a 2-week manual ordeal into a 4-minute automated batch. The sub-pixel alignment completely eradicated the false alarms that made previous tools useless.',
    metricHighlight: '88% reduction in manual inspection cycles'
  },
  {
    id: 'test-2',
    name: 'Marcus Thorne',
    role: 'VP of Underwriting & Catastrophic Risk',
    organization: 'Global Property Reinsurance',
    quote: 'Following coastal hurricanes, our claims team used to wait weeks for ground truth. With Chronoterra, we delineate flood boundaries and structural damage down to the property line before our adjusters even deploy.',
    metricHighlight: '48-hour claim turnaround time'
  },
  {
    id: 'test-3',
    name: 'Sarah Lindqvist',
    role: 'Director of Forest Conservation',
    organization: 'Nordic Canopy Alliance',
    quote: 'Illegal logging begins with narrow dirt tracks invisible under heavy tree shadow. Chronoterra is the only platform we tested that distinguishes real canopy loss from seasonal sun tilt and autumnal color shifts.',
    metricHighlight: '1.4M hectares under continuous watch'
  }
];

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Sensors & Imagery',
    question: 'What image formats, sensor types, and resolutions are supported?',
    answer: 'Chronoterra supports standard Earth observation imagery across all modalities: optical multispectral (Sentinel-2, Landsat 8/9, PlanetScope, Maxar WorldView, Airbus Pleiades), synthetic aperture radar (Sentinel-1 SAR), and high-resolution aerial/drone orthomosaics (RGB, NIR, thermal). Formats include Cloud-Optimized GeoTIFF (COG), standard GeoTIFF, JP2, and orthorectified GeoJSON.'
  },
  {
    id: 'faq-2',
    category: 'Alignment & Preprocessing',
    question: 'Do my before and after images need to be pre-aligned and captured at identical angles?',
    answer: 'No. Chronoterra incorporates an autonomous sub-pixel orthorectification and co-registration engine. It automatically detects invariant terrain tie-points, calculates relative homographies, and corrects for up to 25° of off-nadir angle divergence and solar elevation variations.'
  },
  {
    id: 'faq-3',
    category: 'Accuracy & False Alarms',
    question: 'How does Chronoterra distinguish actual physical construction from seasonal leaf fall or shadows?',
    answer: 'Traditional pixel differencing fails because sunlight and tree canopies change constantly. Chronoterra utilizes a bi-temporal Siamese temporal attention network trained to decouple phenological harmonics (natural seasonal cycles) and diurnal shadow shifts from structural land-use interventions.'
  },
  {
    id: 'faq-4',
    category: 'Integration & API',
    question: 'Can Chronoterra integrate directly into our internal GIS stack or automated cloud pipelines?',
    answer: 'Yes. Every capability available in our web interface is fully accessible via our high-throughput REST API and Python SDK. You can programmatically submit bounding boxes, trigger webhook callbacks upon completion, and stream vectorized GeoJSON layers straight into ArcGIS, QGIS, or Mapbox.'
  },
  {
    id: 'faq-5',
    category: 'Data Privacy & Security',
    question: 'How is sensitive customer imagery secured, and does Chronoterra retain uploaded data?',
    answer: 'Chronoterra is SOC 2 Type II certified and GDPR compliant. By default, client imagery is processed in isolated, ephemeral compute containers with zero permanent retention unless explicitly configured. We support customer-managed encryption keys (CMEK) and offer dedicated VPC or air-gapped on-premises deployments for ITAR / defense requirements.'
  },
  {
    id: 'faq-6',
    category: 'Pricing & Licensing',
    question: 'How is Chronoterra priced for municipal agencies and enterprise teams?',
    answer: 'Pricing is based on monitored land area (annual square kilometers) and processing frequency, ensuring predictable budgets without surprise overages. We offer dedicated tiers for municipal planning consultancies, enterprise insurers, and conservation NGOs. Request a demo to receive a customized volume quote.'
  }
];
