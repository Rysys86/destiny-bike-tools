// All bike calculation formulas — pure functions, no side effects

export const WHEEL_SIZES_DETAILED = [
  // 700c Road / Gravel
  { id: '700x18', category: 'Road / Gravel', tireSize: '700 × 18c', etrto: '18-622', bsdMm: 622, circumferenceMm: 2070 },
  { id: '700x20', category: 'Road / Gravel', tireSize: '700 × 20c', etrto: '20-622', bsdMm: 622, circumferenceMm: 2086 },
  { id: '700x23', category: 'Road / Gravel', tireSize: '700 × 23c', etrto: '23-622', bsdMm: 622, circumferenceMm: 2096 },
  { id: '700x25', category: 'Road / Gravel', tireSize: '700 × 25c', etrto: '25-622', bsdMm: 622, circumferenceMm: 2105 },
  { id: '700x28', category: 'Road / Gravel', tireSize: '700 × 28c', etrto: '28-622', bsdMm: 622, circumferenceMm: 2136 },
  { id: '700x30', category: 'Road / Gravel', tireSize: '700 × 30c', etrto: '30-622', bsdMm: 622, circumferenceMm: 2146 },
  { id: '700x32', category: 'Road / Gravel', tireSize: '700 × 32c', etrto: '32-622', bsdMm: 622, circumferenceMm: 2155 },
  { id: '700x35', category: 'Road / Gravel', tireSize: '700 × 35c', etrto: '35-622', bsdMm: 622, circumferenceMm: 2168 },
  { id: '700x38', category: 'Road / Gravel', tireSize: '700 × 38c', etrto: '38-622', bsdMm: 622, circumferenceMm: 2180 },
  { id: '700x40', category: 'Road / Gravel', tireSize: '700 × 40c', etrto: '40-622', bsdMm: 622, circumferenceMm: 2200 },
  { id: '700x42', category: 'Road / Gravel', tireSize: '700 × 42c', etrto: '42-622', bsdMm: 622, circumferenceMm: 2224 },
  { id: '700x45', category: 'Road / Gravel', tireSize: '700 × 45c', etrto: '45-622', bsdMm: 622, circumferenceMm: 2268 },
  { id: '700x47', category: 'Road / Gravel', tireSize: '700 × 47c', etrto: '47-622', bsdMm: 622, circumferenceMm: 2282 },

  // 29" MTB
  { id: '29x2.00', category: '29" MTB', tireSize: '29 × 2.00"', etrto: '50-622', bsdMm: 622, circumferenceMm: 2280 },
  { id: '29x2.10', category: '29" MTB', tireSize: '29 × 2.10"', etrto: '54-622', bsdMm: 622, circumferenceMm: 2295 },
  { id: '29x2.20', category: '29" MTB', tireSize: '29 × 2.20"', etrto: '56-622', bsdMm: 622, circumferenceMm: 2310 },
  { id: '29x2.25', category: '29" MTB', tireSize: '29 × 2.25"', etrto: '57-622', bsdMm: 622, circumferenceMm: 2315 },
  { id: '29x2.30', category: '29" MTB', tireSize: '29 × 2.30"', etrto: '58-622', bsdMm: 622, circumferenceMm: 2326 },
  { id: '29x2.35', category: '29" MTB', tireSize: '29 × 2.35"', etrto: '60-622', bsdMm: 622, circumferenceMm: 2330 },
  { id: '29x2.40', category: '29" MTB', tireSize: '29 × 2.40"', etrto: '62-622', bsdMm: 622, circumferenceMm: 2340 },
  { id: '29x2.60', category: '29" MTB', tireSize: '29 × 2.60"', etrto: '65-622', bsdMm: 622, circumferenceMm: 2360 },

  // 650b / 27.5"
  { id: '650bx38', category: '650b / 27.5"', tireSize: '650b × 38c', etrto: '38-584', bsdMm: 584, circumferenceMm: 2040 },
  { id: '650bx42', category: '650b / 27.5"', tireSize: '650b × 42c', etrto: '42-584', bsdMm: 584, circumferenceMm: 2060 },
  { id: '650bx47', category: '650b / 27.5"', tireSize: '650b × 47c', etrto: '47-584', bsdMm: 584, circumferenceMm: 2070 },
  { id: '27.5x2.00', category: '650b / 27.5"', tireSize: '27.5 × 2.00"', etrto: '50-584', bsdMm: 584, circumferenceMm: 2090 },
  { id: '27.5x2.10', category: '650b / 27.5"', tireSize: '27.5 × 2.10"', etrto: '54-584', bsdMm: 584, circumferenceMm: 2110 },
  { id: '27.5x2.25', category: '650b / 27.5"', tireSize: '27.5 × 2.25"', etrto: '57-584', bsdMm: 584, circumferenceMm: 2130 },
  { id: '27.5x2.35', category: '650b / 27.5"', tireSize: '27.5 × 2.35"', etrto: '60-584', bsdMm: 584, circumferenceMm: 2145 },
  { id: '27.5x2.50', category: '650b / 27.5"', tireSize: '27.5 × 2.50"', etrto: '64-584', bsdMm: 584, circumferenceMm: 2170 },
  { id: '27.5x2.80', category: '650b / 27.5"', tireSize: '27.5 × 2.80"', etrto: '71-584', bsdMm: 584, circumferenceMm: 2200 },

  // 26" MTB
  { id: '26x1.25', category: '26" MTB / Commuter', tireSize: '26 × 1.25"', etrto: '32-559', bsdMm: 559, circumferenceMm: 1950 },
  { id: '26x1.50', category: '26" MTB / Commuter', tireSize: '26 × 1.50"', etrto: '40-559', bsdMm: 559, circumferenceMm: 1985 },
  { id: '26x1.75', category: '26" MTB / Commuter', tireSize: '26 × 1.75"', etrto: '47-559', bsdMm: 559, circumferenceMm: 2010 },
  { id: '26x1.95', category: '26" MTB / Commuter', tireSize: '26 × 1.95"', etrto: '50-559', bsdMm: 559, circumferenceMm: 2050 },
  { id: '26x2.00', category: '26" MTB / Commuter', tireSize: '26 × 2.00"', etrto: '52-559', bsdMm: 559, circumferenceMm: 2060 },
  { id: '26x2.10', category: '26" MTB / Commuter', tireSize: '26 × 2.10"', etrto: '54-559', bsdMm: 559, circumferenceMm: 2075 },
  { id: '26x2.25', category: '26" MTB / Commuter', tireSize: '26 × 2.25"', etrto: '57-559', bsdMm: 559, circumferenceMm: 2115 },
  { id: '26x2.35', category: '26" MTB / Commuter', tireSize: '26 × 2.35"', etrto: '60-559', bsdMm: 559, circumferenceMm: 2130 },

  // BMX / Folding / Youth
  { id: '24x1.75', category: '24" / BMX / Folding', tireSize: '24 × 1.75"', etrto: '47-507', bsdMm: 507, circumferenceMm: 1890 },
  { id: '20x1.50', category: '20" BMX / Folding', tireSize: '20 × 1.50"', etrto: '40-406', bsdMm: 406, circumferenceMm: 1490 },
  { id: '20x1.75', category: '20" BMX / Folding', tireSize: '20 × 1.75"', etrto: '47-406', bsdMm: 406, circumferenceMm: 1515 },
  { id: '20x1.95', category: '20" BMX / Folding', tireSize: '20 × 1.95"', etrto: '50-406', bsdMm: 406, circumferenceMm: 1565 },
  { id: '20x1-1/8', category: '20" BMX / Folding', tireSize: '20 × 1-1/8" (451)', etrto: '28-451', bsdMm: 451, circumferenceMm: 1540 },
  { id: '16x1.75', category: '16" Folding / Kids', tireSize: '16 × 1.75"', etrto: '47-305', bsdMm: 305, circumferenceMm: 1195 },
];

