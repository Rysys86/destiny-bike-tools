import { useState, useMemo } from 'react';
import { TopBar } from '../../components/layout/index';
import { CyberCard, CyberInput, CyberSelect, CyberButton, ResultPanel, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { buildGearMatrix, WHEEL_DIAMETERS_M } from '../../data/bikeData';

const WHEEL_OPTIONS = Object.keys(WHEEL_DIAMETERS_M).map(k => ({ value: k, label: k }));

const DEFAULT_CHAINRINGS = [50, 34];
const DEFAULT_COGS = [11, 13, 15, 17, 19, 21, 24, 28, 32];

function heatColor(ratio, min, max) {
  const t = (ratio - min) / (max - min);
  // green (climber) → cyan → red (fast)
  if (t < 0.5) return `rgba(57,255,20,${0.1 + t * 0.3})`;
  return `rgba(255,0,110,${0.1 + (t - 0.5) * 0.3})`;
}

export default function GearingCalculator() {
  const [wheelSize, setWheelSize] = useState('700c');
  const [cadence, setCadence] = useState(90);
  const [selected, setSelected] = useState({ cr: 50, cog: 11 });
  const [chainringsStr, setChainringsStr] = useState('50,34');
  const [cogsStr, setCogsStr] = useState('11,13,15,17,19,21,24,28,32');

  const chainrings = useMemo(() =>
    chainringsStr.split(',').map(Number).filter(n => n > 0 && n < 100), [chainringsStr]);
  const cogs = useMemo(() =>
    cogsStr.split(',').map(Number).filter(n => n > 0 && n < 60), [cogsStr]);

  const matrix = useMemo(() =>
    buildGearMatrix(chainrings, cogs, wheelSize, cadence), [chainrings, cogs, wheelSize, cadence]);

  const allRatios = matrix.flat().map(c => c.ratio);
  const minR = Math.min(...allRatios), maxR = Math.max(...allRatios);

  const selCell = matrix[chainrings.indexOf(selected.cr)]?.[cogs.indexOf(selected.cog)];

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Gearing Calculator" subtitle="Gear ratios · development · speed at cadence" />
      <div className="flex-1 overflow-auto p-6 space-y-6">

        {/* Inputs */}
        <CyberCard>
          <SectionHeader>Configuration</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CyberSelect label="Wheel Size" id="wheel" value={wheelSize}
              onChange={e => setWheelSize(e.target.value)} options={WHEEL_OPTIONS} />
            <CyberInput label="Cadence (RPM)" id="cadence" type="number"
              value={cadence} onChange={e => setCadence(+e.target.value)} min={40} max={160} unit="rpm" />
            <CyberInput label="Chainrings (teeth, comma-sep)" id="chainrings"
              value={chainringsStr} onChange={e => setChainringsStr(e.target.value)}
              placeholder="50,34" className="col-span-2 md:col-span-1" />
            <CyberInput label="Cassette (teeth, comma-sep)" id="cogs"
              value={cogsStr} onChange={e => setCogsStr(e.target.value)}
              placeholder="11,13,15,17,19,21,24,28,32" className="col-span-2 md:col-span-1" />
          </div>
        </CyberCard>

        {/* Gear matrix */}
        <CyberCard>
          <SectionHeader>Gear Matrix — click cell to inspect</SectionHeader>
          <div className="overflow-x-auto">
            <table className="border-collapse text-xs font-mono">
              <thead>
                <tr>
                  <th className="px-3 py-1 text-[var(--text-muted)] text-right border border-[var(--border-dim)]">CR ↓ / Cog →</th>
                  {cogs.map(cog => (
                    <th key={cog} className="px-3 py-1 text-[var(--neon-cyan)] border border-[var(--border-dim)]">{cog}t</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {chainrings.map((cr, ri) => (
                  <tr key={cr}>
                    <td className="px-3 py-1 text-[var(--neon-cyan)] font-bold border border-[var(--border-dim)] text-right">{cr}t</td>
                    {cogs.map((cog, ci) => {
                      const cell = matrix[ri]?.[ci];
                      const isSel = selected.cr === cr && selected.cog === cog;
                      return (
                        <td
                          key={cog}
                          className={`gear-cell ${isSel ? 'selected' : ''}`}
                          style={{ background: isSel ? undefined : heatColor(cell?.ratio, minR, maxR) }}
                          onClick={() => setSelected({ cr, cog })}
                          title={`${cr}×${cog} → ${cell?.ratio} ratio · ${cell?.dev}m/rev · ${cell?.speed}km/h`}
                        >
                          {cell?.ratio}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[0.6rem] font-mono text-[var(--text-muted)] mt-2">
            Green = lower gear (climbing) · Red = higher gear (speed)
          </p>
        </CyberCard>

        {/* Selected gear result */}
        {selCell && (
          <ResultPanel>
            <SectionHeader>Selected: {selected.cr}t × {selected.cog}t</SectionHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Gear Ratio', value: selCell.ratio },
                { label: 'Development', value: `${selCell.dev} m/rev` },
                { label: `Speed @ ${cadence}rpm`, value: `${selCell.speed} km/h` },
                { label: 'Gear Inches', value: `${selCell.inches}"` },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</div>
                  <div className="result-value text-lg">{value}</div>
                </div>
              ))}
            </div>
          </ResultPanel>
        )}

        <CitationList ids={[1, 2, 3]} />
      </div>
    </div>
  );
}
