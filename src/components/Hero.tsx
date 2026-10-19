import { heroImage } from '../data/hero';
import Icon from './Icon';

const badges = ['הצעת מחיר ללא התחייבות', 'עמידה בלוחות זמנים', 'אחריות על כל עבודה'];

export default function Hero() {
  return (
    <section className={`hero ${heroImage ? '' : 'hero--planks'}`} id="top">
      {heroImage && <img className="hero__bg" src={heroImage} alt="" />}
      <div className="hero__overlay" />

      <div className="container hero__content">
        <p className="hero__kicker">שיפוצים · בנייה · גמרים</p>
        <h1 className="hero__title">
          משפצים את המקום
          <br />
          <span>בדיוק כמו שחלמתם</span>
        </h1>
        <p className="hero__lead">
          שיפוץ עסקים וחדרים, פרגולות ועבודות עץ – מקצה לקצה, עם עבודה נקייה, מחיר שקוף ותשומת
          לב לכל פרט.
        </p>
        <div className="hero__actions">
          <a href="#contact" className="btn btn--light">
            לקבלת הצעת מחיר
          </a>
          <a href="#projects" className="btn btn--outline-light">
            לצפייה בעבודות
          </a>
        </div>

        <ul className="badges">
          {badges.map((b) => (
            <li key={b}>
              <Icon name="check" size={18} strokeWidth={2.2} />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
