import { useState, useMemo } from 'react';
import { TopBar } from '../../components/layout/index';
import { CyberCard, CyberInput, CyberSelect, ResultPanel, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { calcTirePressure } from '../../data/bikeData';

const TERRAIN_OPTS = [
  { value: 'road',       label: 'Road' },
  { value: 'gravel',     label: 'Gravel' },
  { value: 'mtb_trail',  label: 'MTB Trail' },
  { value: 'mtb_enduro', label: 'MTB Enduro' },
];

const TIRE_OPTS = [
  { value: 'clincher',  label: 'Clincher (tubed)' },
  { value: 'tubeless',  label: 'Tubeless' },
  { value: 'tubular',   label: 'Tubular' },
];

export default function TirePressureCalculator() {
  const [riderKg, setRiderKg] = useState('');
  const [bikeKg, setBikeKg] = useState('9');
  const [tireWidth, setTireWidth] = useState('25');
  const [terrain, setTerrain] = useState('road');
  const [tireType, setTireType] = useState('clincher');
  const [unit, setUnit] = useState('kg');

  const toKg = v => unit === 'lbs' ? +v * 0.453592 : +v;

  const result = useMemo(() => {
    const rKg = toKg(riderKg);
    const bKg = +bikeKg;
    const w = +tireWidth;
    if (!rKg || rKg < 30 || rKg > 200 || !w) return null;
    return calcTirePressure({ riderWeightKg: rKg, bikeWeightKg: bKg, tireWidthMm: w, terrain, tireType });
  }, [riderKg, bikeKg, tireWidth, terrain, tireType, unit]);

  const psiToBar = psi => (psi * 0.0689476).toFixed(2);

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Tire Pressure Calculator" subtitle="SILCA simplified model · front/rear split · tubeless derating" />
      <div className="flex-1 overflow-auto p-6 space-y-6">

        <CyberCard>
          <SectionHeader>Configuration</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <CyberSelect label="Units" id="unit" value={unit}
              onChange={e => setUnit(e.target.value)}
              options={[{ value: 'kg', label: 'Kilograms' }, { value: 'lbs', label: 'Pounds' }]} />
            <CyberInput label={`Rider Weight (${unit})`} id="riderKg" type="number"
              value={riderKg} onChange={e => setRiderKg(e.target.value)}
              min={unit === 'kg' ? 40 : 88} max={unit === 'kg' ? 150 : 330}
              unit={unit} placeholder={unit === 'kg' ? '70' : '154'} />
            <CyberInput label="Bike Weight (kg)" id="bikeKg" type="number"
              value={bikeKg} onChange={e => setBikeKg(e.target.value)} min={5} max={20} unit="kg" />
            <CyberInput label="Tire Width (mm)" id="tireWidth" type="number"
              value={tireWidth} onChange={e => setTireWidth(e.target.value)}
              min={20} max={60} unit="mm" placeholder="25" />
            <CyberSelect label="Terrain" id="terrain" value={terrain}
              onChange={e => setTerrain(e.target.value)} options={TERRAIN_OPTS} />
            <CyberSelect label="Tire Type" id="tireType" value={tireType}
              onChange={e => setTireType(e.target.value)} options={TIRE_OPTS} />
          </div>
        </CyberCard>

        {result ? (
          <ResultPanel>
            <SectionHeader>Recommended Pressure</SectionHeader>
            <div className="grid grid-cols-2 gap-8">
              {[
                { pos: 'Front', psi: result.front },
                { pos: 'Rear',  psi: result.rear  },
              ].map(({ pos, psi }) => (
                <div key={pos} className="text-center">
                  <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-widest mb-2">{pos} Wheel</div>
                  <div className="result-value text-4xl">{psi}</div>
                  <div className="text-xs font-mono text-[var(--text-muted)] mt-1">PSI &nbsp;·&nbsp; {psiToBar(psi)} bar</div>
                </div>
              ))}
            </div>
            {tireType === 'tubeless' && (
              <div className="mt-3 text-xs font-mono text-[var(--neon-green)]">✓ Tubeless derating applied (−15%)</div>
            )}
            {(result.front > 72 || result.rear > 72) && tireType !== 'clincher' && (
              <div className="mt-2 text-xs font-mono text-[var(--neon-yellow)]">⚠ Check hookless rim max PSI (typically 72 PSI)</div>
            )}
          </ResultPanel>
        ) : (
          <div className="text-xs font-mono text-[var(--text-muted)] p-4">Enter rider weight to calculate.</div>
        )}

        <CitationList ids={[7, 8, 9]} />
      </div>
    </div>
  );
}
