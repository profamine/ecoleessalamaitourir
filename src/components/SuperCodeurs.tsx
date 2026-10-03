/**
 * @file components/SuperCodeurs.tsx
 * Specialized showcase for Super Codeurs Academy & Robotics (Micro:bit, Scratch, Python),
 * curriculum by age group, and enrollment.
 */

import React from 'react';
import { Cpu, Code, Bot, Sparkles, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { superCodeursCurriculum } from '../data/schoolData';

interface SuperCodeursProps {
  lang: Language;
  onEnroll: () => void;
}

export const SuperCodeurs: React.FC<SuperCodeursProps> = ({ lang, onEnroll }) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <section id="super-codeurs" className="py-20 px-4 sm:px-6 bg-gradient-to-b from-stone-900 via-stone-900 to-[#122344] text-white border-b border-stone-800">
      <div className="max-w-[1240px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30 text-xs font-bold">
            <Cpu className="w-3.5 h-3.5" />
            <span>{t.superCodeurs.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {t.superCodeurs.title}
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.superCodeurs.desc}
          </p>
        </div>

        {/* 3 Tracks by Age Group */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {superCodeursCurriculum.tracks.map((track, idx) => (
            <div
              key={idx}
              className="rounded-2xl bg-stone-800/80 border border-stone-700 p-7 flex flex-col justify-between hover:border-amber-400/60 transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-300 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                    {lang === 'ar' ? track.ageAr : track.ageFr}
                  </span>
                  <span className="text-stone-400 font-mono text-xs">
                    0{idx + 1}
                  </span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
                    {idx === 0 ? <Bot className="w-5 h-5" /> : idx === 1 ? <Cpu className="w-5 h-5" /> : <Code className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">
                    {lang === 'ar' ? track.levelAr : track.levelFr}
                  </h3>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {lang === 'ar' ? track.descAr : track.descFr}
                </p>

                {/* Tools tags */}
                <div className="pt-2 flex flex-wrap gap-1.5">
                  {track.tools.map((tool, tIdx) => (
                    <span 
                      key={tIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-stone-700/60 text-stone-200 border border-stone-600"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-700 text-xs text-amber-300 font-semibold flex items-center gap-1.5">
                <span>{lang === 'ar' ? 'متاح لجميع تلاميذ المؤسسة' : 'Accessible aux élèves d’Essalam'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Gained & Action Banner */}
        <div className="p-8 rounded-2xl bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-blue-950/50 border border-blue-800/40 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <h4 className="text-xl font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>{t.superCodeurs.skillsTitle}</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-stone-200">
              {superCodeursCurriculum.skills.map((skill, sIdx) => (
                <div key={sIdx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{lang === 'ar' ? skill.ar : skill.fr}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={onEnroll}
            className="shrink-0 px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-sm shadow-lg transition-transform hover:scale-105 flex items-center gap-2 cursor-pointer"
          >
            <span>{t.superCodeurs.enlistBtn}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
