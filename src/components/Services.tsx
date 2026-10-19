import Icon, { type IconName } from './Icon';
import SectionHeading from './SectionHeading';
import useReveal from '../hooks/useReveal';
import { coverForCategory } from '../data/projects';

interface MainService {
  title: string;
  text: string;
  icon: IconName;
  /** הקטגוריה בגלריה שאליה האריח מוביל */
  category: string;
}

const mainServices: MainService[] = [
  { title: 'שיפוץ עסקים', text: 'חנויות ומשרדים – מתכנון החלל ועד מדף אחרון.', icon: 'store', category: 'שיפוץ עסקים' },
  { title: 'פרגולות וסגירות', text: 'פרגולות אלומיניום, הצללה וסגירת מרפסות.', icon: 'pergola', category: 'פרגולות וסגירות' },
  { title: 'חדרים וקליניקות', text: 'הפיכת חדר גולמי לחלל מעוצב ומוכן לעבודה.', icon: 'home', category: 'חדרים וקליניקות' },
  { title: 'עבודות עץ ושערים', text: 'שערים, גדרות ומחסנים מעץ בהתאמה אישית.', icon: 'gate', category: 'עבודות עץ ושערים' },
];

const extraServices: { title: string; icon: IconName }[] = [
  { title: 'ריצוף ופרקט', icon: 'tiles' },
  { title: 'גבס ונישות', icon: 'wall' },
  { title: 'צבע וגמר', icon: 'paint' },
  { title: 'תאורה', icon: 'sparkle' },
  { title: 'הריסה ובינוי', icon: 'hammer' },
];

function ServiceTile({ service, index, onSelect }: { service: MainService; index: number; onSelect: (c: string) => void }) {
  const ref = useReveal<HTMLAnchorElement>();
  const cover = coverForCategory(service.category);
  return (
    <a
      href="#projects"
      className="tile reveal"
      ref={ref}
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={() => onSelect(service.category)}
    >
      {cover ? <img src={cover} alt="" loading="lazy" /> : <div className="tile__planks" />}
      <div className="tile__body">
        <span className="tile__icon">
          <Icon name={service.icon} size={24} />
        </span>
        <h3>{service.title}</h3>
        <p>{service.text}</p>
        <span className="tile__link">
          לעבודות
          <Icon name="arrowLeft" size={16} strokeWidth={2} />
        </span>
      </div>
    </a>
  );
}

export default function Services({ onSelectCategory }: { onSelectCategory: (c: string) => void }) {
  return (
    <section className="section" id="services">
      <div className="container">
        <SectionHeading eyebrow="השירותים שלנו" title="מה אנחנו עושים?" center>
          צוות מקצועי ותיק שמכיר כל שלב בעבודה – כך שאתם לא צריכים לתאם בין בעלי מקצוע.
        </SectionHeading>

        <div className="tiles">
          {mainServices.map((s, i) => (
            <ServiceTile key={s.title} service={s} index={i} onSelect={onSelectCategory} />
          ))}
        </div>

        <div className="extras">
          <h3 className="extras__title">שירותים נוספים</h3>
          <ul className="extras__list">
            {extraServices.map((s) => (
              <li key={s.title}>
                <Icon name={s.icon} size={22} />
                {s.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
