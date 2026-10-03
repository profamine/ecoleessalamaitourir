/**
 * @file types/index.ts
 * Type definitions for Groupe Scolaire Essalam application.
 */

export type Language = 'ar' | 'fr';

export interface StatCounter {
  id: string;
  value: number;
  suffix: string;
  labelAr: string;
  labelFr: string;
  subAr: string;
  subFr: string;
}

export interface ServiceItem {
  id: string;
  icon: string;
  titleAr: string;
  titleFr: string;
  descAr: string;
  descFr: string;
}

export interface ActivityCardItem {
  id: string;
  icon: string;
  titleAr: string;
  titleFr: string;
  descAr: string;
  descFr: string;
  partnerAr?: string;
  partnerFr?: string;
}

export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  category: 'national' | 'sports' | 'stem' | 'culture' | 'campus';
  titleAr: string;
  titleFr: string;
  date: string;
  thumbnail: string;
  mediaUrl: string;
  captionAr: string;
  captionFr: string;
}

export interface NewsArticle {
  id: string;
  titleAr: string;
  titleFr: string;
  date: string;
  categoryAr: string;
  categoryFr: string;
  summaryAr: string;
  summaryFr: string;
  contentAr: string[];
  contentFr: string[];
  important?: boolean;
}

export interface StaffMember {
  id: string;
  nameAr: string;
  nameFr: string;
  roleAr: string;
  roleFr: string;
  cycleAr: string;
  cycleFr: string;
  experienceAr: string;
  experienceFr: string;
  quoteAr: string;
  quoteFr: string;
}

export interface CalendarEvent {
  id: string;
  type: 'holiday' | 'exam' | 'event' | 'meeting';
  titleAr: string;
  titleFr: string;
  dateAr: string;
  dateFr: string;
  durationAr?: string;
  durationFr?: string;
}

export interface FAQItem {
  id: string;
  questionAr: string;
  questionFr: string;
  answerAr: string;
  answerFr: string;
  category: 'admissions' | 'transport' | 'pedagogy' | 'activities';
}

export interface TestimonialItem {
  id: string;
  parentNameAr: string;
  parentNameFr: string;
  studentLevelAr: string;
  studentLevelFr: string;
  commentAr: string;
  commentFr: string;
  rating: number;
  neighborhoodAr: string;
  neighborhoodFr: string;
}

export interface StudentRecord {
  code: string;
  nameAr: string;
  nameFr: string;
  levelAr: string;
  levelFr: string;
  classGroup: string;
  academicYear: string;
  overallAverage: string;
  rankAr: string;
  rankFr: string;
  attendanceRate: string;
  absencesCount: number;
  behaviorNoteAr: string;
  behaviorNoteFr: string;
  subjects: {
    nameAr: string;
    nameFr: string;
    grade: number;
    max: number;
    coeff: number;
    commentAr: string;
    commentFr: string;
  }[];
  upcomingExams: {
    nameAr: string;
    nameFr: string;
    date: string;
    room: string;
  }[];
}
