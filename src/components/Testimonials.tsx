/**
 * @file components/Testimonials.tsx
 * Interactive carousel showcasing authentic parental reviews and feedback across Aït Ourir.
 */

import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { testimonialsList } from '../data/schoolData';

interface TestimonialsProps {
  lang: Language;
}

export const Testimonials: React.FC<TestimonialsProps> = ({ lang }) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIdx) => (prevIdx === 0 ? testimonialsList.length - 1 : prevIdx - 1));
  };

  const next = () => {
    setCurrentIndex((prevIdx) => (prevIdx === testimonialsList.length - 1 ? 0 : prevIdx + 1));
  };

  const current = testimonialsList[currentIndex];

  return (
    <section id="testimonials" className="py-20 px-4 sm:px-6 bg-[#f9f9f9] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1000px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'ثقة ومسؤولية' : 'Confiance & Reconnaissance'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.testimonials.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Carousel Card */}
        <div className="relative bg-white dark:bg-stone-900 rounded-3xl p-8 sm:p-12 shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
          
          <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
            {/* Rating Stars */}
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <p className="text-lg sm:text-2xl text-stone-800 dark:text-stone-100 font-medium leading-relaxed italic">
              "{lang === 'ar' ? current.commentAr : current.commentFr}"
            </p>

            {/* Author details */}
            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 w-full">
              <h4 className="text-base sm:text-lg font-bold text-[#1e3c72] dark:text-blue-400">
                {lang === 'ar' ? current.parentNameAr : current.parentNameFr}
              </h4>
              <div className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                <span>{lang === 'ar' ? current.studentLevelAr : current.studentLevelFr}</span>
                <span className="mx-2">·</span>
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  {lang === 'ar' ? current.neighborhoodAr : current.neighborhoodFr}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between pt-6 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={isRtl ? next : prev}
              className="p-2.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
              aria-label={t.testimonials.prev}
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Indicator Dots */}
            <div className="flex items-center gap-2">
              {testimonialsList.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setCurrentIndex(dotIdx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === currentIndex 
                      ? 'w-7 bg-[#1e3c72] dark:bg-blue-400' 
                      : 'bg-stone-300 dark:bg-stone-700'
                  }`}
                  aria-label={`الشريحة ${dotIdx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={isRtl ? prev : next}
              className="p-2.5 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-700 dark:text-stone-200 transition-colors cursor-pointer"
              aria-label={t.testimonials.next}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
