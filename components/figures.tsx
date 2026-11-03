import type { ReactNode } from "react";

/*
 * Isometric line-art figures. One projection helper, drawn back-to-front with
 * bg-filled shapes so hidden lines are occluded. Styling lives in globals.css
 * under `.fig` (stroke var(--fg), fill var(--bg), non-scaling 1.25px strokes).
 *
 * Axes: +x runs right-down, +y runs left-down, +z runs up.
 */

type Iso = {
  s: number;
  xy: (x: number, y: number, z: number) => [number, number];
  P: (x: number, y: number, z: number) => string;
};

const C = Math.cos(Math.PI / 6);
const r = (n: number) => Math.round(n * 10) / 10;

function iso(s: number): Iso {
  const xy = (x: number, y: number, z: number): [number, number] => [
    r((x - y) * C * s),
    r((x + y) * 0.5 * s - z * s),
  ];
  return { s, xy, P: (x, y, z) => xy(x, y, z).join(",") };
}

type V3 = [number, number, number];
const pts = (I: Iso, list: V3[]) => list.map(([x, y, z]) => I.P(x, y, z)).join(" ");

function Box({
  I, x, y, z, w, d, h, top, open,
}: {
  I: Iso; x: number; y: number; z: number; w: number; d: number; h: number;
  top?: string; open?: boolean;
}) {
  const t = z + h;
  return (
    <g>
      <polygon className="box-front" points={pts(I, [[x, y + d, z], [x + w, y + d, z], [x + w, y + d, t], [x, y + d, t]])} />
      <polygon className="box-side" points={pts(I, [[x + w, y, z], [x + w, y + d, z], [x + w, y + d, t], [x + w, y, t]])} />
      <polygon className={top} points={pts(I, [[x, y, t], [x + w, y, t], [x + w, y + d, t], [x, y + d, t]])} />
      {open ? null : null}
    </g>
  );
}

/** Circle lying flat on the xy plane. */
function Dot({ I, cx, cy, z, rad, cls }: { I: Iso; cx: number; cy: number; z: number; rad: number; cls?: string }) {
  const [X, Y] = I.xy(cx, cy, z);
  return <ellipse className={cls} cx={X} cy={Y} rx={r(rad * Math.SQRT2 * C * I.s)} ry={r(rad * Math.SQRT2 * 0.5 * I.s)} />;
}

function Cyl({ I, cx, cy, z, rad, h, topCls }: { I: Iso; cx: number; cy: number; z: number; rad: number; h: number; topCls?: string }) {
  const [X, Yb] = I.xy(cx, cy, z);
  const rx = r(rad * Math.SQRT2 * C * I.s);
  const ry = r(rad * Math.SQRT2 * 0.5 * I.s);
  const Yt = r(Yb - h * I.s);
  return (
    <g>
      <path d={`M${X - rx} ${Yt} L${X - rx} ${Yb} A${rx} ${ry} 0 0 0 ${X + rx} ${Yb} L${X + rx} ${Yt}`} />
      <ellipse className={topCls} cx={X} cy={Yt} rx={rx} ry={ry} />
    </g>
  );
}

const Line = ({ I, a, b, cls = "n" }: { I: Iso; a: V3; b: V3; cls?: string }) => (
  <polyline className={cls} points={pts(I, [a, b])} />
);

/** Points on a vertical plane. axis "x": plane x = k, (u, v) = (y, z). axis "y": plane y = k, (u, v) = (x, z). */
function plane(I: Iso, axis: "x" | "y", k: number, list: [number, number][]) {
  return list.map(([u, v]) => (axis === "x" ? I.P(k, u, v) : I.P(u, k, v))).join(" ");
}

function circlePts(cu: number, cv: number, rad: number, n = 14): [number, number][] {
  return Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    return [cu + Math.cos(a) * rad, cv + Math.sin(a) * rad];
  });
}

/* ------------------------------------------------------------------ */
/* Hero: Arduino Uno with a blinking LED on pin 13                     */
/* ------------------------------------------------------------------ */

