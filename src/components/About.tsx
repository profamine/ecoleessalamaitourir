/**
 * @file components/About.tsx
 * Presentation of the institution, educational mission, regional presence in
 * Aït Ourir (Al Haouz province), and key institutional pillars.
 */

import React from 'react';
import { GraduationCap, CheckCircle2, Shield, HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';

interface AboutProps {
  lang: Language;
}

export const About: React.FC<AboutProps> = ({ lang }) => {
  const t = i18n[lang];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>{t.about.subtitle}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.about.sectionTitle}
          </h2>
        </div>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Paragraphs Column: 7 cols */}
          <div className="lg:col-span-7 space-y-5 text-stone-700 dark:text-stone-300 text-base sm:text-lg leading-relaxed">
            <p className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border-r-4 rtl:border-r-4 ltr:border-l-4 border-[#1e3c72] dark:border-blue-400 font-medium text-stone-800 dark:text-stone-200">
              {t.about.p1}
            </p>

            <p>
              {t.about.p2}
            </p>

            <p>
              {t.about.p3}
            </p>

            {/* Checklist features */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-stone-800 dark:text-stone-200">
              {t.about.features.map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-[#28a745] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Institutional Showcase Card: 5 cols */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden shadow-xl border border-stone-200 dark:border-stone-700 bg-gradient-to-br from-[#1e3c72] to-[#2a5298] text-white p-7 sm:p-8 flex flex-col justify-between relative">
              
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 20px 20px, rgba(255,255,255,0.4) 2%, transparent 0%)`,
                  backgroundSize: '30px 30px',
                }}
              />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-white/15 text-amber-300 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-bold text-white text-base">
                        {lang === 'ar' ? 'مؤسسة السلام الخاصة' : 'Groupe Scolaire Essalam'}
                      </div>
                      <div className="text-xs text-blue-200">
                        {lang === 'ar' ? 'أيت أورير - الحوز' : 'Aït Ourir - Al Haouz'}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-400 text-stone-900">
                    {lang === 'ar' ? 'معتمدة' : 'Homologué'}
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white">
                    {t.about.visionTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                    {t.about.visionDesc}
                  </p>
                </div>

                {/* Key Pillars */}
                <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <div className="font-bold text-amber-300">
                      {lang === 'ar' ? 'التعليم الأولي والابتدائي' : 'Maternelle & Primaire'}
                    </div>
                    <div className="text-[11px] text-blue-100 mt-0.5">
                      {lang === 'ar' ? 'تأسيس متين وثنائية لغوية' : 'Socle bilingue solide'}
                    </div>
                  </div>
                  <div className="p-3 rounded-xl bg-white/10 border border-white/15">
                    <div className="font-bold text-amber-300">
                      {lang === 'ar' ? 'السلك الإعدادي والتميز' : 'Collège International'}
                    </div>
                    <div className="text-[11px] text-blue-100 mt-0.5">
                      {lang === 'ar' ? 'خيار دولي وعلوم وتكنولوجيا' : 'Option BIOF & STEM'}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 flex items-center justify-between text-xs text-blue-200">
                  <div className="flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-emerald-300" />
                    <span>{lang === 'ar' ? 'ترخيص وزارة التربية الوطنية' : 'Agrément ministériel'}</span>
                  </div>
                  <span className="font-semibold text-amber-300">
                    {lang === 'ar' ? '100% نسبة النجاح' : '100% Réussite'}
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
