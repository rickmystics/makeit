export interface TimelineDatePoint {
  id: string;
  dateLabel: string;
  yearMonth: string;
  title: string;
  builtUpGainedSqM: number;
  vegetationDeltaSqM: number;
  confidenceScore: number;
  description: string;
  features: {
    warehouses: number;
    arterialRoadKm: number;
    retentionBasins: number;
    solarPanelsSqM: number;
  };
}

export interface UseCaseItem {
  id: string;
  tag: string;
  title: string;
  outcome: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  };
  t1Date: string;
  t2Date: string;
  sceneType: 'urban' | 'forestry' | 'flood' | 'agriculture' | 'infrastructure' | 'insurance';
}

export interface TestimonialItem {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  metricHighlight: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ComparisonRow {
  dimension: string;
  manualReview: string;
  chronoterra: string;
  advantageRatio: string;
}

export interface LeadSubmission {
  name: string;
  workEmail: string;
  organization: string;
  useCase: string;
  scale?: string;
  message?: string;
  website_hp?: string; // honeypot
}