export function ArduinoFigure() {
  const I = iso(6.4);
  const t = 1.6; // board thickness
  const hh = 8.5; // header height
  const pinStep = 2.54;

  const header = (x0: number, y0: number, n: number, key: string) => (
    <g key={key}>
      <Box I={I} x={x0} y={y0} z={t} w={n * pinStep} d={pinStep} h={hh} top="component-face" />
      {Array.from({ length: n }, (_, i) => (
        <Dot key={i} I={I} cx={x0 + pinStep * (i + 0.5)} cy={y0 + pinStep / 2} z={t + hh} rad={0.62} />
      ))}
      {Array.from({ length: n - 1 }, (_, i) => (
        <Line key={`d${i}`} I={I} cls="n t" a={[x0 + pinStep * (i + 1), y0 + pinStep, t]} b={[x0 + pinStep * (i + 1), y0 + pinStep, t + hh]} />
      ))}
    </g>
  );

  // LED stands on pins GND + D13 of the upper header.
  const gndX = 17.5 + pinStep * 3.5;
  const d13X = 17.5 + pinStep * 4.5;
  const ledX = (gndX + d13X) / 2;
  const ledY = 1.27;
  const legTop = t + hh + 9;
  const R = 3.5; // LED radius (drawn oversized so the hero reads)
  const [lx, lyBase] = I.xy(ledX, ledY, legTop);
  const rxL = r(R * Math.SQRT2 * C * I.s);
  const ryL = r(R * Math.SQRT2 * 0.5 * I.s);
  const bodyH = 4;
  const lyTop = r(lyBase - (bodyH + 1) * I.s);
  const domeH = r(R * 1.15 * I.s);
  const cy = lyTop - domeH * 0.35; // centre of the lit dome

  return (
    <svg
      className="fig"
      viewBox="-345 -165 775 610"
      role="img"
      aria-label="Isometric line drawing of an Arduino Uno board with an LED on pin 13 that blinks on and off."
    >
      {/* board + mounting holes */}
      <Box I={I} x={0} y={0} z={0} w={68.6} d={53.4} h={t} top="board-face" />
      {[[14, 2.5], [15.3, 50.7], [66.1, 7.6], [66.1, 35.5]].map(([x, y], i) => (
        <Dot key={i} I={I} cx={x} cy={y} z={t} rad={1.7} />
      ))}

      {/* traces */}
      {Array.from({ length: 6 }, (_, i) => (
        <polyline
          key={i}
          className="n trace"
          points={pts(I, [
            [29 + pinStep * i, 26, t],
            [29 + pinStep * i, 20 - i * 1.4, t],
            [20 + pinStep * i, 14 - i * 1.1, t],
            [20 + pinStep * i, 5, t],
          ])}
        />
      ))}

      {/* USB-B and DC jack hang over the left edge */}
      <Box I={I} x={-6} y={6} z={t} w={16} d={12} h={11} />
      <Line I={I} cls="n t" a={[-6, 18, t + 7]} b={[10, 18, t + 7]} />
      <Box I={I} x={-6} y={35} z={t} w={15} d={9} h={11} />
      {/* electrolytic caps */}
      <Cyl I={I} cx={18} cy={42} z={t} rad={3.2} h={7} />
      <Cyl I={I} cx={25.5} cy={43.5} z={t} rad={3.2} h={7} />

      {/* top headers (behind the LED) */}
      {header(17.5, 0, 10, "h1")}
      {header(45.5, 0, 8, "h2")}

      {/* LED legs, body, lit overlay */}
      <Line I={I} cls="n leg" a={[gndX, ledY, t + hh]} b={[gndX, ledY, legTop]} />
      <Line I={I} cls="n leg" a={[d13X, ledY, t + hh]} b={[d13X, ledY, legTop]} />
      <g>
        <path d={`M${lx - rxL} ${lyTop} L${lx - rxL} ${lyBase} A${rxL} ${ryL} 0 0 0 ${lx + rxL} ${lyBase} L${lx + rxL} ${lyTop}`} />
        <path d={`M${lx - rxL} ${lyTop} A${rxL} ${domeH} 0 0 1 ${lx + rxL} ${lyTop}`} />
        <ellipse cx={lx} cy={lyTop} rx={rxL} ry={ryL} className="n t" />
        <g className="led-lit" aria-hidden="true">
          <path className="sky" d={`M${lx - rxL} ${lyTop} A${rxL} ${domeH} 0 0 1 ${lx + rxL} ${lyTop} A${rxL} ${ryL} 0 0 1 ${lx - rxL} ${lyTop}Z`} />
          {[-62, -90, -118, -35, -145].map((deg) => {
            const a = (deg * Math.PI) / 180;
            const r1 = 1.5 * rxL, r2 = 2.1 * rxL;
            return (
              <polyline key={deg} className="ray" points={`${r(lx + Math.cos(a) * r1)},${r(cy + Math.sin(a) * r1 * 0.9)} ${r(lx + Math.cos(a) * r2)},${r(cy + Math.sin(a) * r2 * 0.9)}`} />
            );
          })}
        </g>
      </g>

      {/* small SMD parts, 16U2, reset, chip */}
      <Box I={I} x={14} y={21} z={t} w={7} d={7} h={0.9} />
      <Box I={I} x={6} y={21} z={t} w={5.5} d={5.5} h={3} />
      <Dot I={I} cx={8.75} cy={23.75} z={t + 3} rad={1.5} />
      <Box I={I} x={34} y={9} z={t} w={2.2} d={1.2} h={0.5} top="sky-soft" />
      <g className="led-lit" aria-hidden="true">
        <polygon className="sky" points={pts(I, [[34, 9, t + 0.5], [36.2, 9, t + 0.5], [36.2, 10.2, t + 0.5], [34, 10.2, t + 0.5]])} />
      </g>
      <Box I={I} x={22} y={26} z={t} w={35.5} d={8} h={5} top="component-face" />
      {Array.from({ length: 14 }, (_, i) => (
        <Line key={i} I={I} cls="n t" a={[22.9 + i * pinStep, 34, t]} b={[22.9 + i * pinStep, 34, t + 5]} />
      ))}
      <Dot I={I} cx={25} cy={32} z={t + 5} rad={0.8} />

      {/* ICSP */}
      <Box I={I} x={61} y={20} z={t} w={5.08} d={7.62} h={hh} />

      {/* Silkscreen labels retain the same isometric projection as the board. */}
      {(() => {
        const [x, y] = I.xy(38, 43, t + .1);
        return <text className="board-label" transform={`matrix(.866 .5 -.866 .5 ${x} ${y})`}>UNO</text>;
      })()}
      {(() => {
        const [x, y] = I.xy(29, 30.5, t + 5.1);
        return <text className="chip-label" transform={`matrix(.866 .5 -.866 .5 ${x} ${y})`}>ATMEGA328P</text>;
      })()}
      {/* lower headers (nearest the viewer) */}
      {header(29, 50.4 - 2.54, 8, "h3")}
      {header(51.5, 50.4 - 2.54, 6, "h4")}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Program figures                                                     */
/* ------------------------------------------------------------------ */

const FigSvg = ({ label, viewBox, children }: { label: string; viewBox: string; children: ReactNode }) => (
  <svg className="fig" viewBox={viewBox} role="img" aria-label={label}>
    {children}
  </svg>
);

/** FIG 0.1 · kids: breadboard, resistor, LED, jumper. */
export function BreadboardFigure() {
  const I = iso(5.2);
  const t = 4;
  const cols = 15;
  return (
    <FigSvg viewBox="-205 -110 445 315" label="Isometric line drawing of a breadboard with an LED, a resistor and a jumper wire.">
      <g transform="translate(-10 -4)">
        <Box I={I} x={-14} y={-4} z={0} w={58} d={26} h={t} />
        {/* centre channel */}
        <Line I={I} cls="n t" a={[-14, 9, t]} b={[44, 9, t]} />
        <Line I={I} cls="n t" a={[-14, 9.8, t]} b={[44, 9.8, t]} />
        {Array.from({ length: cols }, (_, i) =>
          [-1.4, 0.5, 17.8, 19.7].map((yy, j) => (
            <Dot key={`${i}-${j}`} I={I} cx={-11 + i * 3.7} cy={yy} z={t} rad={0.55} cls="pin" />
          )),
        )}
        {/* resistor */}
        <Cyl I={I} cx={11} cy={4.6} z={t} rad={1.5} h={1.5} />
        <Line I={I} a={[11, 4.6, t + 1.5]} b={[11, 4.6, t + 1.5]} cls="n" />
        {/* jumper wire */}
        <polyline className="n wire" points={pts(I, [[-4.4, 19.7, t], [-4.4, 19.7, t + 7], [3, 19.7, t + 7], [3, 14, t + 7], [3, 14, t]])} />
        {/* LED, lit */}
        <Line I={I} cls="n leg" a={[18.5, 3, t]} b={[18.5, 3, t + 6]} />
        <Line I={I} cls="n leg" a={[22.2, 3, t]} b={[22.2, 3, t + 6]} />
        <Cyl I={I} cx={20.3} cy={3} z={t + 6} rad={2.9} h={3.5} />
        {(() => {
          const [X, Y] = I.xy(20.3, 3, t + 6 + 3.5);
          const rx = r(2.9 * Math.SQRT2 * C * I.s);
          const hd = r(2.9 * 1.15 * I.s);
          return (
            <>
              <path className="sky" d={`M${X - rx} ${Y} A${rx} ${hd} 0 0 1 ${X + rx} ${Y} A${rx} ${r(2.9 * Math.SQRT2 * 0.5 * I.s)} 0 0 1 ${X - rx} ${Y}Z`} />
              {[-62, -90, -118].map((deg) => {
                const a = (deg * Math.PI) / 180;
                return <polyline key={deg} className="ray" points={`${r(X + Math.cos(a) * rx * 1.5)},${r(Y - hd * 0.3 + Math.sin(a) * rx * 1.4)} ${r(X + Math.cos(a) * rx * 2.1)},${r(Y - hd * 0.3 + Math.sin(a) * rx * 2)}`} />;
              })}
            </>
          );
        })()}
      </g>
    </FigSvg>
  );
}

/** FIG 0.2 · older adults: laptop, phone, chat bubble. */
export function DevicesFigure() {
  const I = iso(5.6);
  const screenLines = (x: number, y0: number, w: number, z0: number, n: number) =>
    Array.from({ length: n }, (_, i) => (
      <polyline key={i} className="n t" points={plane(I, "x", x, [[y0 + 2, z0 - i * 2.4 - 2.4], [y0 + w - 2 - (i % 2) * 5, z0 - i * 2.4 - 2.4]])} />
    ));
  return (
    <FigSvg viewBox="-205 -190 332 360" label="Isometric line drawing of a laptop and a phone with a chat bubble above them.">
      <g transform="translate(-30 20)">
        {/* laptop */}
        <Box I={I} x={-6} y={-4} z={0} w={26} d={26} h={1.4} />
        <Box I={I} x={-6} y={-3} z={1.4} w={1.4} d={24} h={16} />
        {screenLines(-4.6, -3, 24, 15.4, 4)}
        <polygon className="n t" points={pts(I, [[4, 6, 1.4], [14, 6, 1.4], [14, 14, 1.4], [4, 14, 1.4]])} />
        {/* phone */}
        <Box I={I} x={26} y={9} z={0} w={1.2} d={9} h={16} />
        {screenLines(27.2, 9, 9, 15, 3)}
        {/* chat bubble on an x-plane above the devices */}
        <polygon
          points={plane(I, "x", 12, [
            [6, 29], [24, 29], [26, 31], [26, 38], [24, 40], [13, 40], [9, 44], [9, 40], [6, 40], [4, 38], [4, 31],
          ])}
        />
        {[11, 15, 19].map((u) => (
          <polygon key={u} className="sky" points={plane(I, "x", 12, circlePts(u, 34.5, 1.15, 10))} />
        ))}
      </g>
    </FigSvg>
  );
}

/** FIG 0.3 · community: stacked laptops and a box. */
export function DrivesFigure() {
  const I = iso(5.2);
  return (
    <FigSvg viewBox="-165 -90 380 295" label="Isometric line drawing of a stack of laptops beside an open cardboard box.">
      <g transform="translate(-22 -6)">
        {/* stack of laptops */}
        {[0, 1.9, 3.8].map((z, i) => (
          <g key={z}>
            <Box I={I} x={-8 + i * 0.6} y={-2} z={z} w={26} d={19} h={1.6} />
            <Line I={I} cls="n t" a={[4 + i * 0.6, 17, z + 1.6]} b={[10 + i * 0.6, 17, z + 1.6]} />
          </g>
        ))}
        {/* box */}
        <Box I={I} x={24} y={0} z={0} w={22} d={22} h={13} />
        <polygon className="n t" points={pts(I, [[26, 2, 13], [44, 2, 13], [44, 20, 13], [26, 20, 13]])} />
        <Line I={I} cls="n t" a={[35, 22, 4]} b={[35, 22, 13]} />
        <Box I={I} x={27} y={4} z={8} w={16} d={1.4} h={12} />
        <Box I={I} x={29} y={8} z={8} w={1.4} d={12} h={7} />
        {/* arrow: a device on its way */}
        <polyline className="n wire" points={pts(I, [[19, 28, 0], [30, 28, 0], [30, 28, 0]])} />
        <polyline className="n wire" points={pts(I, [[19, 28, 0], [34, 28, 0]])} />
        <polyline className="n wire" points={pts(I, [[31, 25.5, 0], [34, 28, 0], [31, 30.5, 0]])} />
      </g>
    </FigSvg>
  );
}
