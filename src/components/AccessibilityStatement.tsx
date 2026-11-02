import type { MouseEvent } from 'react';
import { site, whatsappLink } from '../config';
import useDialog from '../hooks/useDialog';
import Icon from './Icon';

// תאריך העדכון האחרון של ההצהרה – לעדכן בכל שינוי משמעותי באתר
const UPDATED = 'אוקטובר 2026';

export default function AccessibilityStatement({ onClose }: { onClose: () => void }) {
  const panelRef = useDialog<HTMLDivElement>(onClose);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-labelledby="a11y-title" onClick={onClose}>
      <div
        className="statement"
        ref={panelRef}
        onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <button className="modal__close" onClick={onClose} aria-label="סגירת הצהרת הנגישות">
          <Icon name="close" size={22} />
        </button>

        <h2 id="a11y-title">הצהרת נגישות</h2>

        <p>
          {site.name} רואה חשיבות רבה במתן שירות שוויוני לכלל הלקוחות, ופועלת כדי שהאתר יהיה
          נגיש ונוח לשימוש גם עבור אנשים עם מוגבלות.
        </p>

        <h3>רמת הנגישות באתר</h3>
        <p>
          האתר הותאם בהתאם לתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות),
          התשע״ג–2013, ולתקן הישראלי ת״י 5568 המבוסס על הנחיות WCAG 2.0 ברמה AA.
        </p>

        <h3>מה הותאם</h3>
        <ul>
          <li>ניווט מלא באמצעות המקלדת, כולל קישור ״דלג לתוכן״ בראש הדף.</li>
          <li>התאמה לקוראי מסך: תוויות לכל שדה ולכל כפתור, והקראת שגיאות בטופס.</li>
          <li>ניגודיות צבעים בין טקסט לרקע בהתאם לדרישות התקן.</li>
          <li>אפשרות לעצור את מעבר התמונות בראש הדף.</li>
          <li>התחשבות בהגדרת ״הפחתת תנועה״ של מערכת ההפעלה – ללא אנימציות.</li>
          <li>תצוגה מותאמת לטלפונים, לטאבלטים ולמחשבים, ותמיכה בהגדלת טקסט בדפדפן.</li>
        </ul>

        <h3>סייגים</h3>
        <p>
          ייתכן שחלק מהתמונות בגלריית העבודות אינן כוללות תיאור מילולי מפורט של תוכנן. אנו
          ממשיכים לשפר את נגישות האתר באופן שוטף.
        </p>

        <h3>נגישות השירות</h3>
        <p>
          העסק אינו מקבל קהל במשרד או בחנות. השירות ניתן בבית הלקוח או בבית העסק של הלקוח, ונשמח
          להתאים את אופן התקשורת והתיאום לצרכים של כל לקוח.
        </p>

        <h3>נתקלתם בבעיה? נשמח לעזור</h3>
        <p>
          אם נתקלתם בקושי בגלישה באתר או שיש לכם הצעה לשיפור, נשמח שתפנו אלינו ונטפל בפנייה
          בהקדם:
        </p>
        <ul className="statement__contact">
          <li>רכז הנגישות: {site.accessibilityContact}</li>
          <li>
            טלפון: <span dir="ltr">{site.phoneDisplay}</span>
          </li>
          <li>
            וואטסאפ:{' '}
            <a
              href={whatsappLink('היי, אני פונה בנושא נגישות האתר')}
              target="_blank"
              rel="noopener noreferrer"
            >
              שליחת הודעה
            </a>
          </li>
        </ul>

        <p className="statement__date">עדכון אחרון: {UPDATED}</p>
      </div>
    </div>
  );
}
