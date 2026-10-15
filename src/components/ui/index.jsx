export function CyberCard({ children, className = '', accent = 'cyan', onClick }) {
  const accentMap = {
    cyan: 'border-l-[var(--neon-cyan)]',
    magenta: 'border-l-[var(--neon-magenta)]',
    green: 'border-l-[var(--neon-green)]',
    yellow: 'border-l-[var(--neon-yellow)]',
  };
  return (
    <div
      className={`cyber-card p-4 ${accentMap[accent] || ''} ${className} ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CyberInput({ label, id, type = 'text', value, onChange, min, max, step, placeholder, unit, className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[0.65rem] font-mono uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <div className="flex items-center gap-1">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
          step={step}
          placeholder={placeholder}
          className="cyber-input flex-1"
        />
        {unit && <span className="text-xs font-mono text-[var(--text-muted)] whitespace-nowrap">{unit}</span>}
      </div>
    </div>
  );
}

export function CyberSelect({ label, id, value, onChange, options = [], className = '' }) {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-[0.65rem] font-mono uppercase tracking-widest text-[var(--text-muted)]">
          {label}
        </label>
      )}
      <select id={id} value={value} onChange={onChange} className="cyber-input">
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

export function CyberButton({ children, onClick, variant = 'default', className = '', type = 'button', disabled }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`cyber-btn ${variant === 'primary' ? 'primary' : ''} ${variant === 'danger' ? 'danger' : ''} ${className} ${disabled ? 'opacity-40 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}

export function ResultPanel({ children, className = '' }) {
  return (
    <div className={`result-panel ${className}`}>
      {children}
    </div>
  );
}

export function SectionHeader({ children }) {
  return <div className="section-header">{children}</div>;
}

export function RelatedDocs({ docs = [], citations = [] }) {
  if (!docs.length && !citations.length) return null;
  return (
    <div className="mt-4 pt-4 border-t border-[var(--border-dim)]">
      <div className="section-header">📚 Related Docs & Sources</div>
      {docs.map((d, i) => (
        <div key={i} className="text-xs font-mono text-[var(--neon-cyan)] mb-1">→ {d}</div>
      ))}
      {citations.map((c, i) => (
        <div key={i} className="text-xs font-mono text-[var(--text-muted)] mb-1">[{c.id}] {c.short}</div>
      ))}
    </div>
  );
}
