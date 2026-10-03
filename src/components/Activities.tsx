/**
 * @file components/Activities.tsx
 * The 6 extracurricular activities with rich purple gradients (#667eea → #764ba2),
 * institutional partnerships (Royal Gendarmerie, Scoutisme Hassania), and Facebook media links.
 */

import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { activitiesData } from '../data/schoolData';
import { ActivitiesLog } from './ActivitiesLog';

interface ActivitiesProps {
  lang: Language;
}

export const Activities: React.FC<ActivitiesProps> = ({ lang }) => {
  const t = i18n[lang];
  const facebookPageUrl = "https://www.facebook.com/essalam.aitourir";

  return (
    <section id="activities" className="py-20 px-4 sm:px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-purple-700 dark:text-purple-400 tracking-wider">
            {lang === 'ar' ? 'الحياة المدرسية والأنشطة الموازية' : 'Vie Scolaire & Citoyenneté'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.activities.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.activities.subtitle}
          </p>
        </div>

        {/* 6 Purple Gradient Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {activitiesData.map((act) => (
            <div
              key={act.id}
              className="bg-gradient-to-br from-[#667eea] via-[#6e63b3] to-[#764ba2] text-white p-8 rounded-2xl text-center shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between relative overflow-hidden group"
            >
              {/* Subtle background motif */}
              <div 
                className="absolute inset-0 opacity-10 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 15px 15px, rgba(255,255,255,0.4) 2%, transparent 0%)`,
                  backgroundSize: '25px 25px',
                }}
              />

              <div className="relative z-10">
                <div className="text-5xl mb-4 transition-transform group-hover:scale-110 duration-200">
                  {act.icon}
                </div>

                <h3 className="text-xl font-bold text-white mb-2.5">
                  {lang === 'ar' ? act.titleAr : act.titleFr}
                </h3>

                <p className="text-purple-50 text-sm leading-relaxed mb-4 opacity-95">
                  {lang === 'ar' ? act.descAr : act.descFr}
                </p>
              </div>

              {/* Partner Marker */}
              {act.partnerAr && (
                <div className="relative z-10 pt-3 border-t border-white/20 text-xs font-medium text-amber-200 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? act.partnerAr : act.partnerFr}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Journal des activités 2024-2025 */}
        <ActivitiesLog lang={lang} />

        {/* Facebook Link Callout */}
        <div className="mt-14 p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-start">
          <div className="space-y-1">
            <div className="font-bold text-stone-900 dark:text-white text-base">
              {t.activities.fbNotice}
            </div>
            <div className="text-xs text-stone-600 dark:text-stone-400">
              {lang === 'ar' 
                ? 'تابعوا تقارير السلامة الطرقية، المسرح المدرسي، والأنشطة البيئية بالصوت والصورة.'
                : 'Revivez tous nos reportages et tournois sur la page Facebook officielle d’Essalam.'}
            </div>
          </div>
          <a
            href={facebookPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors"
          >
            <span>{t.activities.viewAllOnFb}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
};
