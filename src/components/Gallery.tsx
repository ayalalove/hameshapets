import { useEffect, useState } from 'react';
import projects, { ALL, categories, type Project } from '../data/projects';
import SectionHeading from './SectionHeading';
import ProjectModal from './ProjectModal';
import Icon from './Icon';
import useReveal from '../hooks/useReveal';
import useReducedMotion from '../hooks/useReducedMotion';

const PAGE = 9;
const PREVIEW_COUNT = 4;
const PREVIEW_MS = 1100;

function WorkCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const ref = useReveal<HTMLButtonElement>();
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [frame, setFrame] = useState(0);
  // תמונות נוספות נטענות רק אחרי מעבר העכבר הראשון
  const [armed, setArmed] = useState(false);

  const previews = project.media.filter((m) => m.type === 'image').slice(0, PREVIEW_COUNT);
  const canPreview = previews.length > 1 && !reduced;

  useEffect(() => {
    if (!hovered || !canPreview) return;
    const timer = setInterval(() => setFrame((f) => (f + 1) % previews.length), PREVIEW_MS);
    return () => clearInterval(timer);
  }, [hovered, canPreview, previews.length]);

  const onEnter = () => {
    setHovered(true);
    setArmed(true);
  };
  const onLeave = () => {
    setHovered(false);
    setFrame(0);
  };

  return (
    <button
      ref={ref}
      className="work work-reveal"
      style={{ transitionDelay: `${(index % 3) * 110}ms` }}
      onClick={onOpen}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <span className="work__media">
        {project.cover?.type === 'video' && (
          <video src={project.cover.src} muted playsInline preload="metadata" />
        )}
        {project.cover?.type === 'image' &&
          (armed ? previews : previews.slice(0, 1)).map((m, i) => (
            <img
              key={m.src}
              src={m.src}
              alt={i === 0 ? project.title : ''}
              loading="lazy"
              className={i === frame ? 'is-active' : ''}
            />
          ))}
        {!project.cover && (
          <span className="placeholder">
            <Icon name="image" size={30} />
          </span>
        )}
      </span>

      {project.media.length > 1 && (
        <span className="work__count">
          <Icon name="image" size={14} />
          {project.media.length}
        </span>
      )}

      {canPreview && armed && (
        <span className="work__dots" aria-hidden="true">
          {previews.map((m, i) => (
            <i key={m.src} className={i === frame ? 'is-active' : ''} />
          ))}
        </span>
      )}

      <span className="work__caption">
        <small>{[project.category, project.location].filter(Boolean).join(' · ')}</small>
        <strong>{project.title}</strong>
        <span className="work__cta">
          לצפייה בפרויקט
          <Icon name="arrowLeft" size={15} strokeWidth={2} />
        </span>
      </span>
    </button>
  );
}

interface GalleryProps {
  filter: string;
  onFilterChange: (c: string) => void;
}

export default function Gallery({ filter, onFilterChange }: GalleryProps) {
  const [active, setActive] = useState<Project | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = filter === ALL ? projects : projects.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, PAGE);

  const selectFilter = (c: string) => {
    onFilterChange(c);
    setShowAll(false);
  };

  return (
    <section className="section section--tint" id="projects">
      <div className="container">
        <SectionHeading eyebrow="תיק עבודות" title="כמה מהעבודות שלנו" center>
          לחצו על פרויקט כדי לראות את כל התמונות והסרטונים.
        </SectionHeading>

        <div className="filters" role="tablist">
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={filter === c}
              className={`chip ${filter === c ? 'chip--active' : ''}`}
              onClick={() => selectFilter(c)}
            >
              {c}
            </button>
          ))}
        </div>

        {/* key לפי פילטר – כדי שהכרטיסים ייכנסו שוב באנימציה בכל החלפה */}
        <div className="mosaic" key={filter}>
          {visible.map((p, i) => (
            <WorkCard key={p.id} project={p} index={i} onOpen={() => setActive(p)} />
          ))}
        </div>

        {filtered.length > PAGE && !showAll && (
          <div className="center-row">
            <button className="btn btn--outline" onClick={() => setShowAll(true)}>
              לכל העבודות ({filtered.length})
            </button>
          </div>
        )}
      </div>

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </section>
  );
}
