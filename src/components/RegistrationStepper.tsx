/**
 * @file components/RegistrationStepper.tsx
 * Multi-step admissions wizard with Moroccan phone validation, live tuition estimator,
 * printable official receipt slip, and direct WhatsApp summary dispatcher.
 */

import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Calculator, 
  Bus, 
  Utensils, 
  ShieldCheck, 
  Printer, 
  ArrowLeft, 
  ArrowRight, 
  MessageSquare,
  AlertCircle,
  FileCheck
} from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';
import { aitOurirNeighborhoodsList, feeStructure } from '../data/schoolData';

interface RegistrationStepperProps {
  lang: Language;
}

export const RegistrationStepper: React.FC<RegistrationStepperProps> = ({ lang }) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';
  const NextArrow = isRtl ? ArrowLeft : ArrowRight;
  const PrevArrow = isRtl ? ArrowRight : ArrowLeft;

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  // Form Fields
  const [studentName, setStudentName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [cycle, setCycle] = useState<'preschool' | 'primary' | 'college'>('primary');
  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [cin, setCin] = useState('');
  const [neighborhood, setNeighborhood] = useState(aitOurirNeighborhoodsList[0].nameAr);
  const [transport, setTransport] = useState(true);
  const [canteen, setCanteen] = useState(false);
  const [notes, setNotes] = useState('');

  // Validation errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submittedVoucher, setSubmittedVoucher] = useState<{ code: string; date: string } | null>(null);

  // Live Calculations in Moroccan Dirhams (MAD)
  const baseTuition = feeStructure[cycle].base;
  const transportCost = transport ? feeStructure.transportMonthly : 0;
  const canteenCost = canteen ? feeStructure.canteenMonthly : 0;
  const totalMonthly = baseTuition + transportCost + canteenCost;

  // Validation function
  const validateStep = (step: number) => {
    const errs: { [key: string]: string } = {};

    if (step === 1) {
      if (!studentName.trim()) {
        errs.studentName = lang === 'ar' ? 'يرجى إدخال اسم التلميذ(ة)' : 'Nom de l’élève requis';
      }
      if (!birthDate) {
        errs.birthDate = lang === 'ar' ? 'يرجى تحديد تاريخ الازدياد' : 'Date de naissance requise';
      }
      if (!parentName.trim()) {
        errs.parentName = lang === 'ar' ? 'يرجى إدخال اسم ولي الأمر' : 'Nom du parent requis';
      }
      // Moroccan Phone: starts with 05, 06, or 07 and 10 digits total, or +212...
      const cleanPhone = phone.replace(/[\s-]/g, '');
      const moroccanPhoneRegex = /^(?:(?:\+|00)212|0)[567]\d{8}$/;
      if (!cleanPhone) {
        errs.phone = lang === 'ar' ? 'يرجى إدخال رقم الهاتف' : 'Numéro de téléphone requis';
      } else if (!moroccanPhoneRegex.test(cleanPhone)) {
        errs.phone = t.registration.form.phoneError;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(1)) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `ESSALAM-2026-${randomSuffix}`;
    const today = new Date().toLocaleDateString(lang === 'ar' ? 'ar-MA' : 'fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    setSubmittedVoucher({ code, date: today });
  };

  const handlePrintSlip = () => {
    window.print();
  };

  // WhatsApp Pre-filled Summary
  const whatsappText = encodeURIComponent(
    `السلام عليكم ورحمة الله،\nأود تأكيد طلب التسجيل القبلي بمدرسة السلام بأيت أورير:\n- رقم الملف: ${submittedVoucher?.code}\n- اسم التلميذ: ${studentName}\n- السلك المطلوب: ${feeStructure[cycle].labelAr}\n- ولي الأمر: ${parentName} (${phone})\n- الحي: ${neighborhood}\n- النقل المدرسي: ${transport ? 'نعم' : 'لا'}\n- المطعم المدرسي: ${canteen ? 'نعم' : 'لا'}\n- الواجب الشهري التقديري: ${totalMonthly} درهم/شهر`
  );

  return (
    <section id="registration" className="py-20 px-4 sm:px-6 bg-[#f4f4f4] dark:bg-stone-950 border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1240px] mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-2">
          <div className="text-xs font-bold text-[#1e3c72] dark:text-blue-400 tracking-wider">
            {lang === 'ar' ? 'الموسم الدراسي 2026 - 2027' : 'Admissions 2026 - 2027'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1e3c72] dark:text-white tracking-tight">
            {t.registration.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 dark:text-stone-400">
            {t.registration.subtitle}
          </p>
        </div>

        {submittedVoucher ? (
          /* Official Printable Voucher Slip */
          <div className="max-w-2xl mx-auto bg-white dark:bg-stone-900 rounded-3xl border-2 border-[#1e3c72] dark:border-blue-700 p-8 sm:p-10 shadow-2xl space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                {t.registration.voucher.successTitle}
              </span>
              <h3 className="text-2xl font-bold text-stone-900 dark:text-white">
                {t.registration.voucher.voucherHeading}
              </h3>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                {t.registration.voucher.schoolName} · أيت أورير
              </p>
            </div>

            {/* Official Table Details */}
            <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-start text-xs sm:text-sm space-y-3 font-medium">
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.refLabel}</span>
                <span className="font-mono font-bold text-[#1e3c72] dark:text-blue-400 text-base">{submittedVoucher.code}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.dateLabel}</span>
                <span className="font-mono">{submittedVoucher.date}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.studentLabel}</span>
                <span className="font-bold text-stone-900 dark:text-white">{studentName} ({birthDate})</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.cycleLabel}</span>
                <span>{lang === 'ar' ? feeStructure[cycle].labelAr : feeStructure[cycle].labelFr}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.parentLabel}</span>
                <span>{parentName} · {phone}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.neighborhoodLabel}</span>
                <span>{neighborhood}</span>
              </div>
              <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                <span className="text-stone-500 dark:text-stone-400">{t.registration.voucher.optionsLabel}</span>
                <span>
                  {transport ? (lang === 'ar' ? 'نقل مدرسي مأمون · ' : 'Transport · ') : ''}
                  {canteen ? (lang === 'ar' ? 'مطعم مدرسي' : 'Cantine') : (lang === 'ar' ? 'بدون إطعام' : 'Sans cantine')}
                </span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="font-bold text-stone-900 dark:text-white">{t.registration.voucher.monthlyEstLabel}</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-base font-mono">
                  {totalMonthly} درهم مغربي / شهر
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-500 dark:text-stone-400 leading-relaxed italic">
              {t.registration.voucher.disclaimer}
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={handlePrintSlip}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:bg-stone-50 text-stone-800 dark:text-white font-bold text-xs sm:text-sm cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" />
                <span>{t.registration.voucher.printBtn}</span>
              </button>

              <a
                href={`https://wa.me/212661248890?text=${whatsappText}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>{t.registration.voucher.whatsAppBtn}</span>
              </a>
            </div>

            <button
              onClick={() => {
                setSubmittedVoucher(null);
                setCurrentStep(1);
              }}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline pt-2 inline-block cursor-pointer"
            >
              {t.registration.voucher.newRegisterBtn}
            </button>
          </div>
        ) : (
          /* Multi-Step Stepper & Tuition Live Calculator */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Main Form: 8 cols */}
            <div className="lg:col-span-8 bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-10 shadow-sm space-y-8">
              
              {/* Stepper Progress Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-stone-100 dark:border-stone-800">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-mono transition-colors ${
                        s === currentStep 
                          ? 'bg-[#1e3c72] text-white ring-4 ring-blue-100 dark:ring-blue-950' 
                          : s < currentStep 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-stone-100 dark:bg-stone-800 text-stone-500'
                      }`}
                    >
                      {s < currentStep ? '✓' : s}
                    </div>
                    <span className="hidden sm:inline text-xs font-medium text-stone-600 dark:text-stone-400">
                      {s === 1 ? t.registration.steps.step1 :
                       s === 2 ? t.registration.steps.step2 :
                       s === 3 ? t.registration.steps.step3 :
                       s === 4 ? t.registration.steps.step4 :
                       t.registration.steps.step5}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Pupil & Parent Info */}
              {currentStep === 1 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {t.registration.steps.step1}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                        {t.registration.form.studentFullName}
                      </label>
                      <input
                        type="text"
                        value={studentName}
                        onChange={(e) => setStudentName(e.target.value)}
                        placeholder={lang === 'ar' ? 'مثال: ياسمين المنصوري' : 'Ex: Yasmine El Mansouri'}
                        className={`w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white ${
                          errors.studentName ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                        }`}
                      />
                      {errors.studentName && <span className="text-xs text-rose-500 mt-1 block">{errors.studentName}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                        {t.registration.form.birthDate}
                      </label>
                      <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        className={`w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white ${
                          errors.birthDate ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                        }`}
                      />
                      {errors.birthDate && <span className="text-xs text-rose-500 mt-1 block">{errors.birthDate}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                        {t.registration.form.parentName}
                      </label>
                      <input
                        type="text"
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder={lang === 'ar' ? 'اسم الأب أو الأم' : 'Nom du parent'}
                        className={`w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white ${
                          errors.parentName ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                        }`}
                      />
                      {errors.parentName && <span className="text-xs text-rose-500 mt-1 block">{errors.parentName}</span>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                        {t.registration.form.phone}
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0612345678"
                        className={`w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white font-mono ${
                          errors.phone ? 'border-rose-500' : 'border-stone-300 dark:border-stone-700'
                        }`}
                      />
                      {errors.phone && <span className="text-xs text-rose-500 mt-1 block">{errors.phone}</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                      {t.registration.form.cin}
                    </label>
                    <input
                      type="text"
                      value={cin}
                      onChange={(e) => setCin(e.target.value)}
                      placeholder="EE123456"
                      className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white font-mono"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Educational Cycle */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {t.registration.form.cycleLabel}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div
                      onClick={() => setCycle('preschool')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        cycle === 'preschool' 
                          ? 'border-[#1e3c72] bg-blue-50/70 dark:bg-blue-950/40 text-[#1e3c72] dark:text-blue-300' 
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">👶</div>
                      <div className="font-bold text-base text-stone-900 dark:text-white">
                        {lang === 'ar' ? 'التعليم الأولي' : 'Maternelle'}
                      </div>
                      <div className="text-xs text-stone-500 mt-1">3 إلى 5 سنوات</div>
                      <div className="text-sm font-bold text-[#1e3c72] dark:text-blue-400 mt-3 font-mono">
                        {feeStructure.preschool.base} DH / شهر
                      </div>
                    </div>

                    <div
                      onClick={() => setCycle('primary')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        cycle === 'primary' 
                          ? 'border-[#1e3c72] bg-blue-50/70 dark:bg-blue-950/40 text-[#1e3c72] dark:text-blue-300' 
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">📚</div>
                      <div className="font-bold text-base text-stone-900 dark:text-white">
                        {lang === 'ar' ? 'التعليم الابتدائي' : 'Primaire'}
                      </div>
                      <div className="text-xs text-stone-500 mt-1">المستويات من 1 إلى 6</div>
                      <div className="text-sm font-bold text-[#1e3c72] dark:text-blue-400 mt-3 font-mono">
                        {feeStructure.primary.base} DH / شهر
                      </div>
                    </div>

                    <div
                      onClick={() => setCycle('college')}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                        cycle === 'college' 
                          ? 'border-[#1e3c72] bg-blue-50/70 dark:bg-blue-950/40 text-[#1e3c72] dark:text-blue-300' 
                          : 'border-stone-200 dark:border-stone-800 hover:border-stone-300'
                      }`}
                    >
                      <div className="text-2xl mb-2">🎓</div>
                      <div className="font-bold text-base text-stone-900 dark:text-white">
                        {lang === 'ar' ? 'التعليم الإعدادي' : 'Collège'}
                      </div>
                      <div className="text-xs text-stone-500 mt-1">مسار دولي BIOF</div>
                      <div className="text-sm font-bold text-[#1e3c72] dark:text-blue-400 mt-3 font-mono">
                        {feeStructure.college.base} DH / شهر
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Neighborhood in Ait Ourir */}
              {currentStep === 3 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {t.registration.form.neighborhoodLabel}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
                    {lang === 'ar' 
                      ? 'حدد موقع إقامتكم ببلدية أيت أورير لبرمجة خط حافلة النقل المدرسي الأنسب:'
                      : 'Choisissez votre quartier de résidence à Aït Ourir pour l’itinéraire de transport :'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {aitOurirNeighborhoodsList.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setNeighborhood(lang === 'ar' ? item.nameAr : item.nameFr)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                          neighborhood === (lang === 'ar' ? item.nameAr : item.nameFr)
                            ? 'border-[#1e3c72] bg-blue-50/70 dark:bg-blue-950/40 font-bold text-[#1e3c72] dark:text-blue-300'
                            : 'border-stone-200 dark:border-stone-800 hover:bg-stone-50 dark:hover:bg-stone-800'
                        }`}
                      >
                        <span className="text-sm">
                          {lang === 'ar' ? item.nameAr : item.nameFr}
                        </span>
                        <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                          {lang === 'ar' ? 'نقل متاح ✓' : 'Desservi ✓'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Transport & Canteen */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {t.registration.steps.step4}
                  </h3>

                  <div className="space-y-4">
                    {/* Transport Box */}
                    <div 
                      onClick={() => setTransport(!transport)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        transport 
                          ? 'border-[#1e3c72] bg-blue-50/50 dark:bg-blue-950/30' 
                          : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={transport}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 text-blue-600 rounded"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white text-base">
                          <Bus className="w-5 h-5 text-blue-600" />
                          <span>{t.registration.form.transportLabel}</span>
                          <span className="text-xs font-mono font-bold text-[#1e3c72] dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">
                            +{feeStructure.transportMonthly} DH / شهر
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {lang === 'ar' 
                            ? 'حافلات حديثة ومكيفة تغطي كافة أحياء أيت أورير مع مرافقات مؤهلات.'
                            : 'Bus scolaires climatisés avec accompagnatrices qualifiées.'}
                        </p>
                      </div>
                    </div>

                    {/* Canteen Box */}
                    <div 
                      onClick={() => setCanteen(!canteen)}
                      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-4 ${
                        canteen 
                          ? 'border-[#1e3c72] bg-blue-50/50 dark:bg-blue-950/30' 
                          : 'border-stone-200 dark:border-stone-800'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={canteen}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 text-blue-600 rounded"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 font-bold text-stone-900 dark:text-white text-base">
                          <Utensils className="w-5 h-5 text-blue-600" />
                          <span>{t.registration.form.canteenLabel}</span>
                          <span className="text-xs font-mono font-bold text-[#1e3c72] dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-2 py-0.5 rounded">
                            +{feeStructure.canteenMonthly} DH / شهر
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 dark:text-stone-400">
                          {lang === 'ar' 
                            ? 'وجبات غداء صحية ومتوازنة تطبخ يومياً بمطعم المؤسسة تحت إشراف صحي.'
                            : 'Repas chauds équilibrés cuisinés sur place chaque jour sous contrôle sanitaire.'}
                        </p>
                      </div>
                    </div>

                    {/* Additional Notes */}
                    <div>
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1.5">
                        {t.registration.form.notes}
                      </label>
                      <textarea
                        rows={2}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder={lang === 'ar' ? 'أي ملاحظات بخصوص الحالة الصحية أو مواهب الطفل...' : 'Besoins particuliers...'}
                        className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 text-stone-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review & Confirm */}
              {currentStep === 5 && (
                <div className="space-y-5">
                  <h3 className="text-lg font-bold text-stone-900 dark:text-white">
                    {t.registration.steps.step5}
                  </h3>

                  <div className="p-5 rounded-2xl bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 space-y-3 text-xs sm:text-sm">
                    <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="text-stone-500">{t.registration.voucher.studentLabel}</span>
                      <span className="font-bold text-stone-900 dark:text-white">{studentName} ({birthDate})</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="text-stone-500">{t.registration.voucher.cycleLabel}</span>
                      <span className="font-bold">{lang === 'ar' ? feeStructure[cycle].labelAr : feeStructure[cycle].labelFr}</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="text-stone-500">{t.registration.voucher.parentLabel}</span>
                      <span>{parentName} ({phone})</span>
                    </div>
                    <div className="flex justify-between border-b border-stone-200 dark:border-stone-700 pb-2">
                      <span className="text-stone-500">{t.registration.voucher.neighborhoodLabel}</span>
                      <span>{neighborhood}</span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="font-bold text-stone-900 dark:text-white">{t.registration.voucher.monthlyEstLabel}</span>
                      <span className="font-bold text-[#1e3c72] dark:text-blue-400 font-mono text-base">{totalMonthly} DH / شهر</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Step Navigation Controls */}
              <div className="pt-6 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs sm:text-sm font-semibold hover:bg-stone-50 cursor-pointer"
                  >
                    <PrevArrow className="w-4 h-4" />
                    <span>{t.registration.form.prevStep}</span>
                  </button>
                ) : <div />}

                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1e3c72] hover:bg-blue-900 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors cursor-pointer"
                  >
                    <span>{t.registration.form.nextStep}</span>
                    <NextArrow className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleFinalSubmit}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white text-xs sm:text-sm font-bold shadow-md transition-colors cursor-pointer"
                  >
                    <FileCheck className="w-4 h-4" />
                    <span>{t.registration.form.confirmRegistration}</span>
                  </button>
                )}
              </div>

            </div>

            {/* Live Fee Calculator Sidebar: 4 cols */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 p-6 sm:p-7 shadow-sm space-y-5">
                <div className="flex items-center gap-2 pb-3 border-b border-stone-100 dark:border-stone-800 text-[#1e3c72] dark:text-blue-400">
                  <Calculator className="w-5 h-5 text-amber-500" />
                  <h4 className="font-bold text-base text-stone-900 dark:text-white">
                    {t.registration.summary.title}
                  </h4>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                    <span>{t.registration.summary.tuitionBase}</span>
                    <span className="font-mono font-bold text-stone-900 dark:text-white">{baseTuition} DH</span>
                  </div>

                  {transport && (
                    <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                      <span>{t.registration.summary.transportFee}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-white">{transportCost} DH</span>
                    </div>
                  )}

                  {canteen && (
                    <div className="flex justify-between items-center text-stone-600 dark:text-stone-400">
                      <span>{t.registration.summary.canteenFee}</span>
                      <span className="font-mono font-bold text-stone-900 dark:text-white">{canteenCost} DH</span>
                    </div>
                  )}

                  <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex justify-between items-center">
                    <span className="font-bold text-stone-900 dark:text-white">{t.registration.summary.totalMonthly}</span>
                    <span className="text-xl font-extrabold text-[#1e3c72] dark:text-blue-400 font-mono">
                      {totalMonthly} <span className="text-xs font-normal">DH/mois</span>
                    </span>
                  </div>

                  <div className="pt-2 text-[11px] text-stone-500 leading-relaxed border-t border-stone-100 dark:border-stone-800">
                    {t.registration.summary.annualInsurance}
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-medium">
                  {t.registration.summary.fratryDiscount}
                </div>
              </div>

              {/* Trust Box */}
              <div className="rounded-3xl bg-gradient-to-br from-[#1e3c72] to-[#2a5298] text-white p-6 space-y-3">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5 text-amber-300" />
                  <span>{lang === 'ar' ? 'ضمانات مدرسة السلام' : 'Engagements Essalam'}</span>
                </div>
                <p className="text-xs text-blue-100 leading-relaxed">
                  {lang === 'ar'
                    ? 'نضمن لأبنائكم مناخاً تربوياً متوازناً، تكافؤ الفرص في الأنشطة الموازية، وتأطيراً مدرسياً دقيقاً.'
                    : 'Nous offrons un climat bienveillant, l’égalité d’accès aux ateliers et un suivi pédagogique rigoureux.'}
                </p>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
