// תמונת הירו: לשים קובץ אחד בתוך src/assets/hero/
const files = import.meta.glob<string>('../assets/hero/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
});

export const heroImage = Object.values(files)[0] ?? null;
