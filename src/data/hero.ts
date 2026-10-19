// תמונות ה-hero: כל הקבצים בתוך src/assets/hero/, מתחלפים לפי סדר שם הקובץ
const files = import.meta.glob<string>('../assets/hero/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

export const heroImages: string[] = Object.keys(files)
  .sort()
  .map((path) => files[path]);
