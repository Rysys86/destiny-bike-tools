import { TopBar } from '../components/layout/index';
import { CyberCard, SectionHeader, CyberInput, CyberSelect } from '../components/ui/index';
import { useSettings } from '../context/SettingsContext';
import WheelChart from '../components/wheel/WheelChart';

const UI_SIZE_OPTIONS = [
  { value: 'compact', label: 'Compact (85% — High density)' },
  { value: 'standard', label: 'Standard (100% — Default)' },
  { value: 'large', label: 'Large (115% — Readable)' },
  { value: 'xlarge', label: 'Extra Large (130% — High visibility)' },
];

const UNIT_OPTIONS = [
  { value: 'metric', label: 'Metric (km/h, bar, mm, kg)' },
  { value: 'imperial', label: 'Imperial (mph, psi, in, lbs)' },
];

const ACCENT_OPTIONS = [
  { id: 'cyan', label: 'Cyber Cyan', color: '#00f5ff' },
  { id: 'magenta', label: 'Neon Magenta', color: '#ff006e' },
  { id: 'green', label: 'Matrix Green', color: '#39ff14' },
  { id: 'yellow', label: 'Hazard Yellow', color: '#f5ff00' },
];

export default function Settings() {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <div className="flex flex-col h-full">
      <TopBar title="Settings" subtitle="UI display · Units · Defaults · Themes" />
      <div className="flex-1 overflow-auto p-4 md:p-6 space-y-6">

        {/* Display & Interface */}
        <CyberCard>
          <SectionHeader>Display & Interface</SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <CyberSelect
                label="UI Scale / Font Size"
                id="uiSize"
                value={settings.uiSize}
                onChange={e => updateSetting('uiSize', e.target.value)}
                options={UI_SIZE_OPTIONS}
              />
              <p className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-1.5">
                Adjusts whole app interface scale for desktop monitors or mobile touch screens.
              </p>
            </div>

            <div>
              <CyberSelect
                label="Measurement Units"
                id="unitSystem"
                value={settings.unitSystem}
                onChange={e => updateSetting('unitSystem', e.target.value)}
                options={UNIT_OPTIONS}
              />
              <p className="text-[0.65rem] font-mono text-[var(--text-muted)] mt-1.5">
                Sets default units across Gearing, Tire Pressure, Fit, and Power tools.
              </p>
            </div>
          </div>

          {/* Theme accents */}
          <div className="mt-5 pt-4 border-t border-[var(--border-dim)]">
            <label className="block text-[0.65rem] font-mono uppercase tracking-wider text-[var(--text-muted)] mb-2">
              Neon Accent Theme
            </label>
            <div className="flex flex-wrap gap-3">
              {ACCENT_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => updateSetting('themeAccent', opt.id)}
                  className={`flex items-center gap-2 px-3 py-2 border font-mono text-xs transition-all ${
                    settings.themeAccent === opt.id
                      ? 'border-[var(--neon-cyan)] bg-[rgba(255,255,255,0.06)]'
                      : 'border-[var(--border-dim)] hover:border-[var(--text-muted)]'
                  }`}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
                    style={{ background: opt.color, boxShadow: `0 0 8px ${opt.color}` }}
                  />
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Scanlines effect */}
          <div className="mt-5 pt-4 border-t border-[var(--border-dim)] flex items-center justify-between">
            <div>
              <span className="font-mono text-xs text-[var(--text-primary)]">Cyberpunk Scanlines Overlay</span>
              <p className="text-[0.65rem] font-mono text-[var(--text-muted)]">Subtle CRT raster line overlay effect</p>
            </div>
            <button
              type="button"
              onClick={() => updateSetting('scanlines', !settings.scanlines)}
              className={`px-3 py-1 text-xs font-mono border transition-colors ${
                settings.scanlines
                  ? 'border-[var(--neon-cyan)] text-[var(--neon-cyan)] bg-[rgba(0,245,255,0.1)]'
                  : 'border-[var(--border-dim)] text-[var(--text-muted)]'
              }`}
            >
              {settings.scanlines ? 'ENABLED' : 'DISABLED'}
            </button>
          </div>
        </CyberCard>

        {/* User Defaults */}
        <CyberCard>
          <SectionHeader>Default Calculator Values</SectionHeader>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <CyberInput
              label="Default Cadence"
              id="def-cadence"
              type="number"
              value={settings.defaultCadence}
              onChange={e => updateSetting('defaultCadence', +e.target.value)}
              min={40}
              max={150}
              unit="rpm"
            />
            <CyberInput
              label="Rider Weight"
              id="def-rider"
              type="number"
              value={settings.defaultRiderWeight}
              onChange={e => updateSetting('defaultRiderWeight', +e.target.value)}
              min={30}
              max={200}
              unit={settings.unitSystem === 'metric' ? 'kg' : 'lbs'}
            />
            <CyberInput
              label="Bike Weight"
              id="def-bike"
              type="number"
              value={settings.defaultBikeWeight}
              onChange={e => updateSetting('defaultBikeWeight', +e.target.value)}
              min={4}
              max={40}
              unit={settings.unitSystem === 'metric' ? 'kg' : 'lbs'}
            />
            <CyberInput
              label="Crank Arm Length"
              id="def-crank"
              type="number"
              step="2.5"
              value={settings.defaultCrankLength}
              onChange={e => updateSetting('defaultCrankLength', +e.target.value)}
              min={150}
              max={185}
              unit="mm"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={resetSettings}
              className="text-xs font-mono px-3 py-1.5 border border-red-500/40 text-red-400 hover:bg-red-500/10 transition-colors"
            >
              Reset to Defaults
            </button>
          </div>
        </CyberCard>

        {/* Reference Wheel Chart */}
        <WheelChart />
      </div>
    </div>
  );
}
