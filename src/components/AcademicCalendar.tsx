/**
 * @file components/AcademicCalendar.tsx
 * Academic calendar displaying holidays, continuous evaluation, and official exam dates.
 */

import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Award, ShieldAlert, Sparkles } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { academicCalendarEvents } from '../data/schoolData';

interface AcademicCalendarProps {
  lang: Language;
}

export const AcademicCalendar: React.FC<AcademicCalendarProps> = ({ lang }) => {
  const t = i18n[lang];
  const [activeTab, setActiveTab] = useState<'all' | 'holiday' | 'exam' | 'event'>('all');

  const filteredEvents = activeTab === 'all'
    ? academicCalendarEvents
    : academicCalendarEvents.filter(e => e.type === activeTab);

  return (
    <section id="calendar" className="py-20 px-4 sm:px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'المواعيد والمحطات الرسمية' : 'Échéances Officielles'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.calendar.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.calendar.subtitle}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#1e3c72] text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {lang === 'ar' ? 'جميع المواعيد' : 'Toutes les dates'}
          </button>
          <button
            onClick={() => setActiveTab('exam')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'exam'
                ? 'bg-[#1e3c72] text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {t.calendar.examsTab}
          </button>
          <button
            onClick={() => setActiveTab('holiday')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'holiday'
                ? 'bg-[#1e3c72] text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {t.calendar.holidaysTab}
          </button>
          <button
            onClick={() => setActiveTab('event')}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'event'
                ? 'bg-[#1e3c72] text-white shadow-sm'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
            }`}
          >
            {t.calendar.eventsTab}
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className={`rounded-2xl border p-6 flex flex-col justify-between transition-all ${
                evt.type === 'exam'
                  ? 'border-amber-200 bg-amber-50/40 dark:bg-amber-950/20 dark:border-amber-800/60 shadow-xs'
                  : evt.type === 'holiday'
                  ? 'border-emerald-200 bg-emerald-50/40 dark:bg-emerald-950/20 dark:border-emerald-800/60 shadow-xs'
                  : 'border-stone-200 dark:border-stone-800 bg-[#fbfbfb] dark:bg-stone-800/40'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                    evt.type === 'exam'
                      ? 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-200'
                      : evt.type === 'holiday'
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200'
                      : 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200'
                  }`}>
                    {evt.type === 'exam' ? (lang === 'ar' ? 'امتحان / فروض' : 'Examen / Contrôle') :
                     evt.type === 'holiday' ? (lang === 'ar' ? 'عطلة مدرسية' : 'Vacances') :
                     (lang === 'ar' ? 'حدث تربوي' : 'Événement')}
                  </span>
                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{lang === 'ar' ? evt.durationAr : evt.durationFr}</span>
                  </div>
                </div>

                <h3 className="text-base font-bold text-stone-900 dark:text-white leading-snug">
                  {lang === 'ar' ? evt.titleAr : evt.titleFr}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between text-xs font-semibold text-[#1e3c72] dark:text-blue-400">
                <div className="flex items-center gap-1.5">
                  <CalendarIcon className="w-4 h-4 text-amber-500" />
                  <span>{lang === 'ar' ? evt.dateAr : evt.dateFr}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Note note */}
        <div className="mt-10 p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-800 text-xs text-stone-600 dark:text-stone-300 text-center max-w-2xl mx-auto">
          {t.calendar.ministryNote}
        </div>

      </div>
    </section>
  );
};
