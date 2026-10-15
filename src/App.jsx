import { HashRouter, Routes, Route } from 'react-router-dom';
import { Sidebar, Footer } from './components/layout/index';
import Home from './pages/Home';
import GearingCalculator from './pages/tools/GearingCalculator';
import BikeFitCalculator from './pages/tools/BikeFitCalculator';
import TirePressureCalculator from './pages/tools/TirePressureCalculator';
import PowerCalculator from './pages/tools/PowerCalculator';
import Standards from './pages/standards/Standards';
import Bibliography from './pages/Bibliography';

export default function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen" style={{ background: 'var(--bg-base)' }}>
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          <main className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools/gearing" element={<GearingCalculator />} />
              <Route path="/tools/fit" element={<BikeFitCalculator />} />
              <Route path="/tools/tire-pressure" element={<TirePressureCalculator />} />
              <Route path="/tools/power" element={<PowerCalculator />} />
              <Route path="/standards" element={<Standards />} />
              <Route path="/standards/:slug" element={<Standards />} />
              <Route path="/bibliography" element={<Bibliography />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}
