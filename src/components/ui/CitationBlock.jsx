import { useCitations } from '../../hooks/useCitations';

const TYPE_COLORS = {
  'peer-reviewed': 'peer-reviewed',
  manufacturer:    'manufacturer',
  standard:        'standard',
  book:            'book',
  web:             'web',
};

export function CitationBadge({ id }) {
  const { getCitation } = useCitations();
  const c = getCitation(id);
  if (!c) return <sup className="cite-badge">[{id}]</sup>;

  return (
    <a
      href={`#/bibliography#cite-${id}`}
      title={c.full}
      className={`cite-badge ${TYPE_COLORS[c.type] || ''}`}
    >
      [{id}]
    </a>
  );
}

export function CitationList({ ids = [], tool }) {
  const { getCitation, getByTool } = useCitations();
  const cites = ids.length
    ? ids.map(getCitation).filter(Boolean)
    : getByTool(tool);

  if (!cites.length) return null;

  return (
    <div className="mt-4 pt-3 border-t border-[var(--border-dim)]">
      <div className="section-header">Sources</div>
      <ol className="space-y-2">
        {cites.map(c => (
          <li key={c.id} id={`cite-${c.id}`} className="flex gap-2 text-xs">
            <span className={`cite-badge ${TYPE_COLORS[c.type] || ''} shrink-0 self-start mt-0.5`}>[{c.id}]</span>
            <span className="font-body text-[var(--text-muted)] leading-relaxed">
              {c.full}
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer"
                  className="ml-1 text-[var(--neon-cyan)] underline underline-offset-2">↗</a>
              )}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}