export const WHEEL_DIAMETERS_M = {
  '700c':  0.6223,
  '650b':  0.5842,
  '26"':   0.5588,
  '27.5"': 0.5842,
  '29"':   0.7366,
};

export const WHEEL_DIAMETERS_IN = {
  '700c':  27.0,
  '650b':  25.6,
  '26"':   26.0,
  '27.5"': 27.5,
  '29"':   29.0,
};

// Returns circumference in meters for standard key, detailed id, or numeric mm value
export const getWheelCircumferenceM = (wheelKeyOrMm) => {
  if (typeof wheelKeyOrMm === 'number' && wheelKeyOrMm > 0) {
    return wheelKeyOrMm / 1000;
  }
  const detailed = WHEEL_SIZES_DETAILED.find(w => w.id === wheelKeyOrMm || w.tireSize === wheelKeyOrMm);
  if (detailed) {
    return detailed.circumferenceMm / 1000;
  }
  const dM = WHEEL_DIAMETERS_M[wheelKeyOrMm];
  if (dM) return dM * Math.PI;
  return 2.105; // 700x25c default
};

// Gearing
export const calcGearRatio = (chainring, cog) => chainring / cog;

export const calcDevelopment = (ratio, wheelDiamOrCircumferenceM, isCircumference = false) =>
  isCircumference ? ratio * wheelDiamOrCircumferenceM : ratio * wheelDiamOrCircumferenceM * Math.PI;

