/**
 * @file components/ParentPortal.tsx
 * Interactive student performance tracking portal with visual marks chart,
 * attendance records, upcoming exams, and printable bulletin de notes.
 */

import React, { useState } from 'react';
import { 
  X, 
  Search, 
  Printer, 
  User, 
  Award, 
  Calendar, 
  Sparkles, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Clock,
  BookOpen
} from 'lucide-react';
import { Language, StudentRecord } from '../types';
import { i18n } from '../data/translations';
import { mockStudentsRecords } from '../data/schoolData';

interface ParentPortalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ isOpen, onClose, lang }) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';

  const [codeQuery, setCodeQuery] = useState('SALAM-2024');
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'exams'>('grades');
  const [currentRecord, setCurrentRecord] = useState<StudentRecord | null>(mockStudentsRecords['SALAM-2024']);
  const [notice, setNotice] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = codeQuery.trim().toUpperCase();
    if (mockStudentsRecords[clean]) {
      setCurrentRecord(mockStudentsRecords[clean]);
      setNotice(null);
    } else {
      setCurrentRecord(mockStudentsRecords['SALAM-2024']);
      setNotice(isRtl 
        ? 'تم عرض ملف استرشادي للتلميذ المتفوق. يمكنك تجربة الرموز التجريبية: SALAM-2024 أو SALAM-1025.'
        : 'Dossier exemple affiché. Essayez les codes : SALAM-2024 ou SALAM-1025.');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-3xl shadow-2xl border border-stone-200 dark:border-stone-800 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Modal Top Bar */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#1e3c72] via-[#244785] to-[#2a5298] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400 text-[#1e3c72] flex items-center justify-center font-bold shadow-md">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold">
                {t.portal.title}
              </h3>
              <p className="text-xs text-blue-200">
                {lang === 'ar' ? 'منظومة التتبع البيداغوجي المباشر · مدرسة السلام' : 'Plateforme de suivi pédagogique · École Essalam'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-blue-200 hover:text-white rounded-xl hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={t.portal.closeBtn}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Demo Codes Bar */}
        <div className="p-4 sm:p-6 bg-stone-50 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={codeQuery}
                onChange={(e) => setCodeQuery(e.target.value)}
                placeholder={t.portal.codePlaceholder}
                className="w-full pl-4 pr-10 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white"
              />
              <Search className="w-4 h-4 text-stone-400 absolute right-3.5 top-3.5" />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#1e3c72] hover:bg-blue-900 text-white font-bold text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap"
            >
              {t.portal.searchBtn}
            </button>
          </form>

          {/* Preset Buttons */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-stone-600 dark:text-stone-300">
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {t.portal.demoNote}
            </span>
            <button
              onClick={() => {
                setCodeQuery('SALAM-2024');
                setCurrentRecord(mockStudentsRecords['SALAM-2024']);
                setNotice(null);
              }}
              className="px-2.5 py-1 bg-white dark:bg-stone-700 hover:bg-blue-50 text-blue-900 dark:text-blue-200 border border-stone-300 dark:border-stone-600 rounded-md font-mono cursor-pointer"
            >
              SALAM-2024 (أميمة - 6 ابتدائي)
            </button>
            <button
              onClick={() => {
                setCodeQuery('SALAM-1025');
                setCurrentRecord(mockStudentsRecords['SALAM-1025']);
                setNotice(null);
              }}
              className="px-2.5 py-1 bg-white dark:bg-stone-700 hover:bg-blue-50 text-blue-900 dark:text-blue-200 border border-stone-300 dark:border-stone-600 rounded-md font-mono cursor-pointer"
            >
              SALAM-1025 (ياسر - 3 إعدادي)
            </button>
          </div>

          {notice && (
            <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{notice}</span>
            </div>
          )}
        </div>

        {/* Modal Scrollable Content */}
        {currentRecord && (
          <div className="p-4 sm:p-6 overflow-y-auto space-y-6">
            
            {/* Student ID Card */}
            <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <h4 className="text-xl sm:text-2xl font-bold text-[#1e3c72] dark:text-blue-300">
                    {lang === 'ar' ? currentRecord.nameAr : currentRecord.nameFr}
                  </h4>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 font-bold text-stone-700 dark:text-stone-300">
                    {currentRecord.code}
                  </span>
                </div>
                <div className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 flex flex-wrap items-center gap-2">
                  <span>{lang === 'ar' ? currentRecord.levelAr : currentRecord.levelFr}</span>
                  <span>·</span>
                  <span>{currentRecord.classGroup}</span>
                  <span>·</span>
                  <span>{currentRecord.academicYear}</span>
                </div>
              </div>

              {/* Stats Box */}
              <div className="flex items-center gap-6 border-t sm:border-t-0 sm:border-s border-blue-200 dark:border-blue-800 pt-3 sm:pt-0 sm:ps-6">
                <div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">{t.portal.overallAverage}</div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1e3c72] dark:text-blue-300 font-mono tabular-nums">
                    {currentRecord.overallAverage}
                  </div>
                  <div className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                    {lang === 'ar' ? currentRecord.rankAr : currentRecord.rankFr}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-stone-500 dark:text-stone-400">{t.portal.attendanceRate}</div>
                  <div className="text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-mono tabular-nums">
                    {currentRecord.attendanceRate}
                  </div>
                  <div className="text-[11px] text-stone-500 dark:text-stone-400">
                    {currentRecord.absencesCount} {lang === 'ar' ? 'غياب' : 'absence'}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 border-b border-stone-200 dark:border-stone-800 pb-1">
              <button
                onClick={() => setActiveTab('grades')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer ${
                  activeTab === 'grades'
                    ? 'border-b-2 border-[#1e3c72] dark:border-blue-400 text-[#1e3c72] dark:text-blue-400'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                {t.portal.gradesTab}
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer ${
                  activeTab === 'attendance'
                    ? 'border-b-2 border-[#1e3c72] dark:border-blue-400 text-[#1e3c72] dark:text-blue-400'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                {t.portal.attendanceTab}
              </button>
              <button
                onClick={() => setActiveTab('exams')}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-t-xl transition-all cursor-pointer ${
                  activeTab === 'exams'
                    ? 'border-b-2 border-[#1e3c72] dark:border-blue-400 text-[#1e3c72] dark:text-blue-400'
                    : 'text-stone-500 hover:text-stone-800 dark:hover:text-stone-200'
                }`}
              >
                {t.portal.examsTab}
              </button>
            </div>

            {/* Tab 1: Grades & Visual Progress Chart */}
            {activeTab === 'grades' && (
              <div className="space-y-6">
                
                {/* Visual Bar Chart: Marks per subject */}
                <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-stone-700 dark:text-stone-300">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span>{lang === 'ar' ? 'المبيان البياني لتوزيع النقط والتقديرات' : 'Graphique des notes par matière'}</span>
                    </div>
                    <span className="text-stone-400 font-mono">100% Barres visuelles</span>
                  </div>

                  {/* Responsive SVG Chart */}
                  <div className="space-y-3 pt-2">
                    {currentRecord.subjects.map((sub, sIdx) => {
                      const percentage = Math.round((sub.grade / sub.max) * 100);
                      return (
                        <div key={sIdx} className="space-y-1">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-stone-800 dark:text-stone-200">
                              {lang === 'ar' ? sub.nameAr : sub.nameFr} (Coeff: {sub.coeff})
                            </span>
                            <span className="font-mono font-bold text-[#1e3c72] dark:text-blue-400">
                              {sub.grade} / {sub.max} ({percentage}%)
                            </span>
                          </div>
                          {/* Progress Track */}
                          <div className="w-full h-3 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full transition-all duration-700 ${
                                percentage >= 90 ? 'bg-emerald-500' : percentage >= 75 ? 'bg-blue-600' : 'bg-amber-500'
                              }`}
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Table Breakdown */}
                <div className="overflow-x-auto border border-stone-200 dark:border-stone-800 rounded-2xl">
                  <table className="w-full text-xs sm:text-sm text-start">
                    <thead className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-700 font-bold">
                      <tr>
                        <th className="py-3 px-4 text-start">{lang === 'ar' ? 'المادة' : 'Matière'}</th>
                        <th className="py-3 px-3 text-center">{lang === 'ar' ? 'المعامل' : 'Coeff'}</th>
                        <th className="py-3 px-4 text-center">{lang === 'ar' ? 'النقطة' : 'Note'}</th>
                        <th className="py-3 px-4 text-start">{lang === 'ar' ? 'ملاحظة الأستاذ(ة)' : 'Appréciation'}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-100 dark:divide-stone-800 text-stone-700 dark:text-stone-300">
                      {currentRecord.subjects.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors">
                          <td className="py-3 px-4 font-semibold text-stone-900 dark:text-white">
                            {lang === 'ar' ? sub.nameAr : sub.nameFr}
                          </td>
                          <td className="py-3 px-3 text-center font-mono">{sub.coeff}</td>
                          <td className="py-3 px-4 text-center">
                            <span className="font-bold text-[#1e3c72] dark:text-blue-300 font-mono text-sm">
                              {sub.grade}
                            </span>
                            <span className="text-stone-400 text-xs"> / {sub.max}</span>
                          </td>
                          <td className="py-3 px-4 text-xs text-stone-600 dark:text-stone-400">
                            {lang === 'ar' ? sub.commentAr : sub.commentFr}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Conduct appraisal */}
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{lang === 'ar' ? 'تقدير السلوك والمواظبة: ' : 'Comportement & Assiduité : '}</span>
                    <span>{lang === 'ar' ? currentRecord.behaviorNoteAr : currentRecord.behaviorNoteFr}</span>
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Attendance */}
            {activeTab === 'attendance' && (
              <div className="p-6 rounded-2xl bg-stone-50 dark:bg-stone-800/40 border border-stone-200 dark:border-stone-800 space-y-4 text-center">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-stone-900 dark:text-white">
                  {lang === 'ar' ? 'تقرير المواظبة والغياب' : 'Bilan de Présence'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto">
                  {t.portal.noAbsence}
                </p>
                <div className="inline-block font-mono text-xs px-4 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300">
                  {lang === 'ar' ? `نسبة الحضور التراكمية: ${currentRecord.attendanceRate}` : `Taux d'assiduité : ${currentRecord.attendanceRate}`}
                </div>
              </div>
            )}

            {/* Tab 3: Upcoming Exams */}
            {activeTab === 'exams' && (
              <div className="space-y-3">
                {currentRecord.upcomingExams.map((exam, exIdx) => (
                  <div key={exIdx} className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950 text-[#1e3c72] dark:text-blue-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900 dark:text-white">
                          {lang === 'ar' ? exam.nameAr : exam.nameFr}
                        </div>
                        <div className="text-xs text-stone-500">
                          {exam.room} · مدرسة السلام أيت أورير
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-[#1e3c72] dark:text-blue-300 bg-blue-50 dark:bg-blue-950 px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-800 font-mono">
                      {exam.date}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        )}

        {/* Modal Bottom Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 dark:bg-stone-800 border-t border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 dark:text-stone-400">
            {lang === 'ar' ? 'مدرسة السلام - أيت أورير · نظام التتبع المدرسي' : 'École Essalam · Suivi scolaire en ligne'}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-stone-700 dark:text-stone-200 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-xl hover:bg-stone-50 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{t.portal.printReportBtn}</span>
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 text-xs font-bold text-white bg-[#1e3c72] hover:bg-blue-900 rounded-xl transition-colors cursor-pointer"
            >
              {t.portal.closeBtn}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
