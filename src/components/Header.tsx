import { useEffect, useState } from 'react';
import Brand from './Brand';

const links = [
  { href: '#services', label: 'שירותים' },
  { href: '#projects', label: 'עבודות' },
  { href: '#why', label: 'למה אנחנו' },
  { href: '#process', label: 'תהליך העבודה' },
  { href: '#faq', label: 'שאלות' },
  { href: '#contact', label: 'צור קשר' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`header ${scrolled || open ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <Brand onClick={close} />

        <nav className={`nav ${open ? 'nav--open' : ''}`}>
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="header__actions">
          <a href="#contact" className="btn btn--sm header__cta">
            הצעת מחיר
          </a>
          <button
            className={`burger ${open ? 'burger--open' : ''}`}
            aria-label="תפריט"
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
