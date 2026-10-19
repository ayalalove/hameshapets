import { useEffect, useState } from 'react';
import { heroImages } from '../data/hero';
import useReducedMotion from '../hooks/useReducedMotion';
import Icon from './Icon';

const badges = ['הצעת מחיר ללא התחייבות', 'עמידה בלוחות זמנים', 'אחריות על כל עבודה'];
const SLIDE_MS = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const count = heroImages.length;

  useEffect(() => {
    if (count < 2 || reduced) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, count, reduced]);

  return (
    <section className={`hero ${count ? '' : 'hero--planks'}`} id="top">
      {heroImages.map((src, i) => (
        <img
          key={src}
          className={`hero__bg ${i === active ? 'is-active' : ''}`}
          src={src}
          alt=""
        />
      ))}
      <div className="hero__overlay" />

      <div className="container hero__content">
        <p className="hero__kicker">שיפוצים · בנייה · גמרים</p>
        <h1 className="hero__title">
          <span className="hero__line">משפצים את המקום</span>
          <span className="hero__line hero__line--accent">בדיוק כמו שחלמתם</span>
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

      {count > 1 && (
        <div className="hero__progress container">
          {heroImages.map((src, i) => (
            <button
              key={src}
              className={`hero__bar ${i === active ? 'is-active' : ''} ${i < active ? 'is-done' : ''}`}
              style={{ ['--slide-ms' as string]: `${SLIDE_MS}ms` }}
              onClick={() => setActive(i)}
              aria-label={`תמונה ${i + 1}`}
            >
              <span />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
