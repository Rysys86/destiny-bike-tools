import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { TopBar } from '../../components/layout/index';
import { CyberCard, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { useStandardsDocs } from '../../hooks/useStandardsDocs';
import { useCitations } from '../../hooks/useCitations';
import { GearIcon, TireIcon, BikeIcon, WrenchIcon, PowerIcon } from '../../components/icons/index';
import WheelChart from '../../components/wheel/WheelChart';

const ICON_MAP = { GearIcon, TireIcon, BikeIcon, WrenchIcon, PowerIcon };

export default function Standards({ onOpenSearch, onToggleMobile }) {
  const { slug } = useParams();
  const { index, loading, fetchDoc, allDocs } = useStandardsDocs();
  const { getByDoc } = useCitations();
  const [docContent, setDocContent] = useState('');
  const [docLoading, setDocLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [standardsMenuOpen, setStandardsMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;
    if (slug) {
      Promise.resolve().then(() => {
        if (active) setDocLoading(true);
      });
      fetchDoc(slug).then(txt => {
        if (active) {
          setDocContent(txt);
          setDocLoading(false);
        }
      });
    }
    return () => {
      active = false;
    };
  }, [slug, fetchDoc]);

  const docCitations = slug ? getByDoc(slug) : [];

  const filtered = search
    ? allDocs.filter(d =>
        d.title.toLowerCase().includes(search.toLowerCase()) ||
        d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
      )
    : null;

  if (loading) return <div className="p-8 font-mono text-[var(--text-muted)]">Loading standards index…</div>;

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Bike Standards"
        subtitle="Drivetrain · Wheels · Frame · Cockpit · Brakes"
        onOpenSearch={onOpenSearch}
        onToggleMobile={onToggleMobile}
      />

      {/* Mobile Standards Selector Bar */}
      <div className="md:hidden px-4 py-2 bg-[var(--bg-elevated)] border-b border-[var(--border-dim)] flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStandardsMenuOpen(prev => !prev)}
          className="text-xs font-mono text-[var(--neon-cyan)] flex items-center gap-1.5"
        >
          <span>{slug ? allDocs.find(d => d.slug === slug)?.title || 'Select Standard' : 'Browse Topics'}</span>
          <span>{standardsMenuOpen ? '▲' : '▼'}</span>
        </button>
        <span className="text-[0.6rem] font-mono text-[var(--text-muted)]">
          {allDocs.length} topics
        </span>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Standards sidebar - responsive */}
        <aside
          className={`${
            standardsMenuOpen ? 'block absolute inset-0 z-20 bg-[var(--bg-surface)]' : 'hidden'
          } md:block md:static w-full md:w-64 shrink-0 overflow-y-auto border-r border-[var(--border-dim)] py-4`}
          style={{ background: 'var(--bg-surface)' }}
        >
          <div className="px-3 mb-3">
            <input
              className="cyber-input text-xs py-1.5"
              placeholder="Search standards…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {(filtered ? [{ id: 'results', label: 'Results', docs: filtered }] : index?.categories || []).map(cat => {
            const Icon = ICON_MAP[cat.icon] || WrenchIcon;
            return (
              <div key={cat.id} className="mb-3">
                <div className="flex items-center gap-2 px-3 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  <Icon size={12} color="currentColor" />
                  <span>{cat.label}</span>
                </div>
                {cat.docs.map(doc => (
                  <Link
                    key={doc.slug}
                    to={`/standards/${doc.slug}`}
                    onClick={() => setStandardsMenuOpen(false)}
                    className={`block px-4 py-2 text-xs font-mono transition-colors ${
                      slug === doc.slug
                        ? 'text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.06)] border-l-2 border-[var(--neon-cyan)]'
                        : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.02)]'
                    }`}
                  >
                    {doc.title}
                  </Link>
                ))}
              </div>
            );
          })}
        </aside>

        {/* Doc content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {!slug ? (
            <div>
              <div className="font-display text-xl neon-text mb-2">Bike Standards Reference</div>
              <p className="text-sm font-body text-[var(--text-muted)] mb-6">
                Select a standard from the list. All data is sourced from manufacturer specifications,
                ISO standards, and industry bodies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {index?.categories.map(cat => (
                  <CyberCard key={cat.id}>
                    <SectionHeader>{cat.label}</SectionHeader>
                    <div className="space-y-1.5 mt-2">
                      {cat.docs.map(doc => (
                        <Link
                          key={doc.slug}
                          to={`/standards/${doc.slug}`}
                          className="block text-xs font-mono text-[var(--neon-cyan)] hover:underline py-0.5"
                        >
                          → {doc.title}
                        </Link>
                      ))}
                    </div>
                  </CyberCard>
                ))}
              </div>
              <WheelChart />
            </div>
          ) : docLoading ? (
            <div className="font-mono text-xs text-[var(--text-muted)]">Loading document…</div>
          ) : (
            <div>
              <div className="doc-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{docContent}</ReactMarkdown>
              </div>

              {/* If wheel size doc, embed the interactive chart */}
              {slug === 'wheel-size' && (
                <div className="mt-6">
                  <WheelChart />
                </div>
              )}

              {docCitations.length > 0 && <CitationList ids={docCitations.map(c => c.id)} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