export const calcSpeedKmh = (developmentM, cadenceRpm) =>
  developmentM * cadenceRpm * 60 / 1000;

export const calcSpeedMph = (speedKmh) => speedKmh * 0.621371;

export const calcGearInches = (ratio, wheelDiamIn) => ratio * wheelDiamIn;

// Gain Ratio (Sheldon Brown): (wheel radius / crank length) * (chainring / cog)
export const calcGainRatio = (ratio, wheelCircumferenceM, crankLengthMm = 172.5) => {
  const wheelRadiusMm = (wheelCircumferenceM / (2 * Math.PI)) * 1000;
  return +(ratio * (wheelRadiusMm / crankLengthMm)).toFixed(2);
};

// Gear matrix: returns 2D array of { ratio, dev, speed, inches, gainRatio }
export const buildGearMatrix = (chainrings, cogs, wheelSizeOrCircumference, cadence = 90, crankLengthMm = 172.5) => {
  const circM = typeof wheelSizeOrCircumference === 'number'
    ? wheelSizeOrCircumference / 1000
    : getWheelCircumferenceM(wheelSizeOrCircumference);
  const diamIn = (circM / 0.0254) / Math.PI;

  return chainrings.map(cr =>
    cogs.map(cog => {
      const ratio = calcGearRatio(cr, cog);
      const dev = calcDevelopment(ratio, circM, true);
      const speed = calcSpeedKmh(dev, cadence);
      const inches = calcGearInches(ratio, diamIn);
      const gainRatio = calcGainRatio(ratio, circM, crankLengthMm);
      return {
        cr,
        cog,
        ratio: +ratio.toFixed(2),
        dev: +dev.toFixed(2),
        speed: +speed.toFixed(1),
        speedMph: +calcSpeedMph(speed).toFixed(1),
        inches: +inches.toFixed(1),
        gainRatio,
      };
    })
  );
};

// Bike Fit — LeMond method
export const fitLeMond = (inseamCm) => ({
  saddleHeightMm: Math.round(inseamCm * 0.883 * 10),
  frameSizeRoad: +(inseamCm * 0.67).toFixed(1),
  frameSizeMTB: +(inseamCm * 0.59).toFixed(1),
});

// Bike Fit — Hamley method (road saddle)
export const fitHamley = (inseamCm) => ({
  saddleHeightMm: Math.round(inseamCm * 1.09 * 10),
});

// Frame size label from cm
export const frameSizeLabel = (cm) => {
  if (cm < 48) return 'XS';
  if (cm < 52) return 'S';
  if (cm < 56) return 'M';
  if (cm < 60) return 'L';
  return 'XL';
};

// Saddle setback estimate
export const calcSaddleSetback = (inseamCm) => Math.round(inseamCm * 0.01 * 10 + 65);

