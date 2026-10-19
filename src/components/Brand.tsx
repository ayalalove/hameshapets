import { site } from '../config';
import logoMark from '../assets/logo-mark.webp';

export default function Brand({ onClick }: { onClick?: () => void }) {
  return (
    <a href="#top" className="brand" onClick={onClick} aria-label={`${site.name} – לראש הדף`}>
      <img src={logoMark} alt="" width={48} height={50} />
      <span className="brand__text">
        <strong>{site.name}</strong>
        <small>{site.subtitle}</small>
      </span>
    </a>
  );
}
