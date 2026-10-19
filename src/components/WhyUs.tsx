import Icon, { type IconName } from './Icon';
import SectionHeading from './SectionHeading';
import useReveal from '../hooks/useReveal';

const reasons: { icon: IconName; title: string; text: string }[] = [
  { icon: 'wallet', title: 'מחיר שקוף', text: 'הצעת מחיר מפורטת מראש, בלי תוספות מפתיעות באמצע העבודה.' },
  { icon: 'calendar', title: 'עומדים בזמנים', text: 'לוח זמנים ברור לכל שלב – ועדכונים שוטפים לאורך הדרך.' },
  { icon: 'sparkle', title: 'עבודה נקייה', text: 'שומרים על הבית ועל השכנים, ומפנים אחרינו בסוף כל יום.' },
  { icon: 'shield', title: 'אחריות מלאה', text: 'עומדים מאחורי כל עבודה שלנו גם אחרי המסירה.' },
];

function Reason({ reason, index }: { reason: (typeof reasons)[number]; index: number }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li className="reason reveal" ref={ref} style={{ transitionDelay: `${index * 80}ms` }}>
      <span className="reason__icon">
        <Icon name={reason.icon} size={28} />
      </span>
      <h3>{reason.title}</h3>
      <p>{reason.text}</p>
    </li>
  );
}

export default function WhyUs() {
  return (
    <section className="section" id="why">
      <div className="container">
        <SectionHeading eyebrow="למה המשפץ?" title="שיפוץ בלי כאב ראש" center />
        <ul className="reasons">
          {reasons.map((r, i) => (
            <Reason key={r.title} reason={r} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
