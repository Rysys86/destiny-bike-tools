import { useState, useMemo } from 'react';
import { TopBar } from '../../components/layout/index';
import { CyberCard, CyberInput, CyberSelect, ResultPanel, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { buildGearMatrix, WHEEL_SIZES_DETAILED, calcSpeedKmh, calcSpeedMph } from '../../data/bikeData';
import { useSettings } from '../../context/SettingsContext';

const POPULAR_WHEEL_OPTIONS = [
  ...WHEEL_SIZES_DETAILED.map(w => ({
    value: w.id,
    label: `${w.tireSize} (${w.circumferenceMm} mm)`,
  })),
  { value: 'custom', label: 'Custom Circumference (mm)' },
];

function heatColor(ratio, min, max) {
  if (min === max) return 'rgba(0,245,255,0.2)';
  const t = (ratio - min) / (max - min);
  // green (climber) → cyan → magenta (speed)
  if (t < 0.5) return `rgba(57,255,20,${0.15 + t * 0.35})`;
  return `rgba(255,0,110,${0.15 + (t - 0.5) * 0.35})`;
}

export default function GearingCalculator({ onOpenSearch, onToggleMobile }) {
  const { settings } = useSettings();
  const [wheelSelection, setWheelSelection] = useState('700x25');
  const [customCircMm, setCustomCircMm] = useState(2105);
  const [cadence, setCadence] = useState(() => settings.defaultCadence || 90);
  const [crankLength, setCrankLength] = useState(() => settings.defaultCrankLength || 172.5);
  const [chainringsStr, setChainringsStr] = useState('50,34');
  const [cogsStr, setCogsStr] = useState('11,12,13,14,15,17,19,21,24,28,32');
  const [selected, setSelected] = useState({ cr: 50, cog: 11 });

  const activeCircumferenceMm = useMemo(() => {
    if (wheelSelection === 'custom') return +customCircMm || 2105;
    const found = WHEEL_SIZES_DETAILED.find(w => w.id === wheelSelection);
    return found ? found.circumferenceMm : 2105;
  }, [wheelSelection, customCircMm]);

  const chainrings = useMemo(() =>
    chainringsStr.split(',').map(Number).filter(n => n > 0 && n < 100), [chainringsStr]);

  const cogs = useMemo(() =>
    cogsStr.split(',').map(Number).filter(n => n > 0 && n < 60), [cogsStr]);

  const matrix = useMemo(() =>
    buildGearMatrix(chainrings, cogs, activeCircumferenceMm, cadence, crankLength),
    [chainrings, cogs, activeCircumferenceMm, cadence, crankLength]
  );

  const allCells = useMemo(() => matrix.flat(), [matrix]);
  const allRatios = useMemo(() => allCells.map(c => c.ratio), [allCells]);
  const minR = Math.min(...allRatios, 1);
  const maxR = Math.max(...allRatios, 5);

  const selCell = useMemo(() => {
    const ri = chainrings.indexOf(selected.cr);
    const ci = cogs.indexOf(selected.cog);
    return matrix[ri]?.[ci] || matrix[0]?.[0] || null;
  }, [matrix, chainrings, cogs, selected]);

  // Gear steps between adjacent cogs
  const cogSteps = useMemo(() => {
    const sortedCogs = [...cogs].sort((a, b) => a - b);
    const steps = [];
    for (let i = 0; i < sortedCogs.length - 1; i++) {
      const from = sortedCogs[i];
      const to = sortedCogs[i + 1];
      const jumpPct = +(((to - from) / from) * 100).toFixed(1);
      steps.push({ from, to, jumpPct });
    }
    return steps;
  }, [cogs]);

  // Speed curve across cadences (60 to 120 RPM) for selected gear
  const cadenceSpeeds = useMemo(() => {
    if (!selCell) return [];
    const rpms = [60, 70, 80, 90, 100, 110, 120];
    return rpms.map(rpm => {
      const spdKmh = calcSpeedKmh(selCell.dev, rpm);
      return {
        rpm,
        spdKmh: +spdKmh.toFixed(1),
        spdMph: +calcSpeedMph(spdKmh).toFixed(1),
      };
    });
  }, [selCell]);

  // Max speed in matrix for graph scaling
  const maxMatrixSpeed = useMemo(() => {
    return Math.max(...allCells.map(c => c.speed), 40);
  }, [allCells]);

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Gearing Calculator"
        subtitle="Gear ratios · speed per gear graph · development · gain ratio · cadence curve"
        onOpenSearch={onOpenSearch}
        onToggleMobile={onToggleMobile}
      />
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">

        {/* Inputs */}
        <CyberCard>
          <SectionHeader>Drivetrain & Wheel Configuration</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CyberSelect
              label="Tire / Wheel Size (ISO Circumference)"
              id="wheel"
              value={wheelSelection}
              onChange={e => setWheelSelection(e.target.value)}
              options={POPULAR_WHEEL_OPTIONS}
            />

            {wheelSelection === 'custom' ? (
              <CyberInput
                label="Custom Rollout / Circumference (mm)"
                id="customCirc"
                type="number"
                value={customCircMm}
                onChange={e => setCustomCircMm(+e.target.value)}
                min={800}
                max={3000}
                unit="mm"
              />
            ) : (
              <CyberInput
                label="Circumference (mm)"
                id="circReadonly"
                type="number"
                value={activeCircumferenceMm}
                disabled
                unit="mm"
              />
            )}

            <CyberInput
              label="Cadence (RPM)"
              id="cadence"
              type="number"
              value={cadence}
              onChange={e => setCadence(+e.target.value)}
              min={40}
              max={160}
              unit="rpm"
            />

            <CyberInput
              label="Crank Arm Length (mm)"
              id="crank"
              type="number"
              step="2.5"
              value={crankLength}
              onChange={e => setCrankLength(+e.target.value)}
              min={150}
              max={185}
              unit="mm"
            />

            <CyberInput
              label="Chainrings (teeth, comma-sep)"
              id="chainrings"
              value={chainringsStr}
              onChange={e => setChainringsStr(e.target.value)}
              placeholder="50,34"
              className="sm:col-span-2"
            />

            <CyberInput
              label="Cassette (teeth, comma-sep)"
              id="cogs"
              value={cogsStr}
              onChange={e => setCogsStr(e.target.value)}
              placeholder="11,12,13,14,15,17,19,21,24,28,32"
              className="sm:col-span-2"
            />
          </div>
        </CyberCard>

        {/* Selected Gear Stats */}
        {selCell && (
          <ResultPanel>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <SectionHeader>
                Selected: {selCell.cr}t × {selCell.cog}t (Ratio: {selCell.ratio})
              </SectionHeader>
              <span className="text-[0.65rem] font-mono text-[var(--neon-cyan)]">
                Circumference: {activeCircumferenceMm} mm · Crank: {crankLength} mm
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Speed @ {cadence} RPM
                </div>
                <div className="result-value text-xl font-bold">
                  {selCell.speed} <span className="text-xs">km/h</span>
                </div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-0.5">
                  {selCell.speedMph} mph
                </div>
              </div>

              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Gear Ratio
                </div>
                <div className="result-value text-xl font-bold">{selCell.ratio}</div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-0.5">
                  {(selCell.cr / selCell.cog).toFixed(3)}
                </div>
              </div>

              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Development
                </div>
                <div className="result-value text-xl font-bold">
                  {selCell.dev} <span className="text-xs">m</span>
                </div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-0.5">
                  {(selCell.dev * 3.28084).toFixed(1)} ft / pedal rev
                </div>
              </div>

              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Gain Ratio
                </div>
                <div className="result-value text-xl font-bold">{selCell.gainRatio}</div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-0.5">
                  Sheldon Brown leverage
                </div>
              </div>

              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Gear Inches
                </div>
                <div className="result-value text-xl font-bold">{selCell.inches}"</div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-0.5">
                  Equivalent wheel dia
                </div>
              </div>

              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Total Range
                </div>
                <div className="result-value text-xl font-bold">
                  {Math.round((maxR / minR) * 100)}%
                </div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-0.5">
                  {minR} to {maxR} ratio
                </div>
              </div>
            </div>
          </ResultPanel>
        )}

        {/* Speed per Gear Ratio Graph */}
        <CyberCard>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <SectionHeader>Speed per Gear Ratio Graph (@ {cadence} RPM)</SectionHeader>
            <span className="text-[0.65rem] font-mono text-[var(--text-muted)]">
              Click any bar to select gear
            </span>
          </div>

          <div className="space-y-4">
            {chainrings.map(cr => (
              <div key={cr} className="p-3 border border-[var(--border-dim)] bg-[var(--bg-surface)]">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-[var(--neon-cyan)]">
                    Chainring: {cr}t
                  </span>
                  <span className="font-mono text-[0.65rem] text-[var(--text-muted)]">
                    {cogs.length} cassette cogs
                  </span>
                </div>

                <div className="space-y-2">
                  {cogs.map(cog => {
                    const ri = chainrings.indexOf(cr);
                    const ci = cogs.indexOf(cog);
                    const cell = matrix[ri]?.[ci];
                    if (!cell) return null;
                    const isSelected = selected.cr === cr && selected.cog === cog;
                    const barWidthPct = Math.min(100, Math.max(5, (cell.speed / maxMatrixSpeed) * 100));

                    return (
                      <div
                        key={cog}
                        onClick={() => setSelected({ cr, cog })}
                        className={`flex items-center gap-3 p-1.5 cursor-pointer rounded-xs transition-all ${
                          isSelected
                            ? 'bg-[rgba(0,245,255,0.12)] border border-[var(--neon-cyan)]'
                            : 'hover:bg-[rgba(255,255,255,0.03)] border border-transparent'
                        }`}
                      >
                        {/* Cog label */}
                        <div className="w-12 text-right font-mono text-xs text-[var(--text-muted)]">
                          {cog}t
                        </div>

                        {/* Bar */}
                        <div className="flex-1 bg-[var(--bg-card)] h-5 rounded-xs overflow-hidden relative">
                          <div
                            className="h-full transition-all duration-300"
                            style={{
                              width: `${barWidthPct}%`,
                              background: isSelected
                                ? 'linear-gradient(90deg, var(--neon-cyan), #ffffff)'
                                : heatColor(cell.ratio, minR, maxR),
                            }}
                          />
                          <span className="absolute inset-y-0 left-2 flex items-center font-mono text-[0.65rem] font-bold text-white drop-shadow">
                            {cell.speed} km/h ({cell.speedMph} mph)
                          </span>
                        </div>

                        {/* Ratio tag */}
                        <div className="w-16 font-mono text-xs text-right text-[var(--text-primary)]">
                          {cell.ratio} : 1
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </CyberCard>

        {/* Speed vs Cadence Progression Graph & Gear Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Cadence Curve */}
          <CyberCard>
            <SectionHeader>
              Cadence vs Speed Curve ({selected.cr}t × {selected.cog}t)
            </SectionHeader>
            <div className="overflow-x-auto mt-3">
              <table className="w-full border-collapse text-xs font-mono">
                <thead>
                  <tr className="border-b border-[var(--border-dim)] text-[var(--text-muted)] text-left">
                    <th className="p-2">Cadence</th>
                    <th className="p-2 text-right">Speed (km/h)</th>
                    <th className="p-2 text-right">Speed (mph)</th>
                    <th className="p-2">Relative Velocity</th>
                  </tr>
                </thead>
                <tbody>
                  {cadenceSpeeds.map(c => (
                    <tr
                      key={c.rpm}
                      className={`border-b border-[var(--border-dim)] ${
                        c.rpm === cadence ? 'bg-[rgba(0,245,255,0.08)] font-bold text-[var(--neon-cyan)]' : ''
                      }`}
                    >
                      <td className="p-2">{c.rpm} RPM {c.rpm === cadence && '★'}</td>
                      <td className="p-2 text-right">{c.spdKmh} km/h</td>
                      <td className="p-2 text-right text-[var(--text-muted)]">{c.spdMph} mph</td>
                      <td className="p-2">
                        <div className="w-24 bg-[var(--bg-elevated)] h-2 rounded-xs overflow-hidden">
                          <div
                            className="bg-[var(--neon-cyan)] h-full"
                            style={{ width: `${Math.min(100, (c.spdKmh / 70) * 100)}%` }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CyberCard>

          {/* Cassette Gear Steps */}
          <CyberCard>
            <SectionHeader>Cassette Gear Step Jumps (%)</SectionHeader>
            <p className="text-[0.65rem] font-mono text-[var(--text-muted)] mb-3">
              Percentage tooth jump between adjacent cogs. Lower % gives tighter rhythm jumps.
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {cogSteps.map(step => (
                <div
                  key={`${step.from}-${step.to}`}
                  className="flex items-center justify-between p-2 border border-[var(--border-dim)] bg-[var(--bg-surface)] text-xs font-mono"
                >
                  <span className="text-[var(--text-primary)] font-bold">
                    {step.from}t → {step.to}t
                  </span>
                  <div className="flex items-center gap-3">
                    <div className="w-20 bg-[var(--bg-elevated)] h-2 rounded-xs overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: `${Math.min(100, step.jumpPct * 3)}%`,
                          background: step.jumpPct > 18 ? 'var(--neon-magenta)' : 'var(--neon-green)',
                        }}
                      />
                    </div>
                    <span
                      className={`font-bold w-14 text-right ${
                        step.jumpPct > 18 ? 'text-[var(--neon-magenta)]' : 'text-[var(--neon-green)]'
                      }`}
                    >
                      +{step.jumpPct}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CyberCard>
        </div>

        {/* Gear matrix table */}
        <CyberCard>
          <SectionHeader>Complete Gear Matrix</SectionHeader>
          <div className="overflow-x-auto mt-2">
            <table className="border-collapse text-xs font-mono w-full">
              <thead>
                <tr>
                  <th className="px-3 py-2 text-[var(--text-muted)] text-right border border-[var(--border-dim)]">
                    CR ↓ / Cog →
                  </th>
                  {cogs.map(cog => (
                    <th key={cog} className="px-3 py-2 text-[var(--neon-cyan)] border border-[var(--border-dim)] text-center">
                      {cog}t
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chainrings.map((cr, ri) => (
                  <tr key={cr}>
                    <td className="px-3 py-2 text-[var(--neon-cyan)] font-bold border border-[var(--border-dim)] text-right">
                      {cr}t
                    </td>
                    {cogs.map((cog, ci) => {
                      const cell = matrix[ri]?.[ci];
                      const isSel = selected.cr === cr && selected.cog === cog;
                      return (
                        <td
                          key={cog}
                          className={`gear-cell text-center cursor-pointer transition-transform ${
                            isSel ? 'selected ring-2 ring-[var(--neon-cyan)]' : ''
                          }`}
                          style={{ background: isSel ? undefined : heatColor(cell?.ratio, minR, maxR) }}
                          onClick={() => setSelected({ cr, cog })}
                          title={`${cr}×${cog} → ${cell?.ratio} ratio · ${cell?.dev}m dev · ${cell?.speed}km/h`}
                        >
                          <div className="font-bold">{cell?.ratio}</div>
                          <div className="text-[0.6rem] opacity-75">{cell?.speed}k</div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.6rem] font-mono text-[var(--text-muted)] mt-2">
            Green = lower gear (climbing) · Red/Magenta = higher gear (speed) · Click cell to select
          </p>
        </CyberCard>

        <CitationList ids={[1, 2, 3]} />
      </div>
    </div>
  );
}
