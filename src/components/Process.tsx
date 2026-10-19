import SectionHeading from './SectionHeading';
import useReveal from '../hooks/useReveal';

interface StepItem {
  title: string;
  text: string;
}

const steps: StepItem[] = [
  { title: 'שיחת היכרות', text: 'משאירים פרטים ואנחנו חוזרים אליכם כדי להבין מה אתם מחפשים.' },
  { title: 'פגישה בשטח', text: 'מגיעים לנכס, מודדים, מייעצים ומבינים את כל הפרטים.' },
  { title: 'הצעת מחיר', text: 'הצעה שקופה ומפורטת, כולל לוח זמנים – בלי הפתעות.' },
  { title: 'ביצוע', text: 'עבודה מסודרת ונקייה, עם עדכונים שוטפים לאורך כל הדרך.' },
  { title: 'מסירה', text: 'עוברים יחד על כל פרט, ומוסרים לכם בית מוכן – עם אחריות.' },
];

function Step({ step, index }: { step: StepItem; index: number }) {
  const ref = useReveal<HTMLLIElement>();
  return (
    <li className="step reveal" ref={ref} style={{ transitionDelay: `${index * 80}ms` }}>
      <span className="step__num">
        {String(index + 1).padStart(2, '0')} <i>//</i>
      </span>
      <h3>{step.title}</h3>
      <p>{step.text}</p>
    </li>
  );
}

export default function Process() {
  return (
    <section className="section section--dark" id="process">
      <div className="container">
        <SectionHeading eyebrow="תהליך העבודה" title="איך נראה תהליך העבודה?" light />
        <ol className="steps">
          {steps.map((s, i) => (
            <Step key={s.title} step={s} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
