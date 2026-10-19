import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react';
import { site, whatsappLink, workTypes } from '../config';
import Icon, { WhatsAppIcon } from './Icon';
import SectionHeading from './SectionHeading';

interface ContactForm {
  name: string;
  phone: string;
  city: string;
  workType: string;
  details: string;
}

type FormErrors = Partial<Record<keyof ContactForm, string>>;

const empty: ContactForm = { name: '', phone: '', city: '', workType: '', details: '' };

function validate(form: ContactForm): FormErrors {
  const errors: FormErrors = {};
  if (form.name.trim().length < 2) errors.name = 'נא למלא שם';
  if (!/^0\d{8,9}$/.test(form.phone.replace(/[\s-]/g, ''))) errors.phone = 'מספר טלפון לא תקין';
  if (!form.workType) errors.workType = 'נא לבחור סוג עבודה';
  return errors;
}

function buildMessage(form: ContactForm): string {
  const lines = [
    '*פנייה חדשה מהאתר*',
    '',
    `*שם:* ${form.name.trim()}`,
    `*טלפון:* ${form.phone.trim()}`,
  ];
  if (form.city.trim()) lines.push(`*עיר:* ${form.city.trim()}`);
  lines.push(`*סוג עבודה:* ${form.workType}`);
  if (form.details.trim()) lines.push('', `*פרטים:*`, form.details.trim());
  return lines.join('\n');
}

export default function Contact() {
  const [form, setForm] = useState<ContactForm>(empty);
  const [errors, setErrors] = useState<FormErrors>({});
  const [sent, setSent] = useState(false);

  type FieldEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>;

  const update = (field: keyof ContactForm) => (e: FieldEvent) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    if (errors[field]) setErrors((er) => ({ ...er, [field]: undefined }));
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) return;

    window.open(whatsappLink(buildMessage(form)), '_blank', 'noopener');
    setSent(true);
    setForm(empty);
  };

  return (
    <section className="section section--brand" id="contact">
      <div className="container contact">
        <div className="contact__info">
          <SectionHeading eyebrow="צור קשר" title="איך אתם מדמיינים את הבית שלכם?" light>
            ממלאים כמה פרטים, ההודעה נשלחת ישירות לוואטסאפ שלנו – ואנחנו חוזרים אליכם בהקדם.
          </SectionHeading>

          <ul className="contact__list">
            <li>
              <Icon name="phone" size={20} />
              <a href={site.phoneHref} dir="ltr">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <WhatsAppIcon size={20} />
              <a href={whatsappLink('היי, הגעתי מהאתר')} target="_blank" rel="noopener noreferrer">
                שלחו הודעה בוואטסאפ
              </a>
            </li>
            <li>
              <Icon name="pin" size={20} />
              <span>אזור שירות: {site.area}</span>
            </li>
            <li>
              <Icon name="clock" size={20} />
              <span>{site.hours}</span>
            </li>
          </ul>
        </div>

        <form className="form" onSubmit={onSubmit} noValidate>
          <div className="form__row">
            <Field label="שם מלא" error={errors.name}>
              <input value={form.name} onChange={update('name')} autoComplete="name" />
            </Field>
            <Field label="טלפון" error={errors.phone}>
              <input
                value={form.phone}
                onChange={update('phone')}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                dir="ltr"
                placeholder="050-0000000"
              />
            </Field>
          </div>
          <div className="form__row">
            <Field label="עיר" optional>
              <input value={form.city} onChange={update('city')} autoComplete="address-level2" />
            </Field>
            <Field label="סוג עבודה" error={errors.workType}>
              <select value={form.workType} onChange={update('workType')}>
                <option value="" disabled>
                  בחרו…
                </option>
                {workTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="ספרו לנו קצת על העבודה" optional>
            <textarea
              rows={4}
              value={form.details}
              onChange={update('details')}
              placeholder="גודל הנכס, מה תרצו לשפץ, לוח זמנים רצוי…"
            />
          </Field>

          <button type="submit" className="btn btn--block">
            <WhatsAppIcon size={20} />
            שליחה בוואטסאפ
          </button>

          {sent && (
            <p className="form__note" role="status">
              נפתח חלון וואטסאפ עם ההודעה – רק ללחוץ ״שלח״. תודה!
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  optional?: boolean;
  children: ReactNode;
}

function Field({ label, error, optional, children }: FieldProps) {
  return (
    <label className={`field ${error ? 'field--error' : ''}`}>
      <span className="field__label">
        {label}
        {optional && <small> (לא חובה)</small>}
      </span>
      {children}
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}
