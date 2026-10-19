import { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar, Footer, MobileBottomBar } from './components/layout/index';
import SearchModal from './components/search/SearchModal';
import { SettingsProvider } from './context/SettingsContext';
import Home from './pages/Home';
import GearingCalculator from './pages/tools/GearingCalculator';
import BikeFitCalculator from './pages/tools/BikeFitCalculator';
import TirePressureCalculator from './pages/tools/TirePressureCalculator';
import PowerCalculator from './pages/tools/PowerCalculator';
import Standards from './pages/standards/Standards';
import Bibliography from './pages/Bibliography';
import Settings from './pages/Settings';

function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global hotkeys (Ctrl+K, Cmd+K, '/')
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(prev => !prev);
      } else if (e.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="flex min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <Sidebar
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        onOpenSearch={() => setSearchOpen(true)}
      />
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden pb-14 md:pb-0">
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/tools/gearing" element={<GearingCalculator onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/tools/fit" element={<BikeFitCalculator onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/tools/tire-pressure" element={<TirePressureCalculator onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/tools/power" element={<PowerCalculator onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/standards" element={<Standards onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/standards/:slug" element={<Standards onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/bibliography" element={<Bibliography onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
            <Route path="/settings" element={<Settings onOpenSearch={() => setSearchOpen(true)} onToggleMobile={() => setMobileOpen(true)} />} />
          </Routes>
        </main>
        <Footer />
      </div>

      <MobileBottomBar onOpenSearch={() => setSearchOpen(true)} />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <HashRouter>
        <AppLayout />
      </HashRouter>
    </SettingsProvider>
  );
}
