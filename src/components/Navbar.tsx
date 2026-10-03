/**
 * @file components/Navbar.tsx
 * Sticky header with brand lockup, fallback logo, navigation links,
 * language switcher, dark mode toggle, and accessible mobile drawer.
 */

import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Globe, GraduationCap, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';

interface NavbarProps {
  lang: Language;
  onToggleLang: () => void;
  isDark: boolean;
  onToggleDark: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenPortal: () => void;
  onOpenRegister: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  lang,
  onToggleLang,
  isDark,
  onToggleDark,
  activeSection,
  onNavigate,
  onOpenPortal,
  onOpenRegister,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [imgError, setImgError] = useState(false);
  const t = i18n[lang];

  const fbLogoUrl = "https://scontent-sin6-3.xx.fbcdn.net/v/t39.30808-1/469975649_1214724883475321_708492059590782695_n.jpg?stp=dst-jpg_tt6&cstp=mx500x500&ctp=s500x500&_nc_cat=106&ccb=1-7&_nc_sid=3ab345&_nc_ohc=u-S5tJCMXaMQ7kNvwEvt7F6&_nc_oc=AdrSfIdwByMq8KVNk-Hxq_GrILRsXZfvKTvzZiwfTYCI5yFUk477T4dsmJk9D9_gfcY&_nc_zt=24&_nc_ht=scontent-sin6-3.xx&_nc_gid=9igaZ8V88ATY6kuaJpVe4Q&_nc_ss=7c289&oh=00_AQNy68NLS7xDq0jP5ZUZf_iv3E4p8lqdoDAvX0R6IHswhA&oe=6AC62198";

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-[#1e3c72] via-[#244785] to-[#2a5298] text-white shadow-md border-b border-blue-900/40">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        
        {/* Brand Zone: Logo + Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group focus-visible:outline-2 focus-visible:outline-white rounded-lg p-1"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleNavClick('home')}
          aria-label={t.meta.siteName}
        >
          {!imgError ? (
            <img
              src={fbLogoUrl}
              alt="شعار مدرسة السلام"
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-12 h-12 sm:w-13 sm:h-13 rounded-full object-cover border-2 border-white shadow-sm shrink-0 bg-white"
            />
          ) : (
            <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-white text-[#1e3c72] flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm shrink-0">
              <GraduationCap className="w-7 h-7 text-[#1e3c72]" />
            </div>
          )}

          <div className="flex flex-col">
            <span className="text-lg sm:text-xl font-bold tracking-tight leading-tight text-white group-hover:text-amber-300 transition-colors">
              {lang === 'ar' ? 'مدرسة السلام' : 'École Essalam'}
            </span>
            <span className="text-[11px] sm:text-xs text-blue-100 font-medium opacity-90">
              {lang === 'ar' ? 'أيت أورير · إقليم الحوز' : 'Aït Ourir · Al Haouz'}
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 text-xs sm:text-sm font-medium" aria-label="Main Navigation">
          <button
            onClick={() => handleNavClick('home')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'home' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'about' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('services')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'services' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.services}
          </button>
          <button
            onClick={() => handleNavClick('activities')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'activities' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.activities}
          </button>
          <button
            onClick={() => handleNavClick('super-codeurs')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'super-codeurs' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.superCodeurs}
          </button>
          <button
            onClick={() => handleNavClick('gallery')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'gallery' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.gallery}
          </button>
          <button
            onClick={() => handleNavClick('news')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'news' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.news}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors py-1 cursor-pointer hover:text-amber-300 ${
              activeSection === 'contact' ? 'text-amber-300 font-bold border-b-2 border-amber-300' : 'text-blue-50'
            }`}
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Action Controls: Theme, Lang, Portal, Register */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDark}
            className="p-1.5 sm:p-2 text-blue-100 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label={isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'}
            title={isDark ? 'Mode Clair' : 'Mode Sombre'}
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-blue-100" />}
          </button>

          {/* Language Toggle */}
          <button
            onClick={onToggleLang}
            className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg transition-colors cursor-pointer"
            aria-label="Changer de langue / تغيير اللغة"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{lang === 'ar' ? 'FR' : 'عربي'}</span>
          </button>

          {/* Portal Button */}
          <button
            onClick={onOpenPortal}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-900/60 hover:bg-blue-900/90 border border-blue-300/30 rounded-lg transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{t.nav.portal}</span>
          </button>

          {/* Quick Register CTA */}
          <button
            onClick={onOpenRegister}
            className="hidden md:inline-flex items-center gap-1 px-3.5 py-1.5 text-xs font-bold text-white bg-[#28a745] hover:bg-[#218838] rounded-lg shadow-sm transition-all cursor-pointer whitespace-nowrap"
          >
            <span>{t.nav.register}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-1.5 text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            aria-label="قائمة التصفح"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#18325e] border-t border-white/15 px-4 pt-3 pb-5 space-y-2 text-sm shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-white/10">
            <button
              onClick={() => handleNavClick('home')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('services')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.services}
            </button>
            <button
              onClick={() => handleNavClick('activities')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.activities}
            </button>
            <button
              onClick={() => handleNavClick('super-codeurs')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.superCodeurs}
            </button>
            <button
              onClick={() => handleNavClick('gallery')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.gallery}
            </button>
            <button
              onClick={() => handleNavClick('news')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.news}
            </button>
            <button
              onClick={() => handleNavClick('staff')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.staff}
            </button>
            <button
              onClick={() => handleNavClick('calendar')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.calendar}
            </button>
            <button
              onClick={() => handleNavClick('faq')}
              className="text-start py-2 px-3 rounded-lg text-white hover:bg-white/10"
            >
              {t.nav.faq}
            </button>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenPortal();
              }}
              className="w-full py-2.5 px-4 text-center rounded-lg bg-blue-900/80 hover:bg-blue-900 text-white font-semibold text-xs border border-blue-400/30"
            >
              {t.nav.portal}
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenRegister();
              }}
              className="w-full py-2.5 px-4 text-center rounded-lg bg-[#28a745] hover:bg-[#218838] text-white font-bold text-xs"
            >
              {t.nav.register}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
