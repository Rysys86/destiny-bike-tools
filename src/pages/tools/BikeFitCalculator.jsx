import { useState, useMemo } from 'react';
import { TopBar } from '../../components/layout/index';
import { CyberCard, CyberInput, CyberSelect, ResultPanel, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { fitLeMond, fitHamley, frameSizeLabel, calcSaddleSetback } from '../../data/bikeData';
import { useSettings } from '../../context/SettingsContext';

const BIKE_TYPES = [
  { value: 'road',   label: 'Road' },
  { value: 'mtb',    label: 'Mountain (MTB)' },
  { value: 'gravel', label: 'Gravel' },
  { value: 'city',   label: 'City / Hybrid' },
];

export default function BikeFitCalculator({ onOpenSearch, onToggleMobile }) {
  const { settings } = useSettings();
  const [bikeType, setBikeType] = useState('road');
  const [inseam, setInseam] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState(() => (settings.unitSystem === 'imperial' ? 'in' : 'cm'));

  const results = useMemo(() => {
    const toCm = v => (unit === 'in' ? +v * 2.54 : +v);
    const ins = toCm(inseam);
    if (!ins || ins < 50 || ins > 120) return null;
    const lemond = fitLeMond(ins);
    const hamley = fitHamley(ins);
    const frameRoad = lemond.frameSizeRoad;
    const frameMTB  = lemond.frameSizeMTB;
    const frameSize = bikeType === 'mtb' ? frameMTB : frameRoad;
    const frameIn   = +(frameSize / 2.54).toFixed(1);
    return {
      saddleLeMond: lemond.saddleHeightMm,
      saddleHamley: hamley.saddleHeightMm,
      frameSize,
      frameIn,
      frameLabel: frameSizeLabel(frameSize),
      setback: calcSaddleSetback(ins),
    };
  }, [inseam, bikeType, unit]);

  return (
    <div className="flex flex-col h-full">
      <TopBar
        title="Bike Fit / Size Calculator"
        subtitle="LeMond · Hamley methods · frame size estimation"
        onOpenSearch={onOpenSearch}
        onToggleMobile={onToggleMobile}
      />
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">

        <CyberCard>
          <SectionHeader>Measurements</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <CyberSelect
              label="Bike Type"
              id="bikeType"
              value={bikeType}
              onChange={e => setBikeType(e.target.value)}
              options={BIKE_TYPES}
            />
            <CyberSelect
              label="Units"
              id="unit"
              value={unit}
              onChange={e => setUnit(e.target.value)}
              options={[{ value: 'cm', label: 'Centimeters (cm)' }, { value: 'in', label: 'Inches (in)' }]}
            />
            <CyberInput
              label={`Inseam (${unit})`}
              id="inseam"
              type="number"
              value={inseam}
              onChange={e => setInseam(e.target.value)}
              min={unit === 'cm' ? 60 : 24}
              max={unit === 'cm' ? 100 : 40}
              unit={unit}
              placeholder={unit === 'cm' ? '78' : '30.7'}
            />
            <CyberInput
              label={`Height (${unit})`}
              id="height"
              type="number"
              value={height}
              onChange={e => setHeight(e.target.value)}
              min={unit === 'cm' ? 140 : 55}
              max={unit === 'cm' ? 220 : 87}
              unit={unit}
              placeholder={unit === 'cm' ? '175' : '69'}
            />
          </div>
        </CyberCard>

        {results ? (
          <ResultPanel>
            <SectionHeader>Results — {BIKE_TYPES.find(b => b.value === bikeType)?.label}</SectionHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">Frame Size</div>
                <div className="result-value text-2xl">{results.frameLabel}</div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  {results.frameSize} cm · {results.frameIn}"
                </div>
              </div>
              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Saddle Height (LeMond)
                </div>
                <div className="result-value text-2xl">{results.saddleLeMond} mm</div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  BB to saddle top (0.883 × inseam)
                </div>
              </div>
              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Saddle Height (Hamley)
                </div>
                <div className="result-value text-2xl">{results.saddleHamley} mm</div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  Pedal axle to saddle top (1.09 × inseam)
                </div>
              </div>
              <div>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">
                  Saddle Setback (est.)
                </div>
                <div className="result-value text-2xl">{results.setback} mm</div>
                <div className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                  Behind bottom bracket center
                </div>
              </div>
            </div>
          </ResultPanel>
        ) : (
          <div className="font-mono text-xs text-[var(--text-muted)] p-4 border border-[var(--border-dim)] bg-[var(--bg-surface)]">
            Enter your inseam measurement above to calculate frame size and saddle height.
          </div>
        )}

        <CitationList ids={[5, 6, 7]} />
      </div>
    </div>
  );
}
