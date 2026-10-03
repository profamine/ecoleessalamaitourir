/**
 * @file App.tsx
 * Main application coordinator for Groupe Scolaire Essalam (Aït Ourir).
 * Manages language state (AR/FR), dark mode, modal portals, and section scrolling.
 */

import React, { useState, useEffect } from 'react';
import { Language } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Services } from './components/Services';
import { Activities } from './components/Activities';
import { SuperCodeurs } from './components/SuperCodeurs';
import { Gallery } from './components/Gallery';
import { NewsSection } from './components/NewsSection';
import { StaffSection } from './components/StaffSection';
import { AcademicCalendar } from './components/AcademicCalendar';
import { Testimonials } from './components/Testimonials';
import { FaqSection } from './components/FaqSection';
import { FacebookSection } from './components/FacebookSection';
import { RegistrationStepper } from './components/RegistrationStepper';
import { ContactAndMap } from './components/ContactAndMap';
import { Footer } from './components/Footer';
import { ParentPortal } from './components/ParentPortal';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isPortalOpen, setIsPortalOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>('home');

  // Sync document language, direction, and dark mode class
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Scroll active section spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        'home', 
        'about', 
        'services', 
        'activities', 
        'super-codeurs', 
        'gallery', 
        'news', 
        'staff', 
        'calendar', 
        'testimonials', 
        'faq', 
        'facebook', 
        'registration', 
        'contact'
      ];
      const scrollY = window.scrollY;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop - 140;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'fr' : 'ar'));
  };

  const handleToggleDark = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <div className={`min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-100 transition-colors ${lang === 'ar' ? 'font-sans' : 'font-sans'}`}>
      
      {/* 1. Sticky Navigation Bar */}
      <Navbar
        lang={lang}
        onToggleLang={handleToggleLang}
        isDark={isDark}
        onToggleDark={handleToggleDark}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenRegister={() => scrollToSection('registration')}
      />

      <main>
        {/* 2. Hero with Animated Statistics Counters */}
        <Hero
          lang={lang}
          onExplore={() => scrollToSection('about')}
          onOpenRegister={() => scrollToSection('registration')}
          onOpenPortal={() => setIsPortalOpen(true)}
        />

        {/* 3. About Section (3 Exact Paragraphs & Vision) */}
        <About lang={lang} />

        {/* 4. 6 Core Educational Services */}
        <Services lang={lang} />

        {/* 5. 6 Extracurricular Activities (Purple Gradients) */}
        <Activities lang={lang} />

        {/* 6. Super Codeurs & Robotics Academy Showcase */}
        <SuperCodeurs 
          lang={lang} 
          onEnroll={() => scrollToSection('registration')} 
        />

        {/* 7. Gallery with Filter & Lightbox */}
        <Gallery lang={lang} />

        {/* 8. News & Official Announcements with Modal Reader */}
        <NewsSection lang={lang} />

        {/* 9. Educational & Administrative Staff Cards */}
        <StaffSection lang={lang} />

        {/* 10. Official Academic Calendar */}
        <AcademicCalendar lang={lang} />

        {/* 11. Parents Testimonials Carousel */}
        <Testimonials lang={lang} />

        {/* 12. Frequently Asked Questions (Accordion) */}
        <FaqSection lang={lang} />

        {/* 13. Official Facebook Community Hub */}
        <FacebookSection lang={lang} />

        {/* 14. Pre-Registration Multi-Step Stepper & Tuition Calculator */}
        <RegistrationStepper lang={lang} />

        {/* 15. Coordinates, Google Maps Location & Inquiry Form */}
        <ContactAndMap lang={lang} />
      </main>

      {/* 16. Institutional Footer */}
      <Footer
        lang={lang}
        onNavigate={scrollToSection}
        onOpenPortal={() => setIsPortalOpen(true)}
        onOpenRegister={() => scrollToSection('registration')}
      />

      {/* 17. Interactive Parent & Student Portal Modal */}
      <ParentPortal
        isOpen={isPortalOpen}
        onClose={() => setIsPortalOpen(false)}
        lang={lang}
      />

    </div>
  );
}
