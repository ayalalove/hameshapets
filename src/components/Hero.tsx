import { useEffect, useState } from "react";
import { heroImages } from "../data/hero";
import useReducedMotion from "../hooks/useReducedMotion";
import Icon from "./Icon";

const badges = [
  "הצעת מחיר ללא התחייבות",
  "עמידה בלוחות זמנים",
  "אחריות על כל עבודה",
];
const SLIDE_MS = 6000;

export default function Hero() {
  const [active, setActive] = useState(0);
  // נגישות: תוכן שזז לבד יותר מ-5 שניות חייב אפשרות עצירה
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const count = heroImages.length;
  const playing = count > 1 && !reduced && !paused;

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(timer);
  }, [active, count, playing]);

  return (
    <section
      className={`hero ${count ? "" : "hero--planks"} ${playing ? "" : "hero--paused"}`}
      id="top"
    >
      {heroImages.map((src, i) => (
        <img
          key={src}
          className={`hero__bg ${i === active ? "is-active" : ""}`}
          src={src}
          alt=""
        />
      ))}
      <div className="hero__overlay" />

      <div className="container hero__content">
        <p className="hero__kicker">שיפוצים · בנייה · עבודות גמר</p>
        <h1 className="hero__title">
          <span className="hero__line">הדמיון שלכם</span>
          <span className="hero__line hero__line--accent">
           הביצוע שלנו
          </span>
        </h1>
        <p className="hero__lead">
          שיפוץ עסקים וחדרים, פרגולות ועבודות עץ – מקצה לקצה, עם עבודה נקייה,
          מחיר שקוף ותשומת לב לכל פרט.
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
          {!reduced && (
            <button
              className="hero__toggle"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "הפעלת מעבר התמונות" : "עצירת מעבר התמונות"}
            >
              <Icon name={paused ? "play" : "pause"} size={12} strokeWidth={0} />
            </button>
          )}
          {heroImages.map((src, i) => (
            <button
              key={src}
              className={`hero__bar ${i === active ? "is-active" : ""} ${i < active ? "is-done" : ""}`}
              style={{ ["--slide-ms" as string]: `${SLIDE_MS}ms` }}
              onClick={() => setActive(i)}
              aria-label={`תמונה ${i + 1} מתוך ${count}`}
              aria-current={i === active}
            >
              <span />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
