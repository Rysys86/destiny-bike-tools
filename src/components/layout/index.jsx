import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { BikeIcon, GearIcon, TireIcon, PowerIcon, WrenchIcon, BookIcon, ChainIcon } from '../icons/index';

const NAV = [
  { to: '/',                    label: 'Home',          icon: BikeIcon   },
  { to: '/tools/gearing',       label: 'Gearing',       icon: GearIcon   },
  { to: '/tools/fit',           label: 'Bike Fit',      icon: RulerIconInline },
  { to: '/tools/tire-pressure', label: 'Tire Pressure', icon: TireIcon   },
  { to: '/tools/power',         label: 'Power Output',  icon: PowerIcon  },
  { to: '/standards',           label: 'Standards',     icon: WrenchIcon },
  { to: '/bibliography',        label: 'Sources',       icon: BookIcon   },
];

function RulerIconInline({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 010 3.4L17.6 22a2.4 2.4 0 01-3.4 0L2.7 10.5a2.4 2.4 0 010-3.4L6.4 3.4A2.4 2.4 0 019.8 3.4z" />
      <path d="M7.5 10.5L10 8M10.5 13.5L13 11M13.5 16.5L16 14" />
    </svg>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen sticky top-0 transition-all duration-200 z-40"
      style={{
        width: collapsed ? '64px' : '220px',
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-dim)',
        minWidth: collapsed ? '64px' : '220px',
      }}
    >
      {/* Logo area */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-[var(--border-dim)]">
        <ChainIcon size={28} color="var(--neon-cyan)" />
        {!collapsed && (
          <div>
            <div className="font-display text-xs font-bold neon-text tracking-wider leading-tight">DESTINY</div>
            <div className="font-display text-[0.55rem] text-[var(--text-muted)] tracking-widest">BIKE TOOLS</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-150 ${
                isActive
                  ? 'text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.06)] border-l-2 border-[var(--neon-cyan)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.03)]'
              }`
            }
          >
            <Icon size={16} color="currentColor" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(c => !c)}
        className="flex items-center justify-center py-3 border-t border-[var(--border-dim)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <span className="font-mono text-xs">{collapsed ? '›' : '‹'}</span>
      </button>
    </aside>
  );
}

export function TopBar({ title, subtitle }) {
  return (
    <header className="px-6 py-4 border-b border-[var(--border-dim)] flex items-center gap-4"
      style={{ background: 'var(--bg-surface)' }}>
      <div>
        <h1 className="font-display text-sm font-bold neon-text tracking-widest uppercase">{title}</h1>
        {subtitle && <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">{subtitle}</p>}
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="px-6 py-3 border-t border-[var(--border-dim)] text-[0.65rem] font-mono text-[var(--text-muted)] flex justify-between"
      style={{ background: 'var(--bg-surface)' }}>
      <span>DESTINY BIKE TOOLS v1.0.0</span>
      <span>For reference only — verify with manufacturer specs</span>
    </footer>
  );
}
