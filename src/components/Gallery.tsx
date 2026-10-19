import { useState } from 'react';
import projects, { ALL, categories, type Project } from '../data/projects';
import SectionHeading from './SectionHeading';
import ProjectModal from './ProjectModal';
import Icon from './Icon';

const PAGE = 9;

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

        <div className="mosaic">
          {visible.map((p) => (
            <button key={p.id} className="work" onClick={() => setActive(p)}>
              {p.cover?.type === 'image' && <img src={p.cover.src} alt={p.title} loading="lazy" />}
              {p.cover?.type === 'video' && <video src={p.cover.src} muted playsInline preload="metadata" />}
              {!p.cover && (
                <div className="placeholder">
                  <Icon name="image" size={30} />
                </div>
              )}

              {p.media.length > 1 && (
                <span className="work__count">
                  <Icon name="image" size={14} />
                  {p.media.length}
                </span>
              )}

              <span className="work__caption">
                <small>
                  {[p.category, p.location].filter(Boolean).join(' · ')}
                </small>
                <strong>{p.title}</strong>
              </span>
            </button>
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
