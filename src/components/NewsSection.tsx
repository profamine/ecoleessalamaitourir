/**
 * @file components/NewsSection.tsx
 * School news and administrative announcements with dedicated detailed modal reader.
 */

import React, { useState } from 'react';
import { Bell, Calendar, ChevronRight, X, AlertCircle, FileText, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language, NewsArticle } from '../types';
import { i18n } from '../data/translations';
import { newsArticles } from '../data/schoolData';

interface NewsSectionProps {
  lang: Language;
}

export const NewsSection: React.FC<NewsSectionProps> = ({ lang }) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  return (
    <section id="news" className="py-20 px-4 sm:px-6 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'البلاغات والمستجدات' : 'Communiqués & Actualités'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.news.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.news.subtitle}
          </p>
        </div>

        {/* 3 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsArticles.map((article) => (
            <div
              key={article.id}
              className={`rounded-2xl border p-7 flex flex-col justify-between transition-all duration-300 ${
                article.important
                  ? 'border-blue-400/80 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-700 shadow-md ring-1 ring-blue-300 dark:ring-blue-800'
                  : 'border-stone-200 dark:border-stone-800 bg-[#fbfbfb] dark:bg-stone-800/40 shadow-sm hover:shadow-md'
              }`}
            >
              <div className="space-y-4">
                {/* Meta info */}
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-bold px-2.5 py-0.5 rounded-full ${
                    article.important 
                      ? 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-200' 
                      : 'bg-stone-200/80 text-stone-700 dark:bg-stone-700 dark:text-stone-300'
                  }`}>
                    {lang === 'ar' ? article.categoryAr : article.categoryFr}
                  </span>
                  <div className="flex items-center gap-1.5 text-stone-500 dark:text-stone-400 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-stone-900 dark:text-white leading-snug">
                  {lang === 'ar' ? article.titleAr : article.titleFr}
                </h3>

                <p className="text-stone-600 dark:text-stone-400 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {lang === 'ar' ? article.summaryAr : article.summaryFr}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-4 border-t border-stone-200/60 dark:border-stone-700/60 flex items-center justify-between">
                <button
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1e3c72] dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors cursor-pointer"
                >
                  <span>{t.news.readMore}</span>
                  <ArrowIcon className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Article Modal */}
        {selectedArticle && (
          <div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedArticle(null)}
          >
            <div
              className="relative max-w-2xl w-full bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-700 max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-5 sm:p-6 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-xs text-amber-300 font-semibold">
                    {lang === 'ar' ? selectedArticle.categoryAr : selectedArticle.categoryFr} · {selectedArticle.date}
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold leading-tight">
                    {lang === 'ar' ? selectedArticle.titleAr : selectedArticle.titleFr}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={t.news.closeModal}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto space-y-4 text-stone-700 dark:text-stone-300 text-sm sm:text-base leading-relaxed">
                {(lang === 'ar' ? selectedArticle.contentAr : selectedArticle.contentFr).map((paragraph, pIdx) => (
                  <p key={pIdx} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Modal Footer */}
              <div className="p-4 sm:p-5 bg-stone-50 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-700 flex items-center justify-between text-xs">
                <span className="text-stone-500 dark:text-stone-400">
                  {lang === 'ar' ? 'إدارة مجموعة مدارس السلام - أيت أورير' : 'Direction du Groupe Scolaire Essalam'}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="px-4 py-2 rounded-lg bg-[#1e3c72] text-white font-semibold hover:bg-blue-900 transition-colors cursor-pointer"
                >
                  {t.news.closeModal}
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
