import type { ReactNode } from 'react';
import useReveal from '../hooks/useReveal';

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  center?: boolean;
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, children, center, light }: SectionHeadingProps) {
  const ref = useReveal();
  const cls = ['section-heading', 'reveal', center && 'section-heading--center', light && 'section-heading--light']
    .filter(Boolean)
    .join(' ');
  return (
    <div className={cls} ref={ref}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="section-heading__lead">{children}</p>}
    </div>
  );
}
