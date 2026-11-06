/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorks } from './components/HowItWorks';
import { TimelineDemo } from './components/TimelineDemo';
import { UseCases } from './components/UseCases';
import { OutputsSection } from './components/OutputsSection';
import { ComparisonSection } from './components/ComparisonSection';
import { SocialProof } from './components/SocialProof';
import { FAQSection } from './components/FAQSection';
import { LeadFormSection } from './components/LeadFormSection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { DemoModal } from './components/DemoModal';
import { LiveStudioModal } from './components/LiveStudioModal';

export default function App() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [studioModalOpen, setStudioModalOpen] = useState(false);

  const scrollToForm = () => {
    const el = document.getElementById('request-demo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-[#0F1114] flex flex-col font-sans selection:bg-[#FF5B2E]/20 selection:text-[#0F1114]">
      {/* FR-1: Sticky Navigation */}
      <Navigation 
        onOpenDemoModal={() => setDemoModalOpen(true)}
        onOpenStudioModal={() => setStudioModalOpen(true)}
      />

      <main className="flex-1">
        {/* FR-2: Hero with Draggable Comparison Slider */}
        <Hero 
          onOpenDemoModal={() => setDemoModalOpen(true)}
          onOpenStudioModal={() => setStudioModalOpen(true)}
        />

        {/* FR-3: Problem Section */}
        <ProblemSection />

        {/* FR-4: How It Works */}
        <HowItWorks 
          onOpenDemoModal={() => setDemoModalOpen(true)}
        />

        {/* FR-5: Interactive Timeline Demo */}
        <TimelineDemo />

        {/* FR-6: Use Cases */}
        <UseCases />

        {/* FR-7: Outputs and Report Preview */}
        <OutputsSection 
          onOpenDemoModal={() => setDemoModalOpen(true)}
        />

        {/* FR-8: Comparison (Manual vs Chronoterra) */}
        <ComparisonSection />

        {/* FR-9: Social Proof Testimonials Carousel */}
        <SocialProof />

        {/* FR-10: FAQ Accordion */}
        <FAQSection />

        {/* FR-11: Final CTA with Lead Form */}
        <LeadFormSection />
      </main>

      {/* FR-12: Footer */}
      <Footer />

      {/* FR-7.3: Mobile Sticky Bar (Appears after hero, <15% viewport height) */}
      <MobileStickyBar 
        onOpenDemoModal={() => setDemoModalOpen(true)}
      />

      {/* Interactive Modal Dialogs */}
      <DemoModal 
        isOpen={demoModalOpen}
        onClose={() => setDemoModalOpen(false)}
        onScrollToForm={scrollToForm}
      />

      <LiveStudioModal 
        isOpen={studioModalOpen}
        onClose={() => setStudioModalOpen(false)}
      />
    </div>
  );
}
