import { useEffect, useRef, useState, type MouseEvent, type TouchEvent } from 'react';
import type { Project } from '../data/projects';
import Icon from './Icon';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const SWIPE_PX = 50;

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [index, setIndex] = useState(0);
  // כיוון המעבר – קובע מאיזה צד התמונה החדשה נכנסת
  const [dir, setDir] = useState<'next' | 'prev' | null>(null);
  const touchX = useRef<number | null>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const count = project.media.length;
  const current = project.media[index];

  const next = () => {
    setDir('next');
    setIndex((i) => (i + 1) % count);
  };
  const prev = () => {
    setDir('prev');
    setIndex((i) => (i - 1 + count) % count);
  };
  const goTo = (i: number) => {
    setDir(i > index ? 'next' : 'prev');
    setIndex(i);
  };

  // ב-RTL: החלקה ימינה = הבא
  const onTouchStart = (e: TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchX.current === null || count < 2) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx > SWIPE_PX) next();
    if (dx < -SWIPE_PX) prev();
    touchX.current = null;
  };

  // התמונה הקטנה הפעילה תמיד בתוך התצוגה
  useEffect(() => {
    thumbsRef.current?.children[index]?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
  }, [index]);

  useEffect(() => {
    // ב-RTL: חץ שמאלה = הבא, חץ ימינה = הקודם
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (count > 1 && e.key === 'ArrowLeft') next();
      if (count > 1 && e.key === 'ArrowRight') prev();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [count, onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={project.title} onClick={onClose}>
      <div className="modal__panel" onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose} aria-label="סגירה">
          <Icon name="close" size={22} />
        </button>

        <div className="modal__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
          {current?.type === 'image' && (
            <img
              key={current.src}
              className={dir ? `slide-${dir}` : 'zoom-in'}
              src={current.src}
              alt={`${project.title} – ${index + 1}`}
            />
          )}
          {current?.type === 'video' && (
            <video
              key={current.src}
              className={dir ? `slide-${dir}` : 'zoom-in'}
              src={current.src}
              controls
              autoPlay
              playsInline
            />
          )}
          {!current && (
            <div className="placeholder">
              <Icon name="image" size={36} />
              <span>עוד אין תמונות לפרויקט הזה</span>
            </div>
          )}
          {count > 1 && (
            <>
              <button className="modal__nav modal__nav--prev" onClick={prev} aria-label="הקודם">
                <Icon name="arrowRight" />
              </button>
              <button className="modal__nav modal__nav--next" onClick={next} aria-label="הבא">
                <Icon name="arrowLeft" />
              </button>
              <span className="modal__counter">
                {index + 1} / {count}
              </span>
            </>
          )}
        </div>

        <div className="modal__info">
          <div>
            <p className="modal__meta">
              {[project.category, project.location].filter(Boolean).join(' · ')}
            </p>
            <h3>{project.title}</h3>
            <p className="modal__desc">{project.description}</p>
          </div>
          {count > 1 && (
            <div className="thumbs" ref={thumbsRef}>
              {project.media.map((m, i) => (
                <button
                  key={m.src}
                  className={`thumb ${i === index ? 'thumb--active' : ''}`}
                  style={{ animationDelay: `${Math.min(i, 16) * 30}ms` }}
                  onClick={() => goTo(i)}
                  aria-label={`${m.type === 'video' ? 'סרטון' : 'תמונה'} ${i + 1}`}
                >
                  {m.type === 'image' ? (
                    <img src={m.src} alt="" loading="lazy" />
                  ) : (
                    <>
                      <video src={m.src} muted preload="metadata" />
                      <span className="thumb__play">
                        <Icon name="play" size={14} />
                      </span>
                    </>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
