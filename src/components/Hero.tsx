/**
 * @file components/Hero.tsx
 * Hero section with animated numeric statistics counters, value proposition,
 * video/motion background motif, and primary call-to-actions.
 */

import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, Award, Compass, Calculator, ExternalLink, ShieldCheck } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { statsData } from '../data/schoolData';

interface HeroProps {
  lang: Language;
  onExplore: () => void;
  onOpenRegister: () => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  lang,
  onExplore,
  onOpenRegister,
  onOpenPortal,
}) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Animated counters simulation
  const [counts, setCounts] = useState<{ [key: string]: number }>({
    students: 0,
    success: 0,
    'top-mark': 0,
    clubs: 0,
  });

  useEffect(() => {
    const duration = 1800; // ms
    const steps = 40;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      // Ease-out cubic curve
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts({
        students: Math.floor(1250 * eased),
        success: Math.floor(100 * eased),
        'top-mark': Number((9.7 * eased).toFixed(2)),
        clubs: Math.floor(12 * eased),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCounts({
          students: 1250,
          success: 100,
          'top-mark': 9.7,
          clubs: 12,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section 
      id="home"
      className="relative bg-gradient-to-b from-[#1e3c72] via-[#244785] to-[#2a5298] text-white pt-20 pb-24 sm:pt-28 sm:pb-32 px-4 sm:px-6 overflow-hidden"
    >
      {/* Background architectural geometric texture & ambient glows */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.4) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(253, 224, 71, 0.3) 2%, transparent 0%)`,
          backgroundSize: '80px 80px',
        }}
      />
      <div className="absolute top-10 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[1240px] mx-auto text-center space-y-8">
        
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xs border border-white/20 text-xs sm:text-sm font-medium text-amber-300 shadow-xs">
          <ShieldCheck className="w-4 h-4 text-amber-300" />
          <span>{t.hero.verifiedBadge}</span>
        </div>

        {/* Headings */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-sm">
            {t.hero.welcome}
            <span className="block text-amber-300 text-2xl sm:text-4xl lg:text-5xl mt-2 font-bold">
              {t.hero.titleHighlight}
            </span>
          </h1>

          <p className="text-base sm:text-xl text-blue-100/95 leading-relaxed max-w-3xl mx-auto font-normal">
            {t.hero.desc}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
          <button
            onClick={onExplore}
            className="px-6 sm:px-8 py-3 bg-[#28a745] hover:bg-[#218838] text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base flex items-center gap-2"
          >
            <span>{t.hero.ctaExplore}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>

          <button
            onClick={onOpenRegister}
            className="px-6 sm:px-7 py-3 bg-amber-400 hover:bg-amber-300 text-[#1e3c72] font-bold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base flex items-center gap-2"
          >
            <Calculator className="w-4 h-4" />
            <span>{t.hero.ctaRegister}</span>
          </button>

          <button
            onClick={onOpenPortal}
            className="px-5 sm:px-6 py-3 bg-white/15 hover:bg-white/25 text-white font-semibold rounded-xl border border-white/30 backdrop-blur-xs transition-all cursor-pointer text-sm sm:text-base flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-amber-300" />
            <span>{t.hero.ctaPortal}</span>
          </button>
        </div>

        {/* Animated Numerical Statistics Grid (Quantitative Adjacency) */}
        <div className="pt-12 sm:pt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 border-t border-white/15 text-white text-center">
          
          {/* Stat 1: Students */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-mono tabular-nums">
              {counts.students.toLocaleString()}
              <span>+</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">
              {lang === 'ar' ? 'تلميذ وتلميذة' : 'Élèves inscrits'}
            </div>
            <div className="text-[11px] text-blue-200 mt-0.5">
              {lang === 'ar' ? 'من الروض إلى الإعدادي' : 'Maternelle au collège'}
            </div>
          </div>

          {/* Stat 2: Success Rate */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-300 font-mono tabular-nums">
              {counts.success}
              <span>%</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">
              {lang === 'ar' ? 'نسبة النجاح والاستحقاق' : 'Taux de réussite'}
            </div>
            <div className="text-[11px] text-blue-200 mt-0.5">
              {lang === 'ar' ? 'في الامتحانات الإشهادية' : 'Aux examens officiels'}
            </div>
          </div>

          {/* Stat 3: Top Provincial Grade */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-mono tabular-nums">
              {counts['top-mark'].toFixed(2)}
              <span className="text-lg">/10</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">
              {lang === 'ar' ? 'أعلى معدل إقليمي بالحوز' : '1ère note Al Haouz'}
            </div>
            <div className="text-[11px] text-blue-200 mt-0.5">
              {lang === 'ar' ? 'الرتبة الأولى بالابتدائي' : 'Examen unifié 6ème'}
            </div>
          </div>

          {/* Stat 4: Clubs & Super Codeurs */}
          <div className="p-4 sm:p-5 rounded-2xl bg-white/10 backdrop-blur-xs border border-white/15 transition-transform hover:-translate-y-1">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-300 font-mono tabular-nums">
              {counts.clubs}
              <span>+</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-white mt-1">
              {lang === 'ar' ? 'أكاديميات ونوادي نشيطة' : 'Clubs & Ateliers'}
            </div>
            <div className="text-[11px] text-blue-200 mt-0.5">
              {lang === 'ar' ? 'روبوتيكس ومسرح ورياضة' : 'Robotique & parascolaire'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
