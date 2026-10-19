import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, WrenchIcon, GearIcon, TireIcon, BookIcon, BikeIcon, PowerIcon } from '../icons/index';

const SEARCHABLE_ITEMS = [
  // Tools
  {
    type: 'Tool',
    title: 'Gearing Calculator',
    desc: 'Gear ratios, development (m/rev), gain ratio, speed per gear graph & cadence',
    path: '/tools/gearing',
    icon: GearIcon,
    keywords: ['ratio', 'cassette', 'chainring', 'teeth', 'speed', 'cadence', 'development', 'gain ratio', 'inches', 'rollout'],
  },
  {
    type: 'Tool',
    title: 'Bike Fit Calculator',
    desc: 'Saddle height (LeMond 0.883, Hamley 1.09) and frame size recommendation',
    path: '/tools/fit',
    icon: BikeIcon,
    keywords: ['fit', 'saddle', 'inseam', 'frame size', 'height', 'setback', 'lemond', 'hamley', 'reach'],
  },
  {
    type: 'Tool',
    title: 'Tire Pressure Calculator',
    desc: 'Optimal front/rear PSI & Bar calculation based on SILCA rolling resistance physics',
    path: '/tools/tire-pressure',
    icon: TireIcon,
    keywords: ['pressure', 'psi', 'bar', 'tire', 'tubeless', 'clincher', 'hookless', 'silca', 'width', 'gravel', 'mtb'],
  },
  {
    type: 'Tool',
    title: 'Power Output Calculator',
    desc: 'Speed ↔ Watts estimation using Martin et al. 1998 physics model & Coggan zones',
    path: '/tools/power',
    icon: PowerIcon,
    keywords: ['watts', 'power', 'cda', 'crr', 'aerodynamics', 'gradient', 'climbing', 'ftp', 'coggan', 'zones', 'vo2'],
  },
  {
    type: 'Settings',
    title: 'Settings & UI Scale',
    desc: 'Display font size scaling (Compact, Standard, Large, XL), units & neon themes',
    path: '/settings',
    icon: WrenchIcon,
    keywords: ['settings', 'ui', 'size', 'font', 'scale', 'units', 'metric', 'imperial', 'theme', 'color', 'scanlines'],
  },
  {
    type: 'Reference',
    title: 'Wheel Size & Circumference Chart',
    desc: 'ETRTO, BSD, exact circumference (mm) and rollout table for 35+ wheel sizes',
    path: '/standards/wheel-size',
    icon: TireIcon,
    keywords: ['wheel', 'circumference', 'chart', 'etrto', 'bsd', '700c', '650b', '29er', '26', '27.5', 'rollout', 'mm'],
  },
  {
    type: 'Reference',
    title: 'Sources & Bibliography',
    desc: '22 academic papers, engineering standards and manufacturer specifications',
    path: '/bibliography',
    icon: BookIcon,
    keywords: ['sources', 'citations', 'bibliography', 'papers', 'martin', 'iso', 'sheldon brown', 'silca', 'studies'],
  },

  // Standards Docs
  {
    type: 'Standard',
    title: 'Bottom Bracket Standards',
    desc: 'BSA threaded, BB30, PF30, BB86/92, T47, SRAM DUB spindle standards',
    path: '/standards/bottom-bracket',
    icon: WrenchIcon,
    keywords: ['bottom bracket', 'bb', 'bsa', 'threaded', 'pressfit', 't47', 'dub', 'spindle', 'crankset'],
  },
  {
    type: 'Standard',
    title: 'Chain & Speed Compatibility',
    desc: 'Chain internal/external widths, 9/10/11/12-speed cross-compatibility and Flattop chains',
    path: '/standards/chain-standards',
    icon: GearIcon,
    keywords: ['chain', 'speeds', '11 speed', '12 speed', 'flattop', 'shimano', 'sram', 'campagnolo', 'links'],
  },
  {
    type: 'Standard',
    title: 'Derailleur Standards',
    desc: 'Cable pull ratios, actuation ratios, cage capacity, and 1x vs 2x clutch mechanisms',
    path: '/standards/derailleur',
    icon: GearIcon,
    keywords: ['derailleur', 'cable pull', 'actuation', 'clutch', 'cage capacity', 'b-tension', 'hanger', 'sram eagle'],
  },
  {
    type: 'Standard',
    title: 'Axle & Hub Standards',
    desc: 'Quick Release (9/10x135), Thru-axle (12x100, 12x142), Boost 148, SuperBoost 157',
    path: '/standards/axle-standards',
    icon: TireIcon,
    keywords: ['axle', 'thru-axle', 'qr', 'boost', '142mm', '148mm', '110mm', 'spacing', 'hub', 'thread pitch'],
  },
  {
    type: 'Standard',
    title: 'Rim & Tire Width Compatibility',
    desc: 'ETRTO 2020 rim internal width recommendations and hookless rim safety limits',
    path: '/standards/rim-tire',
    icon: TireIcon,
    keywords: ['rim', 'tire width', 'internal width', 'etrto', 'hookless', 'tubeless', 'pressure limit', 'blowoff'],
  },
  {
    type: 'Standard',
    title: 'Wheel Size Standards',
    desc: 'ISO BSD standards: 622mm (700c/29"), 584mm (650b/27.5"), 559mm (26")',
    path: '/standards/wheel-size',
    icon: TireIcon,
    keywords: ['wheel size', 'diameter', 'bsd', '700c', '650b', '29', '27.5', '26 inch', 'iso 5775'],
  },
  {
    type: 'Standard',
    title: 'Headset Standards',
    desc: 'Cane Creek S.H.I.S. system: External Cup (EC), ZeroStack (ZS), Integrated (IS)',
    path: '/standards/headset-standards',
    icon: BikeIcon,
    keywords: ['headset', 'shis', 'integrated', 'zerostack', 'is41', 'is52', 'bearing', 'crown race'],
  },
  {
    type: 'Standard',
    title: 'Fork & Steerer Tube',
    desc: 'Straight 1-1/8", tapered 1-1/8" to 1.5", 1-1/4" and carbon steerer torque limits',
    path: '/standards/steerer-tube',
    icon: BikeIcon,
    keywords: ['fork', 'steerer', 'tapered', 'straight', 'expander plug', 'star nut', 'torque', 'carbon'],
  },
  {
    type: 'Standard',
    title: 'Brake Mount Standards',
    desc: 'Flat Mount (Road/Gravel 140/160mm), Post Mount (MTB 160/180/203mm), IS 51mm',
    path: '/standards/brake-mounts',
    icon: PowerIcon,
    keywords: ['brake mount', 'flat mount', 'post mount', 'is mount', 'caliper', 'adapter', 'rotor size'],
  },
  {
    type: 'Standard',
    title: 'Handlebar Clamp Diameters',
    desc: 'Modern 31.8mm, heavy-duty 35mm, vintage road 26.0mm, and MTB 25.4mm',
    path: '/standards/handlebar-clamp',
    icon: WrenchIcon,
    keywords: ['handlebar', 'clamp', 'stem', '31.8', '35mm', '25.4', '26.0', 'cockpit', 'shim'],
  },
  {
    type: 'Standard',
    title: 'Seatpost Diameter Standards',
    desc: 'Common 27.2mm (compliance), 30.9mm / 31.6mm (dropper posts), 34.9mm and shims',
    path: '/standards/seatpost-sizes',
    icon: BikeIcon,
    keywords: ['seatpost', 'diameter', 'dropper post', '27.2', '30.9', '31.6', '34.9', 'seat clamp', 'insertion'],
  },
  {
    type: 'Standard',
    title: 'Disc Brake Rotor Standards',
    desc: '6-bolt vs Centerlock, rotor thickness (1.8mm vs 2.0mm/2.3mm), minimum wear limits',
    path: '/standards/disc-brake',
    icon: PowerIcon,
    keywords: ['rotor', 'disc brake', 'centerlock', '6-bolt', 'rotor thickness', 'wear limit', '160mm', '180mm'],
  },
  {
    type: 'Standard',
    title: 'Hydraulic Brake Hose & Fittings',
    desc: 'Mineral Oil (Shimano/Magura) vs DOT fluid (SRAM/Avid), barbs, olives, banjo bolts',
    path: '/standards/hydraulic-hose',
    icon: PowerIcon,
    keywords: ['hydraulic', 'fluid', 'mineral oil', 'dot 5.1', 'olive', 'barb', 'bh90', 'bh59', 'bleed kit'],
  },
];

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const handleClose = () => {
    setQuery('');
    setSelectedIndex(0);
    onClose();
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SEARCHABLE_ITEMS.slice(0, 8);

    return SEARCHABLE_ITEMS.filter(item => {
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.desc.toLowerCase().includes(q);
      const matchKeywords = item.keywords.some(k => k.toLowerCase().includes(q));
      return matchTitle || matchDesc || matchKeywords;
    });
  }, [query]);

  const handleSelect = (item) => {
    handleClose();
    navigate(item.path);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex]);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 px-4 bg-black/75 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-2xl bg-[var(--bg-card)] border border-[var(--border-lit)] shadow-2xl overflow-hidden animate-fadeIn"
        style={{
          boxShadow: '0 0 40px rgba(0, 245, 255, 0.25)',
          clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 0 100%)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 border-b border-[var(--border-dim)] bg-[var(--bg-elevated)]">
          <SearchIcon size={18} color="var(--neon-cyan)" />
          <input
            ref={inputRef}
            type="text"
            className="flex-1 bg-transparent border-none outline-none px-3 font-mono text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)]"
            placeholder="Search tools, standards, tires, gear ratios, specs... (Esc to close)"
            value={query}
            onChange={e => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
          />
          <span className="text-[0.6rem] font-mono px-1.5 py-0.5 border border-[var(--border-dim)] text-[var(--text-muted)]">
            ESC
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="p-8 text-center font-mono text-xs text-[var(--text-muted)]">
              No results found for "{query}". Try "700c", "cassette", "saddle", or "chain".
            </div>
          ) : (
            results.map((item, idx) => {
              const Icon = item.icon || WrenchIcon;
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.path + item.title}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-start gap-3 p-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[rgba(0,245,255,0.08)] border-l-2 border-[var(--neon-cyan)]'
                      : 'hover:bg-[rgba(255,255,255,0.02)] border-l-2 border-transparent'
                  }`}
                >
                  <div
                    className="p-1.5 border border-[var(--border-dim)] shrink-0 mt-0.5"
                    style={{ background: 'var(--bg-surface)' }}
                  >
                    <Icon size={16} color="var(--neon-cyan)" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-[var(--text-primary)]">
                        {item.title}
                      </span>
                      <span className="text-[0.55rem] font-mono px-1 border border-[var(--border-dim)] text-[var(--neon-cyan)]">
                        {item.type}
                      </span>
                    </div>
                    <p className="text-[0.7rem] font-body text-[var(--text-muted)] truncate mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                  {isSelected && (
                    <span className="text-[0.65rem] font-mono text-[var(--neon-cyan)] self-center">
                      ↵ Enter
                    </span>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-4 py-2 border-t border-[var(--border-dim)] bg-[var(--bg-surface)] flex items-center justify-between text-[0.6rem] font-mono text-[var(--text-muted)]">
          <span>Navigate with ↑ ↓ · Select with ↵</span>
          <span>Shortcut: Ctrl+K or /</span>
        </div>
      </div>
    </div>
  );
}
