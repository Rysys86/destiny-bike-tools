import { Link } from 'react-router-dom';
import { CyberCard } from '../components/ui/index';
import { GearIcon, TireIcon, BikeIcon, PowerIcon, WrenchIcon, BookIcon } from '../components/icons/index';

function RulerIconInline({ size, color }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21.3 15.3a2.4 2.4 0 010 3.4L17.6 22a2.4 2.4 0 01-3.4 0L2.7 10.5a2.4 2.4 0 010-3.4L6.4 3.4A2.4 2.4 0 019.8 3.4z" />
      <path d="M7.5 10.5L10 8M10.5 13.5L13 11M13.5 16.5L16 14" />
    </svg>
  );
}

const TOOLS = [
  {
    to: '/tools/gearing',
    icon: GearIcon,
    title: 'Gearing Calculator',
    desc: 'Gear ratios, development, and speed at cadence for any chainring/cassette combo.',
    accent: 'cyan',
    badge: 'TOOL',
  },
  {
    to: '/tools/fit',
    icon: RulerIconInline,
    title: 'Bike Fit / Size',
    desc: 'Frame size and saddle height estimation using LeMond and Hamley methods.',
    accent: 'green',
    badge: 'TOOL',
  },
  {
    to: '/tools/tire-pressure',
    icon: TireIcon,
    title: 'Tire Pressure',
    desc: 'Optimal front/rear PSI based on rider weight, tire width, terrain, and tire type.',
    accent: 'magenta',
    badge: 'TOOL',
  },
  {
    to: '/tools/power',
    icon: PowerIcon,
    title: 'Power Output',
    desc: 'Martin et al. 1998 physics model. Speed ↔ Power with CdA, Crr, gradient, zones.',
    accent: 'yellow',
    badge: 'TOOL',
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
    to: '/bibliography',
    icon: BookIcon,
    title: 'Sources & Bibliography',
    desc: '22 peer-reviewed studies, manufacturer specs, ISO standards, and reference books.',
    accent: 'green',
    badge: 'REF',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-full">
      {/* Hero */}
      <div className="relative px-8 py-14 overflow-hidden"
        style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-card) 100%)' }}>
        {/* Grid bg lines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(var(--border-dim) 1px, transparent 1px), linear-gradient(90deg, var(--border-dim) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        <div className="relative z-10">
          <div className="font-display text-[0.6rem] tracking-[0.4em] text-[var(--text-muted)] mb-2 uppercase">
            Digital Toolkit
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-black neon-text mb-3 leading-tight"
            data-text="DESTINY BIKE TOOLS">
            DESTINY BIKE TOOLS
          </h1>
          <p className="font-body text-sm text-[var(--text-muted)] max-w-lg">
            Precision calculators and standards references for cyclists.
            Gearing · Fit · Tire Pressure · Power Output · 12 Tech Standards Docs.
          </p>
          <div className="flex gap-2 mt-5 flex-wrap">
            {['22 Sources', '12 Standards Docs', '4 Calculators', 'Martin 1998 Power Model'].map(t => (
              <span key={t} className="text-[0.6rem] font-mono px-2 py-1 border border-[var(--border-dim)] text-[var(--text-muted)]">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Tool grid */}
      <div className="p-6 flex-1">
        <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-4">
          ── Tools & References
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {TOOLS.map(({ to, icon: Icon, title, desc, accent, badge }) => (
            <Link key={to} to={to} className="block group no-underline">
              <CyberCard accent={accent} className="h-full group-hover:translate-y-[-1px] transition-transform">
                <div className="flex items-start gap-3">
                  <div className="shrink-0 p-2 border border-[var(--border-dim)]"
                    style={{ background: 'var(--bg-surface)' }}>
                    <Icon size={20} color="var(--neon-cyan)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-display text-xs font-bold text-[var(--text-primary)] tracking-wide">{title}</span>
                      <span className="text-[0.5rem] font-mono px-1.5 py-0.5 border border-[var(--border-dim)] text-[var(--text-muted)]">{badge}</span>
                    </div>
                    <p className="text-xs font-body text-[var(--text-muted)] leading-relaxed">{desc}</p>
                  </div>
                </div>
              </CyberCard>
            </Link>
          ))}
        </div>
      </div>

      <footer className="px-6 py-3 border-t border-[var(--border-dim)] text-[0.6rem] font-mono text-[var(--text-muted)]"
        style={{ background: 'var(--bg-surface)' }}>
        DESTINY BIKE TOOLS · For reference only · Verify with manufacturer specifications · Not a substitute for professional fitting
      </footer>
    </div>
  );
}
