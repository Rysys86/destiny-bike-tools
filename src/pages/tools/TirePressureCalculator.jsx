import { useState, useMemo } from 'react';
import { TopBar } from '../../components/layout/index';
import { CyberCard, CyberInput, CyberSelect, ResultPanel, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { calcTirePressure } from '../../data/bikeData';
import { useSettings } from '../../context/SettingsContext';

const TERRAIN_OPTS = [
  { value: 'road',       label: 'Road / Asphalt' },
  { value: 'gravel',     label: 'Gravel / Hardpack' },
  { value: 'mtb_trail',  label: 'MTB Trail' },
  { value: 'mtb_enduro', label: 'MTB Enduro / Downhill' },
];

const TIRE_OPTS = [
  { value: 'clincher',  label: 'Clincher (tubed)' },
  { value: 'tubeless',  label: 'Tubeless' },
  { value: 'tubular',   label: 'Tubular' },
];

export default function TirePressureCalculator({ onOpenSearch, onToggleMobile }) {
  const { settings } = useSettings();
  const [unit, setUnit] = useState(() => (settings.unitSystem === 'imperial' ? 'lbs' : 'kg'));
  const [riderWeight, setRiderWeight] = useState(() =>
    String(settings.unitSystem === 'imperial' ? Math.round(settings.defaultRiderWeight * 2.20462) : settings.defaultRiderWeight)
  );
  const [bikeWeight, setBikeWeight] = useState(() =>
    String(settings.unitSystem === 'imperial' ? Math.round(settings.defaultBikeWeight * 2.20462) : settings.defaultBikeWeight)
  );
  const [tireWidth, setTireWidth] = useState('28');
  const [terrain, setTerrain] = useState('road');
  const [tireType, setTireType] = useState('tubeless');

  const result = useMemo(() => {
    const toKg = v => (unit === 'lbs' ? +v * 0.453592 : +v);
    const rKg = toKg(riderWeight);
    const bKg = toKg(bikeWeight);
    const w = +tireWidth;
    if (!rKg || rKg < 30 || rKg > 200 || !w) return null;
    return calcTirePressure({ riderWeightKg: rKg, bikeWeightKg: bKg, tireWidthMm: w, terrain, tireType });
  }, [riderWeight, bikeWeight, tireWidth, terrain, tireType, unit]);

  const psiToBar = psi => (psi * 0.0689476).toFixed(2);

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Tire Pressure Calculator"
        subtitle="SILCA model · front/rear split · tubeless & hookless safety derating"
        onOpenSearch={onOpenSearch}
        onToggleMobile={onToggleMobile}
      />
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">

        <CyberCard>
          <SectionHeader>Configuration</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <CyberSelect
              label="Weight Units"
              id="unit"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              options={[{ value: 'kg', label: 'Kilograms (kg)' }, { value: 'lbs', label: 'Pounds (lbs)' }]}
            />
            <CyberInput
              label={`Rider Weight (${unit})`}
              id="riderWeight"
              type="number"
              value={riderWeight}
              onChange={e => setRiderWeight(e.target.value)}
              min={unit === 'kg' ? 40 : 88}
              max={unit === 'kg' ? 150 : 330}
              unit={unit}
            />
            <CyberInput
              label={`Bike Weight (${unit})`}
              id="bikeWeight"
              type="number"
              value={bikeWeight}
              onChange={e => setBikeWeight(e.target.value)}
              min={unit === 'kg' ? 4 : 9}
              max={unit === 'kg' ? 30 : 66}
              unit={unit}
            />
            <CyberInput
              label="Tire Width (mm)"
              id="tireWidth"
              type="number"
              value={tireWidth}
              onChange={e => setTireWidth(e.target.value)}
              min={18}
              max={75}
              unit="mm"
            />
            <CyberSelect
              label="Surface / Terrain"
              id="terrain"
              value={terrain}
              onChange={e => setTerrain(e.target.value)}
              options={TERRAIN_OPTS}
            />
            <CyberSelect
              label="Tire System"
              id="tireType"
              value={tireType}
              onChange={e => setTireType(e.target.value)}
              options={TIRE_OPTS}
            />
          </div>
        </CyberCard>

        {result ? (
          <ResultPanel>
            <SectionHeader>Recommended Pressure</SectionHeader>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Front Wheel (40% load)
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="result-value text-3xl">{result.front}</span>
                  <span className="font-mono text-sm text-[var(--neon-cyan)]">PSI</span>
                  <span className="font-mono text-sm text-[var(--text-muted)]">
                    / {psiToBar(result.front)} bar
                  </span>
                </div>
              </div>
              <div>
                <div className="text-[0.65rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Rear Wheel (60% load)
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="result-value text-3xl">{result.rear}</span>
                  <span className="font-mono text-sm text-[var(--neon-cyan)]">PSI</span>
                  <span className="font-mono text-sm text-[var(--text-muted)]">
                    / {psiToBar(result.rear)} bar
                  </span>
                </div>
              </div>
            </div>
            {tireType === 'tubeless' && (
              <p className="text-[0.65rem] font-mono text-[var(--neon-yellow)] mt-3">
                * Note: ETRTO limits maximum hookless rim pressure to 72.5 PSI (5.0 bar).
              </p>
            )}
          </ResultPanel>
        ) : (
          <div className="font-mono text-xs text-[var(--text-muted)] p-4 border border-[var(--border-dim)] bg-[var(--bg-surface)]">
            Enter rider weight to calculate front and rear pressure.
          </div>
        )}

        <CitationList ids={[8, 9, 10]} />
      </div>
    </div>
  );
}
