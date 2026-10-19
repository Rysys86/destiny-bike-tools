import { useState, useMemo } from 'react';
import { WHEEL_SIZES_DETAILED } from '../../data/bikeData';
import { CyberCard, SectionHeader, CyberInput } from '../ui/index';

export default function WheelChart({ onSelectWheel }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const set = new Set(WHEEL_SIZES_DETAILED.map(w => w.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return WHEEL_SIZES_DETAILED.filter(w => {
      const matchCat = selectedCategory === 'All' || w.category === selectedCategory;
      const q = query.trim().toLowerCase();
      const matchQ = !q ||
        w.tireSize.toLowerCase().includes(q) ||
        w.etrto.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q) ||
        String(w.circumferenceMm).includes(q);
      return matchCat && matchQ;
    });
  }, [query, selectedCategory]);

  return (
    <CyberCard>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <SectionHeader>Wheel Size & Circumference Reference Chart</SectionHeader>
        <span className="text-[0.65rem] font-mono text-[var(--neon-cyan)]">
          {filtered.length} standards listed
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <CyberInput
          id="wheel-chart-search"
          placeholder="Filter by size (e.g. 700x28, 29x2.3, 25-622)..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <div className="flex gap-1.5 flex-wrap items-center">
          {categories.map(cat => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`text-[0.65rem] font-mono px-2 py-1 border transition-colors ${
                selectedCategory === cat
                  ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.08)]'
                  : 'border-[var(--border-dim)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto max-h-96 overflow-y-auto border border-[var(--border-dim)]">
        <table className="w-full border-collapse text-xs font-mono">
          <thead className="sticky top-0 bg-[var(--bg-elevated)] z-10">
            <tr className="border-b border-[var(--border-dim)] text-[var(--text-muted)] text-left">
              <th className="p-2.5">Category</th>
              <th className="p-2.5">Tire Size</th>
              <th className="p-2.5">ETRTO</th>
              <th className="p-2.5">BSD</th>
              <th className="p-2.5 text-right">Circumference</th>
              <th className="p-2.5 text-right">Rollout (m / rev)</th>
              {onSelectWheel && <th className="p-2.5 text-center">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((w) => (
              <tr
                key={w.id}
                className="border-b border-[var(--border-dim)] hover:bg-[rgba(0,245,255,0.04)] transition-colors"
              >
                <td className="p-2.5 text-[var(--text-muted)] text-[0.7rem]">{w.category}</td>
                <td className="p-2.5 font-bold text-[var(--text-primary)]">{w.tireSize}</td>
                <td className="p-2.5 text-[var(--neon-yellow)]">{w.etrto}</td>
                <td className="p-2.5 text-[var(--text-muted)]">{w.bsdMm} mm</td>
                <td className="p-2.5 text-right font-bold text-[var(--neon-cyan)]">{w.circumferenceMm} mm</td>
                <td className="p-2.5 text-right text-[var(--text-primary)]">{(w.circumferenceMm / 1000).toFixed(3)} m</td>
                {onSelectWheel && (
                  <td className="p-2.5 text-center">
                    <button
                      type="button"
                      onClick={() => onSelectWheel(w)}
                      className="text-[0.65rem] px-2 py-0.5 border border-[var(--neon-cyan)] text-[var(--neon-cyan)] hover:bg-[rgba(0,245,255,0.1)]"
                    >
                      Use
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-[0.6rem] font-mono text-[var(--text-muted)] mt-2">
        Source: ISO 5775 / ETRTO Standards & Cateye Calibration Tables. Actual rollout depends on rim internal width and tire pressure.
      </p>
    </CyberCard>
  );
}
