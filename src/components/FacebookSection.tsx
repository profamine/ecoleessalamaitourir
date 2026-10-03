/**
 * @file components/FacebookSection.tsx
 * Dedicated community hub featuring https://www.facebook.com/essalam.aitourir
 * with live stats, engagement signals, and direct social action channels.
 */

import React from 'react';
import { ExternalLink, ThumbsUp, MessageCircle, Share2, ShieldCheck, Bell, Users } from 'lucide-react';
import { Language } from '../types';
import { i18n } from '../data/translations';

interface FacebookSectionProps {
  lang: Language;
}

export const FacebookSection: React.FC<FacebookSectionProps> = ({ lang }) => {
  const t = i18n[lang];
  const isRtl = lang === 'ar';
  const fbUrl = "https://www.facebook.com/essalam.aitourir";

  const posts = [
    {
      id: 'p1',
      date: isRtl ? 'منذ يومين' : 'Il y a 2 jours',
      text: isRtl 
        ? '🇲🇦 احتفالات بهيجة بمناسبة المسيرة الخضراء المظفرة بمدرسة السلام بأيت أورير. إبداعات فنية ولوحات تعبيرية جسدت تلاحم العرش والشعب بكل فخر واعتزاز! شكراً لتلاميذتنا وأطرنا التربوية.'
        : '🇲🇦 Commémoration solennelle de la Marche Verte par nos élèves du Groupe Scolaire Essalam d’Aït Ourir. Bravo pour ces fresques vivantes pleines de patriotisme !',
      likes: '480',
      comments: '64',
    },
    {
      id: 'p2',
      date: isRtl ? 'منذ 5 أيام' : 'Il y a 5 jours',
      text: isRtl 
        ? '🏆 فخر واعتزاز: نبارك لتلميذتنا أميمة المساوي تفوقها الساحق بحصولها على أعلى معدل (9.70/10) بإقليم الحوز، والتلميذ ياسر العليوي بالمرتبة الثالثة. مدرسة السلام تؤكد ريادتها وتفوق أبنائها!'
        : '🏆 Fierté immense : Félicitations à nos brillants élèves pour avoir décroché la 1ère place (9.70/10) et la 3ème place provinciale d’Al Haouz à l’examen normalisé !',
      likes: '720',
      comments: '138',
    },
    {
      id: 'p3',
      date: isRtl ? 'منذ أسبوع' : 'Il y a 1 semaine',
      text: isRtl 
        ? '🤖 انطلاق الفوج الجديد من ورشات الروبوتيكس وSuper Codeurs! أطفالنا يبرمجون أجهزة Micro:bit ويصممون ألعاباً تفاعلية بمهارة فائقة. مهندسو المستقبل بيننا اليوم!'
        : '🤖 Lancement des nouveaux groupes de robotique Super Codeurs ! Nos jeunes talents s’initient avec passion à la programmation de cartes Micro:bit et Scratch.',
      likes: '512',
      comments: '49',
    },
  ];

  return (
    <section id="facebook" className="py-20 px-4 sm:px-6 bg-[#0f1d38] text-white border-b border-blue-950">
      <div className="max-w-[1240px] mx-auto space-y-12">
        
        {/* Banner Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-white/10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-blue-400">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping" />
              <span>{t.facebook.badge}</span>
              <span>·</span>
              <span className="text-stone-300 font-mono">{t.facebook.handle}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {t.facebook.title}
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              {t.facebook.desc}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={fbUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm shadow-lg shadow-blue-900/40 transition-all transform hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>{t.facebook.ctaVisit}</span>
            </a>
          </div>
        </div>

        {/* Facebook Channel Stats Ribbon */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-mono">
              {t.facebook.followersCount}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              {lang === 'ar' ? 'متابع نشيط لصفحتنا الرسمية' : 'Abonnés engagés'}
            </div>
          </div>
          <div className="border-t sm:border-t-0 sm:border-r sm:border-l border-white/10 py-3 sm:py-0">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 font-mono">
              {t.facebook.mediaCount}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              {lang === 'ar' ? 'ألبوم صور وفيديو توثيقي' : 'Photos & vidéos documentées'}
            </div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">
              {t.facebook.responseRate}
            </div>
            <div className="text-xs text-stone-300 mt-1">
              {lang === 'ar' ? 'تفاعل سريع مع رسائل واستفسارات الأولياء' : 'Réponse rapide via Messenger'}
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map(post => (
            <div
              key={post.id}
              className="rounded-2xl bg-white/5 border border-white/10 p-6 flex flex-col justify-between hover:border-blue-400/50 transition-colors"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-stone-400">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                      GS
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">
                        {lang === 'ar' ? 'مدرسة السلام أيت أورير' : 'École Essalam Aït Ourir'}
                      </div>
                      <div className="text-[11px] text-stone-400">{post.date} · 🌐</div>
                    </div>
                  </div>
                </div>

                <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                  {post.text}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/10 flex items-center justify-between text-xs text-blue-300">
                <div className="flex items-center gap-1.5">
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>{post.comments}</span>
                </div>
                <a
                  href={fbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold hover:underline"
                >
                  {lang === 'ar' ? 'عرض التعليقات ↗' : 'Voir sur FB ↗'}
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
