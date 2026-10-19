// התמונות והסרטונים נטענים אוטומטית מתוך src/assets/projects/<folder>/
// כדי להוסיף עבודה: יוצרים תיקייה חדשה, מעתיקים אליה קבצים, ומוסיפים רשומה למערך למטה.
// הקבצים מוצגים לפי סדר שם הקובץ – התמונה הראשונה היא תמונת השער (מומלץ לקרוא לה 01.webp)
const files = import.meta.glob<string>(
  '../assets/projects/**/*.{jpg,jpeg,png,webp,avif,mp4,webm,mov}',
  { eager: true, import: 'default' }
);

export interface Media {
  type: 'image' | 'video';
  src: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  description: string;
  /** שם התיקייה בתוך src/assets/projects */
  folder: string;
  media: Media[];
  /** תמונת השער – התמונה הראשונה, או null אם יש רק סרטונים/כלום */
  cover: Media | null;
}

const isVideo = (path: string) => /\.(mp4|webm|mov)$/i.test(path);

function mediaFor(folder: string): Media[] {
  return Object.keys(files)
    .filter((path) => path.includes(`/projects/${folder}/`))
    .sort()
    .map((path) => ({ type: isVideo(path) ? 'video' : 'image', src: files[path] }));
}

type ProjectEntry = Omit<Project, 'media' | 'cover'>;

// הסדר כאן הוא סדר ההצגה בגלריה
const entries: ProjectEntry[] = [
  {
    id: 'flower-shop',
    title: 'שיפוץ חנות פרחים',
    category: 'שיפוץ עסקים',
    location: '',
    description:
      'שיפוץ מלא של חנות: ריצוף חדש, צבע, תאורת מסילה, נישות תאורה וגופי מדפים בהתאמה אישית – מחלל ישן לחנות מוארת ומזמינה. בסוף הגלריה: החנות לפני השיפוץ.',
    folder: 'flower-shop',
  },
  {
    id: 'pergola-balcony',
    title: 'פרגולה וסגירת מרפסת',
    category: 'פרגולות וסגירות',
    location: '',
    description:
      'פרגולת אלומיניום עם תאורת לד משולבת, סגירה בתריסי הצללה ומעקה זכוכית – הפכנו מרפסת פתוחה לחלל שימושי כל השנה.',
    folder: 'pergola-balcony',
  },
  {
    id: 'therapy-room',
    title: 'חדר טיפולים',
    category: 'חדרים וקליניקות',
    location: '',
    description:
      'הפיכת חדר גולמי לחדר טיפולים מעוצב: ריצוף, טיח וצבע, קיר מודגש וחשמל ותאורה – מוכן לקבלת מטופלים.',
    folder: 'therapy-room',
  },
  {
    id: 'wood-gates',
    title: 'שערי עץ בהתאמה אישית',
    category: 'עבודות עץ ושערים',
    location: '',
    description:
      'החלפת שערי כניסה ישנים בשערי עץ חדשים בעיצוב אישי, כולל דלת בדוגמת אדרה וגדר עץ תואמת.',
    folder: 'wood-gates',
  },
  {
    id: 'focus-clinic',
    title: 'קליניקה',
    category: 'חדרים וקליניקות',
    location: '',
    description:
      'שיפוץ חדרי קליניקה: ריצוף, צבע, קיר מודגש, דלתות מתקפלות ותאורה – חלל נקי ומואר לעבודה עם קהל.',
    folder: 'focus-clinic',
  },
  {
    id: 'garden-shed',
    title: 'מחסן גינה',
    category: 'עבודות עץ ושערים',
    location: '',
    description: 'בניית מחסן גינה מעץ עם דלתות כפולות, גג רעפים ובידוד – מותאם בדיוק למקום.',
    folder: 'garden-shed',
  },
];

const projects: Project[] = entries.map((p) => {
  const media = mediaFor(p.folder);
  return { ...p, media, cover: media.find((m) => m.type === 'image') ?? media[0] ?? null };
});

export default projects;

export const ALL = 'הכל';
export const categories = [ALL, ...new Set(projects.map((p) => p.category))];

/** תמונת השער הראשונה שנמצאת בקטגוריה – לאריחי השירותים */
export function coverForCategory(category: string): string | null {
  const p = projects.find((pr) => pr.category === category && pr.cover?.type === 'image');
  return p?.cover?.src ?? null;
}
