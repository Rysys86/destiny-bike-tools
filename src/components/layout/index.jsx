import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  BikeIcon,
  GearIcon,
  TireIcon,
  PowerIcon,
  WrenchIcon,
  BookIcon,
  RulerIcon,
  SettingsIcon,
  SearchIcon,
  MenuIcon,
  CloseIcon,
} from '../icons/index';

const NAV = [
  { to: '/',                    label: 'Home',          icon: BikeIcon   },
  { to: '/tools/gearing',       label: 'Gearing',       icon: GearIcon   },
  { to: '/tools/fit',           label: 'Bike Fit',      icon: RulerIcon  },
  { to: '/tools/tire-pressure', label: 'Tire Pressure', icon: TireIcon   },
  { to: '/tools/power',         label: 'Power Output',  icon: PowerIcon  },
  { to: '/standards',           label: 'Standards',     icon: WrenchIcon },
  { to: '/bibliography',        label: 'Sources',       icon: BookIcon   },
  { to: '/settings',            label: 'Settings',      icon: SettingsIcon },
];

const MOBILE_BOTTOM_NAV = [
  { to: '/',                    label: 'Home',     icon: BikeIcon },
  { to: '/tools/gearing',       label: 'Gearing',  icon: GearIcon },
  { to: '/tools/fit',           label: 'Fit',      icon: RulerIcon },
  { to: '/tools/tire-pressure', label: 'Pressure', icon: TireIcon },
  { to: '/settings',            label: 'Settings', icon: SettingsIcon },
];

export function Sidebar({ mobileOpen, setMobileOpen, onOpenSearch }) {
  const [collapsed, setCollapsed] = useState(false);

  // Close mobile drawer on route change or ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileOpen, setMobileOpen]);

  const navContent = (
    <div className="flex flex-col h-full">
      {/* Brand area */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border-dim)]">
        <Link to="/" className="flex items-center gap-3 no-underline group" onClick={() => setMobileOpen?.(false)}>
          <img
            src="./images/icons/icon.png"
            alt="Destiny Bike Tools"
            className="w-8 h-8 rounded-sm object-contain border border-[var(--border-dim)] group-hover:border-[var(--neon-cyan)] transition-colors"
          />
          {(!collapsed || mobileOpen) && (
            <div>
              <div className="font-display text-xs font-bold neon-text tracking-wider leading-tight">DESTINY</div>
              <div className="font-display text-[0.55rem] text-[var(--text-muted)] tracking-widest">BIKE TOOLS</div>
            </div>
          )}
        </Link>
        {mobileOpen && (
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors md:hidden"
            aria-label="Close menu"
          >
            <CloseIcon size={20} />
          </button>
        )}
      </div>

      {/* Quick Search Button */}
      <div className="p-3">
        <button
          type="button"
          onClick={() => {
            setMobileOpen?.(false);
            onOpenSearch?.();
          }}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-mono border border-[var(--border-dim)] bg-[rgba(0,245,255,0.03)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-all"
        >
          <SearchIcon size={14} color="var(--neon-cyan)" />
          {(!collapsed || mobileOpen) && (
            <>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="text-[0.55rem] px-1 border border-[var(--border-dim)]">^K</kbd>
            </>
          )}
        </button>
      </div>

      {/* Navigation items */}
      <nav className="flex-1 py-2 overflow-y-auto">
        {NAV.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setMobileOpen?.(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 text-xs font-mono uppercase tracking-wider transition-all duration-150 ${
                isActive
                  ? 'text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.06)] border-l-2 border-[var(--neon-cyan)]'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[rgba(255,255,255,0.03)] border-l-2 border-transparent'
              }`
            }
          >
            <Icon size={16} color="currentColor" />
            {(!collapsed || mobileOpen) && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Desktop Collapse toggle */}
      <button
        type="button"
        onClick={() => setCollapsed(c => !c)}
        className="hidden md:flex items-center justify-center py-3 border-t border-[var(--border-dim)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] transition-colors"
        title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        <span className="font-mono text-xs">{collapsed ? '›' : '‹'}</span>
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className="hidden md:flex flex-col h-screen sticky top-0 transition-all duration-200 z-30 shrink-0"
        style={{
          width: collapsed ? '64px' : '220px',
          background: 'var(--bg-surface)',
          borderRight: '1px solid var(--border-dim)',
          minWidth: collapsed ? '64px' : '220px',
        }}
      >
        {navContent}
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Slide-out Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[var(--bg-surface)] border-r border-[var(--border-lit)] transform transition-transform duration-200 ease-in-out md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {navContent}
      </aside>
    </>
  );
}

export function TopBar({ title, subtitle, onToggleMobile, onOpenSearch }) {
  return (
    <header
      className="px-4 md:px-6 py-3.5 border-b border-[var(--border-dim)] flex items-center justify-between gap-4 sticky top-0 z-20"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleMobile}
          className="p-1.5 border border-[var(--border-dim)] text-[var(--neon-cyan)] md:hidden hover:bg-[rgba(0,245,255,0.06)]"
          aria-label="Toggle navigation menu"
        >
          <MenuIcon size={18} />
        </button>
        <div>
          <h1 className="font-display text-xs md:text-sm font-bold neon-text tracking-widest uppercase">
            {title}
          </h1>
          {subtitle && (
            <p className="text-[0.65rem] md:text-xs text-[var(--text-muted)] font-mono mt-0.5 truncate max-w-[200px] sm:max-w-md">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-1.5 border border-[var(--border-dim)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] bg-[rgba(0,245,255,0.03)] transition-colors text-xs font-mono"
          title="Search (Ctrl+K)"
        >
          <SearchIcon size={14} color="var(--neon-cyan)" />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden sm:inline text-[0.55rem] px-1 border border-[var(--border-dim)]">^K</kbd>
        </button>

        <NavLink
          to="/settings"
          className="p-1.5 border border-[var(--border-dim)] text-[var(--text-muted)] hover:text-[var(--neon-cyan)] hover:border-[var(--neon-cyan)] transition-colors"
          title="Settings"
        >
          <SettingsIcon size={16} />
        </NavLink>
      </div>
    </header>
  );
}

export function MobileBottomBar({ onOpenSearch }) {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 flex items-center justify-around border-t border-[var(--border-dim)] py-2 px-1"
      style={{
        background: 'var(--bg-surface)',
        paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))',
      }}
    >
      {MOBILE_BOTTOM_NAV.map(({ to, label, icon: Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 px-2 py-1 text-[0.6rem] font-mono tracking-wider transition-colors ${
              isActive ? 'text-[var(--neon-cyan)] font-bold' : 'text-[var(--text-muted)]'
            }`
          }
        >
          <Icon size={16} color="currentColor" />
          <span>{label}</span>
        </NavLink>
      ))}
      <button
        type="button"
        onClick={onOpenSearch}
        className="flex flex-col items-center gap-0.5 px-2 py-1 text-[0.6rem] font-mono tracking-wider text-[var(--text-muted)] hover:text-[var(--neon-cyan)]"
      >
        <SearchIcon size={16} color="currentColor" />
        <span>Search</span>
      </button>
    </nav>
  );
}

export function Footer() {
  return (
    <footer
      className="hidden md:flex px-6 py-3 border-t border-[var(--border-dim)] text-[0.65rem] font-mono text-[var(--text-muted)] justify-between"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="flex items-center gap-2">
        <img src="./images/icons/icon.png" alt="Icon" className="w-4 h-4 object-contain rounded-xs" />
        <span>DESTINY BIKE TOOLS v1.1.0</span>
      </div>
      <span>For reference only — verify with manufacturer specs</span>
    </footer>
  );
}
