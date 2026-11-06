import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Compass } from 'lucide-react';
import { siteConfig } from '../data/mockData';

interface NavigationProps {
  onOpenDemoModal: () => void;
  onOpenStudioModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  onOpenDemoModal,
  onOpenStudioModal
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Scroll detection to hide on scroll-down, show on scroll-up (FR-1)
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY && currentScrollY > 180 && !mobileMenuOpen) {
        setIsVisible(false); // scrolling down
      } else {
        setIsVisible(true); // scrolling up or at top
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, mobileMenuOpen]);

  // Trap focus and listen for Escape key on mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Timeline Demo', href: '#timeline-demo' },
    { label: 'Use cases', href: '#use-cases' },
    { label: 'Output', href: '#outputs' },
    { label: 'Comparison', href: '#comparison' },
    { label: 'FAQ', href: '#faq' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-300 ease-cinematic ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        } ${
          isScrolled
            ? 'bg-[#F4F1EA]/90 backdrop-blur-md border-b border-[#8B8A84]/20 py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Brand Wordmark (Single text element strictly compliant with Top Bar Contract) */}
            <a
              href="#"
              className="text-xl font-bold tracking-tight text-[#0F1114] font-serif whitespace-nowrap shrink-0 flex items-center gap-2 group"
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5B2E] transition-transform group-hover:scale-125" />
              <span>{siteConfig.brandName}</span>
            </a>

            {/* Zone 2: Navigation Links (Clean single-line text with subtle hover effect) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#0F1114]/80">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="hover:text-[#0F1114] transition-colors whitespace-nowrap shrink-0 hover:underline underline-offset-4 decoration-[#FF5B2E]/50"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={onOpenStudioModal}
                className="flex items-center gap-1.5 text-xs font-mono text-[#0F1114] hover:text-[#FF5B2E] transition-colors cursor-pointer px-2.5 py-1 rounded border border-[#8B8A84]/30 bg-[#FAF9F5]"
              >
                <Compass className="w-3.5 h-3.5 text-[#FF5B2E]" />
                <span>Live Studio</span>
              </button>
            </nav>

            {/* Zone 3: Primary Action (CTA Label identical everywhere as per PRD: 'Request a demo') */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onOpenDemoModal}
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded-md transition-colors whitespace-nowrap shrink-0 shadow-sm cursor-pointer"
              >
                {siteConfig.primaryCtaLabel}
              </button>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-[#0F1114] hover:bg-[#8B8A84]/15 transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF5B2E]"
                aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Staggered Reveal Drawer (FR-1) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-[#0F1114] text-[#F4F1EA] flex flex-col justify-between p-6 sm:p-8 overflow-y-auto"
        >
          <div className="flex items-center justify-between pb-6 border-b border-[#8B8A84]/20">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xl font-bold font-serif flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF5B2E]" />
              <span>{siteConfig.brandName}</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-md hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-6 py-10">
            {navLinks.map((link, idx) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl sm:text-3xl font-serif text-[#F4F1EA]/90 hover:text-[#FF5B2E] transition-colors flex items-center justify-between"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                <span>{link.label}</span>
                <span className="text-xs font-mono text-[#8B8A84]">0{idx + 1}</span>
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStudioModal();
              }}
              className="mt-2 text-left text-lg font-mono text-[#FF5B2E] flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Launch Live Gemini Studio →</span>
            </button>
          </nav>

          <div className="pt-6 border-t border-[#8B8A84]/20 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDemoModal();
              }}
              className="w-full py-3 text-center text-sm font-medium text-[#F4F1EA] bg-[#FF5B2E] hover:bg-[#E0481D] rounded-md transition-colors"
            >
              {siteConfig.primaryCtaLabel}
            </button>
            <p className="text-xs font-mono text-[#8B8A84] text-center">
              Reply within 1 business day · Zero data retention
            </p>
          </div>
        </div>
      )}
    </>
  );
};
