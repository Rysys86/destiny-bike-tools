import { useCitations } from '../hooks/useCitations';
import { TopBar } from '../components/layout/index';
import { CyberCard, SectionHeader } from '../components/ui/index';

const TYPE_COLORS = {
  'peer-reviewed': 'var(--neon-cyan)',
  manufacturer:    'var(--neon-magenta)',
  standard:        'var(--neon-yellow)',
  book:            'var(--neon-green)',
  web:             'var(--text-muted)',
};

const TYPE_LABELS = {
  'peer-reviewed': 'Peer-Reviewed',
  manufacturer:    'Manufacturer',
  standard:        'Standard',
  book:            'Book',
  web:             'Web',
};

export default function Bibliography({ onOpenSearch, onToggleMobile }) {
  const { citations } = useCitations();

  const byType = citations.reduce((acc, c) => {
    (acc[c.type] = acc[c.type] || []).push(c);
    return acc;
  }, {});

  const typeOrder = ['peer-reviewed', 'standard', 'book', 'manufacturer', 'web'];

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Sources & Bibliography"
        subtitle={`${citations.length} references · peer-reviewed · manufacturer · ISO standards · books`}
        onOpenSearch={onOpenSearch}
        onToggleMobile={onToggleMobile}
      />
      <div className="flex-1 overflow-auto p-6 space-y-6">
        {typeOrder.map(type => {
          const items = byType[type];
          if (!items?.length) return null;
          return (
            <CyberCard key={type}>
              <SectionHeader>
                <span style={{ color: TYPE_COLORS[type] }}>{TYPE_LABELS[type]}</span>
                <span className="ml-2 text-[var(--text-muted)]">({items.length})</span>
              </SectionHeader>
              <ol className="space-y-3">
                {items.map(c => (
                  <li key={c.id} id={`cite-${c.id}`} className="flex gap-3 text-sm">
                    <span className="cite-badge shrink-0 self-start mt-0.5"
                      style={{ borderColor: TYPE_COLORS[c.type], color: TYPE_COLORS[c.type] }}>
                      [{c.id}]
                    </span>
                    <div>
                      <span className="font-body text-[var(--text-muted)] leading-relaxed text-xs">{c.full}</span>
                      {c.url && (
                        <a href={c.url} target="_blank" rel="noopener noreferrer"
                          className="ml-2 text-[var(--neon-cyan)] text-xs underline underline-offset-2">↗ Link</a>
                      )}
                      {(c.tools?.length > 0 || c.docs?.length > 0) && (
                        <div className="flex gap-1 flex-wrap mt-1">
                          {c.tools?.map(t => (
                            <span key={t} className="text-[0.55rem] font-mono px-1 border border-[var(--border-dim)] text-[var(--text-muted)]">tool:{t}</span>
                          ))}
                          {c.docs?.map(d => (
                            <span key={d} className="text-[0.55rem] font-mono px-1 border border-[var(--border-dim)] text-[var(--text-muted)]">doc:{d}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </CyberCard>
          );
        })}
      </div>
    </div>
  );
}
