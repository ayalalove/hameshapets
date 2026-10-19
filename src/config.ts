// כל פרטי העסק במקום אחד – לעדכן כאן בלבד
export const site = {
  name: "המשפץ",
  subtitle: "HOUSE BUILDING",
  phoneDisplay: "054-349-5856",
  // מספר וואטסאפ בפורמט בינלאומי, בלי + ובלי 0 בהתחלה
  whatsapp: "972543495856",
  area: "ירושלים והסביבה",
  hours: "א׳–ה׳, 07:00 עד 18:00",
};

export const workTypes = [
  "שיפוץ עסק / חנות",
  "שיפוץ חדר / קליניקה",
  "שיפוץ דירה",
  "פרגולה / סגירת מרפסת",
  "שער / עבודת עץ",
  "אחר",
];

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
