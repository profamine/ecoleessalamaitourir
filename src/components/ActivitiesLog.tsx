/**
 * @file components/ActivitiesLog.tsx
 * Journal filtrable des activités 2024-2025 avec fenêtre de détail.
 */
import React, { useState, useEffect } from 'react';
import { Calendar, Users, X, ChevronDown } from 'lucide-react';
import { Language } from '../types';
import { activitiesLog, activityCategories, ActivityLogItem, ActivityCategory } from '../data/activitiesLog';

const PAGE = 9;

export const ActivitiesLog: React.FC<{ lang: Language }> = ({ lang }) => {
  const ar = lang === 'ar';
  const [filter, setFilter] = useState<'all' | ActivityCategory>('all');
  const [shown, setShown] = useState(PAGE);
  const [open, setOpen] = useState<ActivityLogItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const fmt = (iso: string, opts: Intl.DateTimeFormatOptions) =>
    new Date(iso + 'T12:00:00').toLocaleDateString(ar ? 'ar-MA-u-nu-latn' : 'fr-FR', opts);
  const dateLabel = (a: ActivityLogItem) => {
    if (!a.d) return ar ? 'تاريخ غير محدد' : 'Date non précisée';
    const o: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' };
    return a.end ? `${fmt(a.d, { day: 'numeric' })} – ${fmt(a.end, o)}` : fmt(a.d, o);
  };

  const list = activitiesLog.filter((a) => filter === 'all' || a.cat === filter);
  const catOf = (id: string) => activityCategories.find((c) => c.id === id)!;
  const count = (id: string) => (id === 'all' ? activitiesLog.length : activitiesLog.filter((a) => a.cat === id).length);

  return (
    <div className="mt-20" id="activities-log">
      <div className="text-center mb-8 space-y-2">
        <h3 className="text-2xl sm:text-3xl font-bold text-[#1e3c72] dark:text-white">
          {ar ? 'سجل أنشطتنا · الموسم 2024-2025' : 'Journal de nos activités · 2024-2025'}
        </h3>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          {ar ? `${activitiesLog.length} نشاطًا وثّقته المدرسة من الدخول المدرسي إلى ماي 2025` : `${activitiesLog.length} activités documentées, de la rentrée à mai 2025`}
        </p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist">
        {activityCategories.map((c) => (
          <button
            key={c.id}
            role="tab"
            aria-selected={filter === c.id}
            onClick={() => { setFilter(c.id); setShown(PAGE); }}
            className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold border transition-colors ${
              filter === c.id
                ? 'bg-purple-700 border-purple-700 text-white shadow'
                : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-200 hover:border-purple-400'
            }`}
          >
            {c.icon} {ar ? c.ar : c.fr} <span className="opacity-70">({count(c.id)})</span>
          </button>
        ))}
      </div>

      {/* Cartes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.slice(0, shown).map((a) => (
          <button
            key={a.id}
            onClick={() => setOpen(a)}
            className="text-start p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700 hover:border-purple-400 hover:shadow-lg hover:-translate-y-1 transition-all flex flex-col gap-3"
          >
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 font-bold">
                {catOf(a.cat).icon} {ar ? catOf(a.cat).ar : catOf(a.cat).fr}
              </span>
              <span className="flex items-center gap-1 text-stone-500 dark:text-stone-400"><Calendar className="w-3.5 h-3.5" />{dateLabel(a)}</span>
            </div>
            <h4 className="font-bold text-stone-900 dark:text-white leading-snug">{ar ? a.tAr : a.tFr}</h4>
            <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed line-clamp-3">{ar ? a.dAr : a.dFr}</p>
            <div className="mt-auto pt-3 border-t border-stone-200 dark:border-stone-700 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              ✔ {ar ? a.rAr : a.rFr}
            </div>
          </button>
        ))}
      </div>

      {shown < list.length && (
        <div className="text-center mt-8">
          <button onClick={() => setShown((s) => s + PAGE)} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm">
            {ar ? 'عرض المزيد' : 'Voir plus'} <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Détail */}
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60" onClick={() => setOpen(null)} role="dialog" aria-modal="true">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-stone-900 p-6 sm:p-8 shadow-2xl space-y-4" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(null)} aria-label="Close" className="absolute top-4 end-4 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800">
              <X className="w-5 h-5" />
            </button>
            <span className="inline-block px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-200 text-xs font-bold">
              {catOf(open.cat).icon} {ar ? catOf(open.cat).ar : catOf(open.cat).fr}
            </span>
            <h4 className="text-xl font-bold text-[#1e3c72] dark:text-white pe-8">{ar ? open.tAr : open.tFr}</h4>
            <div className="flex items-center gap-1.5 text-sm text-stone-500 dark:text-stone-400"><Calendar className="w-4 h-4" />{dateLabel(open)}</div>
            <p className="text-sm leading-7 text-stone-700 dark:text-stone-200">{ar ? open.dAr : open.dFr}</p>
            <div className="text-sm flex gap-2 text-stone-600 dark:text-stone-300"><Users className="w-4 h-4 mt-1 shrink-0" /><span><b>{ar ? 'المشاركون: ' : 'Participants : '}</b>{ar ? open.wAr : open.wFr}</span></div>
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-sm font-semibold">✔ {ar ? open.rAr : open.rFr}</div>
          </div>
        </div>
      )}
    </div>
  );
};
