/**
 * @file components/StaffSection.tsx
 * Showcase of pedagogical staff and administration, qualifications, and educational philosophies.
 */

import React from 'react';
import { UserCheck, Award, Briefcase, GraduationCap } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { staffMembers } from '../data/schoolData';

interface StaffSectionProps {
  lang: Language;
}

export const StaffSection: React.FC<StaffSectionProps> = ({ lang }) => {
  const t = i18n[lang];

  return (
    <section id="staff" className="py-20 px-4 sm:px-6 bg-[#f9f9f9] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'فريق العمل والتميز' : 'Équipe Pédagogique'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.staff.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.staff.subtitle}
          </p>
        </div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {staffMembers.map((member) => (
            <div
              key={member.id}
              className="rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                {/* Avatar Icon */}
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-[#1e3c72] dark:text-blue-300 flex items-center justify-center font-bold text-xl border border-blue-100 dark:border-blue-900">
                  <GraduationCap className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white leading-snug">
                    {lang === 'ar' ? member.nameAr : member.nameFr}
                  </h3>
                  <div className="text-xs font-semibold text-[#1e3c72] dark:text-blue-400 mt-0.5">
                    {lang === 'ar' ? member.roleAr : member.roleFr}
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-stone-400" />
                    <span>{lang === 'ar' ? member.cycleAr : member.cycleFr}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-amber-500" />
                    <span>{lang === 'ar' ? member.experienceAr : member.experienceFr}</span>
                  </div>
                </div>
              </div>

              {/* Quote */}
              <div className="pt-4 mt-4 border-t border-stone-100 dark:border-stone-800 text-xs italic text-stone-500 dark:text-stone-400">
                "{lang === 'ar' ? member.quoteAr : member.quoteFr}"
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
