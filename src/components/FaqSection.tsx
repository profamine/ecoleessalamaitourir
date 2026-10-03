/**
 * @file components/FaqSection.tsx
 * Frequently Asked Questions presented in an accessible accordion with category filtering.
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { faqList } from '../data/schoolData';

interface FaqSectionProps {
  lang: Language;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const t = i18n[lang];
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const [selectedCat, setSelectedCat] = useState<string>('all');

  const filteredFaqs = selectedCat === 'all'
    ? faqList
    : faqList.filter(item => item.category === selectedCat);

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'إرشادات وإجابات' : 'Questions & Réponses'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.faq.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.faq.subtitle}
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {[
            { id: 'all', label: t.faq.categories.all },
            { id: 'admissions', label: t.faq.categories.admissions },
            { id: 'transport', label: t.faq.categories.transport },
            { id: 'pedagogy', label: t.faq.categories.pedagogy },
            { id: 'activities', label: t.faq.categories.activities },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                selectedCat === cat.id
                  ? 'bg-[#1e3c72] text-white shadow-xs'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-2xl border border-stone-200 dark:border-stone-800 bg-[#fcfcfc] dark:bg-stone-800/40 overflow-hidden transition-all shadow-xs"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 sm:p-6 text-start flex items-center justify-between gap-4 cursor-pointer focus:outline-none focus:bg-stone-50"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base sm:text-lg text-stone-900 dark:text-white leading-snug">
                    {lang === 'ar' ? faq.questionAr : faq.questionFr}
                  </span>
                  <div className="p-1 rounded-full bg-stone-200/70 dark:bg-stone-700 text-stone-700 dark:text-stone-200 shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed border-t border-stone-100 dark:border-stone-800/80 bg-white dark:bg-stone-900/60">
                    {lang === 'ar' ? faq.answerAr : faq.answerFr}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
