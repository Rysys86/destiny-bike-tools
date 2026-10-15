// All bike calculation formulas — pure functions, no side effects

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

// Gearing
export const calcGearRatio = (chainring, cog) => chainring / cog;

export const calcDevelopment = (ratio, wheelDiamM) =>
  ratio * wheelDiamM * Math.PI;

export const calcSpeedKmh = (developmentM, cadenceRpm) =>
  developmentM * cadenceRpm * 60 / 1000;

export const calcGearInches = (ratio, wheelDiamIn) => ratio * wheelDiamIn;

// Gear matrix: returns 2D array of { ratio, dev, speed, inches }
export const buildGearMatrix = (chainrings, cogs, wheelSize, cadence) => {
  const dM = WHEEL_DIAMETERS_M[wheelSize] || 0.6223;
  const dIn = WHEEL_DIAMETERS_IN[wheelSize] || 27.0;
  return chainrings.map(cr =>
    cogs.map(cog => {
      const ratio = calcGearRatio(cr, cog);
      const dev = calcDevelopment(ratio, dM);
      return {
        ratio: +ratio.toFixed(2),
        dev: +dev.toFixed(2),
        speed: +calcSpeedKmh(dev, cadence).toFixed(1),
        inches: +calcGearInches(ratio, dIn).toFixed(1),
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
  const M = riderKg + bikeKg;
  const grade = gradePct / 100;
  let lo = 0, hi = 120; // km/h bounds
  for (let i = 0; i < 60; i++) {
    const mid = (lo + hi) / 2;
    const p = calcPowerFromSpeed({ speedKmh: mid, riderKg, bikeKg, gradePct, CdA, Crr, rhoAir });
    if (Math.abs(p - watts) < 0.01) break;
    p < watts ? lo = mid : hi = mid;
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
