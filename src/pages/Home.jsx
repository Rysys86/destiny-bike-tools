import { Link } from 'react-router-dom';
import { CyberCard } from '../components/ui/index';
import { GearIcon, TireIcon, PowerIcon, WrenchIcon, BookIcon, RulerIcon, SettingsIcon, SearchIcon, MenuIcon } from '../components/icons/index';

const TOOLS = [
  {
    to: '/tools/gearing',
    icon: GearIcon,
    title: 'Gearing Calculator',
    desc: 'Gear ratios, speed per gear graph, development, gain ratio, and cadence.',
    accent: 'cyan',
    badge: 'CALC',
  },
  {
    to: '/tools/fit',
    icon: RulerIcon,
    title: 'Bike Fit / Size',
    desc: 'Frame size and saddle height estimation using LeMond and Hamley methods.',
    accent: 'green',
    badge: 'CALC',
  },
  {
    to: '/tools/tire-pressure',
    icon: TireIcon,
    title: 'Tire Pressure',
    desc: 'Optimal front/rear PSI and Bar based on rider weight, tire width, and terrain.',
    accent: 'magenta',
    badge: 'CALC',
  },
  {
    to: '/tools/power',
    icon: PowerIcon,
    title: 'Power Output',
    desc: 'Martin et al. 1998 physics model. Speed ↔ Power with CdA, Crr, gradient, zones.',
    accent: 'yellow',
    badge: 'CALC',
  },
  {
    to: '/standards/wheel-size',
    icon: TireIcon,
    title: 'Wheel Size & Chart',
    desc: 'Comprehensive ISO/ETRTO circumference chart, BSD, and rollout data for 35+ sizes.',
    accent: 'cyan',
    badge: 'CHART',
  },
  {
    to: '/standards',
    icon: WrenchIcon,
    title: 'Bike Standards',
    desc: '12 reference documents covering BB, headsets, axles, brakes, tires, cockpit.',
    accent: 'cyan',
    badge: 'DOCS',
  },
  {
    to: '/settings',
    icon: SettingsIcon,
    title: 'Settings & UI Scale',
    desc: 'Adjust UI size (Compact to XL), metric/imperial units, neon theme accents, and defaults.',
    accent: 'magenta',
    badge: 'CONFIG',
  },
  {
    to: '/bibliography',
    icon: BookIcon,
    title: 'Sources & Bibliography',
    desc: '22 peer-reviewed studies, manufacturer specs, ISO standards, and reference books.',
    accent: 'green',
    badge: 'REF',
  },
];

export default function Home({ onOpenSearch, onToggleMobile }) {
  return (
    <div className="flex flex-col min-h-full">
      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-surface)]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobile}
            className="p-1.5 border border-[var(--border-dim)] text-[var(--neon-cyan)]"
            aria-label="Open menu"
          >
            <MenuIcon size={18} />
          </button>
          <div className="flex items-center gap-2">
            <img src="./images/icons/icon.png" alt="Logo" className="w-6 h-6 object-contain" />
            <span className="font-display text-xs font-bold neon-text">DESTINY</span>
          </div>
        </div>
        <button
          type="button"
          onClick={onOpenSearch}
          className="p-1.5 border border-[var(--border-dim)] text-[var(--neon-cyan)]"
          aria-label="Search"
        >
          <SearchIcon size={18} />
        </button>
      </div>

      {/* Hero */}
      <div
        className="relative px-6 md:px-8 py-10 md:py-14 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-card) 100%)' }}
      >
        {/* Grid bg lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <img src="./images/icons/icon.png" alt="Logo" className="w-5 h-5 object-contain" />
            <div className="font-display text-[0.6rem] tracking-[0.4em] text-[var(--neon-cyan)] uppercase">
              Digital Cycling Toolkit
            </div>
          </div>
          <h1
            className="font-display text-2xl sm:text-3xl md:text-5xl font-black neon-text mb-3 leading-tight"
            data-text="DESTINY BIKE TOOLS"
          >
            DESTINY BIKE TOOLS
          </h1>
          <p className="font-body text-xs sm:text-sm text-[var(--text-muted)] max-w-lg">
            Precision calculators and engineering standards references for cyclists and mechanics.
            Gearing · Fit · Tire Pressure · Power Output · Detailed Wheel Chart · 12 Standards Docs.
          </p>
          <div className="flex gap-2 mt-4 md:mt-5 flex-wrap">
            {['22 Sources', '12 Standards Docs', '4 Calculators', 'Wheel Chart', 'Martin 1998 Model'].map(t => (
              <span
                key={t}
                className="text-[0.6rem] font-mono px-2 py-0.5 border border-[var(--border-dim)] text-[var(--text-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Tool grid */}
      <div className="p-4 md:p-6 flex-1">
        <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4">
          ── Calculators, Tools & References
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {TOOLS.map(({ to, icon: Icon, title, desc, accent, badge }) => (
            <Link key={to} to={to} className="block group no-underline">
              <CyberCard accent={accent} className="h-full group-hover:translate-y-[-1px] transition-transform">
                <div className="flex items-start gap-3">
                  <div
                    className="shrink-0 p-2 border border-[var(--border-dim)]"
                    style={{ background: 'var(--bg-surface)' }}
                  >
                    <Icon size={20} color="var(--neon-cyan)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <span className="font-display text-xs font-bold text-[var(--text-primary)] tracking-wide truncate">
                        {title}
                      </span>
                      <span className="text-[0.5rem] font-mono px-1 py-0.2 border border-[var(--border-dim)] text-[var(--text-muted)] shrink-0">
                        {badge}
                      </span>
                    </div>
                    <p className="text-xs font-body text-[var(--text-muted)] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </CyberCard>
            </Link>
          ))}
        </div>
      </div>

      <footer
        className="px-6 py-3 border-t border-[var(--border-dim)] text-[0.6rem] font-mono text-[var(--text-muted)]"
        style={{ background: 'var(--bg-surface)' }}
      >
        DESTINY BIKE TOOLS · For reference only · Verify with manufacturer specifications
      </footer>
    </div>
  );
}