// Tire pressure — SILCA simplified model
export const calcTirePressure = ({ riderWeightKg, bikeWeightKg = 9, tireWidthMm, terrain = 'road', tireType = 'clincher' }) => {
  const total = riderWeightKg + bikeWeightKg;
  const rearKg = total * 0.60;
  const frontKg = total * 0.40;
  const widthFactor = tireWidthMm / 25.4;
  const basePSI = (rearKg / 75) * (6.5 / widthFactor) * 14.5038;
  const frontBase = (frontKg / 75) * (6.5 / widthFactor) * 14.5038;
  const tF = { road: 1.0, gravel: 0.85, mtb_trail: 0.70, mtb_enduro: 0.60 }[terrain] ?? 1.0;
  const tl = tireType === 'tubeless' ? 0.85 : 1.0;
  const hooklessMax = tireType === 'clincher' ? Infinity : 72;
  return {
    front: Math.min(Math.max(Math.round(frontBase * tF * tl), 15), hooklessMax),
    rear:  Math.min(Math.max(Math.round(basePSI  * tF * tl), 20), hooklessMax),
  };
};

const G = 9.80665;

// Power output — Martin et al. 1998
export const calcPowerFromSpeed = ({
  speedKmh, riderKg, bikeKg = 9, gradePct = 0,
  CdA = 0.32, Crr = 0.004, rhoAir = 1.204,
}) => {
  const v = speedKmh / 3.6;
  const M = riderKg + bikeKg;
  const grade = gradePct / 100;
  const P_air   = 0.5 * rhoAir * CdA * Math.pow(v, 3);
  const P_roll  = Crr * M * G * v;
  const P_grade = M * G * grade * v;
  return Math.max(0, Math.round(P_air + P_roll + P_grade + 3));
};

export const calcSpeedFromPower = ({
  watts, riderKg, bikeKg = 9, gradePct = 0,
  CdA = 0.32, Crr = 0.004, rhoAir = 1.204,
}) => {
  // Binary search: find speed where power matches
  let lo = 0, hi = 120; // km/h bounds
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const p = calcPowerFromSpeed({ speedKmh: mid, riderKg, bikeKg, gradePct, CdA, Crr, rhoAir });
    if (Math.abs(p - watts) < 0.01) break;
    if (p < watts) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return +((lo + hi) / 2).toFixed(1);
};

export const calcWPerKg = (watts, riderKg) => +(watts / riderKg).toFixed(2);

export const calcVO2 = (watts, riderKg) => +(watts * 10.8 / riderKg + 7).toFixed(1);

export const calcCaloriesPerHour = (watts) => Math.round(watts * 3.6 / 4.184 / 0.25);

export const CDA_PRESETS = [
  { label: 'Road — Drops',    value: 0.32 },
  { label: 'Road — Hoods',    value: 0.36 },
  { label: 'Road — Upright',  value: 0.40 },
  { label: 'TT — Aggressive', value: 0.20 },
  { label: 'MTB — Upright',   value: 0.50 },
  { label: 'Gravel — Hoods',  value: 0.38 },
];

export const CRR_PRESETS = [
  { label: 'Road (23–25mm, asphalt)',  value: 0.004 },
  { label: 'Road (28–32mm, asphalt)',  value: 0.0045 },
  { label: 'Gravel (40mm, gravel)',    value: 0.007 },
  { label: 'MTB (2.1", trail)',        value: 0.012 },
  { label: 'MTB (2.35", enduro)',      value: 0.016 },
];

// Coggan power zones
export const COGGAN_ZONES = [
  { zone: 1, name: 'Active Recovery', minPct: 0,   maxPct: 55  },
  { zone: 2, name: 'Endurance',       minPct: 55,  maxPct: 75  },
  { zone: 3, name: 'Tempo',           minPct: 75,  maxPct: 90  },
  { zone: 4, name: 'Threshold',       minPct: 90,  maxPct: 105 },
  { zone: 5, name: 'VO₂ Max',         minPct: 105, maxPct: 120 },
  { zone: 6, name: 'Anaerobic',       minPct: 120, maxPct: 150 },
  { zone: 7, name: 'Neuromuscular',   minPct: 150, maxPct: 999 },
];

export const getZone = (watts, ftp) => {
  if (!ftp) return null;
  const pct = (watts / ftp) * 100;
  return COGGAN_ZONES.find(z => pct >= z.minPct && pct < z.maxPct) || COGGAN_ZONES[6];
};
