/**
 * @file components/ContactAndMap.tsx
 * Contact coordinates, working inquiry form, office hours, and interactive Google Maps embed.
 */

import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Navigation
} from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';

interface ContactAndMapProps {
  lang: Language;
}

export const ContactAndMap: React.FC<ContactAndMapProps> = ({ lang }) => {
  const t = i18n[lang];
  const facebookPageUrl = "https://www.facebook.com/essalam.aitourir";

  const [form, setForm] = useState({ name: '', phone: '', subject: 'طلب تسجيل واستفسار', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.message) return;
    setSentSuccess(true);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 bg-[#1e3c72] text-white">
      <div className="max-w-[1240px] mx-auto space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="text-xs font-bold text-amber-300 tracking-wider">
            {lang === 'ar' ? 'أهلاً بكم في مدرسة السلام' : 'Bienvenue à Essalam'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            {t.contact.title}
          </h2>
          <p className="text-sm sm:text-base text-blue-100">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 2 Columns: Contact info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Coordinates & Hours: 5 cols */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Info Card */}
            <div className="p-7 sm:p-8 rounded-3xl bg-white/10 backdrop-blur-xs border border-white/15 space-y-6">
              <h3 className="text-xl font-bold text-white border-b border-white/15 pb-3">
                {t.contact.addressTitle}
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📍</span>
                  <div>
                    <div className="font-bold text-amber-300">{lang === 'ar' ? 'العنوان' : 'Adresse'}</div>
                    <div className="text-stone-100 leading-relaxed mt-0.5">
                      {t.contact.addressVal}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📧</span>
                  <div>
                    <div className="font-bold text-amber-300">{lang === 'ar' ? 'البريد الإلكتروني' : 'E-mail'}</div>
                    <a href="mailto:info@essalam-school.ma" className="text-blue-200 hover:underline">
                      {t.contact.emailVal}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-2xl">📱</span>
                  <div>
                    <div className="font-bold text-amber-300">{lang === 'ar' ? 'الهاتف والاستقبال' : 'Téléphone'}</div>
                    <div className="font-mono text-stone-100 mt-0.5" dir="ltr">
                      {t.contact.phoneVal}
                    </div>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-4 border-t border-white/15 space-y-2">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-amber-300" />
                  <span>{t.contact.hoursTitle}</span>
                </h4>
                <div className="text-xs text-blue-100 space-y-1">
                  <div>📅 {t.contact.hoursWeekdays}</div>
                  <div>🕐 {t.contact.hoursSaturday}</div>
                  <div className="text-red-300">❌ {t.contact.hoursSunday}</div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-white/15 flex flex-wrap items-center gap-3">
                <a
                  href={facebookPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>{lang === 'ar' ? 'فيسبوك الرسمي' : 'Facebook'}</span>
                </a>

                <a
                  href={`https://wa.me/212661248890?text=${encodeURIComponent('السلام عليكم ورحمة الله، أود الاستفسار عن مدرسة السلام أيت أورير.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-transform hover:scale-105"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                </a>
              </div>

            </div>

          </div>

          {/* Inquiry Form: 7 cols */}
          <div className="lg:col-span-7 bg-white dark:bg-stone-900 rounded-3xl p-7 sm:p-10 shadow-2xl text-stone-900 dark:text-white border border-stone-200 dark:border-stone-800">
            <h3 className="text-2xl font-bold text-[#1e3c72] dark:text-blue-400 mb-2">
              {t.contact.formTitle}
            </h3>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400 mb-6">
              {t.contact.formDesc}
            </p>

            {sentSuccess ? (
              <div className="p-8 text-center bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-emerald-950 dark:text-emerald-200">
                    {t.contact.successMsg}
                  </h4>
                  <p className="text-xs text-emerald-800 dark:text-emerald-300">
                    {lang === 'ar' ? 'سيتواصل معكم المستشار التربوي للإجابة عن أسئلتكم.' : 'Notre équipe vous répondra très rapidement.'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSentSuccess(false);
                    setForm({ name: '', phone: '', subject: 'طلب تسجيل واستفسار', message: '' });
                  }}
                  className="px-5 py-2.5 text-xs font-bold rounded-xl bg-[#1e3c72] text-white hover:bg-blue-900 cursor-pointer"
                >
                  {lang === 'ar' ? 'إرسال رسالة أخرى' : 'Envoyer un autre message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {t.contact.nameInput}
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder={lang === 'ar' ? 'الاسم والنسب' : 'Votre nom'}
                      className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                      {t.contact.phoneInput}
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="0612345678"
                      className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {t.contact.subjectInput}
                  </label>
                  <select
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="طلب تسجيل واستفسار">{lang === 'ar' ? 'طلب معلومات حول التسجيل الجديد' : 'Renseignement inscription'}</option>
                    <option value="ورشات الروبوتيكس">{lang === 'ar' ? 'أكاديمية Super Codeurs والروبوتيكس' : 'Atelier Robotique'}</option>
                    <option value="النقل المدرسي">{lang === 'ar' ? 'خطوط وأحياء النقل المدرسي' : 'Transport scolaire'}</option>
                    <option value="زيارة المؤسسة">{lang === 'ar' ? 'حجز موعد لزيارة المؤسسة' : 'Rendez-vous de visite'}</option>
                    <option value="أخرى">{lang === 'ar' ? 'استفسار عام' : 'Autre demande'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 dark:text-stone-300 mb-1">
                    {t.contact.messageInput}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={lang === 'ar' ? 'اكتب استفسارك بالتفصيل وسنتواصل معك...' : 'Votre message...'}
                    className="w-full px-4 py-2.5 bg-stone-50 dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-xl bg-[#28a745] hover:bg-[#218838] text-white font-bold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{t.contact.submitBtn}</span>
                </button>
              </form>
            )}

          </div>

        </div>

        {/* Google Maps Location & Direction Guide */}
        <div className="rounded-3xl overflow-hidden bg-white/10 border border-white/15 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-lg font-bold text-white flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-300" />
                <span>{t.contact.mapDirectionsTitle}</span>
              </h4>
              <p className="text-xs sm:text-sm text-blue-100 max-w-2xl">
                {t.contact.mapDirectionsDesc}
              </p>
            </div>

            <a
              href="https://www.google.com/maps/search/?api=1&query=Ait+Ourir+Marrakech+Al+Haouz"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-[#1e3c72] hover:bg-stone-100 font-bold text-xs shrink-0 shadow-md"
            >
              <span>{lang === 'ar' ? 'فتح في خرائط Google ↗' : 'Google Maps ↗'}</span>
            </a>
          </div>

          {/* Interactive Map Visual Embed */}
          <div className="relative w-full h-72 sm:h-80 rounded-2xl overflow-hidden border border-white/20 bg-stone-800">
            <iframe
              title="Ait Ourir Map Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d54483.56784534749!2d-7.697424560731057!3d31.56456074257795!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdafeed5c6d3bc05%3A0x6b8bc22ad054238e!2sAit%20Ourir!5e0!3m2!1sen!2sma!4v1700000000000!5m2!1sen!2sma"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full filter saturate-150 contrast-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
};
