/**
 * @file components/Services.tsx
 * The 6 foundational educational services cards with hover feedback and dark mode.
 */

import React from 'react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { servicesData } from '../data/schoolData';

interface ServicesProps {
  lang: Language;
}

export const Services: React.FC<ServicesProps> = ({ lang }) => {
  const t = i18n[lang];

  return (
    <section id="services" className="py-20 px-4 sm:px-6 bg-[#f9f9f9] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'ركائز التفوق الأكاديمي' : 'Piliers Éducatifs'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.services.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.services.subtitle}
          </p>
        </div>

        {/* 6 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="bg-white dark:bg-stone-900 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-stone-200/80 dark:border-stone-800 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-4xl mb-5 shadow-xs transition-transform group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-[#1e3c72] dark:text-blue-300 mb-3 group-hover:text-blue-700 dark:group-hover:text-blue-200 transition-colors">
                {lang === 'ar' ? service.titleAr : service.titleFr}
              </h3>

              <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed">
                {lang === 'ar' ? service.descAr : service.descFr}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
