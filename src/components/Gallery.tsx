/**
 * @file components/Gallery.tsx
 * Filterable multimedia photo & video gallery with interactive Lightbox preview modal.
 */

import React, { useState } from 'react';
import { Camera, Video, X, ExternalLink, Calendar, ZoomIn } from 'lucide-react';
import { Language, GalleryItem } from '../types';
import { i18n } from '../data/translations';
import { galleryData } from '../data/schoolData';

interface GalleryProps {
  lang: Language;
}

export const Gallery: React.FC<GalleryProps> = ({ lang }) => {
  const t = i18n[lang];
  const [filter, setFilter] = useState<string>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filteredItems = filter === 'all'
    ? galleryData
    : galleryData.filter(item => item.category === filter);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 bg-[#f9f9f9] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2 max-w-2xl">
            <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
              {lang === 'ar' ? 'فضاء الذاكرة المدرسية' : 'Mémoire de l’école'}
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
              {t.gallery.title}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
              {t.gallery.subtitle}
            </p>
          </div>

          {/* Interactive filter tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-200/80 dark:bg-stone-800 rounded-xl">
            {[
              { id: 'all', label: t.gallery.all },
              { id: 'national', label: t.gallery.national },
              { id: 'sports', label: t.gallery.sports },
              { id: 'stem', label: t.gallery.stem },
              { id: 'culture', label: t.gallery.culture },
              { id: 'campus', label: t.gallery.campus },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-white dark:bg-stone-700 text-[#1e3c72] dark:text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:text-stone-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => setActiveItem(item)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between"
            >
              {/* Card Visual Banner Container */}
              <div className="relative h-48 bg-gradient-to-br from-[#1e3c72] via-[#244785] to-[#2a5298] text-white p-6 flex flex-col justify-between overflow-hidden">
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none"
                  style={{
                    backgroundImage: `radial-gradient(circle at 15px 15px, rgba(255,255,255,0.4) 2%, transparent 0%)`,
                    backgroundSize: '30px 30px',
                  }}
                />

                <div className="relative flex items-center justify-between text-xs">
                  <span className="px-2.5 py-1 rounded-md bg-black/30 backdrop-blur-xs font-semibold text-white flex items-center gap-1.5">
                    {item.type === 'video' ? <Video className="w-3.5 h-3.5" /> : <Camera className="w-3.5 h-3.5" />}
                    <span>{item.date}</span>
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ZoomIn className="w-4 h-4 text-white" />
                  </div>
                </div>

                <div className="relative">
                  <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-amber-300 transition-colors">
                    {lang === 'ar' ? item.titleAr : item.titleFr}
                  </h3>
                </div>
              </div>

              {/* Caption */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                  {lang === 'ar' ? item.captionAr : item.captionFr}
                </p>

                <div className="pt-3 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-semibold">
                  <span>{t.gallery.openLightbox}</span>
                  <span>↗</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeItem && (
          <div 
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
            onClick={() => setActiveItem(null)}
          >
            <div 
              className="relative max-w-2xl w-full bg-white dark:bg-stone-900 rounded-2xl overflow-hidden shadow-2xl border border-stone-700"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-4 sm:p-5 bg-gradient-to-r from-[#1e3c72] to-[#2a5298] text-white flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-5 h-5 text-amber-300" />
                  <span className="font-bold text-sm sm:text-base">
                    {lang === 'ar' ? activeItem.titleAr : activeItem.titleFr}
                  </span>
                </div>
                <button
                  onClick={() => setActiveItem(null)}
                  className="p-1.5 text-blue-200 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label={t.gallery.closeLightbox}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Graphic Display Area */}
              <div className="p-8 sm:p-12 bg-gradient-to-b from-stone-900 to-stone-950 text-white text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center mx-auto text-amber-300">
                  <Camera className="w-8 h-8" />
                </div>
                <h4 className="text-xl sm:text-2xl font-bold text-white max-w-lg mx-auto leading-snug">
                  {lang === 'ar' ? activeItem.titleAr : activeItem.titleFr}
                </h4>
                <div className="text-xs text-stone-400 font-mono">
                  {lang === 'ar' ? `توثيق رسمي · أيت أورير · ${activeItem.date}` : `Reportage officiel · Aït Ourir · ${activeItem.date}`}
                </div>
              </div>

              {/* Modal Body & Action */}
              <div className="p-6 space-y-4 text-stone-700 dark:text-stone-300 text-sm">
                <p className="leading-relaxed">
                  {lang === 'ar' ? activeItem.captionAr : activeItem.captionFr}
                </p>

                <div className="pt-4 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {lang === 'ar' ? 'يمكنكم مشاهدة التغطية المصورة الكاملة على فيسبوك' : 'Retrouvez l’album complet sur notre page'}
                  </span>
                  <a
                    href={activeItem.mediaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    <span>{lang === 'ar' ? 'فتح الألبوم في فيسبوك' : 'Voir l’album Facebook'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
