# Destiny Bike Tools

A precision digital toolkit for cyclists — built with a cyberpunk aesthetic. Four science-backed calculators, 13 technical standards reference documents, and 22 cited sources covering everything from gear ratios to hydraulic brake hose fittings.

---

## Calculators

### ⚙️ Gearing Calculator
Build any chainring/cassette combination and see the full gear matrix — ratio, development (meters per revolution), and speed at any cadence. Color-coded from climbing gears (green) to top-end speed (red). Supports 700c, 650b, 26", 27.5", and 29" wheels.

### 📐 Bike Fit / Size
Estimates frame size and saddle height from your body measurements using two established methods side-by-side:
- **LeMond method** — `inseam × 0.883` for saddle height
- **Hamley method** — `inseam × 1.09` for road ergometer baseline

Covers Road, MTB, Gravel, and City bikes. Outputs frame size in cm/inches with XS–XL label, saddle height, and setback estimate.

### 🛞 Tire Pressure Calculator
Front and rear PSI recommendation based on rider weight, tire width, terrain, and tire type. Based on the SILCA simplified tire pressure model with:
- Tubeless derating (−15%)
- Terrain adjustment: Road / Gravel / MTB Trail / MTB Enduro
- Hookless rim maximum PSI warning (72 PSI)

### ⚡ Power Output Calculator
Two modes — **Speed → Power** and **Power → Speed** — using the Martin et al. (1998) cycling power model:

```
P = P_aero + P_rolling + P_gravity + P_drivetrain
```

Inputs: CdA (position presets), Crr (surface presets), grade, rider/bike weight. Outputs: watts, W/kg, estimated VO₂, calories/hour, and **Coggan power zone** (Z1–Z7) with FTP percentage if FTP is entered.

---

## Standards Reference

13 technical documents covering bike component standards — searchable, with inline citations:

| Category | Documents |
|---|---|
| **Drivetrain** | Bottom Bracket Standards, Chain & Speed Compatibility, Derailleur Standards |
| **Wheels & Tires** | Axle & Hub Standards, Rim & Tire Width Compatibility, Wheel Size Standards |
| **Frame & Headset** | Headset Standards, Fork & Steerer Tube, Brake Mount Standards |
| **Cockpit** | Handlebar Clamp Diameters, Seatpost Diameter Standards |
| **Brakes** | Disc Brake Rotor Standards, Hydraulic Brake Hose & Fittings |

All docs live in `public/docs/` as Markdown — editable without rebuilding the app.

---

## Bibliography

22 cited sources organized by type:

| Type | Examples |
|---|---|
| Peer-reviewed | Martin et al. 1998, Hamley & Thomas 1967, Peveler 2008, Olds et al. 1995 |
| ISO Standards | ISO 4210-2:2023, ETRTO Standards 2023 |
| Books | LeMond & Gordis 1987, Coggan 2003, Friel 2012, Wilson & Papadopoulos 2004 |
| Manufacturer | Shimano Tech Docs, SRAM Tech Docs, Cane Creek, DT Swiss, Schwalbe |
| Web | SILCA, Park Tool, Wheels Manufacturing |

---

## Science Behind the Tools

- **Power model:** [Martin, J.C. et al. (1998)](https://doi.org/10.1123/jab.14.3.276) — validated road cycling power equation
- **Saddle height:** [Hamley & Thomas (1967)](https://doi.org/10.1113/jphysiol.1967.sp008238) + LeMond (1987)
- **Tire pressure:** SILCA simplified model derived from empirical tire/rider/terrain data
- **Power zones:** Coggan (2003) — the standard 7-zone FTP-based training scale

---

## Design

Cyberpunk aesthetic — dark backgrounds, neon cyan/magenta/green accents, Orbitron display font, Share Tech Mono for data, scanline overlay, corner-cut cards, and a collapsible sidebar.

No external UI dependencies — pure CSS custom properties and Tailwind v4.

---

## Disclaimer

All results are estimates for reference only. Always verify with manufacturer specifications. Bike fit values are starting points — professional fitting is recommended for injury prevention or medical conditions.
