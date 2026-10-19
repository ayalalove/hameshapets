import SectionHeading from './SectionHeading';
import Icon from './Icon';
import { site } from '../config';

const faqs = [
  {
    q: 'כמה זמן לוקח שיפוץ?',
    a: 'זה תלוי בהיקף העבודה. עבודה קטנה כמו שער או פרגולה יכולה להסתיים תוך ימים, ושיפוץ מלא של חנות או דירה יכול לקחת כמה שבועות. בהצעת המחיר תקבלו לוח זמנים מפורט.',
  },
  {
    q: 'איך נקבע המחיר?',
    a: 'אחרי פגישה בשטח אנחנו מכינים הצעת מחיר מפורטת לפי סעיפים – כך שתדעו בדיוק על מה אתם משלמים.',
  },
  {
    q: 'האם צריך לצאת מהבית בזמן השיפוץ?',
    a: 'בשיפוצים חלקיים אפשר בדרך כלל להישאר בבית. בשיפוץ מלא נמליץ על הפתרון הנוח ביותר בהתאם לשלבי העבודה.',
  },
  {
    q: 'יש אחריות על העבודה?',
    a: 'כן. אנחנו עומדים מאחורי כל עבודה שלנו, ופרטי האחריות מופיעים בהצעת המחיר.',
  },
  {
    q: 'באילו אזורים אתם עובדים?',
    a: `אנחנו עובדים באזור ${site.area}. לא בטוחים אם אתם באזור? שלחו לנו הודעה ונבדוק.`,
  },
];

export default function Faq() {
  return (
    <section className="section section--tint" id="faq">
      <div className="container container--narrow">
        <SectionHeading eyebrow="שאלות ותשובות" title="שאלות נפוצות" center />
        <div className="faq">
          {faqs.map((f) => (
            <details key={f.q} className="faq__item">
              <summary>
                {f.q}
                <span className="faq__icon">
                  <Icon name="plus" size={20} strokeWidth={2} />
                </span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
