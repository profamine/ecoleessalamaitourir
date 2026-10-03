/**
 * @file components/Footer.tsx
 * Institutional footer with official ministerial accreditation, quick navigation, and copyright.
 */

import React from 'react';
import { GraduationCap, ExternalLink, Heart } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
  onOpenPortal: () => void;
  onOpenRegister: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  lang,
  onNavigate,
  onOpenPortal,
  onOpenRegister,
}) => {
  const t = i18n[lang];
  const facebookPageUrl = "https://www.facebook.com/essalam.aitourir";

  return (
    <footer className="bg-[#0d1b2a] text-stone-300 pt-16 pb-10 border-t border-stone-800">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800 text-xs sm:text-sm">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-amber-300 flex items-center justify-center font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                {t.footer.schoolName}
              </span>
            </div>
            <p className="text-stone-400 text-xs leading-relaxed">
              {t.footer.tagline} · أيت أورير، إقليم الحوز، جهة مراكش-آسفي.
            </p>
            <div className="text-xs text-amber-300 font-semibold">
              {lang === 'ar' ? 'الرتبة الأولى إقليمياً في الامتحان الإشهادي (9.70/10)' : '1ère note provinciale brevet primaire (9.70/10)'}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-stone-400">
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('activities')} 
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {t.nav.activities}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('super-codeurs')} 
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {t.nav.superCodeurs}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenPortal} 
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {t.nav.portal}
                </button>
              </li>
              <li>
                <button 
                  onClick={onOpenRegister} 
                  className="hover:text-amber-300 transition-colors text-start cursor-pointer"
                >
                  {t.nav.register}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Accreditation */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {lang === 'ar' ? 'التأطير المؤسساتي' : 'Tutelle Pédagogique'}
            </h4>
            <div className="text-stone-400 text-xs leading-relaxed space-y-1.5">
              <div>{lang === 'ar' ? 'المملكة المغربية' : 'Royaume du Maroc'}</div>
              <div>{lang === 'ar' ? 'وزارة التربية الوطنية والتعليم الأولي والرياضة' : 'Ministère de l’Éducation Nationale'}</div>
              <div>{lang === 'ar' ? 'الأكاديمية الجهوية مراكش - آسفي' : 'AREF Marrakech-Safi'}</div>
              <div>{lang === 'ar' ? 'المديرية الإقليمية بالحوز - جماعة أيت أورير' : 'Direction Provinciale d’Al Haouz'}</div>
            </div>
          </div>

          {/* Col 4: Community & Facebook */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider">
              {t.footer.socialLinks}
            </h4>
            <p className="text-stone-400 text-xs leading-relaxed">
              {lang === 'ar' 
                ? 'انضموا إلى أكثر من 12 ألف متابع على صفحتنا الرسمية على فيسبوك لمتابعة أحدث الأنشطة.'
                : 'Rejoignez notre communauté sur Facebook pour toutes les actualités et reportages.'}
            </p>
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:text-blue-300"
            >
              <span>facebook.com/essalam.aitourir</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>
            &copy; {new Date().getFullYear()} {t.footer.schoolName}. {t.footer.rightsReserved}
          </p>
          <div className="flex items-center gap-1.5 text-stone-400">
            <span>{lang === 'ar' ? 'خدمة التربية والتعليم ببلدية أيت أورير' : 'Au service de l’éducation à Aït Ourir'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
