import { site, whatsappLink } from '../config';
import Brand from './Brand';
import Icon, { WhatsAppIcon } from './Icon';

const links = [
  { href: '#services', label: 'שירותים' },
  { href: '#projects', label: 'עבודות' },
  { href: '#why', label: 'למה אנחנו' },
  { href: '#process', label: 'תהליך העבודה' },
  { href: '#faq', label: 'שאלות נפוצות' },
  { href: '#contact', label: 'צור קשר' },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand />
          <p>שיפוצים, בנייה וגמרים ברמה הגבוהה ביותר – מהתכנון ועד מסירת המפתח.</p>
        </div>

        <div>
          <h4>ניווט</h4>
          <ul className="footer__links">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>יצירת קשר</h4>
          <ul className="footer__contact">
            <li>
              <Icon name="phone" size={18} />
              <a href={site.phoneHref} dir="ltr">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <WhatsAppIcon size={18} />
              <a href={whatsappLink('היי, הגעתי מהאתר')} target="_blank" rel="noopener noreferrer">
                וואטסאפ
              </a>
            </li>
            <li>
              <Icon name="pin" size={18} />
              {site.area}
            </li>
            <li>
              <Icon name="clock" size={18} />
              {site.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>
          © {new Date().getFullYear()} {site.name} · כל הזכויות שמורות
        </p>
      </div>
    </footer>
  );
}
