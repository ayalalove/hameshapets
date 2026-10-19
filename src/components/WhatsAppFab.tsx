import { whatsappLink } from '../config';
import { WhatsAppIcon } from './Icon';

export default function WhatsAppFab() {
  return (
    <a
      className="fab"
      href={whatsappLink('היי, הגעתי מהאתר ואשמח לפרטים על שיפוץ')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="שליחת הודעה בוואטסאפ"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
