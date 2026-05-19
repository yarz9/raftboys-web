// SVG wave / curve dividers between sections.
// `topFill` and `bottomFill` declare which CSS variable colors the
// fill — use them to match the section ABOVE and BELOW the divider.
// Variant controls the shape: 'wave' (gentle sine), 'curve' (single
// big curve), 'torn' (jagged edge), 'split' (asymmetric peaks).

export function WaveDivider({ variant = 'wave', flip = false, fill = 'paper', height = 80 }) {
  const fillClass =
    fill === 'paper' ? 'wave-fill-paper'
    : fill === 'deep' ? 'wave-fill-deep'
    : fill === 'soft' ? 'wave-fill-soft'
    : 'wave-fill-paper'

  const paths = {
    wave: 'M0,32 C240,80 480,0 720,40 C960,80 1200,40 1440,16 L1440,80 L0,80 Z',
    curve: 'M0,0 C480,80 960,80 1440,0 L1440,80 L0,80 Z',
    torn: 'M0,40 L120,16 L240,60 L360,8 L480,52 L600,20 L720,56 L840,12 L960,48 L1080,24 L1200,60 L1320,16 L1440,52 L1440,80 L0,80 Z',
    split: 'M0,12 C320,60 720,12 1080,50 C1280,72 1380,52 1440,40 L1440,80 L0,80 Z',
  }

  return (
    <svg
      viewBox="0 0 1440 80"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="block w-full"
      style={{ height, transform: flip ? 'scaleY(-1)' : undefined }}
    >
      <path d={paths[variant] || paths.wave} className={fillClass} />
    </svg>
  )
}
