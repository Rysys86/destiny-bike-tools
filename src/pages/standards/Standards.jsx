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

const ICON_MAP = { GearIcon, TireIcon, BikeIcon, WrenchIcon, PowerIcon };

export default function Standards() {
  const { slug } = useParams();
  const { index, loading, fetchDoc, allDocs } = useStandardsDocs();
  const { getByDoc } = useCitations();
  const [docContent, setDocContent] = useState('');
  const [docLoading, setDocLoading] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (!slug) { setDocContent(''); return; }
    setDocLoading(true);
    fetchDoc(slug).then(txt => { setDocContent(txt); setDocLoading(false); });
  }, [slug]);

  const currentDoc = allDocs.find(d => d.slug === slug);
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
      <TopBar title="Bike Standards" subtitle="Drivetrain · Wheels · Frame · Cockpit · Brakes" />
      <div className="flex flex-1 overflow-hidden">
        {/* Standards sidebar */}
        <aside className="w-56 shrink-0 overflow-y-auto border-r border-[var(--border-dim)] py-4"
          style={{ background: 'var(--bg-surface)' }}>
          <div className="px-3 mb-3">
            <input
              className="cyber-input text-xs py-1"
              placeholder="Search standards…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          {(filtered ? [{ id: 'results', label: 'Results', docs: filtered }] : index?.categories || []).map(cat => {
            const Icon = ICON_MAP[cat.icon] || WrenchIcon;
            return (
              <div key={cat.id} className="mb-2">
                <div className="flex items-center gap-2 px-3 py-1 text-[0.6rem] font-mono uppercase tracking-wider text-[var(--text-muted)]">
                  <Icon size={12} color="currentColor" />{cat.label}
                </div>
                {cat.docs.map(doc => (
                  <Link key={doc.slug} to={`/standards/${doc.slug}`}
                    className={`block px-4 py-1.5 text-xs font-mono transition-colors ${
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
        <main className="flex-1 overflow-y-auto p-6">
          {!slug ? (
            <div>
              <div className="font-display text-xl neon-text mb-2">Bike Standards Reference</div>
              <p className="text-sm font-body text-[var(--text-muted)] mb-6">
                Select a standard from the sidebar. All data is sourced from manufacturer specifications,
                ISO standards, and industry bodies.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {index?.categories.map(cat => (
                  <CyberCard key={cat.id}>
                    <SectionHeader>{cat.label}</SectionHeader>
                    {cat.docs.map(doc => (
                      <Link key={doc.slug} to={`/standards/${doc.slug}`}
                        className="block text-xs font-mono text-[var(--neon-cyan)] hover:underline py-0.5">
                        → {doc.title}
                      </Link>
                    ))}
                  </CyberCard>
                ))}
              </div>
            </div>
          ) : docLoading ? (
            <div className="font-mono text-xs text-[var(--text-muted)]">Loading…</div>
          ) : (
            <div>
              <div className="doc-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{docContent}</ReactMarkdown>
              </div>
              {docCitations.length > 0 && <CitationList ids={docCitations.map(c => c.id)} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
