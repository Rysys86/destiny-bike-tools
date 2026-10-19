/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';

const STORAGE_KEY = 'destiny_bike_settings_v1';

const DEFAULT_SETTINGS = {
  uiSize: 'standard', // 'compact' | 'standard' | 'large' | 'xlarge'
  unitSystem: 'metric', // 'metric' | 'imperial'
  defaultCadence: 90,
  defaultRiderWeight: 75,
  defaultBikeWeight: 9,
  defaultCrankLength: 172.5,
  themeAccent: 'cyan', // 'cyan' | 'magenta' | 'green' | 'yellow'
  scanlines: true,
};

const UI_SIZE_SCALES = {
  compact: '14px',
  standard: '16px',
  large: '18px',
  xlarge: '20px',
};

const ACCENT_COLORS = {
  cyan: { primary: '#00f5ff', dim: 'rgba(0, 245, 255, 0.15)', lit: 'rgba(0, 245, 255, 0.6)' },
  magenta: { primary: '#ff006e', dim: 'rgba(255, 0, 110, 0.15)', lit: 'rgba(255, 0, 110, 0.6)' },
  green: { primary: '#39ff14', dim: 'rgba(57, 255, 20, 0.15)', lit: 'rgba(57, 255, 20, 0.6)' },
  yellow: { primary: '#f5ff00', dim: 'rgba(245, 255, 0, 0.15)', lit: 'rgba(245, 255, 0, 0.6)' },
};

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // storage unavailable
    }

    // Apply UI scale
    const root = document.documentElement;
    root.style.fontSize = UI_SIZE_SCALES[settings.uiSize] || '16px';

    // Apply Accent
    const accent = ACCENT_COLORS[settings.themeAccent] || ACCENT_COLORS.cyan;
    root.style.setProperty('--neon-cyan', accent.primary);
    root.style.setProperty('--border-dim', accent.dim);
    root.style.setProperty('--border-lit', accent.lit);

    // Apply Scanlines
    if (settings.scanlines) {
      document.body.classList.remove('no-scanlines');
    } else {
      document.body.classList.add('no-scanlines');
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, UI_SIZE_SCALES }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
