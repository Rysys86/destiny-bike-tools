import { useState, useMemo } from 'react';
import { TopBar } from '../../components/layout/index';
import { CyberCard, CyberInput, CyberSelect, ResultPanel, SectionHeader } from '../../components/ui/index';
import { CitationList } from '../../components/ui/CitationBlock';
import { calcPowerFromSpeed, calcSpeedFromPower, calcWPerKg, calcVO2, calcCaloriesPerHour, CDA_PRESETS, CRR_PRESETS, getZone, COGGAN_ZONES } from '../../data/bikeData';

const ZONE_COLORS = ['#6b6b8a','#39ff14','#f5ff00','#00f5ff','#ff8800','#ff006e','#ff00ff'];

export default function PowerCalculator() {
  const [mode, setMode] = useState('speed-to-power');
  const [speedKmh, setSpeedKmh] = useState('35');
  const [watts, setWatts] = useState('250');
  const [riderKg, setRiderKg] = useState('70');
  const [bikeKg, setBikeKg] = useState('9');
  const [gradePct, setGradePct] = useState('0');
  const [CdA, setCdA] = useState('0.32');
  const [Crr, setCrr] = useState('0.004');
  const [ftp, setFtp] = useState('');

  const result = useMemo(() => {
    const base = {
      riderKg: +riderKg, bikeKg: +bikeKg, gradePct: +gradePct,
      CdA: +CdA, Crr: +Crr,
    };
    if (mode === 'speed-to-power') {
      const w = calcPowerFromSpeed({ speedKmh: +speedKmh, ...base });
      return {
        watts: w,
        speed: +speedKmh,
        wkg: calcWPerKg(w, +riderKg),
        vo2: calcVO2(w, +riderKg),
        kcal: calcCaloriesPerHour(w),
        zone: getZone(w, +ftp),
        ftpPct: ftp ? Math.round((w / +ftp) * 100) : null,
      };
    } else {
      const spd = calcSpeedFromPower({ watts: +watts, ...base });
      return {
        watts: +watts,
        speed: spd,
        wkg: calcWPerKg(+watts, +riderKg),
        vo2: calcVO2(+watts, +riderKg),
        kcal: calcCaloriesPerHour(+watts),
        zone: getZone(+watts, +ftp),
        ftpPct: ftp ? Math.round((+watts / +ftp) * 100) : null,
      };
    }
  }, [mode, speedKmh, watts, riderKg, bikeKg, gradePct, CdA, Crr, ftp]);

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Power Output Calculator" subtitle="Martin et al. 1998 model · CdA · Crr · Coggan zones" />
      <div className="flex-1 overflow-auto p-6 space-y-6">

        {/* Mode toggle */}
        <div className="flex gap-2">
          {[
            { v: 'speed-to-power', l: 'Speed → Power' },
            { v: 'power-to-speed', l: 'Power → Speed' },
          ].map(({ v, l }) => (
            <button key={v} onClick={() => setMode(v)}
              className={`cyber-btn text-xs ${mode === v ? 'primary' : ''}`}>{l}</button>
          ))}
        </div>

        <CyberCard>
          <SectionHeader>Inputs</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mode === 'speed-to-power'
              ? <CyberInput label="Speed (km/h)" id="speed" type="number" value={speedKmh}
                  onChange={e => setSpeedKmh(e.target.value)} min={1} max={120} unit="km/h" />
              : <CyberInput label="Power (watts)" id="watts" type="number" value={watts}
                  onChange={e => setWatts(e.target.value)} min={10} max={2000} unit="W" />
            }
            <CyberInput label="Rider Weight (kg)" id="riderKg" type="number" value={riderKg}
              onChange={e => setRiderKg(e.target.value)} min={30} max={200} unit="kg" />
            <CyberInput label="Bike Weight (kg)" id="bikeKg" type="number" value={bikeKg}
              onChange={e => setBikeKg(e.target.value)} min={3} max={30} unit="kg" />
            <CyberInput label="Grade (%)" id="grade" type="number" value={gradePct}
              onChange={e => setGradePct(e.target.value)} min={-30} max={30} step="0.5" unit="%" />
            <CyberSelect label="Position (CdA)" id="cda" value={CdA}
              onChange={e => setCdA(e.target.value)}
              options={CDA_PRESETS.map(p => ({ value: p.value, label: `${p.label} (${p.value})` }))} />
            <CyberSelect label="Surface (Crr)" id="crr" value={Crr}
              onChange={e => setCrr(e.target.value)}
              options={CRR_PRESETS.map(p => ({ value: p.value, label: `${p.label} (${p.value})` }))} />
            <CyberInput label="FTP (optional, for zones)" id="ftp" type="number" value={ftp}
              onChange={e => setFtp(e.target.value)} min={50} max={500} unit="W"
              placeholder="250" className="md:col-span-2" />
          </div>
        </CyberCard>

        <ResultPanel>
          <SectionHeader>Results</SectionHeader>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { label: mode === 'speed-to-power' ? 'Power Required' : 'Achievable Speed',
                value: mode === 'speed-to-power' ? `${result.watts} W` : `${result.speed} km/h` },
              { label: 'W/kg', value: result.wkg },
              { label: 'Est. VO₂', value: `${result.vo2} ml/kg/min` },
              { label: 'Calories/hr', value: `${result.kcal} kcal` },
              { label: mode === 'speed-to-power' ? 'Speed Input' : 'Power Input',
                value: mode === 'speed-to-power' ? `${speedKmh} km/h` : `${watts} W` },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="text-[0.6rem] font-mono text-[var(--text-muted)] uppercase tracking-wider mb-1">{label}</div>
                <div className="result-value text-lg">{value}</div>
              </div>
            ))}
          </div>

          {result.zone && (
            <div className="mt-4 flex items-center gap-3">
              <div className="w-3 h-3 rounded-full" style={{ background: ZONE_COLORS[result.zone.zone - 1] }} />
              <span className="font-display text-xs" style={{ color: ZONE_COLORS[result.zone.zone - 1] }}>
                Zone {result.zone.zone} — {result.zone.name}
                {result.ftpPct && ` (${result.ftpPct}% FTP)`}
              </span>
            </div>
          )}
        </ResultPanel>

        {/* Coggan zones reference */}
        <CyberCard>
          <SectionHeader>Coggan Power Zones [11]</SectionHeader>
          <div className="space-y-1">
            {COGGAN_ZONES.map((z, i) => (
              <div key={z.zone} className="flex items-center gap-3 text-xs font-mono">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: ZONE_COLORS[i] }} />
                <span className="w-6 text-[var(--text-muted)]">Z{z.zone}</span>
                <span className="flex-1 text-[var(--text-primary)]">{z.name}</span>
                <span className="text-[var(--text-muted)]">{z.minPct}–{z.maxPct === 999 ? '∞' : z.maxPct}% FTP</span>
                {ftp && (
                  <span className="text-[var(--neon-cyan)]">
                    {Math.round(+ftp * z.minPct / 100)}–{z.maxPct === 999 ? '∞' : Math.round(+ftp * z.maxPct / 100)} W
                  </span>
                )}
              </div>
            ))}
          </div>
        </CyberCard>

        <CitationList ids={[10, 11, 12, 13, 22]} />
      </div>
    </div>
  );
}
