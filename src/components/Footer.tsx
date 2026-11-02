import { useState } from 'react';
import { site, whatsappLink } from '../config';
import Brand from './Brand';
import Icon, { LinkedInIcon, WhatsAppIcon } from './Icon';
import AccessibilityStatement from './AccessibilityStatement';

export default function Footer() {
  const [showA11y, setShowA11y] = useState(false);

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Brand />
          <p>שיפוצים, בנייה ועבודות גמר  ברמה הגבוהה ביותר – מהתכנון ועד מסירת המפתח.</p>
        </div>

        <div>
          <h4>יצירת קשר</h4>
          <ul className="footer__contact">
            <li>
              <Icon name="phone" size={18} />
              <span dir="ltr">{site.phoneDisplay}</span>
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
          <button className="footer__a11y" onClick={() => setShowA11y(true)}>
            הצהרת נגישות
          </button>
        </p>
        <p className="credit">
          עיצוב ופיתוח: <strong>Tal Studio</strong>
          <a
            href="https://www.linkedin.com/in/ayala-tal-71498029b/"
            target="_blank"
            rel="noopener noreferrer"
            className="credit__link"
            aria-label="איילה טל בלינקדאין"
          >
            <LinkedInIcon size={16} />
          </a>
        </p>
      </div>

      {showA11y && <AccessibilityStatement onClose={() => setShowA11y(false)} />}
    </footer>
  );
}
